import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { MapPin, RefreshCw, XCircle, CheckCircle, Navigation } from 'lucide-react';
import { CURRENCIES, EXCHANGE_RATES } from '../data/serviceCenters';
import { SEO } from '../components/SEO';

export function SettingsPage() {
 const { 
 location, 
 locationStatus, 
 requestLocation, 
 refreshLocation, 
 disableLocation, 
 revokeLocation,
 currency,
 setCurrency
 } = useSettings();

 return (
 <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 animate-in fade-in duration-700">
  <SEO title="Settings" description="Manage your location preferences and currency settings." canonical="/settings" />
  <div className="mb-16">
  <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-4">Settings</h1>
  <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">Preferences and privacy controls.</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
  
  {/* General Settings */}
  <section className="space-y-6 flex flex-col md:flex-row gap-12 md:gap-24 items-start">
   <div className="w-full md:w-1/3">
   <h2 className="text-xl font-display font-medium text-foreground tracking-tight mb-2">General</h2>
   <p className="text-sm text-muted-foreground">Select your preferred currency for displaying spare part prices.</p>
   </div>
   
   <div className="w-full md:w-2/3 bg-card border border-border rounded-[2rem] p-8 md:p-10 space-y-8">
   <div className="space-y-6">
    <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-foreground">Currency Override</label>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
     {CURRENCIES.map(c => (
     <button
      key={c.code}
      onClick={() => setCurrency(c.code)}
      className={`p-4 rounded-xl border flex flex-col items-start gap-2 transition-colors ${
      currency === c.code 
       ? 'border-foreground bg-foreground text-background' 
       : 'border-border hover:border-foreground bg-transparent text-foreground'
      }`}
     >
      <span className="font-mono text-xs font-semibold tracking-widest">{c.code}</span>
      <span className="text-sm">{c.label}</span>
     </button>
     ))}
    </div>
    </div>
   </div>
   </div>
  </section>

  <hr className="border-border" />

  {/* Location Settings */}
  <section className="space-y-6 flex flex-col md:flex-row gap-12 md:gap-24 items-start">
   <div className="w-full md:w-1/3 space-y-4">
   <div>
    <h2 className="text-xl font-display font-medium text-foreground tracking-tight mb-2">Location</h2>
    <p className="text-sm text-muted-foreground">Used for discovering nearby service centers and displaying prices in local currency.</p>
   </div>
   <div className="p-4 bg-muted border border-border rounded-xl">
    <h4 className="text-xs font-mono font-semibold tracking-widest uppercase text-muted-foreground mb-2">Privacy Focus</h4>
    <p className="text-xs text-muted-foreground leading-relaxed">
    Precise coordinates are strictly local to your browser session and never stored permanently on any server.
    </p>
   </div>
   </div>
   
   <div className="w-full md:w-2/3 bg-card border border-border rounded-[2rem] p-8 md:p-10 space-y-8">
   <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
    <MapPin className="h-5 w-5 text-muted-foreground" />
    <span className="font-medium text-foreground">Location Access</span>
    </div>
    <div className="flex items-center gap-2">
    {locationStatus === 'Allowed' && <CheckCircle className="h-4 w-4 text-emerald-500" />}
    {(locationStatus === 'Denied' || locationStatus === 'Blocked') && <XCircle className="h-4 w-4 text-rose-500" />}
    <span className="text-sm font-mono tracking-wide px-2 py-1 bg-muted rounded-md border border-border text-foreground">
     {locationStatus}
    </span>
    </div>
   </div>

   {locationStatus === 'Allowed' && location.latitude && (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-border pt-8">
    <div className="flex flex-col gap-1">
     <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Country</span>
     <span className="text-sm font-medium text-foreground">{location.country || 'Detected'}</span>
    </div>
    <div className="flex flex-col gap-1">
     <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">City</span>
     <span className="text-sm font-medium text-foreground">{location.city || 'Detected'}</span>
    </div>
    <div className="flex flex-col gap-1">
     <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Currency</span>
     <span className="text-sm font-medium text-foreground">{location.currency || 'INR'}</span>
    </div>
    <div className="flex flex-col gap-1 col-span-2 md:col-span-3">
     <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">Coordinates</span>
     <span className="text-sm font-medium text-muted-foreground">{location.latitude.toFixed(4)}, {location.longitude?.toFixed(4)}</span>
    </div>
    </div>
   )}

   <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
    {locationStatus === 'Not Requested' && (
    <button onClick={() => { window.scrollTo(0, 0); requestLocation(); }} className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
     <Navigation className="h-4 w-4" /> Enable Location
    </button>
    )}
    
    {locationStatus === 'Denied' && (
    <div className="flex flex-col gap-3">
     <button onClick={() => { window.scrollTo(0, 0); requestLocation(); }} className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
     <Navigation className="h-4 w-4" /> Retry Permission
     </button>
    </div>
    )}

    {locationStatus === 'Blocked' && (
    <div className="p-5 rounded-2xl bg-[rgba(255,107,107,0.06)] border border-[rgba(255,107,107,0.15)] text-[#FF6B6B] flex flex-col gap-2.5 max-w-lg mb-4">
     <div className="flex items-center gap-2 font-semibold text-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]"></span>
      Permission Blocked
     </div>
     <p className="text-xs leading-relaxed text-[#FF6B6B]/80 font-light">
      Please open your browser settings, click on the site permission lock icon next to the address bar, allow location access for this site, then refresh this page to enable proximity-based service center identification.
     </p>
    </div>
    )}

    {locationStatus === 'Allowed' && (
    <>
     <button onClick={refreshLocation} className="px-5 py-2.5 rounded-full border border-border bg-card hover:bg-muted text-foreground text-sm font-medium flex items-center gap-2 transition-colors">
     <RefreshCw className="h-4 w-4" /> Refresh
     </button>
     <button onClick={disableLocation} className="px-5 py-2.5 rounded-full border border-border bg-card hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/20 text-foreground text-sm font-medium flex items-center gap-2 transition-colors">
     Disable
     </button>
    </>
    )}
    
    {locationStatus !== 'Not Requested' && (
    <button onClick={revokeLocation} className="px-5 py-2.5 rounded-full border border-border bg-transparent hover:bg-muted text-muted-foreground text-sm font-medium transition-colors">
     Reset Preference
    </button>
    )}
   </div>
   </div>
  </section>

  </div>
 </div>
 );
}
