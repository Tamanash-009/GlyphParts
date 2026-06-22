import React from 'react';
import { DeviceImage, DeviceImageProps } from './DeviceImage';

export function HeroImage({ className = '', containerClassName = '', ...props }: Omit<DeviceImageProps, 'imageType'>) {
  return (
    <DeviceImage
      imageType="hero"
      priority={true} // Hero images should be loaded eagerly
      containerClassName={`w-full aspect-[4/5] md:aspect-auto md:h-full relative elevation-subtle ${containerClassName}`}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  );
}
