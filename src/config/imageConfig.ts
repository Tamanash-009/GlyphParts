// Centralized Image Configuration for GlyphParts

export type DeviceImageType = 
  | 'hero' 
  | 'front' 
  | 'back' 
  | 'perspective' 
  | 'floating' 
  | 'thumbnail' 
  | 'compare' 
  | 'gallery-1' 
  | 'gallery-2' 
  | 'gallery-3';

export interface ImagePaths {
  webp: string;
  avif: string;
}

/**
 * Returns the optimized and fallback paths for a specific device image.
 * Ensures we never hardcode image paths directly in components.
 * 
 * @param deviceSlug The URL-friendly slug of the device (e.g. 'phone-3')
 * @param type The type of render requested (e.g. 'floating', 'thumbnail')
 * @returns Object containing WebP and AVIF paths
 */
export const getDeviceImage = (deviceSlug: string, type: DeviceImageType): ImagePaths => {
  const basePath = `/images/devices/${deviceSlug}/${type}`;
  
  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`
  };
};

/**
 * Returns a fallback image path if the primary image fails to load.
 * Can be customized based on device or type later if needed.
 */
export const getFallbackImage = (): string => {
  return 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=400&auto=format&fit=crop';
};
