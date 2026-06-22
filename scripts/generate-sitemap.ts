import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDatabaseState } from '../src/data/database.js'; // Must use .js for tsx/node module resolution
import { SERVICE_CENTERS } from '../src/data/serviceCenters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://glyphparts.com';

function generateSitemap() {
  const { phones, parts } = getDatabaseState();
  const date = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    '',
    '/devices',
    '/centers',
    '/compare',
    '/updates',
    '/search',
    '/about',
    '/faq',
    '/contact',
    '/report-price',
    '/privacy',
    '/terms',
    '/disclaimer'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  for (const route of staticRoutes) {
    xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  }

  // Dynamic device routes
  for (const phone of phones) {
    xml += `  <url>\n    <loc>${BASE_URL}/device/${phone.id}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }

  // Dynamic device part routes (Programmatic SEO)
  for (const part of parts) {
    xml += `  <url>\n    <loc>${BASE_URL}/device/${part.phone_id}/${part.category_id}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  // Dynamic service center routes (Local SEO)
  const uniqueCities = Array.from(new Set(SERVICE_CENTERS.map(c => `${c.country.toLowerCase()}/${c.state.toLowerCase()}/${c.city.toLowerCase()}`)));
  for (const geoPath of uniqueCities) {
    xml += `  <url>\n    <loc>${BASE_URL}/service-centers/${geoPath.replace(/ /g, '-')}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  }

  xml += `</urlset>`;

  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Sitemap generated successfully with ${staticRoutes.length + phones.length + parts.length + uniqueCities.length} URLs.`);
}

generateSitemap();
