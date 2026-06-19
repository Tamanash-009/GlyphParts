import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
 return (
 <div className="max-w-4xl mx-auto px-6 pt-32 pb-48 animate-in fade-in duration-700">\n  <SEO title="Page Not Found" />
 <h1 className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-foreground capitalize mb-8">Page Not Found</h1>
 <p className="text-xl text-muted-foreground leading-relaxed mb-16">The page you are looking for does not exist or has been moved.</p>
 
 <div className="p-12 md:p-24 rounded-[3rem] bg-card border border-border flex flex-col items-center text-center justify-center min-h-[40vh]">
 <Link to="/" className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium tracking-tight hover:opacity-80 transition-opacity">
 Return Home
 </Link>
 </div>
 </div>
 );
}
