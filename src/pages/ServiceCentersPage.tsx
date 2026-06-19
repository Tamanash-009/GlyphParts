import React, { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { SEO } from '../components/SEO';
import { SERVICE_CENTERS } from '../data/serviceCenters';
import { MapPin, Phone, Clock, ArrowUpRight, Crosshair, AlertCircle, Compass, Map as MapIcon, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaf icon path issue in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 14);
  }, [center, map]);
  return null;
}

export function ServiceCentersPage() {
 const { location, locationStatus, requestLocation, nearestCenters } = useSettings();
 const [copiedId, setCopiedId] = useState<string | null>(null);

 const centersToDisplay = nearestCenters;

 return (
 <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-32 animate-in fade-in duration-700">
  <SEO 
  title="Service Centers"
  description="Find authorized Nothing and CMF service centers near you for professional repairs and support."
  canonical="/centers"
  />
 <div className="mb-16">
  <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tight text-foreground dark:text-[#FFFFFF] mb-6 leading-none">Service Centers</h1>
  <p className="text-lg font-sans text-muted-foreground dark:text-[#A1A1AA] leading-[1.8] max-w-[700px]">
  Find authorized Nothing and CMF service centers near you. All data powered by free open-source services.
  </p>

  {locationStatus !== 'Allowed' && (
  <div className="mt-8 p-8 md:p-10 rounded-[40px] bg-card dark:bg-[#111111] border border-border dark:border-[#262626] shadow-lg flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-5 duration-300">
   <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
    <div className="max-w-xl">
     <h3 className="text-xl font-bold text-foreground dark:text-[#FFFFFF] mb-2">Location Intelligence</h3>
     <p className="text-muted-foreground dark:text-[#A1A1AA] font-light text-sm leading-[1.8] max-w-[700px]">
      Allow location access to find the nearest service centers automatically.
     </p>
    </div>
    <div className="flex items-center gap-3 shrink-0">
     {locationStatus === 'Blocked' && (
      <div className="px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.15)] text-[#FF6B6B] font-medium flex items-center gap-2">
       <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>
       Blocked
      </div>
     )}
     {locationStatus === 'Denied' && (
      <div className="px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.15)] text-[#FF6B6B] font-medium flex items-center gap-2">
       <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>
       Denied
      </div>
     )}
     {locationStatus === 'Not Requested' && (
      <div className="px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest bg-[rgba(96,165,250,0.1)] border border-[rgba(96,165,250,0.15)] text-[#60A5FA] font-medium flex items-center gap-2">
       <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse"></span>
       Not Enabled
      </div>
     )}
    </div>
   </div>

   <div className="flex flex-col gap-4">
    <button 
     onClick={requestLocation}
     className="px-6 py-3 rounded-full bg-[#FFFFFF] text-[#000000] hover:bg-[#F3F4F6] disabled:bg-[#525252] disabled:text-[#A1A1AA] font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap self-start shadow-sm"
    >
     <Crosshair className="h-4 w-4" /> Allow Location Access
    </button>

    {locationStatus === 'Blocked' && (
     <div className="flex items-start gap-3 p-4 rounded-2xl bg-[rgba(255,107,107,0.1)] border border-[rgba(255,107,107,0.2)] text-[#FF6B6B]">
      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-[#FF6B6B]" />
      <div className="text-sm font-sans leading-relaxed">
       <strong>Location access is blocked.</strong> Enable location permissions in your browser settings to discover nearby authorized service centers.
      </div>
     </div>
    )}
   </div>
  </div>
  )}
 </div>

 <div className="flex items-center justify-between mb-8">
 <h2 className="text-2xl font-display font-medium text-foreground">
 Nearest Centers
 </h2>
 </div>

 <div className="space-y-6">
 {centersToDisplay.length === 0 ? (
  <div className="p-12 md:p-16 rounded-[40px] bg-card dark:bg-[#111111] border border-border dark:border-[#262626] flex flex-col items-center justify-center text-center gap-6 animate-in fade-in duration-500">
   <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-2">
    <MapPin className="h-8 w-8 text-muted-foreground opacity-50" />
   </div>
   <div className="max-w-md">
    <h3 className="text-2xl font-display font-medium text-foreground mb-3">No Nearby Centers Found</h3>
    <p className="text-muted-foreground mb-6">We couldn't find any centers via Overpass API near your current location. Please check your nearest major city.</p>
   </div>
  </div>
 ) : (
  centersToDisplay.map((center) => (
  <div key={center.id} className="p-8 md:p-10 rounded-[40px] bg-card dark:bg-[#111111] border border-border dark:border-[#262626] shadow-lg flex flex-col items-start gap-8 relative overflow-hidden group transition-all duration-300 hover:scale-[1.005]">
  {center.distance !== undefined && (
  <div className="absolute top-8 right-8 md:top-10 md:right-10 px-3.5 py-1.5 rounded-full bg-muted dark:bg-zinc-900 border border-border dark:border-zinc-800 flex items-center gap-2 shadow-sm">
  <MapPin className="h-3.5 w-3.5 text-foreground dark:text-[#FFFFFF]" />
  <span className="text-sm font-semibold font-mono text-foreground dark:text-[#FFFFFF]">{center.distance.toFixed(1)} km</span>
  </div>
  )}
  
  <div className="max-w-2xl pr-20 md:pr-0">
  <div className="flex items-center gap-3 mb-4">
  {center.opening_hours === 'Open Now' ? (
   <span className="px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.15)] text-[#4ADE80] font-semibold flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
    Open Now
   </span>
  ) : center.opening_hours === 'Closed' ? (
   <span className="px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest bg-muted dark:bg-zinc-900 border border-border dark:border-zinc-800 text-muted-foreground dark:text-zinc-500 font-semibold flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-650"></span>
    Closed
   </span>
  ) : (
    <span className="px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest bg-muted dark:bg-zinc-900 border border-border dark:border-zinc-800 text-muted-foreground dark:text-zinc-500 font-semibold flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-650"></span>
    {center.opening_hours}
   </span>
  )}
  </div>
  <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground mb-2 leading-tight">
  {center.name}
  </h3>
  <p className="text-lg text-muted-foreground dark:text-[#A1A1AA] font-normal font-sans">
  {center.city}, {center.state}, {center.country}
  </p>
  </div>

  {/* OpenStreetMap Rendering */}
  <div className="w-full h-64 md:h-80 rounded-[24px] overflow-hidden border border-border mt-4 relative z-0">
    <MapContainer 
      center={[center.latitude, center.longitude]} 
      zoom={14} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[center.latitude, center.longitude]}>
        <Popup>
          <strong>{center.name}</strong><br />
          {center.address}
        </Popup>
      </Marker>
      <MapUpdater center={[center.latitude, center.longitude]} />
    </MapContainer>
  </div>

  <div className="w-full h-px bg-border/45" />

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
  <div className="space-y-4">
    <div className="flex items-start gap-4 text-muted-foreground">
    <MapPin className="h-5 w-5 shrink-0 mt-1 text-muted-foreground" />
    <p className="leading-relaxed font-normal text-muted-foreground dark:text-[#A1A1AA]">{center.address}</p>
    </div>
    <div className="flex items-center gap-4 text-muted-foreground">
     <Compass className="h-5 w-5 shrink-0 text-muted-foreground" />
     <span className="font-mono text-sm text-muted-foreground dark:text-[#A1A1AA]">
      {center.latitude.toFixed(6)}, {center.longitude.toFixed(6)}
     </span>
    </div>
  </div>
  <div className="space-y-4">
  <div className="flex items-center gap-4 text-muted-foreground">
   <Phone className="h-5 w-5 shrink-0 text-muted-foreground" />
   <a href={`tel:${center.phone}`} className="text-muted-foreground dark:text-[#A1A1AA] hover:text-foreground dark:hover:text-[#FFFFFF] transition-colors">{center.phone}</a>
  </div>
  <div className="flex items-center gap-4 text-muted-foreground">
   <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
   <span className="text-muted-foreground dark:text-[#A1A1AA]">{center.opening_hours}</span>
  </div>
  </div>
  </div>

  <div className="flex-wrap flex items-center gap-4 mt-2">
  <a 
  href={`https://www.openstreetmap.org/?mlat=${center.latitude}&mlon=${center.longitude}#map=16/${center.latitude}/${center.longitude}`}
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-foreground border border-border font-medium hover:bg-muted dark:hover:bg-[#1f1f1f] transition-colors shadow-sm"
  >
  <MapIcon className="h-4 w-4" /> OpenStreetMap
  </a>
  <a 
  href={`https://www.google.com/maps/search/?api=1&query=${center.latitude},${center.longitude}`}
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-foreground border border-border font-medium hover:bg-muted dark:hover:bg-[#1f1f1f] transition-colors shadow-sm"
  >
  <Navigation className="h-4 w-4" /> Google Maps
  </a>
  <button 
   className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-foreground hover:bg-muted dark:hover:bg-[#1C1C1E] border border-border dark:border-[#262626] font-medium transition-all duration-200 text-sm shadow-sm"
   onClick={() => {
    navigator.clipboard.writeText(center.address);
    setCopiedId(center.id);
    setTimeout(() => setCopiedId(null), 2000);
   }}
  >
   {copiedId === center.id ? 'Copied' : 'Copy Address'}
  </button>
  </div>
  </div>
  ))
 )}
 </div>
 </div>
 );
}
