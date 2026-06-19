import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';

interface InteractiveDeviceViewerProps {
  deviceImage: string;
  deviceColorMap?: Record<string, string>;
  defaultColor?: string;
  name: string;
}

export const InteractiveDeviceViewer: React.FC<InteractiveDeviceViewerProps> = ({ deviceImage, deviceColorMap = {}, defaultColor = 'White', name }) => {
  const views = ['front', 'perspective', 'back'];
  const [viewIndex, setViewIndex] = useState(1);
  const [currentColor, setCurrentColor] = useState(defaultColor);
  
  const getTransformForView = (index: number) => {
    switch (views[index]) {
      case 'front': return { scale: 1.05, rotateY: 0, x: 0 };
      case 'perspective': return { scale: 0.95, rotateY: -15, x: 10 };
      case 'back': return { scale: 1.02, rotateY: 180, x: 0 };
      default: return { scale: 1, rotateY: 0, x: 0 };
    }
  };

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x > 50) {
      setViewIndex(prev => (prev === 0 ? views.length - 1 : prev - 1));
    } else if (info.offset.x < -50) {
      setViewIndex(prev => (prev === views.length - 1 ? 0 : prev + 1));
    }
  };

  const colors = Object.keys(deviceColorMap);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div 
        className="relative w-full aspect-square md:aspect-[4/5] bg-muted/30 rounded-[32px] overflow-hidden cursor-grab active:cursor-grabbing elevation-subtle flex items-center justify-center p-[40px]"
        style={{ perspective: 1000 }}
      >
        <div className="absolute top-6 left-6 text-xs font-mono uppercase tracking-widest text-muted-foreground z-10 flex gap-4">
          <span className="flex items-center gap-2">Interactive Viewer <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /></span>
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={getTransformForView(viewIndex)}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-full h-full flex items-center justify-center relative touch-none"
        >
          {Object.keys(deviceColorMap).length > 0 && (
            <motion.div 
              className="absolute inset-0 z-10 mix-blend-color pointer-events-none rounded-[40px]"
              animate={{ backgroundColor: deviceColorMap[currentColor] || 'transparent' }}
              transition={{ duration: 0.5 }}
            />
          )}
          <OptimizedImage 
            src={deviceImage} 
            alt={name}
            className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
            containerClassName="w-full h-full absolute inset-0 bg-transparent"
          />
        </motion.div>

        <div className="absolute bottom-6 flex items-center gap-2 z-10 bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border">
          {views.map((v, i) => (
            <button
              key={v}
              onClick={() => setViewIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${viewIndex === i ? 'bg-foreground w-6' : 'bg-muted-foreground/40 hover:bg-muted-foreground'}`}
              aria-label={`View ${v}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-2">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-mono">
          {views[viewIndex]} View
        </span>
        
        {colors.length > 0 && (
          <div className="flex items-center gap-3">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setCurrentColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${currentColor === c ? 'border-foreground scale-110 shadow-md' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: deviceColorMap[c] }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
