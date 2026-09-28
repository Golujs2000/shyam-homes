import React, { useState, useRef, useCallback } from "react";
import {
  Send, CheckCircle2, Phone, MessageCircle, Camera, Trash2, Home,
  TrendingUp, ShieldCheck, Clock, Star, Video, X, Upload, AlertCircle,
  Building2, MapPin, IndianRupee, Compass, Car, Sparkles, Check,
  Layers, KeyRound, Tag, UserCheck, HelpCircle
} from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { localities } from "../data/localities";
import { uploadMediaFile, deleteMediaFile, validateMediaFile, MEDIA_LIMITS } from "../services/storageService";

const formatBytes = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const PROPERTY_TYPES = [
  { id: "Flat", label: "Apartment / Flat", icon: "🏢" },
  { id: "House", label: "Independent House / Villa", icon: "🏡" },
  { id: "Plot", label: "Residential Plot", icon: "📐" },
  { id: "Commercial", label: "Commercial Shop / Office", icon: "🏬" },
  { id: "Land", label: "Commercial / Bulk Land", icon: "🌾" },
];

const BHK_OPTIONS = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const BATH_OPTIONS = ["1", "2", "3", "4", "5+"];
const BALCONY_OPTIONS = ["0", "1", "2", "3", "3+"];
const FURNISHING_OPTIONS = ["Unfurnished", "Semi-Furnished", "Fully Furnished"];
const POSSESSION_OPTIONS = ["Ready to Move", "Under Construction", "Within 15 Days", "Within 30 Days", "Immediate"];
const OWNERSHIP_OPTIONS = ["Freehold (Registry & Mutation)", "Leasehold", "Power of Attorney", "Cooperative Society"];
const PARKING_OPTIONS = ["1 Covered Car Parking", "2 Covered Car Parking", "Open Car Parking", "Bike Parking Only", "No Reserved Parking"];
const FACING_OPTIONS = ["East Facing", "North Facing", "North-East Facing", "West Facing", "South Facing", "South-East Facing", "North-West Facing"];
const ROAD_WIDTH_OPTIONS = ["15 ft Road", "20 ft Road", "25 ft Road", "30 ft Road", "40 ft Road", "50+ ft Main Road"];

const POPULAR_AMENITIES = [
  "Covered Parking",
  "24/7 Water Supply",
  "100% Power Backup",
  "Passenger Elevator / Lift",
  "24x7 Security Guard",
  "CCTV Surveillance",
  "Gated Community / Society",
  "Private Balcony",
  "Boundary Wall",
  "Wide Road Access",
  "Vastu Compliant",
  "Fire Safety Approved",
  "Children's Park / Garden"
];

