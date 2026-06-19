export const POPULAR_DEVICES = [
 { id: 'nothing-phone-1', name: 'Phone (1)', subtitle: 'Glyph Interface', image: 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-2', name: 'Phone (2)', subtitle: 'Come to the bright side', image: 'https://images.unsplash.com/photo-1693310052988-cb97fc98b111?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-2a', name: 'Phone (2a)', subtitle: 'Fresh perspective', image: 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-2a-plus', name: 'Phone (2a) Plus', subtitle: 'Extra power', image: 'https://images.unsplash.com/photo-1693310052988-cb97fc98b111?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-3a', name: 'Phone (3a)', subtitle: 'Everyday companion', image: 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-3a-lite', name: 'Phone (3a) Lite', subtitle: 'Essential', image: 'https://images.unsplash.com/photo-1693310052988-cb97fc98b111?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-3a-pro', name: 'Phone (3a) Pro', subtitle: 'Professional grade', image: 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-3', name: 'Phone (3)', subtitle: 'Performance evolved', image: 'https://images.unsplash.com/photo-1693310052988-cb97fc98b111?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-4a', name: 'Phone (4a)', subtitle: 'Next generation', image: 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-phone-4a-pro', name: 'Phone (4a) Pro', subtitle: 'Ultimate experience', image: 'https://images.unsplash.com/photo-1693310052988-cb97fc98b111?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-cmf-phone-1', name: 'CMF Phone 1', subtitle: 'Wonderful by design', image: 'https://images.unsplash.com/photo-1695420967527-fac424bd0d39?q=80&w=600&auto=format&fit=crop' },
 { id: 'nothing-cmf-phone-2-pro', name: 'CMF Phone 2 Pro', subtitle: 'Elevated essential', image: 'https://images.unsplash.com/photo-1693310052988-cb97fc98b111?q=80&w=600&auto=format&fit=crop' },
];

export const LATEST_UPDATES = [
 { id: 'nothing-phone-2', device: 'Phone (2)', part: 'Display Assembly', price_inr: 12076, date: 'June 2026' },
 { id: 'nothing-phone-2a', device: 'Phone (2a)', part: 'Battery', price_inr: 1399, date: 'June 2026' },
 { id: 'nothing-cmf-phone-1', device: 'CMF Phone 1', part: 'Display', price_inr: 3599, date: 'June 2026' },
];

export const FAQS = [
 { q: "Does GlyphParts sell spare parts?", a: "No, GlyphParts is an informational archive. We do not sell products, hardware, components, or perform any repairs. We do not maintain stock information or track inventory. All prices are provided for reference purposes only." },
 { q: "How often are prices updated?", a: "We monitor prices and update them regularly. Prices usually reflect the official service center charges in India, converted using live rates for other regions." },
 { q: "Are these official prices?", a: "The base prices are obtained from official Nothing service documents. However, final charges at a service center may include extra taxes, labor charges, or location-specific fees." },
 { q: "How are international prices calculated?", a: "Prices outside of India are calculated via estimated exchange rates based on the original INR values. They are not direct representations of official pricing in those countries." },
 { q: "Can I locate nearby service centers?", a: "Yes, you can allow location access to automatically find the nearest authorized service center to you from our available database." },
 { q: "Is location access mandatory?", a: "No, you can simply browse the Service Centers directory directly without providing location permissions." }
];

export const SEARCH_INDEX = [
 ...POPULAR_DEVICES.map(d => ({ type: 'device', text: d.name, id: d.id, url: `/device/${d.id}` })),
 ...LATEST_UPDATES.map(u => ({ type: 'part', text: `${u.device} - ${u.part}`, id: `part-${u.id}`, url: `/device/${u.id}` })),
];
