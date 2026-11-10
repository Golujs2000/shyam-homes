/**
 * Comprehensive Google-Compliant JSON-LD Schema Generators for Shyam Homes
 * Following Google Search Central & Schema.org standards
 */

import { siteConfig } from '../data/seoContentData';

/**
 * 1. Primary RealEstateAgent / LocalBusiness Schema (Homepage & Sitewide)
 */
export const getRealEstateAgentSchema = (customSettings = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': 'https://shyamhomes.com/#realestateagent',
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  alternateName: [
    'Shyam Homes Patna',
    'Shyam Homes Real Estate & Property Consultants',
    'Shyam Homes Real Estate Agency Patna'
  ],
  description: 'Patna\'s premier real estate consultancy led by Dhananjay Kumar. Specializing in verified residential plots, luxury flats, independent houses, commercial leasing, and legal title due diligence across Kankarbagh, Boring Road, Bailey Road, Danapur, and Bihta.',
  url: siteConfig.domain,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.domain}/shyam homes logo.png`,
    width: 320,
    height: 80
  },
  image: [
    `${siteConfig.domain}/shyam homes logo.png`,
    `${siteConfig.domain}/logo.png`
  ],
  telephone: customSettings.phone ? `+91${customSettings.phone.replace(/[^0-9]/g, '')}` : '+917858832545',
  email: customSettings.email || siteConfig.email,
  priceRange: '₹₹ - ₹₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Cheque, Bank Transfer, Demand Draft',
  address: {
    '@type': 'PostalAddress',
    streetAddress: customSettings.address || siteConfig.officeAddress.street,
    addressLocality: 'Patna',
    addressRegion: 'Bihar',
    postalCode: siteConfig.officeAddress.postalCode,
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude
  },
  hasMap: siteConfig.googleMapsUrl,
  sameAs: [
    siteConfig.socialLinks.facebook,
    siteConfig.socialLinks.instagram,
    siteConfig.socialLinks.youtube,
    siteConfig.socialLinks.linkedin
  ],
  areaServed: [
    { '@type': 'City', name: 'Patna' },
    { '@type': 'AdministrativeArea', name: 'Kankarbagh' },
    { '@type': 'AdministrativeArea', name: 'Boring Road' },
    { '@type': 'AdministrativeArea', name: 'Bailey Road' },
    { '@type': 'AdministrativeArea', name: 'Danapur' },
    { '@type': 'AdministrativeArea', name: 'Saguna More' },
    { '@type': 'AdministrativeArea', name: 'Bihta' },
    { '@type': 'AdministrativeArea', name: 'Patliputra Colony' },
    { '@type': 'AdministrativeArea', name: 'Rajendra Nagar' },
    { '@type': 'AdministrativeArea', name: 'Phulwari Sharif' },
    { '@type': 'AdministrativeArea', name: 'Anisabad' },
    { '@type': 'AdministrativeArea', name: 'Ashiana Nagar' }
  ],
  knowsAbout: [
    'Patna Real Estate',
    'Residential Plots in Patna',
    'Flats in Kankarbagh',
    'Commercial Property on Bailey Road',
    'Land Measurement in Bihar (Kattha, Dhur, Decimal)',
    'Bihar Land Registry and Stamp Duty (MVR)',
    'RERA Bihar Compliance',
    'Jamabandi & Dakhil Kharij Verification'
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '20:00'
    }
  ],
  founder: {
    '@type': 'Person',
    name: customSettings.consultantName || siteConfig.consultantName,
    jobTitle: customSettings.consultantRole || siteConfig.consultantRole,
    telephone: '+917858832545',
    sameAs: siteConfig.domain
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '48',
    bestRating: '5',
    worstRating: '1'
  }
});

/**
 * 2. WebSite Schema with Sitelinks SearchBox
 */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.domain}/#website`,
  url: siteConfig.domain,
  name: siteConfig.name,
  description: 'Verified real estate and property consultancy in Patna, Bihar. Buy, sell, and rent plots, houses, flats, and commercial properties.',
  publisher: {
    '@id': `${siteConfig.domain}/#realestateagent`
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.domain}/properties?search={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
});

/**
 * 3. Individual Service Schema
 */
export const getServiceSchema = (service) => {
  if (!service) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.domain}/services/${service.slug}#service`,
    name: service.title,
    description: service.overview || service.metaDescription,
    url: `${siteConfig.domain}/services/${service.slug}`,
    provider: {
      '@id': `${siteConfig.domain}/#realestateagent`
    },
    areaServed: {
      '@type': 'City',
      name: 'Patna',
      addressRegion: 'Bihar',
      addressCountry: 'IN'
    },
    serviceType: service.shortTitle || service.title,
    termsOfService: `${siteConfig.domain}/terms`
  };
};

/**
 * 4. Locality / Place Schema
 */
export const getLocalitySchema = (loc) => {
  if (!loc) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${siteConfig.domain}/locations/${loc.slug}#place`,
    name: `${loc.name}, Patna`,
    description: loc.overview || loc.metaDescription,
    url: `${siteConfig.domain}/locations/${loc.slug}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.geo?.latitude || 25.5941,
      longitude: loc.geo?.longitude || 85.1376
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: loc.name,
      addressRegion: 'Bihar',
      postalCode: loc.pincode,
      addressCountry: 'IN'
    }
  };
};

/**
 * 5. Educational Article / Blog Schema
 */
export const getArticleSchema = (guide) => {
  if (!guide) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteConfig.domain}/guides/${guide.slug}#article`,
    headline: guide.title,
    description: guide.excerpt,
    url: `${siteConfig.domain}/guides/${guide.slug}`,
    image: guide.image,
    datePublished: guide.date,
    dateModified: guide.date,
    inLanguage: 'en-IN',
    mainEntityOfPage: `${siteConfig.domain}/guides/${guide.slug}`,
    author: {
      '@type': 'Person',
      name: guide.author || siteConfig.consultantName,
      jobTitle: guide.authorRole || siteConfig.consultantRole,
      url: `${siteConfig.domain}/about`
    },
    publisher: {
      '@id': `${siteConfig.domain}/#realestateagent`
    }
  };
};

/**
 * 6. Property Listing Schema
 */
export const getPropertySchema = (property) => {
  if (!property) return null;

  const isRental = property.status === 'FOR RENT';
  const priceValue = property.priceNumeric || (isRental ? 18000 : 5000000);

  return {
    '@context': 'https://schema.org',
    '@type': property.type === 'House' ? 'SingleFamilyResidence' : property.type === 'Plot' ? 'Landform' : 'Apartment',
    '@id': `${siteConfig.domain}/property/${property.id}#property`,
    name: property.title,
    description: property.overview || property.description,
    url: `${siteConfig.domain}/property/${property.id}`,
    image: property.gallery && property.gallery.length > 0 ? property.gallery : [property.image],
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.localityKey || 'Patna',
      addressRegion: 'Bihar',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.5941,
      longitude: 85.1376
    },
    numberOfRooms: property.beds || undefined,
    numberOfBathroomsTotal: property.baths || undefined,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area ? property.area.replace(/[^0-9]/g, '') : undefined,
      unitText: 'sq.ft'
    },
    offers: {
      '@type': 'Offer',
      price: priceValue,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      businessFunction: isRental ? 'https://schema.org/LeaseOut' : 'https://schema.org/Sell',
      seller: {
        '@id': `${siteConfig.domain}/#realestateagent`
      }
    }
  };
};

/**
 * 7. Breadcrumb Schema
 */
export const getBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `${siteConfig.domain}${item.url}`
  }))
});

/**
 * 8. FAQ Schema
 */
export const getFAQSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});
