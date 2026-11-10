import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://shyam-homes.web.app';
const DEFAULT_TITLE = 'Shyam Homes — Real Estate & Property Consultants | Patna, Bihar';
const DEFAULT_DESCRIPTION = 'Explore plots, houses, flats, and commercial properties in Patna with Shyam Homes. Professional real estate assistance by Dhananjay Kumar (7858832545). Buy, Sell & Rent.';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema,
  noIndex = false,
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Title
    const formattedTitle = title
      ? title.includes('Shyam Homes')
        ? title
        : `${title} | Shyam Homes Patna`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // Helper function to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content || '');
    };

    // Helper function to update or create link tags
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
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 3. Canonical Link
    const canonicalUrl = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${BASE_URL}${canonical}`
      : `${BASE_URL}${location.pathname}`;
    setLinkTag('canonical', canonicalUrl);

    // 4. Open Graph Tags (WhatsApp, Facebook, LinkedIn)
    setMetaTag('property', 'og:site_name', 'Shyam Homes Patna');
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 5. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 6. JSON-LD Structured Data Schema
    const scriptId = 'shyam-homes-jsonld';
    let scriptTag = document.getElementById(scriptId);

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup schema on unmount if needed
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schema, noIndex, location.pathname]);

  return null;
}
