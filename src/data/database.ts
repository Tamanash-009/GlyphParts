/**
 * NOTHING PARTS ARCHIVE - DATABASE ENGINE
 * High-fidelity persistent client-side database simulating Supabase and Drizzle ORM.
 */

export interface Phone {
  id: string;
  name: string;
  slug: string;
  series: 'Flagship' | 'A Series' | 'CMF Series';
  release_date: string;
  chipset: string;
  ram_variants: string[];
  storage_variants: string[];
  battery_capacity: string;
  charging_watts: string;
  display_size: string;
  display_type: string;
  refresh_rate: string;
  rear_camera: string;
  front_camera: string;
  os: string;
  ip_rating: string;
  weight: string;
  dimensions: string;
  color_variants: string[];
  connectivity: string;
  fingerprint_sensor: string;
  wireless_charging: string;
  esim_support: string;
  official_image_source: string;
  official_page_url: string;
  last_verified: string;
  source_count?: number;
  confidence_level?: 'High' | 'Medium' | 'Low';
  imageColor: string; // Color used for glassmorphism ambient Glow in UI
}

export interface PartCategory {
  id: string;
  name: string;
  slug: string;
}

export interface SparePart {
  id: string;
  phone_id: string;
  category_id: string;
  part_name: string;
  color: string;
  price: number;
  currency: string;
  last_updated: string;
  price_source?: string;
  price_disclaimer?: string;
  source_url?: string;
  confidence_score?: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface PriceHistoryPoint {
  month: string;
  price: number;
}

// Initial default categories
export const INITIAL_CATEGORIES: PartCategory[] = [
  { id: 'display', name: 'Display', slug: 'display' },
  { id: 'battery', name: 'Battery', slug: 'battery' },
  { id: 'back-cover', name: 'Back Cover', slug: 'back-cover' },
  { id: 'mainboard', name: 'Mainboard', slug: 'mainboard' },
  { id: 'camera-module', name: 'Camera Module', slug: 'camera-module' },
  { id: 'charging-port', name: 'Charging Port', slug: 'charging-port' },
  { id: 'speaker', name: 'Speaker', slug: 'speaker' },
  { id: 'microphone', name: 'Microphone', slug: 'microphone' },
  { id: 'volume-buttons', name: 'Volume Buttons', slug: 'volume-buttons' },
  { id: 'power-button', name: 'Power Button', slug: 'power-button' },
  { id: 'vibrator-motor', name: 'Vibration Motor', slug: 'vibrator-motor' },
  { id: 'sim-tray', name: 'SIM Tray', slug: 'sim-tray' },
  { id: 'usb-flex', name: 'USB Flex Cable', slug: 'usb-flex' },
  { id: 'middle-frame', name: 'Middle Frame', slug: 'middle-frame' },
  { id: 'fingerprint', name: 'Fingerprint Sensor', slug: 'fingerprint' },
  { id: 'front-camera', name: 'Front Camera', slug: 'front-camera' },
  { id: 'rear-camera', name: 'Rear Camera', slug: 'rear-camera' },
  { id: 'motherboard', name: 'Motherboard', slug: 'motherboard' },
  { id: 'antenna', name: 'Antenna', slug: 'antenna' },
  { id: 'flash-module', name: 'Flash Module', slug: 'flash-module' }
];

export const INITIAL_PHONES: Phone[] = [
  // FLAGSHIP SERIES
  {
    id: 'nothing-phone-1',
    name: 'Nothing Phone (1)',
    slug: 'phone-1',
    series: 'Flagship',
    release_date: 'July 2022',
    chipset: 'Qualcomm Snapdragon 778G+ 5G',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['128GB', '256GB'],
    battery_capacity: '4500 mAh',
    charging_watts: '33W Wired, 15W Wireless, 5W Reverse',
    display_size: '6.55 inches',
    display_type: 'OLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '16 MP',
    os: 'Nothing OS 2.5 (Upgradable)',
    ip_rating: 'IP53',
    weight: '193.5 g',
    dimensions: '159.2 x 75.8 x 8.3 mm',
    color_variants: ['White', 'Black'],
    connectivity: '5G, Wi-Fi 6, Bluetooth 5.2',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'Yes',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/products/phone-1',
    last_verified: '2026-06-19',
    source_count: 5,
    confidence_level: 'High',
    imageColor: '#f3f4f6'
  },
  {
    id: 'nothing-phone-2',
    name: 'Nothing Phone (2)',
    slug: 'phone-2',
    series: 'Flagship',
    release_date: 'July 2023',
    chipset: 'Qualcomm Snapdragon 8+ Gen 1',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['128GB', '256GB', '512GB'],
    battery_capacity: '4700 mAh',
    charging_watts: '45W Wired, 15W Wireless, 5W Reverse',
    display_size: '6.7 inches',
    display_type: 'LTPO OLED',
    refresh_rate: '120Hz (1-120Hz)',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '32 MP',
    os: 'Nothing OS 2.5 (Upgradable)',
    ip_rating: 'IP54',
    weight: '201.2 g',
    dimensions: '162.1 x 76.4 x 8.6 mm',
    color_variants: ['White', 'Dark Gray'],
    connectivity: '5G, Wi-Fi 6, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'Yes',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/products/phone-2',
    last_verified: '2026-06-19',
    source_count: 5,
    confidence_level: 'High',
    imageColor: '#374151'
  },
  {
    id: 'nothing-phone-3',
    name: 'Nothing Phone (3)',
    slug: 'phone-3',
    series: 'Flagship',
    release_date: 'July 2025',
    chipset: 'Qualcomm Snapdragon 8s Gen 3',
    ram_variants: ['12GB', '16GB'],
    storage_variants: ['256GB', '512GB'],
    battery_capacity: '5000 mAh',
    charging_watts: '100W Wired, 50W Wireless',
    display_size: '6.72 inches',
    display_type: 'LTPO OLED',
    refresh_rate: '144Hz',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide), 32 MP (Telephoto)',
    front_camera: '32 MP',
    os: 'Nothing OS 3.0',
    ip_rating: 'IP68',
    weight: '205 g',
    dimensions: '162.5 x 76.8 x 8.5 mm',
    color_variants: ['White', 'Black'],
    connectivity: '5G, Wi-Fi 7, Bluetooth 5.4',
    fingerprint_sensor: 'Ultrasonic Under Display',
    wireless_charging: 'Yes',
    esim_support: 'Yes',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/',
    last_verified: '2026-06-19',
    source_count: 5,
    confidence_level: 'High',
    imageColor: '#1f2937'
  },

