import React, { useState } from 'react';

type OptimizedImageProps = React.ComponentProps<'img'> & {
  containerClassName?: string;
};

export function OptimizedImage({ src, alt, className, containerClassName, ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-upgrade Unsplash images to WebP/AVIF if not already formatted
  const optimizedSrc = typeof src === 'string' && src.includes('unsplash.com') && !src.includes('auto=format') 
    ? `${src}${src.includes('?') ? '&' : '?'}auto=format&fit=crop` 
    : src;

  return (
    <div className={`relative overflow-hidden bg-black/5 dark:bg-white/5 ${containerClassName || ''}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-black/10 dark:bg-white/10" />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        {...props}
      />
    </div>
  );
}
