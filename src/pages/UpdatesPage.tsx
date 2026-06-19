import React from 'react';
import { Link } from 'react-router-dom';
import { LATEST_UPDATES } from '../data';
import { useSettings } from '../contexts/SettingsContext';
import { SEO } from '../components/SEO';

export function UpdatesPage() {
 const { formatPrice } = useSettings();

 return (
 <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 pb-32 animate-in fade-in duration-700">\n  <SEO title="Latest Price Updates" description="Track the latest official replacement part price changes for Nothing and CMF devices." canonical="/updates" />
 <div className="mb-16">
 <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-foreground mb-6">Price Updates</h1>
 <p className="text-xl text-muted-foreground max-w-2xl">
 Track the latest official replacement part price changes across our database.
 </p>
 </div>

 <div className="space-y-4">
 {LATEST_UPDATES.map((update, idx) => {
 const pricing = formatPrice(update.price_inr);
 return (
 <div key={`${update.id}-${idx}`} className="p-8 md:p-10 rounded-[2rem] border border-border bg-card hover:border-foreground hover:bg-accent transition-colors flex flex-col gap-6 group">
 <Link to={`/device/${update.id}`} className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
 <div>
 <span className="inline-block px-3 py-1 bg-muted border border-border rounded-full font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6 group-hover:text-foreground transition-colors">{update.date}</span>
 <h4 className="text-2xl font-display font-medium text-foreground mb-2">{update.device}</h4>
 <p className="text-lg text-muted-foreground">{update.part}</p>
 </div>
 <div className="flex flex-col md:items-end gap-1 self-start md:self-center">
  {pricing.converted && (
  <span className="text-3xl md:text-4xl font-display font-medium tracking-tighter text-foreground">
  {pricing.converted}
  </span>
  )}
  <span className={`font-display tracking-tight text-muted-foreground ${pricing.converted ? 'text-lg' : 'text-3xl md:text-4xl text-foreground'}`}>
  {pricing.converted ? `≈ ${pricing.original}` : pricing.original}
  </span>
 </div>
 </Link>
 <div className="border-t border-border/50 pt-4 w-full flex justify-end">
  <button 
  onClick={(e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Incorrect Price Report: ${update.device} - ${update.part}`);
    const body = encodeURIComponent(`Device: ${update.device}\nPart: ${update.part}\n\nSuggested Correct Price:\nSource Link / Proof:\nAdditional Notes:\n`);
    window.location.href = `mailto:update@glyphparts.com?subject=${subject}&body=${body}`;
  }}
  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
  >
   Report Incorrect Price
  </button>
 </div>
 </div>
 )})}
 </div>
 </div>
 );
}
