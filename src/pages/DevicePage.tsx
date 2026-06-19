import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DeviceDetail } from '../components/DeviceDetail';
import { getDatabaseState } from '../data/database';
import { SEO } from '../components/SEO';
import { useSettings } from '../contexts/SettingsContext';
import { useUser } from '../contexts/UserContext';
import { EXCHANGE_RATES } from '../data/serviceCenters';

export function DevicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { phones, parts } = getDatabaseState();
  const { currency } = useSettings();
  const { addRecentlyViewed } = useUser();
  const phone = phones.find(p => p.id === id);

  useEffect(() => {
    if (id && phone) {
      addRecentlyViewed(id);
    }
  }, [id, phone, addRecentlyViewed]);

  const lowestPrice = useMemo(() => {
  if (!phone) return null;
  const phoneParts = parts.filter(p => p.phone_id === phone.id);
  if (phoneParts.length === 0) return null;
  const lowestInr = Math.min(...phoneParts.map(p => p.price));
  
  if (currency === 'INR') return lowestInr;
  const rate = EXCHANGE_RATES[currency as keyof typeof EXCHANGE_RATES] || 1;
  return Math.round(lowestInr * rate);
 }, [phone, parts, currency]);

 if (!phone) {
 return (
 <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
  <SEO title="Device Not Found" />
  <h1 className="text-3xl font-display font-semibold mb-4 text-foreground">Device Not Found</h1>
  <p className="text-muted-foreground mb-8">We couldn't find pricing data for the requested device.</p>
  <button onClick={() => navigate('/devices')} className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium">
  Browse All Devices
  </button>
 </div>
 );
 }

 return (
 <div className="pt-10 md:pt-16 px-6">
  <SEO 
  title={`${phone.name} Component Prices`}
  description={`Original spare part prices for ${phone.name}. Check the official cost for replacement display, battery, camera and mainboard.`}
  canonical={`/device/${phone.id}`}
  type="product"
  productPriceAmount={lowestPrice !== null ? lowestPrice : undefined}
  productPriceCurrency={currency}
  />
  <DeviceDetail 
  phone={phone} 
  onBackToHome={() => navigate('/devices')} 
  onCompareWith={(id) => navigate(`/compare?id1=${phone.id}&id2=${id}`)}
  />
 </div>
 );
}
