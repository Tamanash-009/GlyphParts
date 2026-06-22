import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  productPriceAmount?: number | string;
  productPriceCurrency?: string;
  schemas?: Record<string, any>[];
}

export const SEO: React.FC<SEOProps> = ({ 
  title = "Nothing Spare Parts Pricing", 
  description = "View original spare part prices for Nothing and CMF smartphones. Find service centers and transparent pricing.", 
  canonical, 
  type = "website",
  image = "/og-image.jpg",
  productPriceAmount,
  productPriceCurrency,
  schemas = []
}) => {
  const siteTitle = "Nothing Parts";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  // Default values assuming the site is hosted on a domain - you can configure this to be dynamic
  const siteUrl = "https://glyphparts.com"; 

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      {canonical && <meta property="og:url" content={`${siteUrl}${canonical}`} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      {canonical && <meta property="twitter:url" content={`${siteUrl}${canonical}`} />}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Product Open Graph Data */}
      {productPriceAmount && (
        <meta property="product:price:amount" content={productPriceAmount.toString()} />
      )}
      {productPriceCurrency && (
        <meta property="product:price:currency" content={productPriceCurrency} />
      )}

      {/* JSON-LD Schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