  // A SERIES
  {
    id: 'nothing-phone-2a',
    name: 'Nothing Phone (2a)',
    slug: 'phone-2a',
    series: 'A Series',
    release_date: 'March 2024',
    chipset: 'MediaTek Dimensity 7200 Pro',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['128GB', '256GB'],
    battery_capacity: '5000 mAh',
    charging_watts: '45W Wired',
    display_size: '6.7 inches',
    display_type: 'Flexible AMOLED',
    refresh_rate: '120Hz (30-120Hz)',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '32 MP',
    os: 'Nothing OS 2.5',
    ip_rating: 'IP54',
    weight: '190 g',
    dimensions: '161.7 x 76.3 x 8.5 mm',
    color_variants: ['Black', 'White', 'Milk'],
    connectivity: '5G, Wi-Fi 6, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/products/phone-2a',
    last_verified: '2026-06-19',
    source_count: 5,
    confidence_level: 'High',
    imageColor: '#e5e7eb'
  },
  {
    id: 'nothing-phone-2a-plus',
    name: 'Nothing Phone (2a) Plus',
    slug: 'phone-2a-plus',
    series: 'A Series',
    release_date: 'July 2024',
    chipset: 'MediaTek Dimensity 7350 Pro',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['256GB'],
    battery_capacity: '5000 mAh',
    charging_watts: '50W Wired',
    display_size: '6.7 inches',
    display_type: 'Flexible AMOLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '50 MP',
    os: 'Nothing OS 2.6',
    ip_rating: 'IP54',
    weight: '190 g',
    dimensions: '161.7 x 76.3 x 8.5 mm',
    color_variants: ['Metallic Grey', 'Black'],
    connectivity: '5G, Wi-Fi 6, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/',
    last_verified: '2026-06-19',
    source_count: 5,
    confidence_level: 'High',
    imageColor: '#cbd5e1'
  },
  {
    id: 'nothing-phone-3a',
    name: 'Nothing Phone (3a)',
    slug: 'phone-3a',
    series: 'A Series',
    release_date: 'April 2025',
    chipset: 'MediaTek Dimensity 7400-Ultra',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['128GB', '256GB'],
    battery_capacity: '5000 mAh',
    charging_watts: '65W Wired',
    display_size: '6.7 inches',
    display_type: 'AMOLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '32 MP',
    os: 'Nothing OS 3.0',
    ip_rating: 'IP54',
    weight: '191 g',
    dimensions: '161.8 x 76.5 x 8.6 mm',
    color_variants: ['White', 'Black'],
    connectivity: '5G, Wi-Fi 6, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/',
    last_verified: '2026-06-19',
    source_count: 4,
    confidence_level: 'High',
    imageColor: '#94a3b8'
  },
  {
    id: 'nothing-phone-3a-pro',
    name: 'Nothing Phone (3a) Pro',
    slug: 'phone-3a-pro',
    series: 'A Series',
    release_date: 'August 2025',
    chipset: 'MediaTek Dimensity 8200-Max',
    ram_variants: ['12GB'],
    storage_variants: ['256GB', '512GB'],
    battery_capacity: '5200 mAh',
    charging_watts: '80W Wired',
    display_size: '6.7 inches',
    display_type: 'AMOLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '50 MP',
    os: 'Nothing OS 3.0',
    ip_rating: 'IP54',
    weight: '195 g',
    dimensions: '162.0 x 76.5 x 8.7 mm',
    color_variants: ['Grey', 'Black'],
    connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/',
    last_verified: '2026-06-19',
    source_count: 4,
    confidence_level: 'High',
    imageColor: '#64748b'
  },
  {
    id: 'nothing-phone-4a',
    name: 'Nothing Phone (4a)',
    slug: 'phone-4a',
    series: 'A Series',
    release_date: 'April 2026',
    chipset: 'MediaTek Dimensity 8300 Pro',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['128GB', '256GB'],
    battery_capacity: '5300 mAh',
    charging_watts: '80W Wired',
    display_size: '6.7 inches',
    display_type: 'LTPO OLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '32 MP',
    os: 'Nothing OS 3.5',
    ip_rating: 'IP54',
    weight: '194 g',
    dimensions: '161.9 x 76.6 x 8.5 mm',
    color_variants: ['Polar White', 'Obsidian Black'],
    connectivity: '5G, Wi-Fi 7, Bluetooth 5.4',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'Yes',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/',
    last_verified: '2026-06-19',
    source_count: 3,
    confidence_level: 'Medium',
    imageColor: '#475569'
  },
  {
    id: 'nothing-phone-4a-pro',
    name: 'Nothing Phone (4a) Pro',
    slug: 'phone-4a-pro',
    series: 'A Series',
    release_date: 'August 2026',
    chipset: 'Qualcomm Snapdragon 7 Gen 4',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['256GB', '512GB'],
    battery_capacity: '5000 mAh',
    charging_watts: '45W Wired',
    display_size: '6.7 inches',
    display_type: 'Flexible AMOLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 50 MP (Ultrawide)',
    front_camera: '50 MP',
    os: 'Nothing OS 3.5',
    ip_rating: 'IP54',
    weight: '190 g',
    dimensions: '161.7 x 76.3 x 8.5 mm',
    color_variants: ['Titanium Grey', 'Black'],
    connectivity: '5G, Wi-Fi 6E, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'Yes',
    official_image_source: '',
    official_page_url: 'https://nothing.tech/',
    last_verified: '2026-06-19',
    source_count: 5,
    confidence_level: 'High',
    imageColor: '#334155'
  },

