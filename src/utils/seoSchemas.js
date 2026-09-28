/**
 * JSON-LD Schema generators for Shyam Homes
 */

export const getRealEstateAgentSchema = (settings = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': 'https://shyamhomespatna.com/#realestateagent',
  name: 'Shyam Homes',
  alternateName: 'Shyam Homes Real Estate & Property Consultants Patna',
  description: 'Trusted Real Estate & Property Consultant in Patna, Bihar. Assisting buyers and sellers with residential plots, luxury flats, houses, and commercial property.',
  url: 'https://shyamhomespatna.com',
  logo: 'https://shyamhomespatna.com/logo.png',
  image: 'https://shyamhomespatna.com/logo.png',
  telephone: settings.phone ? `+91${settings.phone.replace(/[^0-9]/g, '')}` : '+917858832545',
  email: settings.email || 'info@shyamhomespatna.com',
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: settings.address || 'Kankarbagh Main Road, Near Tiwary Bechar',
    addressLocality: 'Patna',
    addressRegion: 'Bihar',
    postalCode: '800020',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.5941,
    longitude: 85.1376
  },
  areaServed: [
    { '@type': 'City', name: 'Patna' },
    { '@type': 'AdministrativeArea', name: 'Kankarbagh' },
    { '@type': 'AdministrativeArea', name: 'Boring Road' },
    { '@type': 'AdministrativeArea', name: 'Bailey Road' },
    { '@type': 'AdministrativeArea', name: 'Danapur' },
    { '@type': 'AdministrativeArea', name: 'Saguna More' },
    { '@type': 'AdministrativeArea', name: 'Bihta' },
    { '@type': 'AdministrativeArea', name: 'Patliputra Colony' }
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
    name: settings.consultantName || 'Dhananjay Kumar',
    jobTitle: settings.consultantRole || 'Real Estate & Property Consultant',
    telephone: settings.phone ? `+91${settings.phone.replace(/[^0-9]/g, '')}` : '+917858832545'
  }
});

export const getPropertySchema = (property) => {
  if (!property) return null;

  const isRental = property.status === 'FOR RENT';
  const priceValue = property.priceNumeric || (isRental ? 18000 : 5000000);

  return {
    '@context': 'https://schema.org',
    '@type': property.type === 'House' ? 'SingleFamilyResidence' : property.type === 'Plot' ? 'Landform' : 'Apartment',
    name: property.title,
    description: property.overview || property.description,
    url: `https://shyamhomespatna.com/property/${property.id}`,
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
        '@type': 'RealEstateAgent',
        name: 'Shyam Homes Patna',
        telephone: '+917858832545'
      }
    }
  };
};

export const getBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http') ? item.url : `https://shyamhomespatna.com${item.url}`
  }))
});

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
