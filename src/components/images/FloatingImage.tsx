import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DeviceImage, DeviceImageProps } from './DeviceImage';

export function FloatingImage({ className = '', containerClassName = '', ...props }: Omit<DeviceImageProps, 'imageType'>) {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion ? {} : {
    animate: { y: [0, -15, 0] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <motion.div 
      className={`w-full h-full relative ${containerClassName}`}
      {...animationProps}
    >
      <DeviceImage
        imageType="floating"
        containerClassName="w-full h-full !bg-transparent"
        className={`w-full h-full object-contain drop-shadow-2xl ${className}`}
        {...props}
      />
    </motion.div>
  );
}
