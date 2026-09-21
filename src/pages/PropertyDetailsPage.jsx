import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Heart, Share2, MapPin, Bed, Bath, Maximize2, Building,
  Compass, Car, FileCheck, CheckCircle2, Phone, MessageCircle, Calendar,
  Clock, Shield, Send, ArrowRight, Check, Sparkles, X, ChevronLeft, Video
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, addEnquiry, addVisit, settings } = useAdminData();

  // Find property by id or fallback to first
  const property = properties.find((p) => p.id === id) || properties[0];

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Forms state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    interest: 'Buying this property',
    message: `I would like more information regarding ${property.title} (${property.propertyId}).`
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const [visitForm, setVisitForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: 'Morning (10:00 AM - 1:00 PM)'
  });
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  // Similar properties (exclude current)
  const similarProperties = properties.filter((p) => p.id !== property.id).slice(0, 3);

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  const handleSaveToggle = () => {
    setSaved(!saved);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // Helper to convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube-nocookie.com/embed/${match[2]}` : null;
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();

    // Store in admin context
    addEnquiry({
      propertyId: property.propertyId,
      propertyTitle: property.title,
      clientName: enquiryForm.name,
      phone: enquiryForm.phone,
      purpose: enquiryForm.interest,
      message: enquiryForm.message,
    });

    const msg = `*Property Enquiry (${property.propertyId}) - Shyam Homes*\n\n` +
      `*Property:* ${property.title}\n` +
      `*Price:* ${property.price}\n` +
      `*Location:* ${property.location}\n` +
      `*Client Name:* ${enquiryForm.name}\n` +
      `*Phone:* ${enquiryForm.phone}\n` +
      `*Interest:* ${enquiryForm.interest}\n` +
      `*Message:* ${enquiryForm.message}`;

    window.open(`https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent(msg)}`, '_blank');
    setEnquirySubmitted(true);
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();

    // Store in admin context
    addVisit({
      propertyId: property.propertyId,
      propertyTitle: property.title,
      clientName: visitForm.name,
      phone: visitForm.phone,
      date: visitForm.date || new Date().toISOString().split('T')[0],
      time: visitForm.time,
    });

    const msg = `*Site Visit Booking (${property.propertyId}) - Shyam Homes*\n\n` +
      `*Property:* ${property.title}\n` +
      `*Location:* ${property.location}\n` +
      `*Client Name:* ${visitForm.name}\n` +
      `*Phone:* ${visitForm.phone}\n` +
      `*Preferred Date:* ${visitForm.date || 'Earliest available'}\n` +
      `*Preferred Time:* ${visitForm.time}`;

    window.open(`https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent(msg)}`, '_blank');
    setVisitSubmitted(true);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const directWhatsAppUrl = `https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent(`Hello Shyam Homes, I am interested in ${property.title} (${property.propertyId}) priced at ${property.price}. Please provide full details.`)}`;

  return (
    <div className="pt-24 pb-24 bg-surface-light min-h-screen text-left">
      {/* 2. Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500">
          <Link to="/" className="hover:text-gold-600 transition-colors font-medium">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/properties" className="hover:text-gold-600 transition-colors font-medium">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/properties?category=${encodeURIComponent(property.category)}`} className="hover:text-gold-600 transition-colors font-medium">
            {property.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-navy-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {property.title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* 3. PROPERTY IMAGE GALLERY */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-premium overflow-hidden mb-8">
          <div className="relative h-72 sm:h-96 md:h-[480px] lg:h-[540px] w-full rounded-2xl overflow-hidden bg-navy-950">
            {/* Active Main Image */}
            <img
              src={images[activeImageIndex]}
              alt={`${property.title} - View ${activeImageIndex + 1}`}
              onClick={() => setFullscreenOpen(true)}
              className="w-full h-full object-cover cursor-zoom-in transition-all duration-300"
            />

            {/* Top-Left Badge */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-md ${
                property.status === 'FOR SALE' ? 'bg-emerald-600' : property.status === 'FOR RENT' ? 'bg-blue-600' : 'bg-purple-600'
              }`}>
                {property.status}
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider bg-navy-900/90 text-gold-400 border border-gold-500/30">
                {property.propertyId}
              </span>
            </div>

            {/* Top-Right Save Property & Video Tour Buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              {property.video && (
                <button
                  onClick={() => scrollToSection('property-video')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 transition-all shadow-md font-bold text-xs"
                >
                  <Video className="w-4 h-4" />
                  <span>Video Tour</span>
                </button>
              )}
              <button
                onClick={handleSaveToggle}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl backdrop-blur-md transition-all shadow-md font-semibold text-xs ${
                  saved
                    ? 'bg-rose-600 text-white'
                    : 'bg-navy-900/80 hover:bg-navy-900 text-white border border-white/20'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
                <span>{saved ? 'Saved' : 'Save Property'}</span>
              </button>
            </div>

            {/* Image Counter & Fullscreen trigger */}
            <div className="absolute bottom-4 right-4 z-10 bg-navy-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-white border border-white/10">
              {activeImageIndex + 1} / {images.length} Photos
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3 mt-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-16 sm:h-20 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-gold-500 scale-[1.02] shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Save Notification Toast */}
        {saveToast && (
          <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-gold-500/40 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-gold-400" />
            <span>{saved ? 'Property saved to your favorites!' : 'Removed from saved properties.'}</span>
          </div>
        )}

        {/* 4. PROPERTY SUMMARY & PRIMARY ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Summary Box (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-premium space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-navy-900 leading-snug">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Price */}
              <div className="sm:text-right shrink-0">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-medium">Pricing</span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-navy-900">
                  {property.price}
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-gold-50 text-gold-800 text-[11px] font-bold mt-1 border border-gold-200">
                  {property.priceNote || 'Negotiable'}
                </span>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                <span className="text-xs text-slate-400 block mb-1">🏠 Property Type</span>
                <span className="font-bold text-navy-900 text-sm sm:text-base">{property.type}</span>
              </div>

              {property.beds && (
                <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">🛏 Bedrooms</span>
                  <span className="font-bold text-navy-900 text-sm sm:text-base">{property.beds} BHK</span>
                </div>
              )}

              {property.baths && (
                <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                  <span className="text-xs text-slate-400 block mb-1">🛁 Bathrooms</span>
                  <span className="font-bold text-navy-900 text-sm sm:text-base">{property.baths} Baths</span>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                <span className="text-xs text-slate-400 block mb-1">📐 Area</span>
                <span className="font-bold text-navy-900 text-sm sm:text-base">{property.area}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                <span className="text-xs text-slate-400 block mb-1">🏢 Floor</span>
                <span className="font-bold text-navy-900 text-sm sm:text-base">{property.floor || 'Independent'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                <span className="text-xs text-slate-400 block mb-1">🚗 Parking</span>
                <span className="font-bold text-navy-900 text-sm sm:text-base">{property.parking || 'Available'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                <span className="text-xs text-slate-400 block mb-1">🧭 Facing</span>
                <span className="font-bold text-navy-900 text-sm sm:text-base">{property.facing || 'East'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface-light border border-slate-100">
                <span className="text-xs text-slate-400 block mb-1">📜 Status</span>
                <span className="font-bold text-navy-900 text-sm sm:text-base">{property.possession || 'Ready to Move'}</span>
              </div>
            </div>

            {/* 5. PRIMARY ACTIONS (Desktop) */}
            <div className="hidden sm:grid grid-cols-3 gap-3 pt-2">
              <a
                href={`tel:${settings.phone || '7858832545'}`}
                className="py-3.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Now</span>
              </a>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => scrollToSection('schedule-visit')}
                className="py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-gold-glow"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Visit</span>
              </button>
            </div>
          </div>

          {/* Sticky Consultant Contact Card (4 cols) */}
          <div className="lg:col-span-4 bg-navy-950 text-white p-6 sm:p-7 rounded-3xl border border-navy-800 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 font-bold flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] text-gold-400 uppercase tracking-widest font-semibold block">
                  Lead Consultant
                </span>
                <h3 className="font-serif text-lg font-bold text-white">{settings.consultantName || 'Dhananjay Kumar'}</h3>
                <p className="text-xs text-slate-400">{settings.consultantRole || 'Shyam Homes Property Advisory'}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Have questions about this property's registry, circle rate, or wish to schedule a physical visit in Patna? Contact directly.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={`tel:${settings.phone || '7858832545'}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl text-sm border border-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call {settings.phone || '7858832545'}</span>
              </a>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-sm transition-all shadow-gold-glow"
              >
                <MessageCircle className="w-4 h-4 fill-navy-950" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-navy-800/80 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                <span>Free On-Site Accompanied Visit</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                <span>100% Clear Title Verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. PROPERTY OVERVIEW */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-premium mb-8">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3">
            Property Overview
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {property.overview}
          </p>
        </div>

        {/* 6.5. PROPERTY VIDEO WALKTHROUGH (If available) */}
        {property.video && (
          <div id="property-video" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-premium mb-8 scroll-mt-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-600 flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">Property Video Walkthrough</h2>
                  <p className="text-xs text-slate-500">HD virtual tour and on-ground walkthrough</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-navy-950 shadow-inner">
              {getYouTubeEmbedUrl(property.video) ? (
                <iframe
                  src={getYouTubeEmbedUrl(property.video)}
                  title="Property Video Tour"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={property.video}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        )}

        {/* 7. PROPERTY DETAILS (SPECIFICATION GRID) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-premium mb-8">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">
            Property Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Property ID</span>
              <span className="font-semibold text-navy-900">{property.propertyId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Property Type</span>
              <span className="font-semibold text-navy-900">{property.type}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Listing Type</span>
              <span className="font-semibold text-navy-900">{property.status}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Price</span>
              <span className="font-semibold text-navy-900">{property.price}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Built-up Area</span>
              <span className="font-semibold text-navy-900">{property.builtUpArea || property.area}</span>
            </div>

            {property.beds && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Bedrooms</span>
                <span className="font-semibold text-navy-900">{property.beds}</span>
              </div>
            )}

            {property.baths && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Bathrooms</span>
                <span className="font-semibold text-navy-900">{property.baths}</span>
              </div>
            )}

            {property.balconies && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Balcony</span>
                <span className="font-semibold text-navy-900">{property.balconies}</span>
              </div>
            )}

            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Floor</span>
              <span className="font-semibold text-navy-900">{property.floor}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Parking</span>
              <span className="font-semibold text-navy-900">{property.parking}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Facing</span>
              <span className="font-semibold text-navy-900">{property.facing}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Furnishing</span>
              <span className="font-semibold text-navy-900">{property.furnishing}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Possession</span>
              <span className="font-semibold text-navy-900">{property.possession}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Road Width</span>
              <span className="font-semibold text-navy-900">{property.roadWidth}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Ownership</span>
              <span className="font-semibold text-navy-900">{property.ownership}</span>
            </div>
          </div>
        </div>

        {/* 8. FEATURES & AMENITIES */}
        {property.amenities && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-premium mb-8">
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">
              Features & Amenities
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {property.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-surface-light border border-slate-100 text-sm font-medium text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. LOCATION & NEARBY PLACES */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-premium mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy-900">
                Property Location
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {property.location}
              </p>
            </div>
            <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 self-start sm:self-auto">
              Patna, Bihar
            </span>
          </div>

          {/* Google Maps Embed Frame */}
          <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 mb-8 bg-slate-100">
            <iframe
              title={`Map of ${property.location}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(property.mapQuery || property.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
          </div>

          {/* Nearby Places */}
          {property.nearbyPlaces && (
            <div>
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-4">
                Nearby Landmarks & Essential Facilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.nearbyPlaces.map((place, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-surface-light rounded-xl border border-slate-100 text-sm">
                    <span className="text-slate-700 font-medium">{place.name}</span>
                    <span className="text-gold-700 font-bold text-xs bg-gold-50 px-2 py-0.5 rounded">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 10. PROPERTY DESCRIPTION */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-premium mb-8 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-navy-900">
            About This Property
          </h2>

          <div className="space-y-4 text-slate-600 text-base leading-relaxed">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                Detailed Property Specs
              </h3>
              <p>{property.description}</p>
            </div>

            {property.locationAdvantage && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  Location Advantage
                </h3>
                <p>{property.locationAdvantage}</p>
              </div>
            )}

            {property.suitableFor && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  Suitable For
                </h3>
                <p>{property.suitableFor}</p>
              </div>
            )}
          </div>
        </div>

        {/* 11. ENQUIRY FORM & CONTACT CONSULTANT */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border border-navy-800 shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Interested in This Property?
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Share your details and Dhananjay Kumar will contact you with full registry details and visit availability.
              </p>

              {enquirySubmitted ? (
                <div className="p-6 bg-gold-500/10 border border-gold-500/30 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-gold-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-white">Enquiry Sent!</h4>
                  <p className="text-xs text-slate-300">
                    Your enquiry has been received by our property desk and forwarded to WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={enquiryForm.name}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                        className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={enquiryForm.phone}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                        className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">I'm Interested In</label>
                    <select
                      value={enquiryForm.interest}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, interest: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="Buying this property">Buying this property</option>
                      <option value="Site visit this weekend">Scheduling a site visit</option>
                      <option value="Price negotiation">Price negotiation & title check</option>
                      <option value="Loan options">Home loan assistance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-300 mb-1.5">Message</label>
                    <textarea
                      rows={3}
                      value={enquiryForm.message}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                      className="w-full bg-navy-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND ENQUIRY VIA WHATSAPP</span>
                  </button>
                </form>
              )}
            </div>

            {/* Beside Form: Contact Shyam Homes */}
            <div className="lg:col-span-5 bg-navy-900 p-6 sm:p-8 rounded-2xl border border-navy-800 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Contact Shyam Homes</span>
                <h3 className="font-serif text-2xl font-bold text-white">{settings.consultantName || 'Dhananjay Kumar'}</h3>
                <p className="text-xs text-slate-300">
                  {settings.consultantRole || 'Real Estate & Property Consultant'} • Patna, Bihar
                </p>

                <div className="pt-2">
                  <span className="text-xs text-slate-400 block">Direct Consultation Line</span>
                  <a href={`tel:${settings.phone || '7858832545'}`} className="text-xl font-serif font-bold text-gold-400 hover:underline">
                    {settings.phone || '7858832545'}
                  </a>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-navy-800">
                <a
                  href={`tel:${settings.phone || '7858832545'}`}
                  className="w-full py-3 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call Now</span>
                </a>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 12. SCHEDULE A PROPERTY VISIT */}
        <div id="schedule-visit" className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-premium mb-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-700 text-xs font-bold uppercase tracking-wider mb-2">
              On-Ground Inspection
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
              Want to Visit This Property?
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Schedule a convenient time to view the property with our local consultant.
            </p>
          </div>

          {visitSubmitted ? (
            <div className="p-8 bg-gold-500/10 border border-gold-500/30 rounded-2xl text-center space-y-3 max-w-xl mx-auto">
              <CheckCircle2 className="w-12 h-12 text-gold-500 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-navy-900">Visit Scheduled!</h4>
              <p className="text-xs text-slate-600">
                We have recorded your visit for {property.title}. Dhananjay Kumar will confirm via WhatsApp / call.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVisitSubmit} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={visitForm.name}
                    onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={visitForm.phone}
                    onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={visitForm.date}
                    onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Preferred Time</label>
                  <select
                    value={visitForm.time}
                    onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-gold-500"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold uppercase tracking-wider text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Schedule Visit</span>
              </button>
            </form>
          )}
        </div>

        {/* 13. SIMILAR PROPERTIES */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                You May Also Like
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Other recommended properties in Patna
              </p>
            </div>

            <Link
              to="/properties"
              className="text-xs sm:text-sm font-bold text-navy-900 hover:text-gold-600 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((sim) => (
              <div
                key={sim.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={sim.image}
                    alt={sim.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-navy-900/90 text-gold-400 text-xs font-bold uppercase">
                      {sim.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-serif text-xl font-bold text-navy-900 mb-1">
                      {sim.price}
                    </div>
                    <Link
                      to={`/property/${sim.id}`}
                      className="font-serif text-base font-bold text-navy-900 hover:text-gold-600 transition-colors line-clamp-1 block"
                    >
                      {sim.title}
                    </Link>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{sim.location}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-2 font-medium">
                      {sim.area}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <Link
                      to={`/property/${sim.id}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-navy-900 hover:text-white text-navy-900 font-semibold rounded-lg text-xs transition-colors"
                    >
                      <span>View Property →</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 14. FINAL CTA */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-12 text-center border border-navy-800 shadow-2xl relative overflow-hidden mb-8">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Still Looking for the Right Property?
            </h2>
            <p className="text-slate-300 text-sm font-light">
              Tell Shyam Homes what you're looking for and we'll help you explore available options in Patna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                to="/properties"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-sm border border-slate-700"
              >
                Find More Properties
              </Link>
              <a
                href={`https://wa.me/91${settings.whatsapp || '7858832545'}?text=${encodeURIComponent("Hello Shyam Homes, I am still looking for a property in Patna.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-gold-glow"
              >
                WhatsApp Shyam Homes
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Sticky Bottom Actions on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-md border-t border-navy-800 p-3 flex gap-2">
        <a
          href={`tel:${settings.phone || '7858832545'}`}
          className="flex-1 py-3 rounded-xl bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
        >
          <Phone className="w-3.5 h-3.5 text-gold-400" />
          <span>Call {settings.phone || '7858832545'}</span>
        </a>

        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Fullscreen Gallery Lightbox Modal */}
      {fullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in">
          <div className="flex items-center justify-between text-white p-2">
            <span className="font-serif font-bold text-sm">
              {property.title} — Photo {activeImageIndex + 1} of {images.length}
            </span>
            <button
              onClick={() => setFullscreenOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center max-h-[80vh] px-2">
            <img
              src={images[activeImageIndex]}
              alt="Fullscreen view"
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 ${
                  activeImageIndex === i ? 'border-gold-500' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
