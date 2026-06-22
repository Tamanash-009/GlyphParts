import React from 'react';
import { DeviceImage, DeviceImageProps } from './DeviceImage';
import { DeviceImageType } from '../../config/imageConfig';

interface GalleryImageProps extends Omit<DeviceImageProps, 'imageType'> {
  index: 1 | 2 | 3;
}

export function GalleryImage({ index, className = '', containerClassName = '', ...props }: GalleryImageProps) {
  const type: DeviceImageType = `gallery-${index}` as DeviceImageType;
  
  return (
    <DeviceImage
      imageType={type}
      containerClassName={`w-full aspect-square rounded-[32px] overflow-hidden bg-card border border-border elevation-subtle hover-lift ${containerClassName}`}
      className={`w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105 ${className}`}
      {...props}
    />
  );
}
