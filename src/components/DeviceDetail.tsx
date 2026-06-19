import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Cpu, SquareTerminal, Battery as BatteryIcon, Sparkles, Search, ArrowUpDown, MapPin, BookmarkMinus } from 'lucide-react';
import { getDatabaseState, Phone, SparePart } from '../data/database';
import { useSettings } from '../contexts/SettingsContext';
import { useUser } from '../contexts/UserContext';

import { InteractiveDeviceViewer } from './InteractiveDeviceViewer';

interface DeviceDetailProps {
 phone: Phone;
 onBackToHome: () => void;
 onCompareWith: (phoneId: string) => void;
}

export const DeviceDetail: React.FC<DeviceDetailProps> = ({ 
 phone, 
 onBackToHome, 
 onCompareWith 
}) => {
 const { parts } = getDatabaseState();
 const phoneParts = parts.filter(p => p.phone_id === phone.id);
 const { formatPrice, locationStatus, nearestCenters } = useSettings();
 const { isSaved, addSavedDevice, removeSavedDevice } = useUser();

 const [searchQuery, setSearchQuery] = useState('');
 const [sortAsc, setSortAsc] = useState(true);

 // Apply search and sort
 const filteredAndSortedParts = useMemo(() => {
   let result = phoneParts;
   if (searchQuery.trim()) {
     const q = searchQuery.toLowerCase();
     result = result.filter(p => 
       p.part_name.toLowerCase().includes(q) || 
       p.category_id.replace('-', ' ').toLowerCase().includes(q) ||
       p.color.toLowerCase().includes(q)
     );
   }
   result = [...result].sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);
   return result;
 }, [phoneParts, searchQuery, sortAsc]);

 // Group parts by category to enable scrolling to sections
 const partsByCategory = useMemo<Record<string, SparePart[]>>(() => {
  const grouped: Record<string, SparePart[]> = {};
  filteredAndSortedParts.forEach(p => {
   const cat = p.category_id;
   if (!grouped[cat]) grouped[cat] = [];
   grouped[cat].push(p);
  });
  return grouped;
 }, [filteredAndSortedParts]);

 const quickLinks = [
  { id: 'display', label: 'Display' },
  { id: 'battery', label: 'Battery' },
  { id: 'mainboard', label: 'Mainboard' },
  { id: 'camera-module', label: 'Camera' },
  { id: 'charging-port', label: 'Charging Port' },
  { id: 'speaker', label: 'Speaker' },
  { id: 'back-cover', label: 'Back Cover' },
 ];

 const scrollToView = (categoryId: string) => {
  const el = document.getElementById(`category-${categoryId}`);
  if (el) {
   el.scrollIntoView({ behavior: 'smooth', block: 'center' });
   el.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
   setTimeout(() => {
    el.style.backgroundColor = 'transparent';
    el.style.transition = 'background-color 0.5s ease';
   }, 500);
  }
 };

 return (
  <div className="animate-fadeIn pb-24 max-w-[1440px] mx-auto">
   {/* Search schema and Breadcrumb schema mapping */}
   <script type="application/ld+json">
    {JSON.stringify([
     {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": `${phone.name} original spare parts cost list`,
      "brand": {
       "@type": "Brand",
       "name": phone.series === 'CMF Series' ? 'CMF' : 'Nothing'
      },
      "offers": {
       "@type": "AggregateOffer",
       "priceCurrency": "INR",
       "lowPrice": phoneParts.length ? Math.min(...phoneParts.map(p => p.price)) : 299,
       "highPrice": phoneParts.length ? Math.max(...phoneParts.map(p => p.price)) : 24900,
       "offerCount": phoneParts.length
      }
     },
     {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
       {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://glyphparts.com/"
       },
       {
        "@type": "ListItem",
        "position": 2,
        "name": "Devices Archive",
        "item": "https://glyphparts.com/devices"
       },
       {
        "@type": "ListItem",
        "position": 3,
        "name": phone.name,
        "item": `https://glyphparts.com/device/${phone.id}`
       }
      ]
     }
    ])}
   </script>

   {/* BREADCRUMB */}
   <div className="flex flex-wrap gap-2 items-center text-[10px] md:text-[11px] font-dot text-muted-foreground uppercase tracking-widest mb-8">
    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
    <ChevronRight className="h-3 w-3" strokeWidth={2} />
    <Link to="/devices" className="hover:text-foreground transition-colors">Archive</Link>
    <ChevronRight className="h-3 w-3" strokeWidth={2} />
    <Link to="/devices" className="hover:text-foreground transition-colors">{phone.series}</Link>
    <ChevronRight className="h-3 w-3" strokeWidth={2} />
    <span className="text-foreground">{phone.name}</span>
   </div>

   {/* HERO SECTION - COMPACT */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start mb-12">
    {/* Small Phone Image Box */}
    <div className="md:col-span-1">
      <InteractiveDeviceViewer 
        deviceImage={phone.official_image_source || 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=600&auto=format&fit=crop'} 
        name={phone.name} 
        deviceColorMap={
          phone.color_variants 
            ? Object.fromEntries(phone.color_variants.map(c => {
                const hex = c.toLowerCase().includes('dark') || c.toLowerCase().includes('black') ? '#111111' 
                          : c.toLowerCase().includes('white') ? '#FFFFFF' 
                          : c.toLowerCase().includes('grey') ? '#555555'
                          : c.toLowerCase().includes('blue') ? '#0070f3'
                          : phone.imageColor || '#FFFFFF';
                return [c, hex];
              }))
            : {}
        }
        defaultColor={phone.color_variants ? phone.color_variants[0] : 'White'}
      />
    </div>

    {/* Specifications */}
    <div className="md:col-span-3 space-y-6">
     <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div>
       <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tighter text-foreground uppercase leading-none mb-2">
        {phone.name}
       </h1>
       <p className="text-base text-muted-foreground font-sans font-light">Released in {phone.release_date}</p>
      </div>
      
      <div className="flex gap-2 shrink-0">
       <button
        onClick={() => isSaved(phone.id) ? removeSavedDevice(phone.id) : addSavedDevice(phone.id)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-muted text-sm font-medium transition-colors"
       >
        <BookmarkMinus className={`w-4 h-4 ${isSaved(phone.id) ? 'fill-foreground' : ''}`} />
        {isSaved(phone.id) ? 'Saved' : 'Save'}
       </button>
       <button
        onClick={() => onCompareWith('cmf-phone-1')}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background hover:opacity-90 text-sm font-medium transition-opacity"
       >
        Compare
       </button>
      </div>
     </div>

     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4 pt-4 border-t border-border">
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <Cpu className="h-3.5 w-3.5" />
        <span className="text-[9px] font-dot uppercase tracking-widest">Chipset</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground leading-tight">{phone.chipset}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <SquareTerminal className="h-3.5 w-3.5" />
        <span className="text-[9px] font-dot uppercase tracking-widest">Storage</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground truncate">{phone.storage_variants.join(' / ')}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <Sparkles className="h-3.5 w-3.5" />
        <span className="text-[9px] font-dot uppercase tracking-widest">Memory</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground truncate">{phone.ram_variants.join(' / ')}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <BatteryIcon className="h-3.5 w-3.5" />
        <span className="text-[9px] font-dot uppercase tracking-widest">Battery</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground truncate">{phone.battery_capacity} ({phone.charging_watts})</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <Smartphone className="h-3.5 w-3.5" />
        <span className="text-[9px] font-dot uppercase tracking-widest">Display</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground leading-tight">{phone.display_size} {phone.display_type} ({phone.refresh_rate})</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-[9px] font-dot uppercase tracking-widest">Rear Camera</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground">{phone.rear_camera}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-[9px] font-dot uppercase tracking-widest">Front Camera</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground">{phone.front_camera}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-[9px] font-dot uppercase tracking-widest">OS</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground">{phone.os}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-[9px] font-dot uppercase tracking-widest">IP Rating</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground">{phone.ip_rating || 'Not Officially Confirmed'}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-[9px] font-dot uppercase tracking-widest">Weight & Dim</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground">{phone.weight || 'Not Officially Confirmed'} | {phone.dimensions || 'Not Officially Confirmed'}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-[9px] font-dot uppercase tracking-widest">Colors</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground">{phone.color_variants ? phone.color_variants.join(', ') : 'Not Officially Confirmed'}</p>
      </div>
      <div className="space-y-1">
       <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="text-[9px] font-dot uppercase tracking-widest">Misc</span>
       </div>
       <p className="text-sm font-sans font-medium text-foreground">
        {[phone.wireless_charging, phone.esim_support, phone.fingerprint_sensor, phone.connectivity].filter(Boolean).join(', ') || 'Not Officially Confirmed'}
       </p>
      </div>
     </div>
    </div>
   </div>

   {/* Nearest Service Center Box */}
   {locationStatus === 'Allowed' && nearestCenters.length > 0 && (
    <div className="mb-10 p-5 rounded-[1.5rem] bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
     <div className="flex flex-col">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
       <span className="text-[10px] font-dot uppercase tracking-widest text-[#E52534] flex items-center gap-1.5">
        <MapPin className="h-3 w-3" /> Nearest Service Center
       </span>
      </div>
      <h4 className="font-medium text-foreground">{nearestCenters[0].name}</h4>
      <p className="text-sm text-muted-foreground">{nearestCenters[0].city}, {nearestCenters[0].state}</p>
     </div>
     <div className="flex items-center gap-4 shrink-0">
      <span className="text-sm font-medium text-foreground bg-muted px-2.5 py-1 rounded-md">{nearestCenters[0].distance?.toFixed(1)} km</span>
      <a href={nearestCenters[0].map_url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
       Directions
      </a>
     </div>
    </div>
   )}

   {/* Pricing Section header */}
   <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 sticky top-[72px] bg-background/95 backdrop-blur-md z-40 py-4 -translate-y-4 border-b border-border/50">
    <h2 className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight">Spare Parts Pricing</h2>
    <div className="flex items-center gap-3">
     <div className="relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input 
       type="text" 
       placeholder="Find parts..." 
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       className="pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-full outline-none focus:border-foreground/50 transition-colors w-full sm:w-48 placeholder:text-muted-foreground/70"
      />
     </div>
     <button 
      onClick={() => setSortAsc(!sortAsc)}
      className="flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-card border border-border transition-colors text-muted-foreground hover:text-foreground shrink-0"
      aria-label="Sort by price"
     >
      <ArrowUpDown className="h-4 w-4" />
     </button>
    </div>
   </div>
   
   {/* QUICK ACCESS CHIPS */}
   <div className="flex flex-wrap gap-2 mb-8">
    {quickLinks.map(link => {
     // Only show chips for categories that exist for this phone in the current filter state
     if (!(Object.values(partsByCategory) as SparePart[][]).some(cat => cat.some(p => p.category_id === link.id))) return null;
     return (
      <button 
       key={link.id} 
       onClick={() => scrollToView(link.id)}
       className="px-4 py-2 rounded-full border border-border bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase shadow-sm hover:shadow active:scale-95"
      >
       {link.label}
      </button>
     )
    })}
   </div>

   {filteredAndSortedParts.length === 0 && (
    <div className="py-20 flex flex-col items-center justify-center text-center gap-4 text-muted-foreground bg-card border border-border rounded-3xl mx-px">
     <Search className="h-8 w-8 opacity-20" />
     <p>No parts found matching "{searchQuery}"</p>
    </div>
   )}
   
   {/* Table View (Desktop & Mobile combined as grouped list for better layout and scrolling) */}
   <div className="flex flex-col gap-6 md:gap-8 rounded-2xl mb-16">
    {(Object.entries(partsByCategory) as [string, SparePart[]][]).map(([categoryId, parts]) => {
     return (
      <div key={categoryId} id={`category-${categoryId}`} className="scroll-mt-32 border border-border rounded-3xl bg-card overflow-hidden card-shadow">
       {/* Category Header Row - Desktop style table header integrated into the first row or as a group header */}
       <div className="bg-muted/50 px-5 md:px-8 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-sans font-semibold text-foreground capitalize tracking-tight flex items-center gap-2">
         {categoryId.replace('-', ' ')}
        </h3>
        <span className="text-xs text-muted-foreground font-mono bg-border/50 px-2 py-0.5 rounded text-[10px]">{parts.length}</span>
       </div>
       
       <div className="divide-y divide-border/50 bg-card">
        {parts.map(part => {
         const pricing = formatPrice(part.price);
         return (
          <div key={part.id} className="flex flex-col p-5 md:px-8 md:py-6 hover:bg-muted/30 transition-colors gap-4 group">
           <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 md:gap-6">
            {/* Info Context */}
            <div className="flex flex-col gap-2 flex-1 pr-4">
             <div>
              <div className="flex items-center gap-2 mb-1.5">
               <div className="font-medium text-[15px] md:text-[17px] tracking-tight text-foreground leading-tight">{part.part_name}</div>
               {part.confidence_score === 'High' && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest uppercase bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.15)] text-[#4ADE80]">Verified</span>
               )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground/80 font-light">
               <span>Variant: {part.color}</span>
               <span className="hidden sm:inline">•</span>
               <span>Region: India</span>
               <span className="hidden sm:inline">•</span>
               <span>Updated: {new Date(part.last_updated).toLocaleDateString()}</span>
               {part.price_source && (
                <>
                 <span className="hidden sm:inline">•</span>
                 <a href={part.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline decoration-border underline-offset-2">
                  Source: {part.price_source}
                 </a>
                </>
               )}
              </div>
             </div>
            </div>
            
            {/* Pricing Context */}
            <div className="flex flex-col items-start sm:items-end shrink-0 sm:min-w-[120px] bg-muted/40 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none mt-2 sm:mt-0">
             <span className="font-medium text-lg text-foreground tracking-tight leading-none mb-1">{pricing.converted || pricing.original}</span>
             {pricing.converted && (
              <span className="font-medium tracking-tight text-xs text-muted-foreground/80">
               Official: {pricing.original}
              </span>
             )}
            </div>
           </div>
           
           {/* Meta & Report Footer */}
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/30 mt-1">
            <div className="text-[10px] text-muted-foreground/60 leading-tight max-w-xl">
             {part.price_disclaimer || "Prices are provided for informational purposes only. Labor fees not included."}
            </div>
            <button 
             onClick={() => {
               const subject = encodeURIComponent(`Incorrect Price Report: ${phone.name} - ${part.part_name}`);
               const body = encodeURIComponent(`Device: ${phone.name}\nPart: ${part.part_name}\nCurrent Listed Price: ${part.price}\n\nSuggested Correct Price:\nSource Link / Proof:\nAdditional Notes:\n`);
               window.location.href = `mailto:update@glyphparts.com?subject=${subject}&body=${body}`;
             }}
             className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
             Report Incorrect Price
            </button>
           </div>
          </div>
         );
        })}
       </div>
      </div>
     );
    })}
   </div>

   {/* Related Devices */}
   {(() => {
    const { phones } = getDatabaseState();
    const related = phones.filter(p => p.series === phone.series && p.id !== phone.id).slice(0, 3);
    if (related.length === 0) return null;
    return (
     <div className="mt-16 pt-16 border-t border-border">
      <h2 className="text-2xl font-display font-medium text-foreground tracking-tight mb-8">More in {phone.series}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
       {related.map(rel => (
        <Link key={rel.id} to={`/device/${rel.id}`} className="block group">
         <div className="flex flex-col gap-4 bg-transparent border border-border p-5 rounded-3xl hover:border-foreground/50 transition-colors h-full card-shadow hover-lift">
          <div className="w-full aspect-[4/5] sm:aspect-square bg-muted rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 transition-transform duration-500">
           <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity blur-[40px]" style={{ backgroundColor: rel.imageColor }} />
           <Smartphone className="w-12 h-12 text-foreground/40 group-hover:text-foreground/80 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
          </div>
          <div className="px-2 pb-2">
           <span className="block text-lg font-medium text-foreground tracking-tight leading-tight mb-0.5">{rel.name}</span>
           <span className="text-xs text-muted-foreground font-light">Released in {rel.release_date}</span>
          </div>
         </div>
        </Link>
       ))}
      </div>
     </div>
    );
   })()}

  </div>
 );
};
