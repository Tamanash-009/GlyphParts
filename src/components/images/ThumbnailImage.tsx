import React from 'react';
import { DeviceImage, DeviceImageProps } from './DeviceImage';

export function ThumbnailImage({ className = '', containerClassName = '', ...props }: Omit<DeviceImageProps, 'imageType'>) {
  return (
    <DeviceImage
      imageType="thumbnail"
      containerClassName={`w-12 h-12 rounded-xl bg-muted shrink-0 ${containerClassName}`}
      className={`w-full h-full object-contain p-1 ${className}`}
      {...props}
    />
  );
}