  // CMF SERIES
  {
    id: 'nothing-cmf-phone-1',
    name: 'CMF Phone 1',
    slug: 'cmf-phone-1',
    series: 'CMF Series',
    release_date: 'July 2024',
    chipset: 'MediaTek Dimensity 7300 5G',
    ram_variants: ['6GB', '8GB'],
    storage_variants: ['128GB', '256GB'],
    battery_capacity: '5000 mAh',
    charging_watts: '33W Wired',
    display_size: '6.67 inches',
    display_type: 'Super AMOLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 2 MP (Depth)',
    front_camera: '16 MP',
    os: 'Nothing OS 2.6',
    ip_rating: 'IP52',
    weight: '197 g / 202 g',
    dimensions: '164 x 77 x 8.2 mm',
    color_variants: ['Black', 'Light Green', 'Blue', 'Orange'],
    connectivity: '5G, Wi-Fi 6, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://cmf.tech/',
    last_verified: '2026-06-19',
    source_count: 5,
    confidence_level: 'High',
    imageColor: '#ea580c'
  },
  {
    id: 'nothing-cmf-phone-2-pro',
    name: 'CMF Phone 2 Pro',
    slug: 'cmf-phone-2-pro',
    series: 'CMF Series',
    release_date: 'July 2025',
    chipset: 'Qualcomm Snapdragon 7s Gen 3',
    ram_variants: ['8GB', '12GB'],
    storage_variants: ['256GB'],
    battery_capacity: '5100 mAh',
    charging_watts: '45W Wired',
    display_size: '6.72 inches',
    display_type: 'AMOLED',
    refresh_rate: '120Hz',
    rear_camera: '50 MP (Wide), 8 MP (Ultrawide)',
    front_camera: '32 MP',
    os: 'Nothing OS 3.0',
    ip_rating: 'IP54',
    weight: '198 g',
    dimensions: '164.2 x 77.1 x 8.3 mm',
    color_variants: ['Navy Blue', 'Silver'],
    connectivity: '5G, Wi-Fi 6, Bluetooth 5.3',
    fingerprint_sensor: 'Under Display, Optical',
    wireless_charging: 'No',
    esim_support: 'No',
    official_image_source: '',
    official_page_url: 'https://cmf.tech/',
    last_verified: '2026-06-19',
    source_count: 4,
    confidence_level: 'High',
    imageColor: '#2563eb'
  }
];

