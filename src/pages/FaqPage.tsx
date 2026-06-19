import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FaqPage() {
  const faqData = [
    {
      q: "Where do these prices come from?",
      a: "The prices listed on GlyphParts are crowdsourced and aggregated from official out-of-warranty repair quotations, verified community reports, and publicly available service center data. They serve as an estimated baseline."
    },
    {
      q: "Does this include labor and tax?",
      a: "No. The prices shown are for the spare parts only. Service centers typically charge an additional inspection/labor fee (usually ₹300-₹500 or equivalent) plus applicable taxes (like 18% GST in India)."
    },
    {
      q: "Can I buy parts directly from here?",
      a: "No. GlyphParts is strictly an informational index and archive. We do not sell parts. You must visit an authorized service center to purchase and install original components."
    },
    {
      q: "I found a price discrepancy. What should I do?",
      a: "If you have recently visited a service center and received a quotation that differs from our database, please help the community by reporting it."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          }))
        })}
      </script>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-display font-medium tracking-tight">FAQ</h1>
      </div>
      
      <p className="text-xl text-muted-foreground font-light mb-12">
        Frequently asked questions about GlyphParts and independent repairing.
      </p>

      <div className="space-y-8">
        <div className="bg-card p-6 md:p-8 rounded-3xl border border-border">
          <h3 className="text-lg font-medium mb-3">Where do these prices come from?</h3>
          <p className="text-muted-foreground leading-relaxed">
            The prices listed on GlyphParts are crowdsourced and aggregated from official out-of-warranty repair quotations, verified community reports, and publicly available service center data. They serve as an estimated baseline.
          </p>
        </div>

        <div className="bg-card p-6 md:p-8 rounded-3xl border border-border">
          <h3 className="text-lg font-medium mb-3">Does this include labor and tax?</h3>
          <p className="text-muted-foreground leading-relaxed">
            No. The prices shown are for the spare parts only. Service centers typically charge an additional inspection/labor fee (usually ₹300-₹500 or equivalent) plus applicable taxes (like 18% GST in India).
          </p>
        </div>

        <div className="bg-card p-6 md:p-8 rounded-3xl border border-border">
          <h3 className="text-lg font-medium mb-3">Can I buy parts directly from here?</h3>
          <p className="text-muted-foreground leading-relaxed">
            No. GlyphParts is strictly an informational index and archive. We do not sell parts. You must visit an authorized service center to purchase and install original components.
          </p>
        </div>

        <div className="bg-card p-6 md:p-8 rounded-3xl border border-border">
          <h3 className="text-lg font-medium mb-3">I found a price discrepancy. What should I do?</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have recently visited a service center and received a quotation that differs from our database, please help the community by reporting it.
          </p>
          <Link to="/report-price" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity">
            Report Incorrect Price <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
