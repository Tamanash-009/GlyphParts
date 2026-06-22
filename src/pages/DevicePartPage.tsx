import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDatabaseState } from '../data/database';
import { SEO } from '../components/SEO';
import { useSettings } from '../contexts/SettingsContext';
import { ArrowLeft, Cpu, Smartphone, Battery, Camera, Wrench, ShieldCheck, MapPin } from 'lucide-react';
import { DeviceImage } from '../components/images/DeviceImage';

export function DevicePartPage() {
  const { id, partId } = useParams<{ id: string, partId: string }>();
  const navigate = useNavigate();
  const { phones, parts } = getDatabaseState();
  const { formatPrice } = useSettings();

  const phone = phones.find(p => p.id === id);
  const partNameMap: Record<string, string> = {
    'display': 'Display',
    'battery': 'Battery',
    'mainboard': 'Mainboard',
    'rear-camera': 'Rear Camera',
    'front-camera': 'Front Camera',
    'back-glass': 'Back Glass',
    'fingerprint': 'Fingerprint Sensor',
    'charging-port': 'Charging Port',
  };

  const part = parts.find(p => p.phone_id === id && p.category_id === partId);

  const relatedParts = useMemo(() => {
    if (!phone || !part) return [];
    return parts.filter(p => p.phone_id === phone.id && p.id !== part.id).slice(0, 3);
  }, [phone, part, parts]);

  if (!phone || !part) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
        <SEO title="Part Not Found" />
        <h1 className="text-3xl font-display font-semibold mb-4 text-foreground">Part Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find pricing data for the requested part.</p>
        <button onClick={() => navigate('/devices')} className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium">
          Browse All Devices
        </button>
      </div>
    );
  }

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('mainboard')) return <Cpu className="w-8 h-8 text-blue-500" />;
    if (n.includes('display')) return <Smartphone className="w-8 h-8 text-green-500" />;
    if (n.includes('battery')) return <Battery className="w-8 h-8 text-yellow-500" />;
    if (n.includes('camera')) return <Camera className="w-8 h-8 text-purple-500" />;
    return <Wrench className="w-8 h-8 text-muted-foreground" />;
  };

  const title = `Original ${phone.name} ${part.name} Price in 2024`;
  const description = `Find the official replacement cost for the ${phone.name} ${part.name}. Genuine spare parts pricing with labor costs and nearby authorized service centers.`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the price of the ${phone.name} ${part.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The official replacement price for the ${phone.name} ${part.name} is ${formatPrice(part.price)}. Please note that labor charges and taxes may apply.`
        }
      },
      {
        "@type": "Question",
        "name": `Where can I replace my ${phone.name} ${part.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can get your ${phone.name} ${part.name} replaced at any authorized Nothing service center. Visit our service centers page to find the nearest location.`
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${phone.name} ${part.name}`,
    "image": "https://glyphparts.com/og-image.jpg",
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": "Nothing"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://glyphparts.com/device/${phone.id}/${partId}`,
      "priceCurrency": "INR",
      "price": part.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
      <SEO 
        title={title}
        description={description}
        canonical={`/device/${phone.id}/${partId}`}
        schemas={[faqSchema, productSchema]}
      />

      <button onClick={() => navigate(`/device/${phone.id}`)} className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to {phone.name}
      </button>

      <div className="bg-card border border-border/50 rounded-3xl p-8 mb-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8 lg:gap-12">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          {getIcon(part.name)}
        </div>
        
        <div className="w-full md:w-1/3 aspect-square max-w-[250px] relative z-10">
          <DeviceImage 
            deviceSlug={phone.slug || phone.id.replace('nothing-', '')}
            imageType="perspective"
            alt={`${phone.name} Perspective`}
            className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            containerClassName="w-full h-full bg-transparent"
          />
        </div>

        <div className="flex flex-col flex-1 w-full relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">Original Part</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground leading-tight mb-6">
            {phone.name} <br/> <span className="text-muted-foreground">{part.name}</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-auto border-t border-border/40 pt-6">
            <div className="text-left">
              <p className="text-sm text-muted-foreground mb-1 uppercase tracking-widest font-semibold">Official Price</p>
              <p className="text-4xl md:text-5xl font-mono font-light text-foreground">{formatPrice(part.price).converted || formatPrice(part.price).original}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="bg-muted/30 rounded-2xl p-6 border border-border/40">
          <ShieldCheck className="w-6 h-6 text-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">Genuine Assurance</h3>
          <p className="text-muted-foreground">Prices shown are directly from official channels. Always use authorized centers for replacements to maintain your warranty.</p>
        </div>
        <div className="bg-muted/30 rounded-2xl p-6 border border-border/40">
          <MapPin className="w-6 h-6 text-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">Service Centers</h3>
          <p className="text-muted-foreground">We have mapped all official Nothing repair hubs. Use our locator to find the nearest authorized center to your location.</p>
          <Link to="/service-centers" className="inline-block mt-4 text-primary font-medium hover:underline">Find Nearest Center &rarr;</Link>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-display font-medium mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border border-border/50 rounded-xl p-5">
            <h4 className="font-semibold text-lg mb-2">Does the price include labor charges?</h4>
            <p className="text-muted-foreground">No, the price shown is solely for the component. Authorized service centers will charge an additional service or labor fee.</p>
          </div>
          <div className="border border-border/50 rounded-xl p-5">
            <h4 className="font-semibold text-lg mb-2">Will replacing the {part.name} void my warranty?</h4>
            <p className="text-muted-foreground">If replaced at an official Nothing service center, your warranty will remain intact. Third-party repairs will void it.</p>
          </div>
        </div>
      </div>

      {relatedParts.length > 0 && (
        <div>
          <h2 className="text-2xl font-display font-medium mb-6">Other {phone.name} Parts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedParts.map(rp => (
              <Link key={rp.id} to={`/device/${phone.id}/${rp.name.toLowerCase().replace(/ /g, '-')}`} className="bg-card border border-border/50 p-4 rounded-xl hover:border-border transition-colors group">
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{rp.name}</p>
                <p className="font-mono mt-1">{formatPrice(rp.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
