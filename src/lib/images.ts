export function getImageUrl(src: string): string {
  if (!src || /^(https?:|data:)/i.test(src)) return src;

  const path = src.startsWith('/') ? src : `/${src}`;
  const cdnUrl = process.env.NEXT_PUBLIC_IMAGE_CDN_URL;

  if (process.env.NODE_ENV !== 'production' || !cdnUrl) return path;

  return `${cdnUrl.replace(/\/+$/, '')}${path}`;
}

export const profileImageUrl = getImageUrl("/images/me/ramesh-kannan.jpeg");
