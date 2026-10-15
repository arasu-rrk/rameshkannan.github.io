#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

node <<'NODE'
const fs = require('node:fs');
const path = require('node:path');

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');
const listPath = path.join(process.cwd(), 'scripts', 'blogs-to-update.json');
const now = new Date();
const pad = (value) => String(value).padStart(2, '0');
const offsetMinutes = -now.getTimezoneOffset();
const offset = `${offsetMinutes < 0 ? '-' : '+'}${pad(Math.floor(Math.abs(offsetMinutes) / 60))}:${pad(Math.abs(offsetMinutes) % 60)}`;
const currentDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${offset}`;
const patterns = JSON.parse(fs.readFileSync(listPath, 'utf8'));

if (!Array.isArray(patterns) || patterns.some(
  (pattern) => typeof pattern !== 'string' || path.basename(pattern) !== pattern || !pattern.endsWith('.md')
)) {
  throw new Error(`${listPath} must contain an array of Markdown filename patterns`);
}

const markdownFiles = fs.readdirSync(blogsDirectory).filter((file) => file.endsWith('.md'));
const filesToUpdate = new Set();
for (const pattern of patterns) {
  const regex = new RegExp(`^${pattern.split('*').map(
    (part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('.*')}$`);
  const matches = markdownFiles.filter((file) => regex.test(file));
  if (matches.length === 0) {
    throw new Error(`No blog files match pattern "${pattern}"`);
  }
  matches.forEach((file) => filesToUpdate.add(file));
}

for (const file of filesToUpdate) {
  const filePath = path.join(blogsDirectory, file);
  const contents = fs.readFileSync(filePath, 'utf8');
  const frontMatter = contents.match(/^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/);

  if (!frontMatter) {
    throw new Error(`Missing YAML frontmatter in ${filePath}`);
  }

  const metadata = frontMatter[2];
  if (!/^date\s*:/m.test(metadata)) {
    throw new Error(`Missing date field in frontmatter: ${filePath}`);
  }

  const updatedMetadata = /^modifiedDate\s*:/m.test(metadata)
    ? metadata.replace(/^modifiedDate\s*:.*$/m, `modifiedDate: "${currentDateTime}"`)
    : metadata.replace(/^(date\s*:\s*.*)$/m, `$1\nmodifiedDate: "${currentDateTime}"`);

  const updatedContents = contents.replace(frontMatter[0], `${frontMatter[1]}${updatedMetadata}${frontMatter[3]}`);
  fs.writeFileSync(filePath, updatedContents);
  console.log(`Updated ${file} to ${currentDateTime}`);
}
NODE
