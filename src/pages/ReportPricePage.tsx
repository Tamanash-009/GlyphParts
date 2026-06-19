import React, { useState } from 'react';
import { AlertCircle, Send, CheckCircle2 } from 'lucide-react';

export function ReportPricePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const device = formData.get('device');
    const component = formData.get('component');
    const reportedPrice = formData.get('reportedPrice');
    const comments = formData.get('comments');

    const subject = encodeURIComponent(`Price Report: ${device} - ${component}`);
    const body = encodeURIComponent(`Device: ${device}\nComponent: ${component}\nQuoted Price: ${reportedPrice}\n\nAdditional Comments:\n${comments}`);
    
    window.location.href = `mailto:update@glyphparts.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-display font-medium mb-4">Report Initiated</h1>
        <p className="text-muted-foreground mb-8">
          Your default email client has been opened with the pre-filled report. Thank you for contributing to the accuracy of GlyphParts!
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 border border-border rounded-full hover:bg-muted transition-colors font-medium text-sm"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-display font-medium tracking-tight">Report Price</h1>
      </div>

      <p className="text-muted-foreground mb-8">
        If you received a quotation from an authorized service center that differs from our database, please report it below. We rely on community verified data to keep prices accurate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 md:p-8 rounded-3xl border border-border">
        <div>
          <label htmlFor="device" className="block text-sm font-medium mb-2">Device Model</label>
          <input 
            type="text" 
            id="device" 
            name="device"
            required
            placeholder="e.g., Nothing Phone (2)"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-foreground transition-colors"
          />
        </div>

        <div>
          <label htmlFor="component" className="block text-sm font-medium mb-2">Component</label>
          <input 
            type="text" 
            id="component" 
            name="component"
            required
            placeholder="e.g., Motherboard 12GB+256GB"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-foreground transition-colors"
          />
        </div>

        <div>
          <label htmlFor="reportedPrice" className="block text-sm font-medium mb-2">Quoted Price (Local Currency)</label>
          <input 
            type="text" 
            id="reportedPrice" 
            name="reportedPrice"
            required
            placeholder="e.g., ₹24,999 or $300"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-foreground transition-colors"
          />
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium mb-2">Additional Context (Optional)</label>
          <textarea 
            id="comments" 
            name="comments"
            rows={4}
            placeholder="Did this include labor or tax? Which service center?"
            className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:border-foreground transition-colors resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full bg-foreground text-background font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Generate Email Report <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
