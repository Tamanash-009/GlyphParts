import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getDatabaseState, Phone } from '../data/database';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { DeviceImage } from '../components/images/DeviceImage';

export function DevicesPage() {
 const { phones } = useMemo(() => getDatabaseState(), []);

 const groupedPhones = useMemo(() => {
  return phones.reduce((acc, phone) => {
   if (!acc[phone.series]) {
    acc[phone.series] = [];
   }
   acc[phone.series].push(phone);
   return acc;
  }, {} as Record<string, Phone[]>);
 }, [phones]);

 const seriesOrder = ['Flagship', 'A Series', 'CMF Series'];

 return (
  <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-32 animate-in fade-in duration-700">
   <SEO 
    title="Device Archive"
    description="Browse the complete collection of Nothing and CMF smartphones. See pricing for display, battery, and other spare parts."
    canonical="/devices"
   />
   <div className="mb-16">
    <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-foreground mb-6">Archive</h1>
    <p className="text-xl text-muted-foreground max-w-2xl">
     Browse the complete collection of Nothing and CMF smartphones to find original spare part prices.
    </p>
   </div>

   <div className="space-y-16">
    {seriesOrder.map(series => {
     const seriesPhones = groupedPhones[series];
     if (!seriesPhones || seriesPhones.length === 0) return null;

     return (
      <div key={series}>
       <h2 className="text-3xl font-display font-medium text-foreground tracking-tight mb-8">
        {series === 'Flagship' ? 'Flagship Series' : series}
       </h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
        {seriesPhones.map(device => (
         <Link key={device.id} to={`/device/${device.id}`} className="block group h-full">
          <div className="flex flex-col gap-5 bg-card border border-border p-6 rounded-[2rem] hover:border-foreground hover:bg-accent transition-colors h-full">
           <div 
            className="w-full aspect-[4/5] rounded-[1.5rem] bg-muted relative isolate overflow-hidden transition-all duration-500 flex items-center justify-center p-8"
           >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[60px] opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-125" style={{ backgroundColor: device.imageColor, transform: 'translate(20%, -20%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[60px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: device.imageColor }} />
            
            <DeviceImage 
              deviceSlug={device.slug} 
              imageType="front" 
              alt={device.name}
              className="w-[65%] h-auto max-h-full object-contain"
              containerClassName="absolute inset-0 flex items-center justify-center p-6 mix-blend-plus-lighter"
            />
           </div>
           
           <div className="flex items-center justify-between px-2 mt-auto">
            <div className="flex flex-col">
             <span className="text-xl font-medium tracking-tight text-foreground">{device.name}</span>
             <span className="text-sm text-muted-foreground mt-1">Released in {device.release_date}</span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
           </div>
          </div>
         </Link>
        ))}
       </div>
       {series !== seriesOrder[seriesOrder.length - 1] && (
        <hr className="mt-16 border-border" />
       )}
      </div>
     );
    })}
   </div>
  </div>
 );
}
