import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, Bed, Bath, Maximize2, ShieldCheck, Check, Phone, MessageCircle, Calendar, Compass, Car } from 'lucide-react';

export default function PropertyModal({ property, onClose }) {
  if (!property) return null;

  const [selectedImage, setSelectedImage] = useState(property.image);

  const whatsappMessage = `Hello Shyam Homes, I am interested in property "${property.title}" (${property.price}) located at ${property.location}. Please share more details.`;
  const whatsappUrl = `https://wa.me/917858832545?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-navy-900/80 hover:bg-navy-900 text-white flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="max-h-[88vh] overflow-y-auto">
          {/* Main Showcase Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-navy-950">
            <img
              src={selectedImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {/* Badge overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase text-white shadow-md ${
                property.status === 'FOR SALE' ? 'bg-emerald-600' : 'bg-blue-600'
              }`}>
                {property.status}
              </span>
              <span className="px-3 py-1.5 rounded-md text-xs font-bold tracking-wider bg-navy-900/90 text-gold-400 border border-gold-500/30">
                {property.type}
              </span>
            </div>

            {/* Price Pill */}
            <div className="absolute bottom-4 left-4 bg-navy-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-gold-500/30 text-white shadow-xl">
              <span className="text-xs text-slate-300 block uppercase font-medium">Price</span>
              <span className="font-serif text-2xl font-bold text-gold-400">{property.price}</span>
            </div>
          </div>

          {/* Gallery Thumbnails (if multiple images) */}
          {property.gallery && property.gallery.length > 1 && (
            <div className="flex gap-2 p-3 bg-slate-100 border-b border-slate-200 overflow-x-auto">
              {property.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === imgUrl ? 'border-gold-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6 text-left">
            {/* Title & Location */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-900">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-slate-600 text-sm sm:text-base mt-2">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-200">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-gold-600" />
                  <span>Carpet Area</span>
                </div>
                <div className="font-bold text-navy-900 text-sm sm:text-base">{property.area}</div>
              </div>

              {property.beds && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Bed className="w-3.5 h-3.5 text-gold-600" />
                    <span>Bedrooms</span>
                  </div>
                  <div className="font-bold text-navy-900 text-sm sm:text-base">{property.beds} BHK</div>
                </div>
              )}

              {property.baths && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Bath className="w-3.5 h-3.5 text-gold-600" />
                    <span>Bathrooms</span>
                  </div>
                  <div className="font-bold text-navy-900 text-sm sm:text-base">{property.baths} Baths</div>
                </div>
              )}

              {property.facing && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Compass className="w-3.5 h-3.5 text-gold-600" />
                    <span>Facing</span>
                  </div>
                  <div className="font-bold text-navy-900 text-sm">{property.facing}</div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base font-bold text-navy-900 uppercase tracking-wider mb-2">
                Property Overview
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {property.description}
              </p>
            </div>

            {/* Highlights List */}
            {property.highlights && (
              <div>
                <h3 className="text-base font-bold text-navy-900 uppercase tracking-wider mb-3">
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {property.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Consultant Contact Box */}
            <div className="bg-navy-900 rounded-xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block">
                  Lead Property Consultant
                </span>
                <h4 className="text-lg font-bold text-white">Dhananjay Kumar</h4>
                <p className="text-xs text-slate-300">Shyam Homes • Patna Property Consultant</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href="tel:7858832545"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors border border-slate-700"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>Call 7858832545</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-gold-glow"
                >
                  <MessageCircle className="w-4 h-4 fill-navy-950" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* View Full Property Details Page Link */}
            <div className="text-center pt-2">
              <Link
                to={`/property/${property.id}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-950 hover:text-gold-600 transition-colors py-2 px-4 rounded-xl hover:bg-slate-100"
              >
                <span>View Complete 14-Section Property Details Page</span>
                <span className="text-gold-500 font-serif text-lg">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
