export const EXCHANGE_RATES: Record<string, number> = {
 INR: 1,
 USD: 0.012,
 EUR: 0.011,
 GBP: 0.0094,
 JPY: 1.88,
 SGD: 0.016,
 AED: 0.044,
};

export const CURRENCIES = [
 { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
 { code: 'USD', symbol: '$', label: 'US Dollar' },
 { code: 'EUR', symbol: '€', label: 'Euro' },
 { code: 'GBP', symbol: '£', label: 'British Pound' },
 { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
 { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
 { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
];

export interface ServiceCenter {
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
 distance?: number;
}

export const SERVICE_CENTERS: ServiceCenter[] = [
 {
 id: 'sc1',
 name: 'Nothing Authorized Service Center',
 country: 'India',
 state: 'Maharashtra',
 city: 'Mumbai',
 address: 'Shop No 2, Ground Floor, Rustomjee Eaze Zone, Goregaon West',
 latitude: 19.1648,
 longitude: 72.8397,
 phone: '+91 22 2871 1234',
 opening_hours: '10:00 AM - 7:00 PM',
 map_url: 'https://maps.google.com/?q=19.1648,72.8397',
 verified: true
 },
 {
 id: 'sc2',
 name: 'Nothing Authorized Service Center',
 country: 'India',
 state: 'Delhi',
 city: 'New Delhi',
 address: 'G-14, Ground Floor, District Centre, Janakpuri',
 latitude: 28.6297,
 longitude: 77.0805,
 phone: '+91 11 4100 5678',
 opening_hours: '10:30 AM - 6:30 PM',
 map_url: 'https://maps.google.com/?q=28.6297,77.0805',
 verified: true
 },
 {
 id: 'sc3',
 name: 'Nothing Authorized Service Center',
 country: 'India',
 state: 'Karnataka',
 city: 'Bengaluru',
 address: 'No 12, 1st Floor, 5th Block, Koramangala',
 latitude: 12.9352,
 longitude: 77.6245,
 phone: '+91 80 2550 9012',
 opening_hours: '10:00 AM - 8:00 PM',
 map_url: 'https://maps.google.com/?q=12.9352,77.6245',
 verified: true
 },
 {
 id: 'sc4',
 name: 'Nothing Authorized Service Center',
 country: 'United States',
 state: 'New York',
 city: 'Manhattan',
 address: '123 Broadway, Silicon Alley',
 latitude: 40.7128,
 longitude: -74.0060,
 phone: '+1 212 555 1234',
 opening_hours: '9:00 AM - 6:00 PM',
 map_url: 'https://maps.google.com/?q=40.7128,-74.0060',
 verified: true
 },
 {
 id: 'sc5',
 name: 'Nothing Authorized Service Center',
 country: 'United Kingdom',
 state: 'London',
 city: 'London',
 address: 'Soho Square',
 latitude: 51.5136,
 longitude: -0.1332,
 phone: '+44 20 7123 4567',
 opening_hours: '10:00 AM - 7:00 PM',
 map_url: 'https://maps.google.com/?q=51.5136,-0.1332',
 verified: true
 }
];
