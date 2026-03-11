import { SITE_URL } from '@/site.config';

/**
 * Generate a canonical URL for a given path
 */
export function canonicalUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? cleanPath : cleanPath.replace(/\/$/, '');
  return `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
}

/**
 * Convert a slug to a human-readable title
 * e.g., "garden-city" → "Garden City"
 */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert a title to a URL slug
 * e.g., "Garden City" → "garden-city"
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Format a phone number for display
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    const area = digits.slice(1, 4);
    const first = digits.slice(4, 7);
    const last = digits.slice(7);
    return `(${area}) ${first}-${last}`;
  }
  return phone;
}

/**
 * Truncate text to a given length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Classnames helper — join truthy class strings
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
