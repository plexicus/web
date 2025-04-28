/**
 * Image optimization utilities to prepare for Astro migration
 */

// Image format options
export type ImageFormat = 'webp' | 'avif' | 'png' | 'jpeg';

// Image size presets
export const imageSizes = {
  thumbnail: { width: 200, height: 200 },
  small: { width: 400, height: 300 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
  hero: { width: 1920, height: 1080 },
};

// Image quality presets
export const imageQualities = {
  low: 60,
  medium: 75,
  high: 85,
  max: 100,
};

/**
 * Get optimized image path for different formats and sizes
 * This is a placeholder for Astro's image optimization
 */
export function getOptimizedImagePath(
  originalPath: string,
  format: ImageFormat = 'webp',
  width?: number,
  height?: number,
  quality: number = imageQualities.high,
): string {
  // This is just a placeholder - in Astro, you'd use the built-in image optimization
  // For now, we'll just return the path to our manually optimized images

  if (originalPath.includes('.')) {
    const pathParts = originalPath.split('.');
    const extension = pathParts.pop();
    const basePath = pathParts.join('.');

    // If we've already created optimized versions, use those
    if (format === 'webp' && originalPath.includes('/images/')) {
      return `${basePath}.webp`;
    }
  }

  // Otherwise return the original path
  return originalPath;
}

/**
 * Example usage in Astro:
 *
 * ---
 * import { getOptimizedImagePath } from '../utils/image-utils';
 * import { Image } from 'astro:assets';
 * ---
 *
 * <Image
 *   src={import('../assets/productivity-dashboard.png') || "/placeholder.svg"}
 *   alt="Dashboard"
 *   width={800}
 *   height={600}
 *   format="webp"
 * />
 */
