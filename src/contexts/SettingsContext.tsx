"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CURRENCIES, EXCHANGE_RATES, SERVICE_CENTERS } from '../data/serviceCenters';

interface LocationData {
 latitude: number | null;
 longitude: number | null;
 country: string | null;
 countryCode: string | null;
 state: string | null;
 city: string | null;
 timezone: string | null;
 language: string | null;
 currency: string | null;
}

export type LocationStatus = 'Allowed' | 'Denied' | 'Not Requested' | 'Blocked';

interface ServiceCenter {
 id: string;
 name: string;
 country: string;
 state: string;
 city: string;
 address: string;
 latitude: number;
 longitude: number;
 phone: string;
 opening_hours: string;
 map_url: string;
 verified: boolean;
 distance?: number; // In km
}

interface SettingsContextType {
 currency: string;
 setCurrency: (code: string) => void;
 location: LocationData;
 locationStatus: LocationStatus;
 requestLocation: () => Promise<void>;
 refreshLocation: () => Promise<void>;
 disableLocation: () => void;
 revokeLocation: () => void;
 formatPrice: (priceInr: number) => { original: string; converted: string | null };
 nearestCenters: ServiceCenter[];
 showLocationBanner: boolean;
 setShowLocationBanner: (show: boolean) => void;
}

