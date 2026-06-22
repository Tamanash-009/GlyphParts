import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Github, AlertTriangle } from 'lucide-react';
import { SEO } from '../components/SEO';

export function ContactPage() {
 return (
 <div className="pt-10 md:pt-16 pb-24 px-6 max-w-4xl mx-auto">\n  <SEO title="Contact" description="Contact us to report bugs, provide feedback, or request new features." canonical="/contact" />
 <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-6">Contact & Feedback</h1>
 <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
 We're an independent community project. Help us keep the data accurate, report bugs, or request new features.
 </p>

 <div className="grid md:grid-cols-2 gap-6">
 <a href="mailto:support@glyphparts.example.com" className="p-8 rounded-[2rem] bg-card border border-border hover:border-foreground hover:bg-accent transition-colors flex flex-col items-start gap-6 group">
 <div className="p-4 rounded-full bg-muted group-hover:scale-110 transition-transform duration-300">
 <Mail className="h-6 w-6 text-foreground" />
 </div>
 <div>
 <h3 className="text-2xl font-display font-medium text-foreground mb-2">Email Us</h3>
 <p className="text-muted-foreground mb-4">Direct inquiries, partnerships, or support.</p>
 <span className="font-medium text-foreground group-hover:underline">support@glyphparts.app</span>
 </div>
 </a>

 <Link to="/report-price" className="p-8 rounded-[2rem] bg-card border border-border hover:border-foreground hover:bg-accent transition-colors flex flex-col items-start gap-6 group">
 <div className="p-4 rounded-full bg-muted group-hover:scale-110 transition-transform duration-300">
 <AlertTriangle className="h-6 w-6 text-foreground" />
 </div>
 <div>
 <h3 className="text-2xl font-display font-medium text-foreground mb-2">Report Incorrect Price</h3>
 <p className="text-muted-foreground">Noticed a discrepancy in our data? Let us know so we can verify and update it.</p>
 </div>
 </Link>

 <a href="#" className="p-8 rounded-[2rem] bg-card border border-border hover:border-foreground hover:bg-accent transition-colors flex flex-col items-start gap-6 group md:col-span-2 flex-row items-center justify-between">
 <div className="flex items-center gap-6">
 <div className="p-4 rounded-full bg-muted group-hover:scale-110 transition-transform duration-300">
 <Github className="h-6 w-6 text-foreground" />
 </div>
 <div>
 <h3 className="text-2xl font-display font-medium text-foreground mb-1">GitHub Repository</h3>
 <p className="text-muted-foreground">Contribute to the code, report bugs, or request features.</p>
 </div>
 </div>
 </a>
 </div>
 </div>
 );
}