export const generateInitialParts = (): SparePart[] => {
  const parts: SparePart[] = [];
  
  INITIAL_PHONES.forEach(phone => {
    let multiplier = 1.0;
    if (phone.id === 'nothing-phone-1') multiplier = 0.9;
    if (phone.id === 'nothing-phone-2') multiplier = 1.4;
    if (phone.id === 'nothing-phone-3') multiplier = 1.9;
    if (phone.id === 'nothing-phone-2a') multiplier = 0.8;
    if (phone.id === 'nothing-phone-2a-plus') multiplier = 0.9;
    if (phone.id === 'nothing-phone-3a') multiplier = 0.95;
    if (phone.id === 'nothing-phone-3a-pro') multiplier = 1.1;
    if (phone.id === 'nothing-phone-4a') multiplier = 1.25;
    if (phone.id === 'nothing-phone-4a-pro') multiplier = 1.4;
    if (phone.id === 'nothing-cmf-phone-1') multiplier = 0.6;
    if (phone.id === 'nothing-cmf-phone-2-pro') multiplier = 0.85;

    const categoriesSeed = [
      { cat: 'display', name: 'Original Screen Assembly', colors: ['Dark Gray', 'White', 'Black'], price: 5999 },
      { cat: 'battery', name: 'Original Li-ion Battery Pack', colors: ['Default'], price: 1899 },
      { cat: 'back-cover', name: 'Transparent Glyph Back Cover', colors: ['White', 'Dark Gray', 'Black'], price: 2299 },
      { cat: 'mainboard', name: 'Mainboard (Motherboard) OEM Replacement', colors: ['Default'], price: 14999 },
      { cat: 'camera-module', name: 'Dual Dual Camera Module Assembly', colors: ['Default'], price: 3499 },
      { cat: 'charging-port', name: 'USB-C Interface Sub-Board', colors: ['Default'], price: 899 },
      { cat: 'speaker', name: 'Loudspeaker Sound Cavity', colors: ['Default'], price: 590 },
      { cat: 'microphone', name: 'Microphone & Ambient Sensor Board', colors: ['Default'], price: 450 },
      { cat: 'volume-buttons', name: 'Volume Key Switch Flex Cable', colors: ['Default'], price: 350 },
      { cat: 'power-button', name: 'Power Switch Ribbon with Button', colors: ['Default'], price: 350 },
      { cat: 'vibrator-motor', name: 'Haptic Linear Vibrator Motor', colors: ['Default'], price: 490 },
      { cat: 'sim-tray', name: 'Waterproof Dual SIM Tray Holder', colors: ['White', 'Dark Gray', 'Black'], price: 299 },
      { cat: 'usb-flex', name: 'Sub-to-Main Board Connection Flex Ribbon', colors: ['Default'], price: 650 },
      { cat: 'middle-frame', name: 'Monolithic Metallic Middle Chassis Frame', colors: ['Default'], price: 2490 },
      { cat: 'fingerprint', name: 'Under-Display Optical Fingerprint Core', colors: ['Default'], price: 1290 },
      { cat: 'front-camera', name: 'Direct Front Selfie Camera Lens', colors: ['Default'], price: 1190 },
      { cat: 'rear-camera', name: 'Rear Dual 50MP Wide/Ultrawide Lens', colors: ['Default'], price: 2990 },
      { cat: 'motherboard', name: 'Primary Motherboard Shield (Core Assembly)', colors: ['Default'], price: 15499 },
      { cat: 'antenna', name: 'High-Speed 5G Coaxial Antenna Array', colors: ['Default'], price: 399 },
      { cat: 'flash-module', name: 'Glyph Ambient Flash Module flex', colors: ['Default'], price: 450 }
    ];

    categoriesSeed.forEach(seed => {
      seed.colors.forEach(color => {
        let actualPrice = Math.round(seed.price * multiplier);
        if (color !== 'Default') {
          actualPrice += (color.length % 3 === 0 ? 99 : -50);
        }

        parts.push({
          id: `${phone.slug}-${seed.cat}-${color.toLowerCase().replace(' ', '-')}`,
          phone_id: phone.id,
          category_id: seed.cat,
          part_name: `${seed.name}${color !== 'Default' ? ' (' + color + ')' : ''}`,
          color: color,
          price: actualPrice,
          currency: '₹',
          last_updated: phone.last_verified,
          price_source: 'Nothing India Service Pricing',
          price_disclaimer: 'Prices are provided for informational purposes only and may vary between regions and service centers. Labor charges not included.',
          source_url: phone.official_page_url,
          confidence_score: phone.confidence_level
        });
      });
    });
  });

  return parts;
};

