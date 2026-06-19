import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { NOTHING_FAQS } from '../data/database';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export function AboutPage() {
 const [openFaq, setOpenFaq] = useState<number | null>(null);

 return (
 <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-32 animate-in fade-in duration-700">
  <SEO 
  title="About"
  description="Learn about GlyphParts, an independent archive for Nothing and CMF smartphone spare part prices."
  canonical="/about"
  />
 <div className="mb-20">
 <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-foreground mb-8">About</h1>
 <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed max-w-2xl">
 An independent archival tool for Nothing and CMF devices.
 </p>
 </div>

 <div className="space-y-32">
 <section>
 <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground mb-8">Mission & Vision</h2>
 <div className="prose dark:prose-invert prose-lg max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground">
 <p>
 <strong>Our Mission:</strong> To provide a transparent, trustworthy, and organized database of replacement parts and repair ecosystem pricing for the community.
 </p>
 <p>
 <strong>Our Vision:</strong> We foresee a hardware ecosystem where independent owners have instant access to accurate pricing schemas, helping to bridge the gap between consumers and service centers.
 </p>
 </div>
 </section>

 <section>
 <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground mb-8">How Pricing Works</h2>
 <div className="prose dark:prose-invert prose-lg max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground">
 <p>
 We index official raw component pricing from public technical service center lists. Unless specified otherwise, our prices represent the <em>hardware part only</em> structure. Local service center labor charges (typically ranging from ₹350 - ₹1500) and regional VAT/GST taxes are universally excluded from display to maintain an accurate cross-comparison baseline.
 </p>
 </div>
 </section>

 <section>
 <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground mb-8">Ecosystem Details</h2>
 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <li className="p-6 rounded-[1.5rem] bg-card border border-border flex flex-col justify-between">
 <span className="text-sm font-mono tracking-[0.2em] text-muted-foreground uppercase mb-2">Supported Devices</span>
 <span className="font-medium text-foreground">Phone (1), Phone (2), Phone (3), Phone (2a), Phone (2a) Plus, Phone (3a), Phone (3a) Pro, Phone (4a), Phone (4a) Pro, CMF Phone 1, CMF Phone 2 Pro</span>
 </li>
 <li className="p-6 rounded-[1.5rem] bg-card border border-border flex flex-col justify-between">
 <span className="text-sm font-mono tracking-[0.2em] text-muted-foreground uppercase mb-2">Supported Regions</span>
 <span className="font-medium text-foreground">Primary focus on India operations. Additional indices support EUR and USD conversions functionally.</span>
 </li>
 </ul>
 </section>

 <section>
 <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground mb-8">Privacy Philosophy</h2>
 <div className="p-8 md:p-12 rounded-[2.5rem] bg-card border border-border">
 <p className="text-lg font-light leading-relaxed text-muted-foreground">
 We do not collect cookies. We do not track profiles. Operations such as finding the nearest service center process your geolocation mathematically purely on the client-side without storing tracking logs. Our <Link to="/privacy" className="text-foreground underline underline-offset-4">Privacy Philosophy</Link> guarantees absolute anonymity.
 </p>
 </div>
 </section>
 
 <section>
 <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground mb-8">Legal Disclaimer</h2>
 <div className="p-8 md:p-12 rounded-[2.5rem] bg-card border border-border">
 <p className="text-lg font-light leading-relaxed text-muted-foreground">
 GlyphParts is an <strong>independent informational archive</strong> dedicated to Nothing and CMF devices. We are not affiliated with, endorsed by, or sponsored by Nothing Technology Limited. Nothing, CMF and related trademarks belong to their respective owners. <Link to="/disclaimer" className="text-foreground underline underline-offset-4">Read full disclaimer.</Link>
 </p>
 </div>
 </section>

 <section>
 <h2 className="text-3xl font-display font-semibold tracking-tight text-foreground mb-8">Frequently Asked Questions</h2>
 <div className="flex flex-col w-full gap-4">
 {NOTHING_FAQS.map((faq, idx) => (
 <div key={idx} className="bg-card border border-border rounded-[1.5rem] overflow-hidden">
 <button 
  onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
  className="w-full text-left p-6 md:p-8 flex justify-between items-center outline-none"
 >
  <span className="text-lg md:text-xl font-medium tracking-tight pr-6 text-foreground">{faq.q}</span>
  <ChevronDown className={`h-6 w-6 text-muted-foreground shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] ${openFaq === idx ? 'rotate-180' : ''}`} />
 </button>
 <div 
  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] ${openFaq === idx ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
 >
  <p className="px-6 md:px-8 pb-6 md:pb-8 text-lg font-light text-muted-foreground md:leading-relaxed -mt-2">
  {faq.a}
  </p>
 </div>
 </div>
 ))}
 </div>
 </section>
 </div>
 </div>
 );
}
