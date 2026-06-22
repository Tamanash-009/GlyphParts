import React, { useState } from 'react';
import { getDeviceImage, getFallbackImage, DeviceImageType } from '../../config/imageConfig';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface DeviceImageProps extends Omit<React.ComponentProps<'img'>, 'src'> {
  deviceSlug: string;
  imageType: DeviceImageType;
  containerClassName?: string;
  priority?: boolean;
}

export function DeviceImage({ 
  deviceSlug, 
  imageType, 
  alt, 
  className = '', 
  containerClassName = '',
  priority = false,
  ...props 
}: DeviceImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const paths = getDeviceImage(deviceSlug, imageType);
  const fallbackSrc = getFallbackImage();

  // 3D Hover Effect setup
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);
  const glareX = useTransform(springX, [0, 1], [100, -100]);
  const glareY = useTransform(springY, [0, 1], [100, -100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div 
      style={{ perspective: 1200 }}
      className={`relative flex items-center justify-center w-full h-full ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-black/5 dark:bg-white/5 rounded-3xl" />
      )}
      
      {hasError ? (
        <img
          src={fallbackSrc}
          alt={`Fallback for ${alt}`}
          className={`object-cover transition-opacity duration-500 ease-in-out opacity-100 ${className}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...props}
        />
      ) : (
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="w-full h-full flex items-center justify-center relative hover:scale-[1.03] transition-transform duration-500 ease-out"
        >
          <picture className="w-full h-full flex items-center justify-center">
            <source srcSet={paths.webp} type="image/webp" />
            <img
              src={paths.webp}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`transition-opacity duration-500 ease-in-out z-10 relative drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
              style={{ transform: 'translateZ(40px)' }}
              {...props}
            />
          </picture>
          
          {/* Dynamic Glare Effect */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none rounded-[2.5rem] mix-blend-overlay opacity-0 hover:opacity-100 transition-opacity duration-500 hidden md:block"
            style={{ 
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)',
              x: glareX,
              y: glareY,
              transform: 'translateZ(50px)'
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