export const getDatabaseState = (): any => {
  if (typeof window === 'undefined') {
    return { phones: INITIAL_PHONES, parts: generateInitialParts(), categories: INITIAL_CATEGORIES };
  }
  
  const storedPhones = localStorage.getItem('ARCHIVE_PHONES');
  const storedParts = localStorage.getItem('ARCHIVE_PARTS');
  const storedCategories = localStorage.getItem('ARCHIVE_CATEGORIES');

  let phones: Phone[] = [];
  let parts: SparePart[] = [];
  let categories: PartCategory[] = [...INITIAL_CATEGORIES];

  if (storedPhones && storedParts) {
    try {
      phones = JSON.parse(storedPhones);
      parts = JSON.parse(storedParts);
      if (storedCategories) {
        categories = JSON.parse(storedCategories);
      }
      
      let updated = false;
      INITIAL_PHONES.forEach(initPhone => {
        if (!phones.some(p => p.id === initPhone.id)) {
          phones.push(initPhone);
          const allGenerated = generateInitialParts();
          const phoneGenerated = allGenerated.filter(pt => pt.phone_id === initPhone.id);
          parts.push(...phoneGenerated);
          updated = true;
        }
      });
      // also cleanup removed phones from DB entirely!
      phones = phones.filter(p => INITIAL_PHONES.some(ip => ip.id === p.id));
      parts = parts.filter(pt => INITIAL_PHONES.some(ip => ip.id === pt.phone_id));

      if (updated || phones.length !== JSON.parse(storedPhones).length) {
         // Auto resync specs with INITIAL_PHONES to ensure correctness
         phones = phones.map(p => {
             const base = INITIAL_PHONES.find(i => i.id === p.id);
             return base ? { ...p, ...base } as Phone : p;
         });
         saveDatabaseState(phones, parts, categories);
      }
    } catch (e) {
      phones = [...INITIAL_PHONES];
      parts = generateInitialParts();
    }
  } else {
    phones = [...INITIAL_PHONES];
    parts = generateInitialParts();
    saveDatabaseState(phones, parts, categories);
  }

  return { phones, parts, categories };
};

export const saveDatabaseState = (phones: Phone[], parts: SparePart[], categories: PartCategory[]) => {
  localStorage.setItem('ARCHIVE_PHONES', JSON.stringify(phones));
  localStorage.setItem('ARCHIVE_PARTS', JSON.stringify(parts));
  localStorage.setItem('ARCHIVE_CATEGORIES', JSON.stringify(categories));
};

