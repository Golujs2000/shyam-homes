import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { AdminDataProvider } from './context/AdminDataContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import RentPage from './pages/RentPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ListPropertyPage from './pages/ListPropertyPage';

// Admin Pages & Protected Route
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminLeads from './pages/admin/AdminLeads';
import AdminVisits from './pages/admin/AdminVisits';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminSettings from './pages/admin/AdminSettings';
import AdminListingRequests from './pages/admin/AdminListingRequests';

// Public Website Layout Wrapper
function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface-light text-heading flex flex-col selection:bg-gold-500 selection:text-white">
      <Header />
      <main className="flex-grow pb-16 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function App() {
  return (
    <AdminDataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <ProtectedRoute>
                <AdminProperties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute>
                <AdminLeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/visits"
            element={
              <ProtectedRoute>
                <AdminVisits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <AdminEnquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/listing-requests"
            element={
              <ProtectedRoute>
                <AdminListingRequests />
              </ProtectedRoute>
            }
          />

          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/list-property" element={<ListPropertyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </AdminDataProvider>
  );
}

export default App;
