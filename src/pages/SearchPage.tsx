import React from 'react';
import { SearchOverlay } from '../components/SearchOverlay';
import { SEO } from '../components/SEO';

export function SearchPage() {
 return (
 <div className="pt-10 md:pt-16 px-6 max-w-4xl mx-auto min-h-[60vh] flex flex-col items-center">\n  <SEO title="Search Parts" description="Search for specific Nothing and CMF spare parts." canonical="/search" />
 <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-6 text-center">Search Parts & Devices</h1>
 <p className="text-lg text-muted-foreground mb-8 max-w-2xl text-center leading-relaxed">
 Find pricing for a specific component, check device details, or locate your nearest service center.
 </p>
 <div className="w-full">
 <SearchOverlay />
 </div>
 </div>
 );
}
