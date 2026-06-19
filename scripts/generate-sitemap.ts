import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDatabaseState } from '../src/data/database.js'; // Must use .js for tsx/node module resolution

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://glyphparts.com';

function generateSitemap() {
  const { phones } = getDatabaseState();
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

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Static routes
  for (const route of staticRoutes) {
    xml += `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>\n`;
  }

  // Dynamic device routes
  for (const phone of phones) {
    xml += `  <url>
    <loc>${BASE_URL}/device/${phone.id}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  }

  xml += `</urlset>`;

  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`✅ Sitemap generated successfully with ${staticRoutes.length + phones.length} URLs.`);
}

generateSitemap();
