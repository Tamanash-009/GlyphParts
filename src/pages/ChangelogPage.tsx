import React from 'react';
import { History, CheckCircle2, Sparkles, Rocket } from 'lucide-react';
import { SEO } from '../components/SEO';

export function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
      <SEO title="Changelog" description="Track the evolution, features, and accuracy improvements of GlyphParts." />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center">
          <History className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-display font-medium tracking-tight">Changelog</h1>
      </div>
      
      <p className="text-xl text-muted-foreground font-light mb-16">
        The history of updates, accuracy patches, and feature additions to the GlyphParts archive.
      </p>

      <div className="space-y-16">
        
        {/* v1.0 Release */}
        <section className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden sm:block"></div>
          <div className="sm:pl-10 relative">
            <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-foreground hidden sm:block shadow-[0_0_0_4px_var(--background)]"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
              <h2 className="text-2xl font-display font-medium flex items-center gap-2">
                v1.0 Public Release <Rocket className="w-5 h-5 text-green-500" />
              </h2>
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">June 20, 2026</span>
            </div>

            <p className="text-muted-foreground mb-8">
              The official stable release of GlyphParts. Focused entirely on accuracy, performance, and trust. 
              Built to serve as the definitive independent archive for Nothing and CMF spare parts pricing.
            </p>

            <div className="space-y-6">
              
              <div>
                <h3 className="font-medium text-foreground flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" /> New Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground"><strong>Interactive Search</strong>: Find devices or components instantly with fuzzy-matching, keyboard shortcuts (⌘K), and Web Speech API Voice Search.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground"><strong>Progressive Web App (PWA)</strong>: Fully installable desktop and mobile app with native push-state, standalone UI, and complete offline capability via Service Workers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground"><strong>Device Comparison</strong>: Compare full technical specifications side-by-side.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground"><strong>Service Center Locator</strong>: Privacy-first local calculation to find the absolute nearest official repair center.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-foreground flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Data & Accuracy Improvements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0"></div>
                    <span className="text-muted-foreground">Stripped all hallucinated or "TBD" data, enforcing a strict fallback to "Not Officially Confirmed".</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0"></div>
                    <span className="text-muted-foreground">Updated global pricing logic with real-time multi-currency support without breaking layouts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0"></div>
                    <span className="text-muted-foreground">Implemented the <Link to="/report-price" className="underline underline-offset-2">Report Incorrect Price</Link> pipeline directly into individual components.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
