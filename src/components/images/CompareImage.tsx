import React from 'react';
import { DeviceImage, DeviceImageProps } from './DeviceImage';

export function CompareImage({ className = '', containerClassName = '', ...props }: Omit<DeviceImageProps, 'imageType'>) {
  return (
    <DeviceImage
      imageType="compare"
      containerClassName={`w-full aspect-[1/2] max-h-[300px] bg-transparent flex items-center justify-center ${containerClassName}`}
      className={`w-auto h-full object-contain scale-90 ${className}`}
      {...props}
    />
  );
}
