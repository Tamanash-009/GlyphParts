import React from 'react';
import { SEO } from '../components/SEO';

export function LegalLayout({ title, lastUpdated, children }: { title: string, lastUpdated: string, children: React.ReactNode }) {
 return (
 <div className="max-w-3xl mx-auto px-6 pt-24 md:pt-32 pb-32 animate-in fade-in duration-700">
  <SEO title={title} description={`${title} for GlyphParts.`} canonical={`/${title.split(' ')[0].toLowerCase()}`} />
 <div className="mb-16">
 <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-4">{title}</h1>
 <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">Last Updated: {lastUpdated}</p>
 </div>
 <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-a:text-foreground prose-p:font-light prose-p:leading-relaxed prose-li:font-light prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
 {children}
 </div>
 </div>
 );
}

export function PrivacyPage() {
 return (
 <LegalLayout title="Privacy Policy" lastUpdated="October 2023">
 <h2>1. Introduction</h2>
 <p>
 At GlyphParts, we respect your privacy and are committed to protecting any personal information you may provide while using our website. This Privacy Policy details our data collection and usage practices.
 </p>
 
 <h2>2. Data Collection</h2>
 <p>
 We do not collect any personally identifiable information (PII) from our visitors. Our website functions as a static information archive. We do not require account registration, and we do not use tracking cookies for advertising purposes.
 </p>

 <h2>3. Local Storage & Themes</h2>
 <p>
 To enhance your browsing experience, we use your browser's local storage solely to remember your preferred theme (Light or Dark mode). This data never leaves your device and is not transmitted to our servers.
 </p>

 <h2>4. Location Access</h2>
 <p>
 For the Service Centers feature, your browser may request location permissions to calculate the distance to nearby authorized repair facilities. This calculation is done locally on your device or via a temporary API query. Your precise location is never logged, stored, or associated with any profile.
 </p>

 <h2>5. Search & Analytics</h2>
 <p>
 We use basic, privacy-focused analytics to monitor overall traffic patterns and search queries to improve our database. These tools do not collect individual visitor profiles or IP addresses.
 </p>

 <h2>6. Changes to this Policy</h2>
 <p>
 We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date. For inquiries, you can contact us via our Contact Page.
 </p>
 </LegalLayout>
 );
}

export function TermsPage() {
 return (
 <LegalLayout title="Terms of Service" lastUpdated="October 2023">
 <h2>1. Acceptance of Terms</h2>
 <p>
 By accessing and using GlyphParts, you accept and agree to be bound by the terms and provisions of this agreement.
 </p>

 <h2>2. Use of Information</h2>
 <p>
 All information provided on GlyphParts, including spare part prices, device specifications, and availability, is provided for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied.
 </p>

 <h2>3. Independence</h2>
 <p>
 GlyphParts is an independent information archive. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Nothing Technology Limited, or any of its subsidiaries or its affiliates.
 </p>
 
 <h2>4. Intellectual Property</h2>
 <p>
 The names "Nothing", "CMF", and any related product names, logos, or brand identities are the property of their respective owners. Their use on this website is strictly for identification and informational purposes.
 </p>

 <h2>5. Limitation of Liability</h2>
 <p>
 Under no circumstances shall GlyphParts be liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising out of or in connection with your use of the site or the information provided.
 </p>
 </LegalLayout>
 );
}

export function DisclaimerPage() {
 return (
 <LegalLayout title="Disclaimer" lastUpdated="June 2026">
 <h2>Independent Archive</h2>
 <p>
 GlyphParts is an independent informational archive dedicated to Nothing and CMF devices.
 </p>
 <p>
 GlyphParts is not affiliated with, endorsed by, or sponsored by Nothing Technology Limited.
 </p>
 <p>
 Nothing, CMF and related trademarks belong to their respective owners.
 </p>

 <h2>Pricing & Availability</h2>
 <p>
 Prices are provided for informational purposes only and may vary between regions and service centers.
 </p>
 <p>
 GlyphParts does not sell spare parts and does not track stock availability.
 </p>
 </LegalLayout>
 );
}
