import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SearchOverlay } from '../components/SearchOverlay';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import { POPULAR_DEVICES, LATEST_UPDATES, FAQS } from '../data';
import { useSettings } from '../contexts/SettingsContext';
import { SEO } from '../components/SEO';
import { OptimizedImage } from '../components/OptimizedImage';
import { getDatabaseState } from '../data/database';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useUser } from '../contexts/UserContext';

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { formatPrice, locationStatus, nearestCenters, requestLocation } = useSettings();
  const { parts, phones } = getDatabaseState();
  const { recentlyViewed } = useUser();
  
  const featuredDevice = POPULAR_DEVICES.find(d => d.id === 'nothing-phone-3') || POPULAR_DEVICES[0];
  const featuredPartsCount = parts.filter(p => p.phone_id === featuredDevice.id).length;

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  const imgY1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const imgY2 = useTransform(scrollY, [0, 1000], [0, -30]);

  const recentPhones = recentlyViewed
    .map(id => phones.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .slice(0, 3); // Show max 3 on home

  return (
   <div className="bg-background text-foreground transition-colors duration-300">
   <SEO 
    title="Home"
    description="Discover original spare part prices for every Nothing and CMF smartphone. Fast, transparent pricing and nearest authorized service center locations."
    canonical="/"
   />

   {/* Hero Section */}
   <section className="relative min-h-[90vh] md:min-h-[85vh] lg:h-[800px] flex flex-col lg:flex-row w-full overflow-hidden border-b border-border">
    {/* Left Column: Branding and Text */}
    <motion.div 
      style={{ y: heroY, opacity: heroOpacity }}
      className="flex-1 flex flex-col items-start justify-center pt-[140px] pb-[80px] lg:py-0 px-8 lg:px-16 xl:px-24 relative z-10 text-left bg-background w-full"
    >
      <div className="w-full max-w-2xl">
        <span className="text-xs md:text-sm font-mono tracking-widest text-muted-foreground uppercase mb-6 md:mb-8 block">Transparent Pricing. Editorial Layout.</span>
        <h1 className="hero-title text-fluid-4xl md:text-[4rem] lg:text-[5.5rem] tracking-tighter text-foreground leading-[0.95] font-medium" style={{ textWrap: 'balance' }}>
          Original Nothing
          <span className="block text-muted-foreground mt-2">Spare Parts</span>
        </h1>
        <p className="mt-8 md:mt-10 text-fluid-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl font-light">
          Search display, battery, motherboard, and camera components for every Nothing and CMF smartphone. Access repair ecosystem pricing instantly.
        </p>
        
        <div className="w-full max-w-xl mt-12 bg-background relative z-20">
          <SearchOverlay />
        </div>
      </div>
    </motion.div>

    {/* Right Column: 3D Render Image */}
    <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
       className="flex-1 w-full relative h-[50vh] lg:h-full lg:min-h-full bg-muted"
    >
      <OptimizedImage 
        src="https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=2000&auto=format&fit=crop" 
        alt="Device Internal Ecosystem Render" 
        className="w-full h-full object-cover scale-[1.02] filter brightness-95 dark:brightness-[0.85]"
      />
      {/* Editorial Image Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background/40 to-transparent mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none"></div>
    </motion.div>
   </section>

   {/* Recently Viewed */}
   {recentPhones.length > 0 && (
    <section className="max-w-7xl mx-auto px-6 py-[80px]">
     <div className="flex flex-col mb-12">
      <span className="section-label mb-4">Recently Viewed</span>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {recentPhones.map(phone => (
       <Link key={phone.id} to={`/device/${phone.id}`} className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-foreground/30 transition-colors">
        <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center p-2">
         {phone.official_image_source ? (
          <OptimizedImage src={phone.official_image_source} alt={phone.name} className="w-full h-full object-contain" />
         ) : (
          <OptimizedImage src={phone.image} alt={phone.name} className="w-full h-full object-contain" />
         )}
        </div>
        <div className="flex-1">
         <h4 className="font-medium text-foreground tracking-tight">{phone.name}</h4>
         <span className="text-xs text-muted-foreground">View Again →</span>
        </div>
       </Link>
      ))}
     </div>
    </section>
   )}

   {/* Featured Device Section */}
   <section className="max-w-7xl mx-auto px-6 py-[120px] md:pt-[40px]">
   <div className="flex flex-col mb-16">
    <span className="section-label mb-4">Featured Device</span>
   </div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
    <motion.div 
      style={{ y: imgY1 }}
      className="w-full aspect-[4/5] rounded-[32px] overflow-hidden bg-muted relative elevation-subtle hover-lift"
    >
      <OptimizedImage 
        src={featuredDevice.image} 
        alt={featuredDevice.name} 
        className="w-full h-full object-cover" 
        loading="lazy" 
      />
    </motion.div>
    <div className="flex flex-col items-start gap-8">
     <div>
      <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-4">{featuredDevice.name}</h2>
      <p className="text-xl md:text-2xl text-muted-foreground font-light">{featuredDevice.subtitle}</p>
     </div>
     
     <div className="flex flex-col gap-4 py-8 border-y border-border w-full">
      <div className="flex justify-between items-center text-lg">
       <span className="text-muted-foreground">Release Year</span>
       <span className="font-medium">2026</span>
      </div>
      <div className="flex justify-between items-center text-lg">
       <span className="text-muted-foreground">Indexed Parts</span>
       <span className="font-medium">{featuredPartsCount > 0 ? `${featuredPartsCount}+` : 'Coming Soon'}</span>
      </div>
     </div>
     
     <Link to={`/device/${featuredDevice.id}`} className="inline-flex flex-row items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-[1.02] transition-transform duration-300 shadow-xl shadow-foreground/10">
      Explore Device <ArrowRight className="h-5 w-5" />
     </Link>
    </div>
   </div>
  </section>

  {/* Popular Devices - Magazine Grid */}
  <section className="max-w-[1400px] mx-auto px-6 py-[120px] border-t border-border/50">
   <div className="flex flex-col items-center text-center mb-24">
    <span className="section-label mb-6">Popular Devices</span>
    <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-foreground max-w-xl" style={{ textWrap: 'balance' }}>
     Explore the ecosystem parts and pricing.
    </h2>
   </div>
   
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
    {POPULAR_DEVICES.slice(0, 3).map((device) => (
     <Link key={device.id} to={`/device/${device.id}`} className="group flex flex-col gap-8 flex-1">
      <div className="w-full aspect-[3/4] rounded-[32px] overflow-hidden bg-card border border-border/50 relative elevation-subtle hover-lift">
       <OptimizedImage 
         src={device.image} 
         alt={device.name} 
         className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
         loading="lazy" 
       />
      </div>
      <div className="flex justify-between items-end px-2">
       <div className="flex flex-col">
        <span className="text-2xl font-display font-medium tracking-tight text-foreground">{device.name}</span>
        <span className="text-base text-muted-foreground mt-2 font-light">{device.subtitle}</span>
       </div>
       <ArrowRight className="h-6 w-6 text-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
      </div>
     </Link>
    ))}
   </div>
   
   <div className="flex justify-center mt-20">
    <Link to="/devices" className="text-lg font-medium text-foreground hover:text-muted-foreground transition-colors underline underline-offset-[8px] decoration-border hover:decoration-current">
     View All Devices
    </Link>
   </div>
  </section>

  {/* A Series Showcase (Alternating Layout) */}
  <section className="max-w-7xl mx-auto px-6 py-[120px]">
   <div className="flex flex-col mb-20 md:mb-32">
    <span className="section-label mb-4">A Series Showcase</span>
   </div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
    <div className="flex flex-col items-start gap-8 md:order-2">
     <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight">Phone (3a)</h2>
     <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
      Balanced performance. Professional camera system. An affordable repair ecosystem designed for longevity.
     </p>
     <Link to={`/device/nothing-phone-3a`} className="mt-4 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors">
      View Parts →
     </Link>
    </div>
    <motion.div 
      style={{ y: imgY2 }}
      className="md:order-1 w-full aspect-square rounded-[32px] overflow-hidden bg-card border border-border elevation-subtle flex items-center justify-center p-[20px] sm:p-[40px] hover-lift"
    >
      <OptimizedImage src="https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=800&auto=format&fit=crop" alt="Phone 3a" className="w-full h-full object-cover rounded-[20px]" loading="lazy" />
    </motion.div>
   </div>
  </section>

  {/* CMF Collection (Alternating Layout) */}
  <section className="max-w-7xl mx-auto px-6 py-[120px]">
   <div className="flex flex-col mb-20 md:mb-32">
    <span className="section-label mb-4">CMF Collection</span>
   </div>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
    <div className="flex flex-col items-start gap-8">
     <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight">CMF Phone 2 Pro</h2>
     <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
      Modular design meets sophisticated aesthetics. Incredible value with highly accessible and affordable replacement components.
     </p>
     <Link to={`/device/nothing-cmf-phone-2-pro`} className="mt-4 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors">
      Explore →
     </Link>
    </div>
    <div className="w-full aspect-square rounded-[32px] overflow-hidden bg-card border border-border elevation-subtle flex items-center justify-center p-[20px] sm:p-[40px] hover-lift">
      <OptimizedImage src="https://images.unsplash.com/photo-1693310052988-cb97fc98b111?q=80&w=800&auto=format&fit=crop" alt="CMF Phone 2 Pro" className="w-full h-full object-cover rounded-[20px]" loading="lazy" />
    </div>
   </div>
  </section>

  {/* Latest Price Updates */}
  <section className="bg-card w-full py-[120px] border-y border-border">
   <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
     <div>
      <span className="section-label mb-6 block">Latest Updates</span>
      <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-foreground">Pricing changes</h2>
     </div>
     <Link to="/updates" className="text-lg font-medium tracking-tight hover:text-muted-foreground transition-colors underline underline-offset-[8px] decoration-border hover:decoration-current">
      View All Updates
     </Link>
    </div>
    
    <div className="grid grid-cols-1 gap-6">
     {LATEST_UPDATES.map((update, index) => {
      const pricing = formatPrice(update.price_inr);
      return (
       <Link key={`${update.id}-${index}`} to={`/device/${update.id}`} className="group p-[40px] rounded-[32px] border border-border bg-background hover:border-foreground/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-8 hover-lift elevation-subtle">
        <div className="flex flex-col gap-4">
         <span className="font-dot uppercase tracking-[0.2em] text-xs text-muted-foreground">{update.date}</span>
         <div>
          <h4 className="text-2xl font-display font-medium text-foreground mb-1">{update.device}</h4>
          <p className="text-lg text-muted-foreground font-light">{update.part}</p>
         </div>
        </div>
        <div className="flex flex-col md:items-end">
         <span className={`font-display font-medium tracking-tight ${pricing.converted ? 'text-3xl lg:text-4xl text-foreground' : 'text-3xl lg:text-4xl text-foreground'}`}>
          {pricing.converted || pricing.original}
         </span>
         {pricing.converted && (
          <span className="mt-2 text-muted-foreground font-light text-lg">
           ≈ {pricing.original}
          </span>
         )}
        </div>
       </Link>
      )
     })}
    </div>
   </div>
  </section>

  {/* Compare Devices */}
  <section className="max-w-7xl mx-auto px-6 py-[120px]">
   <div className="p-[60px] md:p-[80px] rounded-[32px] bg-[#8e8787] text-background flex flex-col items-center text-center elevation-subtle">
    <span className="section-label !text-muted mb-6 text-opacity-70 block">Compare Devices</span>
    <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-8">Not sure which to fix?</h2>
    <p className="text-xl text-muted/80 font-light max-w-2xl mb-12">
     Compare repair costs side-by-side to make the most cost-effective decision regarding your devices.
    </p>
    <Link to="/compare" className="px-10 py-5 bg-background text-foreground rounded-full text-lg font-medium hover:scale-[1.02] transition-transform duration-300">
     Compare Repair Costs
    </Link>
   </div>
  </section>

  {/* Service Centers */}
  <section className="max-w-7xl mx-auto px-6 py-[120px]">
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
    <div>
     <span className="section-label mb-6 block">Service Centers</span>
     <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-8">
      Find official repair hubs.
     </h2>
     <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12">
      Locate authorized Nothing and CMF repair centers near your current location. We securely route your location to Google Maps API strictly for local proximity filtering.
     </p>
     
     {locationStatus === 'Allowed' && nearestCenters.length > 0 ? (
      <Link to="/centers" className="px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors inline-block">
       View {nearestCenters.length} Nearby Centers
      </Link>
     ) : (
      <button onClick={requestLocation} className="px-8 py-4 rounded-full bg-foreground text-background font-medium hover:scale-[1.02] transition-transform duration-300">
       Allow Location Access
      </button>
     )}
    </div>
    
    <div className="w-full aspect-square md:aspect-[4/3] rounded-[32px] border border-border bg-card overflow-hidden elevation-subtle relative flex items-center justify-center p-8 hover-lift">
      {/* Decorative Map / Grid Graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="relative z-10 w-full max-w-sm">
       {locationStatus === 'Allowed' && nearestCenters.length > 0 ? (
        <div className="p-[40px] rounded-[24px] bg-background border border-border shadow-lg">
         <span className="font-dot uppercase text-xs text-muted-foreground mb-4 block">Nearest Center</span>
         <h4 className="text-xl font-display font-medium text-foreground mb-3">{nearestCenters[0].name}</h4>
         <p className="text-muted-foreground font-light text-sm mb-6 pb-6 border-b border-border">{nearestCenters[0].address}</p>
         <div className="flex justify-between items-center text-sm font-medium">
          <span>{nearestCenters[0].distance?.toFixed(1)} km</span>
          <Link to="/centers" className="text-foreground hover:opacity-70">Details →</Link>
         </div>
        </div>
       ) : (
        <div className="p-[40px] rounded-[24px] bg-background border border-border flex flex-col items-center text-center gap-4 shadow-lg">
         <MapPin className="h-8 w-8 text-muted-foreground" />
         <span className="text-muted-foreground font-light">Location required for proximate results</span>
        </div>
       )}
      </div>
    </div>
   </div>
  </section>

  {/* FAQ */}
  <section className="bg-card w-full py-[120px] border-t border-border">
   <div className="max-w-4xl mx-auto px-6">
    <span className="section-label mb-6 block text-center">FAQ</span>
    <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-foreground text-center mb-20">
     Common questions
    </h2>
    
    <div className="flex flex-col gap-4">
     {FAQS.map((faq, idx) => (
      <div key={idx} className="border border-border rounded-[24px] bg-background overflow-hidden transition-colors elevation-subtle">
       <button 
        onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
        className="w-full text-left p-[32px] md:p-[40px] flex justify-between items-center outline-none hover:bg-muted/50 transition-colors"
       >
        <span className="text-lg md:text-xl font-display font-medium tracking-tight pr-6 text-foreground">{faq.q}</span>
        <ChevronDown className={`h-6 w-6 text-muted-foreground shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === idx ? 'rotate-180' : ''}`} />
       </button>
       <div 
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === idx ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
       >
        <p className="px-[32px] md:px-[40px] pb-[32px] md:pb-[40px] text-lg font-light text-muted-foreground leading-relaxed">
         {faq.a}
        </p>
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>

  {/* About Mission */}
  <section className="max-w-4xl mx-auto px-6 py-[120px] text-center">
   <span className="section-label mb-8 block">Our Mission</span>
   <div className="text-2xl md:text-4xl text-muted-foreground font-light leading-snug space-y-8 max-w-3xl mx-auto" style={{ textWrap: 'balance' }}>
    <p>
     <span className="text-foreground font-medium">GlyphParts</span> is an independent archive dedicated to Nothing and CMF hardware.
    </p>
    <p>
     We provide a fast, transparent way to find original spare part prices to support the right to repair and extend device longevity.
    </p>
   </div>
   <Link to="/about" className="inline-block mt-16 px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-colors">
    Read Full Story
   </Link>
  </section>
  </div>
 );
}
