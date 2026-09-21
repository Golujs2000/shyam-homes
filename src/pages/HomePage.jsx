import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertySearch from '../components/PropertySearch';
import Categories from '../components/Categories';
import FeaturedProperties from '../components/FeaturedProperties';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import AreasServed from '../components/AreasServed';
import BuySellRentCTA from '../components/BuySellRentCTA';
import HowItWorks from '../components/HowItWorks';
import SellPropertySection from '../components/SellPropertySection';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import FinalCTA from '../components/FinalCTA';
import PropertyModal from '../components/PropertyModal';

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);

  // Search handler from Hero/Search box
  const handleSearch = (criteria) => {
    // Navigate to properties page with query parameters or apply locally
    setSearchCriteria(criteria);
  };

  // Category select handler
  const handleCategorySelect = (categoryKey) => {
    navigate(`/properties?category=${encodeURIComponent(categoryKey)}`);
  };

  // Locality select handler
  const handleLocalitySelect = (localityName) => {
    navigate(`/properties?locality=${encodeURIComponent(localityName)}`);
  };

  // Quick Action from Buy / Sell / Rent CTA
  const handleActionClick = (type) => {
    if (type === 'buy') {
      navigate('/buy');
    } else if (type === 'sell') {
      navigate('/sell');
    } else if (type === 'rent') {
      navigate('/rent');
    }
  };

  return (
    <div>
      {/* 2. Hero Section */}
      <Hero onExploreClick={() => navigate('/properties')} />

      {/* 3. Property Search Box */}
      <PropertySearch onSearch={handleSearch} currentFilters={searchCriteria} />

      {/* 4. Property Categories */}
      <Categories onSelectCategory={handleCategorySelect} />

      {/* 5. Featured Properties */}
      <div id="featured-properties">
        <FeaturedProperties
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          filterCriteria={searchCriteria}
        />
      </div>

      {/* 6. Why Choose Shyam Homes */}
      <WhyChooseUs />

      {/* 7. About Shyam Homes */}
      <AboutUs />

      {/* 8. Property Services */}
      <Services onSelectService={(serviceId) => navigate('/properties')} />

      {/* 9. Areas We Serve */}
      <AreasServed onSelectLocality={handleLocalitySelect} />

      {/* 10. Buy / Sell / Rent CTA */}
      <BuySellRentCTA onAction={handleActionClick} />

      {/* 11. How It Works */}
      <HowItWorks />

      {/* 12. Sell Your Property CTA */}
      <SellPropertySection />

      {/* 13. Customer Testimonials */}
      <Testimonials />

      {/* 14. FAQ */}
      <FAQSection />

      {/* 15. Final CTA */}
      <FinalCTA />

      {/* Property Details Modal */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
