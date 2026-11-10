import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://shyamhomes.com';
const DEFAULT_TITLE = 'Shyam Homes — Real Estate & Property Consultants | Patna, Bihar';
const DEFAULT_DESCRIPTION = 'Explore verified plots, residential flats, luxury houses, and commercial property in Patna with Shyam Homes. Direct consultation by Dhananjay Kumar (7858832545).';
const DEFAULT_IMAGE = `${BASE_URL}/shyam homes logo.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema,
  schemas = [],
  noIndex = false,
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Page Title
    const formattedTitle = title
      ? title.includes('Shyam Homes')
        ? title
        : `${title} | Shyam Homes Patna`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content || '');
    };

    // Helper to update or create link tags
    const setLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Dhananjay Kumar - Shyam Homes');

    // 3. Local Geographic SEO Meta Tags (Patna, Bihar)
    setMetaTag('name', 'geo.region', 'IN-BR');
    setMetaTag('name', 'geo.placename', 'Patna');
    setMetaTag('name', 'geo.position', '25.5941;85.1376');
    setMetaTag('name', 'ICBM', '25.5941, 85.1376');

    // 4. Canonical URL
    const canonicalUrl = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${BASE_URL}${canonical}`
      : `${BASE_URL}${location.pathname}`;
    setLinkTag('canonical', canonicalUrl);

    // 5. Open Graph Meta Tags (Social Sharing, WhatsApp, LinkedIn, Facebook)
    setMetaTag('property', 'og:site_name', 'Shyam Homes Patna');
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    setMetaTag('property', 'og:locale', 'en_IN');

    // 6. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 7. JSON-LD Structured Data Schema (Multiple Schema Support)
    const scriptId = 'shyam-homes-jsonld';
    let scriptTag = document.getElementById(scriptId);

    const allSchemas = [];
    if (schema) allSchemas.push(schema);
    if (Array.isArray(schemas) && schemas.length > 0) {
      schemas.forEach((s) => {
        if (s) allSchemas.push(s);
      });
    }

    if (allSchemas.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      // If multiple schemas, wrap in Schema.org @graph
      const finalJsonLd = allSchemas.length === 1
        ? allSchemas[0]
        : {
            '@context': 'https://schema.org',
            '@graph': allSchemas.map(s => {
              const copy = { ...s };
              delete copy['@context'];
              return copy;
            })
          };
      scriptTag.text = JSON.stringify(finalJsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schema, schemas, noIndex, location.pathname]);

  return null;
}