export default function ListPropertyPage() {
  const { addListingRequest, settings } = useAdminData();

  const [formData, setFormData] = useState({
    // Purpose & Role
    purpose: "Sale", // 'Sale' | 'Rent'
    userRole: "Owner", // 'Owner' | 'Builder' | 'Agent'

    // Basic Property
    propertyType: "Flat",
    locality: "Kankarbagh",
    landmark: "",
    address: "",

    // Rooms & Layout (applicable to Flat / House)
    bhk: "3 BHK",
    beds: 3,
    baths: 2,
    balconies: 2,
    furnishing: "Semi-Furnished",
    floor: "3rd Floor",
    totalFloors: "6 Floors",
    facing: "East Facing",

    // Area & Dimensions
    area: "",
    areaUnit: "sq.ft",
    carpetArea: "",
    roadWidth: "30 ft Road",

    // Plot/Land specifics
    boundaryWall: "Yes",
    cornerPlot: "No",
    gatedLayout: "Yes",

    // Price & Terms
    expectedPrice: "",
    priceNote: "Negotiable",
    possession: "Ready to Move",
    ownership: "Freehold (Registry & Mutation)",
    parking: "1 Covered Car Parking",

    // Amenities
    amenities: [
      "Covered Parking",
      "24/7 Water Supply",
      "100% Power Backup",
      "24x7 Security Guard",
      "CCTV Surveillance"
    ],

    // Description & Notes
    message: "",

    // Contact details
    name: "",
    phone: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Media items state: { id, file, type, preview, status, progress, url, path, name, size, error }
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaErrors, setMediaErrors] = useState([]);
  const requestIdRef = useRef(`lr-${Date.now()}`);
  const fileInputRef = useRef(null);

  const isResidentialBuilding = formData.propertyType === "Flat" || formData.propertyType === "House";
  const isPlotOrLand = formData.propertyType === "Plot" || formData.propertyType === "Land";

  const uploadingCount = mediaItems.filter((m) => m.status === "uploading").length;
  const imageCount = mediaItems.filter((m) => m.type === "image").length;
  const videoCount = mediaItems.filter((m) => m.type === "video").length;
  const canAddImages = imageCount < MEDIA_LIMITS.MAX_IMAGES;
  const canAddVideos = videoCount < MEDIA_LIMITS.MAX_VIDEOS;

  const handleMediaSelect = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    e.target.value = "";

    const errors = [];
    const toUpload = [];

    for (const file of files) {
      const validationError = validateMediaFile(file);
      if (validationError) { errors.push(validationError); continue; }

      const isImage = MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type);
      const curImages = mediaItems.filter((m) => m.type === "image").length + toUpload.filter((f) => MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(f.type)).length;
      const curVideos = mediaItems.filter((m) => m.type === "video").length + toUpload.filter((f) => !MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(f.type)).length;

      if (isImage && curImages >= MEDIA_LIMITS.MAX_IMAGES) { errors.push(`Max ${MEDIA_LIMITS.MAX_IMAGES} images. "${file.name}" skipped.`); continue; }
      if (!isImage && curVideos >= MEDIA_LIMITS.MAX_VIDEOS) { errors.push(`Max ${MEDIA_LIMITS.MAX_VIDEOS} videos. "${file.name}" skipped.`); continue; }
      toUpload.push(file);
    }

    setMediaErrors(errors);
    if (toUpload.length === 0) return;

    const newItems = toUpload.map((file) => {
      const isImage = MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type);
      return {
        id: `media-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        type: isImage ? "image" : "video",
        preview: isImage ? URL.createObjectURL(file) : null,
        status: "uploading",
        progress: 0,
        url: null,
        path: null,
        name: file.name,
        size: file.size,
        error: null,
      };
    });

    setMediaItems((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      try {
        const result = await uploadMediaFile(item.file, requestIdRef.current, (percent) => {
          setMediaItems((prev) => prev.map((m) => m.id === item.id ? { ...m, progress: percent } : m));
        });
        setMediaItems((prev) => prev.map((m) => m.id === item.id ? { ...m, status: "done", progress: 100, url: result.url, path: result.path } : m));
      } catch (err) {
        setMediaItems((prev) => prev.map((m) => m.id === item.id ? { ...m, status: "error", error: err.message } : m));
      }
    }
  }, [mediaItems]);

  const handleRemoveMedia = useCallback(async (item) => {
    if (item.preview) URL.revokeObjectURL(item.preview);
    setMediaItems((prev) => prev.filter((m) => m.id !== item.id));
    if (item.path) deleteMediaFile(item.path).catch(console.warn);
  }, []);

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadingCount > 0) return;
    setLoading(true);

    const doneMedia = mediaItems.filter((m) => m.status === "done");
    const imageUrls = doneMedia.filter((m) => m.type === "image").map((m) => m.url);
    const videoUrls = doneMedia.filter((m) => m.type === "video").map((m) => m.url);
    const mediaUrls = doneMedia.map((m) => m.url);

    const submissionPayload = {
      ...formData,
      mediaUrls,
      imageUrls,
      videoUrls,
      mediaCount: doneMedia.length,
      beds: isResidentialBuilding ? (formData.bhk ? parseInt(formData.bhk, 10) : formData.beds) : null,
      baths: isResidentialBuilding ? formData.baths : null,
      balconies: isResidentialBuilding ? formData.balconies : null,
    };

    await addListingRequest(submissionPayload);

    // Build professional, formatted WhatsApp message for Shyam Homes
    const purposeLabel = formData.purpose === "Rent" ? "For Rent / Lease" : "For Sale";
    const typeLabel = isResidentialBuilding ? `${formData.bhk} ${formData.propertyType}` : formData.propertyType;
    const formattedArea = `${formData.area} ${formData.areaUnit}`;

    let msg =
      `*🏛️ Property Listing Submission - Shyam Homes*\n\n` +
      `*📋 Listing Overview:*\n` +
      `• *Purpose:* ${purposeLabel}\n` +
      `• *Type:* ${typeLabel}\n` +
      `• *Locality:* ${formData.locality}, Patna\n` +
      (formData.landmark ? `• *Landmark:* ${formData.landmark}\n` : "") +
      `• *Area:* ${formattedArea}\n` +
      `• *Price:* ${formData.expectedPrice} (${formData.priceNote})\n\n`;

    if (isResidentialBuilding) {
      msg +=
        `*🛋️ Property Specifications:*\n` +
        `• *Bedrooms:* ${formData.bhk}\n` +
        `• *Bathrooms:* ${formData.baths}\n` +
        `• *Balconies:* ${formData.balconies}\n` +
        `• *Furnishing:* ${formData.furnishing}\n` +
        `• *Floor:* ${formData.floor} (Total: ${formData.totalFloors})\n` +
        `• *Facing:* ${formData.facing}\n` +
        `• *Parking:* ${formData.parking}\n` +
        `• *Possession:* ${formData.possession}\n` +
        `• *Ownership:* ${formData.ownership}\n` +
        `• *Road Width:* ${formData.roadWidth}\n\n`;
    } else if (isPlotOrLand) {
      msg +=
        `*📐 Plot Details:*\n` +
        `• *Area:* ${formattedArea}\n` +
        `• *Boundary Wall:* ${formData.boundaryWall}\n` +
        `• *Corner Plot:* ${formData.cornerPlot}\n` +
        `• *Facing:* ${formData.facing}\n` +
        `• *Road Width:* ${formData.roadWidth}\n` +
        `• *Ownership:* ${formData.ownership}\n\n`;
    }

    if (formData.amenities.length > 0) {
      msg += `*✨ Amenities (${formData.amenities.length}):*\n` + formData.amenities.map((a) => `✓ ${a}`).join("\n") + `\n\n`;
    }

    if (formData.message) {
      msg += `*📝 Details / Notes:*\n"${formData.message}"\n\n`;
    }

    msg +=
      `*👤 Owner / Submitter:*\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Role:* ${formData.userRole}\n` +
      (formData.email ? `• *Email:* ${formData.email}\n` : "");

    if (imageUrls.length > 0) {
      msg += `\n*📸 Photos (${imageUrls.length}):*\n` + imageUrls.map((u, i) => `${i + 1}. ${u}`).join("\n");
    }
    if (videoUrls.length > 0) {
      msg += `\n*🎬 Videos (${videoUrls.length}):*\n` + videoUrls.map((u, i) => `${i + 1}. ${u}`).join("\n");
    }

    window.open(`https://wa.me/91${settings.whatsapp || "7858832545"}?text=${encodeURIComponent(msg)}`, "_blank");
    setLoading(false);
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      purpose: "Sale",
      userRole: "Owner",
      propertyType: "Flat",
      locality: "Kankarbagh",
      landmark: "",
      address: "",
      bhk: "3 BHK",
      beds: 3,
      baths: 2,
      balconies: 2,
      furnishing: "Semi-Furnished",
      floor: "3rd Floor",
      totalFloors: "6 Floors",
      facing: "East Facing",
      area: "",
      areaUnit: "sq.ft",
      carpetArea: "",
      roadWidth: "30 ft Road",
      boundaryWall: "Yes",
      cornerPlot: "No",
      gatedLayout: "Yes",
      expectedPrice: "",
      priceNote: "Negotiable",
      possession: "Ready to Move",
      ownership: "Freehold (Registry & Mutation)",
      parking: "1 Covered Car Parking",
      amenities: [
        "Covered Parking",
        "24/7 Water Supply",
        "100% Power Backup",
        "24x7 Security Guard",
        "CCTV Surveillance"
      ],
      message: "",
      name: "",
      phone: "",
      email: "",
    });
    setMediaItems([]);
    setMediaErrors([]);
    requestIdRef.current = `lr-${Date.now()}`;
  };

  const benefits = [
    { icon: TrendingUp, title: "Maximum Exposure", desc: "Your property showcased directly to thousands of pre-screened buyers across Patna." },
    { icon: ShieldCheck, title: "Free Market Valuation", desc: "Accurate price estimation based on local Patna circle rates and recent registry records." },
    { icon: Clock, title: "Fast Verification", desc: "Our senior consultant reviews your submission and connects with you within 24 hours." },
    { icon: Home, title: "End-to-End Handling", desc: "From site photos & client visits to paperwork and registry assistance — 100% transparent." },
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-lightblue-200 bg-gradient-to-br from-gunmetal-950 via-gunmetal-900 to-gunmetal-800 text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,#ffc64f_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-primary-400" /> Premium Property Listing Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white max-w-3xl">
            List Your Property on <span className="text-primary-400 italic font-normal">Shyam Homes</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Sell or rent your flat, independent house, plot, or commercial property with complete transparency. Free listing with zero upfront fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-5 border-t border-white/10">
            <a
              href="tel:7858832545"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-gunmetal-950 font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" /> <span>Call 7858832545 for Quick Listing</span>
            </a>
            <a
              href={`https://wa.me/917858832545?text=${encodeURIComponent("Hello Shyam Homes, I want to list my property in Patna.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-primary-400" /> <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Form Container (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-premium p-6 sm:p-9">
              <div className="mb-7 border-b pb-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600 mb-1">
                  <Sparkles className="w-4 h-4 text-primary-600" /> Complete Property Specifications
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gunmetal-900">
                  Submit Full Property Details
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Provide all property details so our team can review, verify, and publish your listing with maximum buyer interest.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-primary-500/10 border border-primary-500/30 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-primary-700 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-gunmetal-900">Listing Request Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Our senior consultant Dhananjay Kumar will contact you on <strong>{formData.phone}</strong> within 24 hours to confirm your property specifications and arrange site verification.
                  </p>
                  {mediaItems.filter((m) => m.status === "done").length > 0 && (
                    <p className="text-xs text-slate-500">
                      ✓ {mediaItems.filter((m) => m.status === "done").length} media file(s) uploaded and securely attached.
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded-xl bg-gunmetal-900 text-primary-400 font-bold text-xs uppercase tracking-wider hover:bg-gunmetal-800 transition-colors"
                    >
                      List Another Property
                    </button>
                    <a
                      href="/properties"
                      className="px-6 py-2.5 rounded-xl bg-primary-500 text-gunmetal-950 font-bold text-xs uppercase tracking-wider hover:bg-primary-400 transition-colors"
                    >
                      Browse Properties
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Section 1: Purpose & Property Type */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                        <KeyRound className="w-4 h-4 text-primary-600" />
                        <span>1. Purpose &amp; Property Category</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-medium">* Required</span>
                    </div>

                    {/* Purpose Selector */}
                    <div>
                      <span className="block text-xs font-semibold text-slate-600 mb-2">I want to:</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, purpose: "Sale" })}
                          className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            formData.purpose === "Sale"
                              ? "bg-gunmetal-900 text-primary-400 border-gunmetal-900 shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <Tag className="w-4 h-4" />
                          <span>Sell My Property</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, purpose: "Rent" })}
                          className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            formData.purpose === "Rent"
                              ? "bg-gunmetal-900 text-primary-400 border-gunmetal-900 shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <Home className="w-4 h-4" />
                          <span>Rent Out My Property</span>
                        </button>
                      </div>
                    </div>

                    {/* Property Type Grid */}
                    <div>
                      <span className="block text-xs font-semibold text-slate-600 mb-2">Select Property Type:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {PROPERTY_TYPES.map((t) => {
                          const active = formData.propertyType === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, propertyType: t.id })}
                              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                                active
                                  ? "bg-primary-50 border-primary-500 text-gunmetal-950 font-bold shadow-sm ring-1 ring-primary-500"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <span className="text-base">{t.icon}</span>
                              <span className="text-xs leading-tight">{t.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Location & Address */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        <span>2. Location in Patna</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Patna Locality *
                        </label>
                        <select
                          value={formData.locality}
                          onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 cursor-pointer"
                        >
                          {localities.map((loc) => (
                            <option key={loc.name} value={loc.name}>{loc.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Nearby Landmark / Street
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Near Saguna More / Bailey Road"
                          value={formData.landmark}
                          onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Detailed Address / Apartment / Society Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Shyam Regency, Flat 302, Road No. 4"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Section 3: Room Configuration (For Flats & Houses) */}
                  {isResidentialBuilding && (
                    <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                          <Home className="w-4 h-4 text-primary-600" />
                          <span>3. Room Layout &amp; Configuration</span>
                        </label>
                      </div>

                      {/* BHK Selector */}
                      <div>
                        <span className="block text-xs font-semibold text-slate-600 mb-2">Bedrooms (BHK):</span>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {BHK_OPTIONS.map((bhk) => (
                            <button
                              key={bhk}
                              type="button"
                              onClick={() => setFormData({ ...formData, bhk, beds: parseInt(bhk, 10) || 1 })}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                                formData.bhk === bhk
                                  ? "bg-primary-500 text-gunmetal-950 border-primary-600 shadow-sm"
                                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {bhk}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Bathrooms */}
                        <div>
                          <span className="block text-xs font-semibold text-slate-600 mb-1.5">Bathrooms:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            {BATH_OPTIONS.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setFormData({ ...formData, baths: parseInt(b, 10) || 1 })}
                                className={`w-9 h-9 rounded-xl border text-xs font-bold flex items-center justify-center transition-all ${
                                  String(formData.baths) === b
                                    ? "bg-gunmetal-900 text-white border-gunmetal-900"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Balconies */}
                        <div>
                          <span className="block text-xs font-semibold text-slate-600 mb-1.5">Balconies:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            {BALCONY_OPTIONS.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setFormData({ ...formData, balconies: parseInt(b, 10) || 0 })}
                                className={`w-9 h-9 rounded-xl border text-xs font-bold flex items-center justify-center transition-all ${
                                  String(formData.balconies) === b
                                    ? "bg-gunmetal-900 text-white border-gunmetal-900"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Furnishing Status */}
                      <div>
                        <span className="block text-xs font-semibold text-slate-600 mb-2">Furnishing Status:</span>
                        <div className="grid grid-cols-3 gap-2.5">
                          {FURNISHING_OPTIONS.map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setFormData({ ...formData, furnishing: f })}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                                formData.furnishing === f
                                  ? "bg-primary-500 text-gunmetal-950 border-primary-600 shadow-sm"
                                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Floor Level</label>
                          <input
                            type="text"
                            placeholder="e.g. 3rd Floor"
                            value={formData.floor}
                            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-gunmetal-900 focus:outline-none focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Total Building Floors</label>
                          <input
                            type="text"
                            placeholder="e.g. G + 5 Floors"
                            value={formData.totalFloors}
                            onChange={(e) => setFormData({ ...formData, totalFloors: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-gunmetal-900 focus:outline-none focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section 4: Area, Road & Facing */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-primary-600" />
                        <span>4. Area &amp; Physical Specifications</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Area with Unit */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Total Area *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            placeholder="e.g. 1,500 or 1.5"
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                          />
                          <select
                            value={formData.areaUnit}
                            onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value })}
                            className="w-28 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-gunmetal-900 focus:outline-none focus:border-primary-500 cursor-pointer"
                          >
                            <option value="sq.ft">Sq.ft</option>
                            <option value="Kattha">Kattha</option>
                            <option value="Gaj">Gaj (Sq.yd)</option>
                            <option value="Dhur">Dhur</option>
                          </select>
                        </div>
                      </div>

                      {/* Facing */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Facing Direction
                        </label>
                        <select
                          value={formData.facing}
                          onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs sm:text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                          {FACING_OPTIONS.map((fc) => (
                            <option key={fc} value={fc}>{fc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Approach Road */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Approach Road Width
                        </label>
                        <select
                          value={formData.roadWidth}
                          onChange={(e) => setFormData({ ...formData, roadWidth: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                          {ROAD_WIDTH_OPTIONS.map((rw) => (
                            <option key={rw} value={rw}>{rw}</option>
                          ))}
                        </select>
                      </div>

                      {/* Parking */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Parking Facility
                        </label>
                        <select
                          value={formData.parking}
                          onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                          {PARKING_OPTIONS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Plot specifics if plot or land */}
                    {isPlotOrLand && (
                      <div className="grid grid-cols-3 gap-3 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                        <div>
                          <label className="block text-[11px] font-bold text-amber-900 mb-1">Boundary Wall</label>
                          <select
                            value={formData.boundaryWall}
                            onChange={(e) => setFormData({ ...formData, boundaryWall: e.target.value })}
                            className="w-full bg-white border border-amber-200 rounded-lg p-2 text-xs font-semibold"
                          >
                            <option value="Yes">Yes (Constructed)</option>
                            <option value="No">No Boundary</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-amber-900 mb-1">Corner Plot?</label>
                          <select
                            value={formData.cornerPlot}
                            onChange={(e) => setFormData({ ...formData, cornerPlot: e.target.value })}
                            className="w-full bg-white border border-amber-200 rounded-lg p-2 text-xs font-semibold"
                          >
                            <option value="No">Standard Plot</option>
                            <option value="Yes">Corner (Two Side Road)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-amber-900 mb-1">Gated Colony</label>
                          <select
                            value={formData.gatedLayout}
                            onChange={(e) => setFormData({ ...formData, gatedLayout: e.target.value })}
                            className="w-full bg-white border border-amber-200 rounded-lg p-2 text-xs font-semibold"
                          >
                            <option value="Yes">Yes (Gated)</option>
                            <option value="No">Open Layout</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section 5: Pricing, Possession & Legal */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                        <IndianRupee className="w-4 h-4 text-primary-600" />
                        <span>5. Pricing, Possession &amp; Ownership Title</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          {formData.purpose === "Rent" ? "Expected Monthly Rent *" : "Expected Selling Price *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={formData.purpose === "Rent" ? "e.g. ₹ 25,000 / month" : "e.g. ₹ 65 Lakh or ₹ 1.2 Crore"}
                          value={formData.expectedPrice}
                          onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Price Terms
                        </label>
                        <select
                          value={formData.priceNote}
                          onChange={(e) => setFormData({ ...formData, priceNote: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                          <option value="Negotiable">Price Negotiable</option>
                          <option value="Fixed / Non-negotiable">Fixed / Non-negotiable</option>
                          <option value="All Inclusive">All Inclusive (No Extra Charges)</option>
                          <option value="Price on Request">Price on Request</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Possession Timeline
                        </label>
                        <select
                          value={formData.possession}
                          onChange={(e) => setFormData({ ...formData, possession: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                          {POSSESSION_OPTIONS.map((pos) => (
                            <option key={pos} value={pos}>{pos}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Ownership Type
                        </label>
                        <select
                          value={formData.ownership}
                          onChange={(e) => setFormData({ ...formData, ownership: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 cursor-pointer"
                        >
                          {OWNERSHIP_OPTIONS.map((own) => (
                            <option key={own} value={own}>{own}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: Key Amenities */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-primary-600" />
                        <span>6. Key Amenities &amp; Features</span>
                      </label>
                      <span className="text-[11px] text-slate-400">Select all that apply</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                      {POPULAR_AMENITIES.map((amenity) => {
                        const active = formData.amenities.includes(amenity);
                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => handleAmenityToggle(amenity)}
                            className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center gap-2 ${
                              active
                                ? "bg-primary-50 border-primary-500 text-gunmetal-950 font-bold"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${active ? "bg-primary-500 text-gunmetal-950" : "border border-slate-300 bg-white"}`}>
                              {active && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="truncate">{amenity}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 7: Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Property Description &amp; Highlights
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention road width, age of property, proximity to schools or hospitals, sunlight, ventilation, clear title details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  {/* Section 8: Media Upload */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between border-b pb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-primary-600" />
                        <span>7. Photos &amp; Walkthrough Videos</span>
                      </label>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5" />{imageCount}/{MEDIA_LIMITS.MAX_IMAGES} photos</span>
                        <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" />{videoCount}/{MEDIA_LIMITS.MAX_VIDEOS} videos</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Images up to <strong>{MEDIA_LIMITS.IMAGE_MAX_MB} MB</strong> each (JPG, PNG, WebP) &nbsp;·&nbsp; Videos up to <strong>{MEDIA_LIMITS.VIDEO_MAX_MB} MB</strong> each (MP4, MOV)
                    </p>

                    {(canAddImages || canAddVideos) && (
                      <label className="border-2 border-dashed border-slate-300 hover:border-primary-400 bg-slate-50 hover:bg-primary-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 block">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept={[...MEDIA_LIMITS.ALLOWED_IMAGE_TYPES, ...MEDIA_LIMITS.ALLOWED_VIDEO_TYPES].join(",")}
                          onChange={handleMediaSelect}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-700 flex items-center justify-center shadow-sm">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-gunmetal-900">Click to upload photos &amp; videos</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Rooms, exterior front, road view, walkthrough tour — upload multiple files</p>
                        </div>
                      </label>
                    )}

                    {mediaErrors.length > 0 && (
                      <div className="space-y-1.5">
                        {mediaErrors.map((err, i) => (
                          <div key={i} className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span className="flex-1">{err}</span>
                            <button type="button" onClick={() => setMediaErrors((prev) => prev.filter((_, j) => j !== i))}><X className="w-3.5 h-3.5" /></button>
                          </div>
                        ))}
                      </div>
                    )}

                    {mediaItems.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                        {mediaItems.map((item) => (
                          <div key={item.id} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group" style={{ aspectRatio: "4/3" }}>
                            {item.type === "image" && item.preview ? (
                              <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gunmetal-900/90 text-white p-2">
                                <Video className="w-6 h-6 text-primary-400" />
                                <span className="text-[10px] text-center leading-tight truncate w-full px-1">{item.name}</span>
                                <span className="text-[10px] text-slate-400">{formatBytes(item.size)}</span>
                              </div>
                            )}

                            {item.status === "uploading" && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1.5 p-2">
                                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-primary-400 h-full rounded-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
                                </div>
                                <span className="text-white text-[10px] font-bold">{item.progress}%</span>
                              </div>
                            )}

                            {item.status === "error" && (
                              <div className="absolute inset-0 bg-rose-900/80 flex flex-col items-center justify-center gap-1 p-2">
                                <AlertCircle className="w-5 h-5 text-white" />
                                <span className="text-white text-[10px] text-center leading-tight">{item.error}</span>
                              </div>
                            )}

                            {item.status === "done" && (
                              <div className="absolute top-1.5 left-1.5 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center shadow">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveMedia(item)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 shadow"
                              title="Remove"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            {item.status !== "uploading" && item.type === "image" && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[9px] px-1.5 py-0.5 text-center">{formatBytes(item.size)}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {uploadingCount > 0 && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        <span>Uploading {uploadingCount} file{uploadingCount > 1 ? "s" : ""}... please wait before submitting</span>
                      </div>
                    )}
                  </div>

                  {/* Section 9: Owner / Contact Details */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gunmetal-900 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-primary-600" />
                        <span>8. Contact &amp; Owner Verification</span>
                      </label>
                    </div>

                    {/* Role Selector */}
                    <div>
                      <span className="block text-xs font-semibold text-slate-600 mb-2">You are the:</span>
                      <div className="grid grid-cols-3 gap-2.5">
                        {["Owner", "Builder", "Agent"].map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => setFormData({ ...formData, userRole: role })}
                            className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                              formData.userRole === role
                                ? "bg-gunmetal-900 text-primary-400 border-gunmetal-900"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {role === "Owner" ? "👤 Property Owner" : role === "Builder" ? "🏗️ Builder / Developer" : "🤝 Real Estate Agent"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Kumar"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rajesh@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || uploadingCount > 0}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 text-gunmetal-950 font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-primary-glow hover:-translate-y-0.5 active:translate-y-0 text-sm uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gunmetal-950 border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Your Listing...</span>
                      </>
                    ) : uploadingCount > 0 ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gunmetal-950 border-t-transparent rounded-full animate-spin" />
                        <span>Waiting for media uploads to complete...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Property Listing Request</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gunmetal-900 text-white p-7 sm:p-8 rounded-3xl border border-gunmetal-800 space-y-5 shadow-xl">
              <div>
                <div className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-1">
                  Why Shyam Homes?
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Fast, Verified Property Transactions
                </h3>
              </div>
              <div className="space-y-4">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{b.title}</h4>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gunmetal-800">
                <div className="text-xs text-slate-400 uppercase tracking-widest">
                  Senior Property Consultant
                </div>
                <div className="text-lg font-serif font-bold text-primary-400 mt-1">
                  Dhananjay Kumar
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-primary-400" />
                  <span>7858832545 • Patna, Bihar</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-3 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-gunmetal-900">
                How Listing Works
              </h4>
              <ol className="space-y-3 text-xs sm:text-sm text-slate-600">
                {[
                  "Submit your full property specifications and photos above",
                  "Our Patna team connects with you within 24 hours for verification",
                  "We visit the site, inspect the documents, and prepare professional listing",
                  "Your property goes live on Shyam Homes to thousands of verified buyers"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gunmetal-900 text-primary-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 font-bold text-gunmetal-900 text-sm">
                <Camera className="w-4 h-4 text-primary-700" />
                <span>Media Upload Guidelines</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1 pl-1">
                <li>• Up to <strong>8 photos</strong> (JPG, PNG, WebP) max 10 MB each</li>
                <li>• Up to <strong>2 walkthrough videos</strong> (MP4, MOV) max 50 MB each</li>
                <li>• Real photos of bedrooms, hall, kitchen &amp; road increase inquiries by 3x</li>
                <li>• Files are securely stored and directly linked to your listing</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500 text-gunmetal-950 flex items-center justify-center shrink-0 shadow-primary-glow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gunmetal-900 text-sm">Zero Upfront Charges</div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Listing your property on Shyam Homes is 100% free. We charge standard brokerage only upon successful deal closure.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