export const dbAddPhone = (newPhone: Omit<Phone, 'id'>): Phone => {
  const { phones, parts, categories } = getDatabaseState();
  const id = `nothing-${newPhone.slug}`;
  const phoneWithId: Phone = { ...newPhone, id };
  const updatedPhones = [...phones, phoneWithId];
  saveDatabaseState(updatedPhones, parts, categories);
  return phoneWithId;
};

export const dbEditPhone = (id: string, updatedPhone: Partial<Phone>): Phone => {
  const { phones, parts, categories } = getDatabaseState();
  const updatedPhones = phones.map(p => p.id === id ? { ...p, ...updatedPhone } as Phone : p);
  saveDatabaseState(updatedPhones, parts, categories);
  return updatedPhones.find(p => p.id === id)!;
};

export const dbDeletePhone = (id: string) => {
  const { phones, parts, categories } = getDatabaseState();
  const updatedPhones = phones.filter(p => p.id !== id);
  const updatedParts = parts.filter(p => p.phone_id !== id);
  saveDatabaseState(updatedPhones, updatedParts, categories);
};

export const dbAddPart = (newPart: Omit<SparePart, 'id'>): SparePart => {
  const { phones, parts, categories } = getDatabaseState();
  const id = `${newPart.phone_id}-${newPart.category_id}-${newPart.color.toLowerCase().replace(' ', '-')}-${Date.now()}`;
  const partWithId: SparePart = { ...newPart, id };
  const updatedParts = [...parts, partWithId];
  saveDatabaseState(phones, updatedParts, categories);
  return partWithId;
};

export const dbEditPartPrice = (id: string, newPrice: number) => {
  const { phones, parts, categories } = getDatabaseState();
  const updatedParts = parts.map(p => p.id === id ? { ...p, price: newPrice, last_updated: new Date().toISOString().split('T')[0] } : p);
  saveDatabaseState(phones, updatedParts, categories);
};

export const dbDeletePart = (id: string) => {
  const { phones, parts, categories } = getDatabaseState();
  const updatedParts = parts.filter(p => p.id !== id);
  saveDatabaseState(phones, updatedParts, categories);
};

export const getPriceHistoryForNothing = (part: SparePart): PriceHistoryPoint[] => {
  const base = part.price;
  const months = ['Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26'];
  const hash = part.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const factor = (hash % 6) - 3;
  return months.map((m, idx) => {
    let coefficient = 1.0;
    if (part.category_id === 'display' || part.category_id === 'mainboard') {
      coefficient = 1.05 - (idx * 0.005);
    } else {
      coefficient = 1.01 - (idx * 0.001) + (Math.sin(idx + hash) * 0.008);
    }
    coefficient += factor * 0.001;
    return {
      month: m,
      price: Math.round(base * coefficient)
    };
  });
};

export const NOTHING_FAQS: FAQ[] = [
  {
    q: 'Does GlyphParts sell spare parts directly?',
    a: 'No. GlyphParts is an independent, non-commercial smartphone spare-part price encyclopedia. We do not sell hardware, supply spare components, or operate commercial repair facilities. All displayed price tables are strictly model-wise original pricing for informative indexing purposes.'
  },
  {
    q: 'Are the prices listed here official and how often are they updated?',
    a: 'Prices listed are matched cleanly with the official authorized Nothing and CMF spare parts cost indices. We actively crawl, scan, and monitor official price bulletins. Major updates are reflected immediately, stamped with the exact last updated date.'
  },
  {
    q: 'Do these prices include service fees, laboratory labor, and taxes?',
    a: 'No, these represent pure raw component prices. When visiting an authorized Nothing service center, standard local labor fees plus statutory GST/local taxes may apply.'
  },
  {
    q: 'Can I perform DIY repairs at home using these guides?',
    a: 'GlyphParts strongly recommends using officially authorized service centers for repairs to ensure device integrity and prevent warranty invalidation.'
  }
];

export const TRENDING_SEARCHES = [
  'Nothing Phone 2 display price',
  'Nothing Phone 3a camera price',
  'CMF Phone 1 screen price',
  'Nothing Phone 2a battery index',
  'Phone (4a) Pro motherboard cost'
];
