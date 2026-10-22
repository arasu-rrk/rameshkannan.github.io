import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const requiredVariables = [
  'CLOUDFLARE_ACCOUNT_ID',
  'CLOUDFLARE_R2_ACCESS_KEY_ID',
  'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
  'CLOUDFLARE_R2_BUCKET',
  'NEXT_PUBLIC_IMAGE_CDN_URL',
];
const configuredVariables = requiredVariables.filter((name) => process.env[name]);
const isCloudflarePagesBuild = ['1', 'true'].includes(process.env.CF_PAGES?.toLowerCase());

if (configuredVariables.length !== requiredVariables.length) {
  if (configuredVariables.length > 0 || isCloudflarePagesBuild) {
    const missingVariables = requiredVariables.filter((name) => !process.env[name]);
    throw new Error(`Missing required R2 configuration: ${missingVariables.join(', ')}`);
  }

  console.log('Skipping R2 image upload: R2 credentials are not configured.');
} else {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const bucket = process.env.CLOUDFLARE_R2_BUCKET;
  const cdnUrl = new URL(process.env.NEXT_PUBLIC_IMAGE_CDN_URL);
  if (cdnUrl.protocol !== 'https:') {
    throw new Error('NEXT_PUBLIC_IMAGE_CDN_URL must use HTTPS.');
  }
  const imageDirectory = path.join(process.cwd(), 'public/images');
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
  });

  async function findImages(directory, prefix = '') {
    const entries = await readdir(directory, { withFileTypes: true });
    const images = [];

    for (const entry of entries) {
      const relativePath = path.posix.join(prefix, entry.name);
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        images.push(...await findImages(fullPath, relativePath));
      } else if (entry.isFile()) {
        images.push({ fullPath, key: `images/${relativePath}` });
      }
    }

    return images;
  }

  function getContentType(filePath) {
    const contentTypes = {
      '.avif': 'image/avif',
      '.gif': 'image/gif',
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
    };
    return contentTypes[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  }

  const images = await findImages(imageDirectory);
  const localKeys = new Set(images.map(({ key }) => key));
  let continuationToken;
  const remoteKeys = [];

  do {
    const response = await client.send(new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: 'images/',
      ContinuationToken: continuationToken,
    }));
    remoteKeys.push(...(response.Contents ?? []).flatMap(({ Key }) => Key ? [Key] : []));
    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  for (const { fullPath, key } of images) {
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: await readFile(fullPath),
      ContentType: getContentType(fullPath),
      CacheControl: 'public, max-age=3600, s-maxage=86400',
    }));
    console.log(`Published ${key}`);
  }

  const staleKeys = remoteKeys.filter((key) => !localKeys.has(key));
  for (let index = 0; index < staleKeys.length; index += 1000) {
    const response = await client.send(new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: staleKeys.slice(index, index + 1000).map((Key) => ({ Key })) },
    }));
    if (response.Errors?.length) {
      throw new Error(`Failed to remove stale R2 images: ${JSON.stringify(response.Errors)}`);
    }
  }

  console.log(`Published ${images.length} image(s) to Cloudflare R2.`);
}
