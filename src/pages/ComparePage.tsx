import React from 'react';
import { CompareTool } from '../components/CompareTool';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function ComparePage() {
 const [searchParams] = useSearchParams();
 const id1 = searchParams.get('id1') || undefined;
 const id2 = searchParams.get('id2') || undefined;

 return (
 <div className="pt-10 md:pt-16 px-6 max-w-7xl mx-auto">\n  <SEO title="Compare Repair Costs" description="Select two devices to compare their component repair costs side-by-side." canonical="/compare" />
 <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-6">Compare Parts</h1>
 <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed">
 Select two devices to compare the official repair costs for their various components side-by-side. Check which device is more budget-friendly to maintain.
 </p>
 <CompareTool initialPhoneAId={id1} initialPhoneBId={id2} />
 </div>
 );
}