// Haversine formula
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
 const R = 6371; // Radius of the earth in km
 const dLat = (lat2 - lat1) * (Math.PI / 180);
 const dLon = (lon2 - lon1) * (Math.PI / 180);
 const a = 
 Math.sin(dLat/2) * Math.sin(dLat/2) +
 Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
 Math.sin(dLon/2) * Math.sin(dLon/2)
 ; 
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
 const d = R * c; // Distance in km
 return d;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
 const [currency, setCurrencyState] = useState<string>('INR');
 const [locationStatus, setLocationStatus] = useState<LocationStatus>('Not Requested');
 const [showLocationBanner, setShowLocationBanner] = useState(false);
 const [location, setLocation] = useState<LocationData>({
 latitude: null,
 longitude: null,
 country: null,
 countryCode: null,
 state: null,
 city: null,
 timezone: null,
 language: null,
 currency: null
 });
 const [nearestCenters, setNearestCenters] = useState<ServiceCenter[]>([]);
 const initialized = useRef(false);

 const applyFallbackLocale = () => {
 try {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone.includes('America/New_York') || timezone.includes('America/Los_Angeles')) {
  setCurrencyState('USD');
  } else if (timezone.includes('Europe/London')) {
  setCurrencyState('GBP');
  } else if (timezone.includes('Europe/')) {
  setCurrencyState('EUR');
  } else if (timezone.includes('Asia/Tokyo')) {
  setCurrencyState('JPY');
  } else if (timezone.includes('Asia/Singapore')) {
  setCurrencyState('SGD');
  } else if (timezone.includes('Asia/Dubai')) {
  setCurrencyState('AED');
  } else {
  setCurrencyState('INR'); // Default fallback
  }
 } catch {
  setCurrencyState('INR');
 }
 };

 useEffect(() => {
  // 1. Try to load saved currency
  const savedCurrency = localStorage.getItem('currency');
  if (savedCurrency && EXCHANGE_RATES[savedCurrency]) {
   setCurrencyState(savedCurrency);
  }

  // 2. Check location preference and permissions
  const storedPref = localStorage.getItem('location_preference');
  if (storedPref === 'granted' && 'geolocation' in navigator) {
    navigator.permissions?.query({ name: 'geolocation' }).then(result => {
      if (result.state === 'granted') {
        performLocationRequest();
      } else if (result.state === 'prompt') {
        setLocationStatus('Not Requested');
      } else {
        setLocationStatus('Blocked');
        applyFallbackLocale();
      }
    }).catch(() => {
      // Fallback if permissions query is unsupported
      performLocationRequest();
    });
  } else if (storedPref === 'denied' || storedPref === 'blocked' || !('geolocation' in navigator)) {
   setLocationStatus(storedPref === 'blocked' ? 'Blocked' : 'Denied');
   applyFallbackLocale();
  } else {
   applyFallbackLocale();
  }
 }, []);

 useEffect(() => {
 if (!location.latitude || !location.longitude) {
  setNearestCenters([]);
  return;
 }

 const fetchCenters = async () => {
  try {
   const radii = [25000, 50000, 100000];
   let results: any[] = [];
   let searchRadius = 25000;

   for (const radius of radii) {
    if (results.length > 0) break;
    searchRadius = radius;
    
    // Convert to meters
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["name"~"Nothing|CMF|Authorized Service Center|Mobile Repair|Electronics Repair",i](around:${radius},${location.latitude},${location.longitude});
        way["name"~"Nothing|CMF|Authorized Service Center|Mobile Repair|Electronics Repair",i](around:${radius},${location.latitude},${location.longitude});
        node["shop"~"mobile_phone|electronics"](around:${radius},${location.latitude},${location.longitude});
        node["craft"="electronics_repair"](around:${radius},${location.latitude},${location.longitude});
      );
      out center;
    `;
    
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery
    });
    
    if (!response.ok) continue;
    const data = await response.json();
    if (data && data.elements && data.elements.length > 0) {
      results = data.elements;
    }
   }
   
   if (results.length > 0) {
    // Map to ServiceCenter format
    let localCenters = results.map(p => {
      const pLat = p.lat || p.center?.lat;
      const pLon = p.lon || p.center?.lon;
      
      if (!pLat || !pLon) return null;
      
      const distance = getDistance(location.latitude!, location.longitude!, pLat, pLon);
      return { place: p, distance };
    }).filter(Boolean) as { place: any, distance: number }[];
    
    localCenters.sort((a, b) => a.distance - b.distance);
    
    const mappedCenters: ServiceCenter[] = [];
    
    // Let's also check our static database just in case Overpass didn't find specific ones but static has them closer
    const staticCenters = SERVICE_CENTERS.map(c => ({
      place: c,
      distance: getDistance(location.latitude!, location.longitude!, c.latitude, c.longitude)
    })).filter(c => c.distance <= (searchRadius / 1000));
    
    // merge and deduplicate
    const combined = [...staticCenters, ...localCenters].sort((a, b) => a.distance - b.distance);
    const seenNames = new Set();
    
    for (const item of combined) {
      if (mappedCenters.length >= 5) break;
      
      const p = item.place;
      const dist = item.distance;
      
      if (p.id && String(p.id).startsWith('center-')) {
        // This is a static center from SERVICE_CENTERS array
        if (!seenNames.has(p.name)) {
          seenNames.add(p.name);
          mappedCenters.push({
            ...p,
            distance: dist,
            map_url: `https://www.google.com/maps/search/?api=1&query=${p.latitude},${p.longitude}`,
          });
        }
      } else {
        // This is an overpass result
        const name = p.tags?.name || 'Local Mobile Repair Center';
        if (!seenNames.has(name)) {
          seenNames.add(name);
          
          const pLat = p.lat || p.center?.lat;
          const pLon = p.lon || p.center?.lon;
          const street = p.tags?.['addr:street'] || '';
          const housenumber = p.tags?.['addr:housenumber'] || '';
          const address = [housenumber, street].filter(Boolean).join(' ') || 'Address not specified';
          
          mappedCenters.push({
            id: `osm-${p.id}`,
            name: name,
            country: location.country || '',
            state: location.state || '',
            city: p.tags?.['addr:city'] || location.city || '',
            address: address,
            latitude: pLat,
            longitude: pLon,
            phone: p.tags?.phone || p.tags?.['contact:phone'] || 'Phone unavailable',
            opening_hours: p.tags?.opening_hours || 'Hours not specified',
            map_url: `https://www.google.com/maps/search/?api=1&query=${pLat},${pLon}`,
            verified: false,
            distance: dist
          });
        }
      }
    }
    
    setNearestCenters(mappedCenters);
   } else {
    setNearestCenters([]);
   }
  } catch (e) {
   console.error("Error fetching places via Overpass:", e);
   setNearestCenters([]);
  }
 };

 fetchCenters();
 }, [location.latitude, location.longitude, location.countryCode]);

 const setCurrency = (code: string) => {
 setCurrencyState(code);
 localStorage.setItem('currency', code);
 };

 const fetchLocationDetails = async (lat: number, lon: number) => {
 try {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
  const data = await response.json();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  
  const address = data.address || {};
  const countryCode = address.country_code ? address.country_code.toUpperCase() : null;
  const country = address.country || null;
  const state = address.state || address.region || null;
  const city = address.city || address.town || address.village || address.municipality || address.county || null;
  
  // Try to determine currency from timezone or country if available
  let code = 'INR';
  if (countryCode === 'US') code = 'USD';
  else if (countryCode === 'GB') code = 'GBP';
  else if (['FR', 'DE', 'IT', 'ES', 'NL'].includes(countryCode || '')) code = 'EUR';
  else if (countryCode === 'JP') code = 'JPY';
  else if (countryCode === 'SG') code = 'SGD';
  else if (countryCode === 'AE') code = 'AED';

  setLocation({
  latitude: lat,
  longitude: lon,
  country: country,
  countryCode: countryCode,
  state: state,
  city: city,
  timezone,
  language,
  currency: code
  });

  const savedCurrency = localStorage.getItem('currency');
  if (!savedCurrency) {
  setCurrencyState(code);
  }
 } catch (error) {
  console.error('Error fetching location details:', error);
  setLocation(prev => ({ ...prev, latitude: lat, longitude: lon }));
  applyFallbackLocale();
 }
 };


 const performLocationRequest = (): Promise<void> => {
 return new Promise<void>((resolve) => {
  if (!('geolocation' in navigator)) {
  console.error("Geolocation is not supported by this browser.");
  setLocationStatus('Denied');
  applyFallbackLocale();
  setShowLocationBanner(false);
  resolve();
  return;
  }

  console.log("Requesting geolocation...");
  navigator.geolocation.getCurrentPosition(
  async (position) => {
   console.log("Geolocation permission GRANTED. Fetching coordinates...", position.coords.latitude, position.coords.longitude);
   setLocationStatus('Allowed');
   localStorage.setItem('location_preference', 'granted');
   await fetchLocationDetails(position.coords.latitude, position.coords.longitude);
   setShowLocationBanner(false);
   resolve();
  },
  (error) => {
   console.error("Geolocation error:", error.message, error.code);
   if (error.code === error.PERMISSION_DENIED) {
    setLocationStatus('Blocked');
    localStorage.setItem('location_preference', 'blocked');
   } else {
    setLocationStatus('Denied');
    localStorage.setItem('location_preference', 'denied');
   }
   applyFallbackLocale();
   setShowLocationBanner(false);
   resolve();
  },
  {
   enableHighAccuracy: true,
   timeout: 10000,
   maximumAge: 0
  }
  );
 });
 };

 const requestLocation = async () => {
 console.log("Triggering location prompt UI...");
 setShowLocationBanner(true);
 await new Promise(res => setTimeout(res, 500));
 await performLocationRequest();
 };

 const refreshLocation = async () => {
 await performLocationRequest();
 };

 const disableLocation = () => {
 setLocationStatus('Denied');
 localStorage.setItem('location_preference', 'denied');
 setLocation({
  latitude: null,
  longitude: null,
  country: null,
  countryCode: null,
  state: null,
  city: null,
  timezone: null,
  language: null,
  currency: null
 });
 applyFallbackLocale();
 };

 const revokeLocation = () => {
 setLocationStatus('Not Requested');
 localStorage.removeItem('location_preference');
 setLocation({
  latitude: null,
  longitude: null,
  country: null,
  countryCode: null,
  state: null,
  city: null,
  timezone: null,
  language: null,
  currency: null
 });
 };

 useEffect(() => {
 if (initialized.current) return;
 initialized.current = true;

 const initPermissions = async () => {
  if (!('geolocation' in navigator)) {
  console.warn("Geolocation not supported.");
  applyFallbackLocale();
  return;
  }
  
  try {
  const permission = await navigator.permissions.query({ name: 'geolocation' });
  console.log("Permission state:", permission.state);
  
  if (permission.state === 'granted') {
   setLocationStatus('Allowed');
   performLocationRequest();
  } else if (permission.state === 'denied') {
   setLocationStatus('Denied');
   applyFallbackLocale();
  } else {
   // state === 'prompt'
   console.log("Permission state is prompt, launching delay before request...");
   setTimeout(() => {
   requestLocation();
   }, 1500);
  }
  
  permission.onchange = () => {
   console.log("Permission changed to:", permission.state);
   if (permission.state === 'granted') {
   setLocationStatus('Allowed');
   performLocationRequest();
   } else if (permission.state === 'denied') {
   setLocationStatus('Denied');
   applyFallbackLocale();
   }
  };
  } catch (error) {
  console.error("Error checking permissions API:", error);
  // Fallback if permissions API fails
  const storedPref = localStorage.getItem('location_preference');
  if (storedPref === 'granted') {
   setLocationStatus('Allowed');
   performLocationRequest();
  } else if (storedPref === 'denied') {
   setLocationStatus('Denied');
   applyFallbackLocale();
  } else {
   setTimeout(() => {
   requestLocation();
   }, 1500);
  }
  }
 };

 initPermissions();
 }, []);

 const formatPrice = (priceInr: number) => {
 const original = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(priceInr);
 
 if (currency === 'INR') {
  return { original, converted: null };
 }

 const rate = EXCHANGE_RATES[currency] || 1;
 const convertedAmount = priceInr * rate;
 
 const maxFrac = convertedAmount > 1000 ? 0 : 2;
 const converted = new Intl.NumberFormat(undefined, { 
  style: 'currency', 
  currency: currency, 
  maximumFractionDigits: maxFrac 
 }).format(convertedAmount);

 return { original: original, converted: converted };
 };

 return (
 <SettingsContext.Provider value={{ 
  currency, setCurrency, location, locationStatus, 
  requestLocation, refreshLocation, disableLocation, revokeLocation, 
  formatPrice, nearestCenters, showLocationBanner, setShowLocationBanner 
 }}>
  {children}
 </SettingsContext.Provider>
 );
}

export function useSettings() {
 const context = useContext(SettingsContext);
 if (context === undefined) {
 throw new Error('useSettings must be used within a SettingsProvider');
 }
 return context;
}

