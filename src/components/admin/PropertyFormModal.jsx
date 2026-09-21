import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Plus, Trash2, Image as ImageIcon, Check, MapPin, Building, Sparkles,
  Upload, Camera, Star, AlertCircle, CheckCircle2, RefreshCw, Video, Film, Play
} from 'lucide-react';
import { propertyTypes, localities } from '../../data/localities';

const ALL_AMENITIES = [
  'Covered Parking',
  'Dual High Speed Lifts',
  'Passenger Elevator',
  '100% Power Backup',
  '24x7 Security Guard',
  '24/7 Water Supply',
  'Private Balcony',
  'Large Balconies',
  'CCTV Surveillance',
  'Gated Community',
  'Children\'s Park',
  'Gymnasium',
  'Private Terrace Garden',
  'Dedicated Submersible Borewell',
  'Boundary Wall',
  'Wide Road Access',
  'Main Road Frontage',
  'Vastu Compliant',
  'Fire Safety Approved'
];

export default function PropertyFormModal({ isOpen, onClose, onSave, property }) {
  if (!isOpen) return null;

  const isEditing = !!property;

  const [formData, setFormData] = useState({
    title: '',
    shortTitle: '',
    propertyId: '',
    type: 'Flat',
    category: 'Flats',
    status: 'FOR SALE',
    price: '',
    priceNumeric: 0,
    priceNote: 'Negotiable',
    location: 'Kankarbagh, Patna, Bihar',
    localityKey: 'Kankarbagh',
    area: '1,500 sq.ft',
    builtUpArea: '1,500 sq.ft',
    plotArea: '',
    beds: 3,
    baths: 2,
    balconies: 2,
    floor: '3rd of 8 Floors',
    parking: '1 Covered Car Parking',
    furnishing: 'Semi-Furnished',
    facing: 'East Facing',
    possession: 'Ready to Move',
    ownership: 'Freehold',
    roadWidth: '30 ft Wide Road',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    video: '',
    overview: 'Spacious and well-ventilated property situated in prime Patna locality with easy connectivity to markets, schools and transit.',
    description: 'Constructed with premium materials, modern architecture, clear legal title, and full compliance with municipal building codes in Patna.',
    locationAdvantage: 'Minutes away from leading hospitals, educational institutions, railway transit, and daily utility shopping.',
    suitableFor: 'Ideal for families seeking a safe, peaceful neighborhood with modern amenities or investors seeking rental return.',
    amenities: ['Covered Parking', '24/7 Water Supply', 'Private Balcony', 'CCTV Surveillance', '100% Power Backup'],
    nearbyPlaces: [
      { name: 'Nearest Hospital / Medical Facility', distance: '1.2 km' },
      { name: 'Local Public School & Coaching Hub', distance: '800 m' },
      { name: 'Railway Transit / Bus Stand', distance: '2.5 km' },
      { name: 'Daily Grocery & Retail Market', distance: '300 m' }
    ],
    mapQuery: 'Patna, Bihar'
  });

  const [coverInputMode, setCoverInputMode] = useState('upload'); // 'upload' | 'url'
  const [galleryInputMode, setGalleryInputMode] = useState('upload'); // 'upload' | 'url'
  const [videoInputMode, setVideoInputMode] = useState('url'); // 'url' | 'upload'
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const coverFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);

  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newLandmark, setNewLandmark] = useState({ name: '', distance: '' });

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        beds: property.beds !== null ? property.beds : '',
        baths: property.baths !== null ? property.baths : '',
        balconies: property.balconies !== null ? property.balconies : '',
        gallery: property.gallery || [property.image],
        video: property.video || '',
        amenities: property.amenities || [],
        nearbyPlaces: property.nearbyPlaces || []
      });
    }
  }, [property]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select an image file (JPG, PNG, WebP).'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error(`File "${file.name}" is larger than 10MB. Please use an image under 10MB.`));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error(`Failed to read file ${file.name}`));
      reader.readAsDataURL(file);
    });
  };

  const handleCoverFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setUploadError('');
      const dataUrl = await processImageFile(file);
      handleChange('image', dataUrl);
      setFormData((prev) => {
        const hasIt = prev.gallery.includes(dataUrl);
        return hasIt ? prev : { ...prev, gallery: [dataUrl, ...prev.gallery] };
      });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleCoverDrop = async (e) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setUploadError('');
      const dataUrl = await processImageFile(file);
      handleChange('image', dataUrl);
      setFormData((prev) => {
        const hasIt = prev.gallery.includes(dataUrl);
        return hasIt ? prev : { ...prev, gallery: [dataUrl, ...prev.gallery] };
      });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryFilesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    try {
      setIsUploading(true);
      setUploadError('');
      const results = await Promise.allSettled(files.map((f) => processImageFile(f)));
      const successfulUrls = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value);

      if (successfulUrls.length > 0) {
        setFormData((prev) => {
          const newCover = prev.image ? prev.image : successfulUrls[0];
          return {
            ...prev,
            image: newCover,
            gallery: [...prev.gallery, ...successfulUrls]
          };
        });
      }
      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length > 0) {
        setUploadError(`${failures.length} file(s) could not be loaded.`);
      }
    } catch (err) {
      setUploadError(err.message || 'Error uploading files.');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleGalleryDrop = async (e) => {
    e.preventDefault();
    setIsDraggingGallery(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    try {
      setIsUploading(true);
      setUploadError('');
      const results = await Promise.allSettled(files.map((f) => processImageFile(f)));
      const successfulUrls = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value);

      if (successfulUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, ...successfulUrls]
        }));
      }
      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length > 0) {
        setUploadError(`${failures.length} file(s) could not be loaded.`);
      }
    } catch (err) {
      setUploadError(err.message || 'Error uploading files.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetCover = (imgUrl) => {
    handleChange('image', imgUrl);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube-nocookie.com/embed/${match[2]}` : null;
  };

  const handleVideoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setUploadError('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setUploadError('Video file exceeds 50MB. For larger videos, consider using a YouTube link.');
      return;
    }
    setIsUploading(true);
    setUploadError('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      handleChange('video', evt.target.result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setUploadError('Failed to read video file.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  const handleVideoDrop = (e) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setUploadError('Please drop a valid video file (MP4, WebM, MOV).');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setUploadError('Video file exceeds 50MB. For larger videos, consider using a YouTube link.');
      return;
    }
    setIsUploading(true);
    setUploadError('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      handleChange('video', evt.target.result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setUploadError('Failed to read video file.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

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

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, newGalleryUrl.trim()]
      }));
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index) => {
    setFormData((prev) => {
      const removedItem = prev.gallery[index];
      const nextGallery = prev.gallery.filter((_, i) => i !== index);
      // If the removed image was the cover, choose next available or empty
      const nextCover = prev.image === removedItem ? (nextGallery[0] || '') : prev.image;
      return {
        ...prev,
        image: nextCover,
        gallery: nextGallery
      };
    });
  };

  const handleClearAllGallery = () => {
    if (window.confirm('Are you sure you want to clear all gallery photos?')) {
      setFormData((prev) => ({ ...prev, gallery: [] }));
    }
  };

  const handleAddLandmark = () => {
    if (newLandmark.name.trim() && newLandmark.distance.trim()) {
      setFormData((prev) => ({
        ...prev,
        nearbyPlaces: [...prev.nearbyPlaces, { ...newLandmark }]
      }));
      setNewLandmark({ name: '', distance: '' });
    }
  };

  const handleRemoveLandmark = (index) => {
    setFormData((prev) => ({
      ...prev,
      nearbyPlaces: prev.nearbyPlaces.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse numeric price for sorting
    let numPrice = formData.priceNumeric;
    if (!numPrice || numPrice === 0) {
      const raw = formData.price.replace(/[^0-9.]/g, '');
      if (raw) {
        if (formData.price.toLowerCase().includes('crore') || formData.price.toLowerCase().includes('cr')) {
          numPrice = parseFloat(raw) * 10000000;
        } else if (formData.price.toLowerCase().includes('lakh')) {
          numPrice = parseFloat(raw) * 100000;
        } else {
          numPrice = parseFloat(raw);
        }
      }
    }

    const payload = {
      ...formData,
      priceNumeric: numPrice,
      beds: formData.beds ? parseInt(formData.beds, 10) : null,
      baths: formData.baths ? parseInt(formData.baths, 10) : null,
      balconies: formData.balconies ? parseInt(formData.balconies, 10) : null,
      mapQuery: formData.location || `${formData.localityKey}, Patna, Bihar`
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 text-left max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-navy-950 text-white flex items-center justify-between border-b border-navy-800">
          <div>
            <span className="text-[11px] font-bold text-gold-400 uppercase tracking-widest block">
              {isEditing ? 'Property Management' : 'Add New Listing'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              {isEditing ? `Edit Property: ${property.propertyId}` : 'Create New Property'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-navy-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-navy-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Section 1: Basic Identifiers */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-600 border-b pb-2 flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>1. Basic Property Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 BHK Luxury Flat on Bailey Road"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Property ID</label>
                <input
                  type="text"
                  placeholder="e.g. SH-0007"
                  value={formData.propertyId}
                  onChange={(e) => handleChange('propertyId', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Property Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const t = e.target.value;
                    handleChange('type', t);
                    if (t === 'Plot') handleChange('category', 'Plots');
                    else if (t === 'Flat') handleChange('category', 'Flats');
                    else if (t === 'House') handleChange('category', 'Houses');
                    else if (t === 'Commercial') handleChange('category', 'Commercial');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                >
                  <option value="House">House</option>
                  <option value="Flat">Flat</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                >
                  <option value="Houses">Houses</option>
                  <option value="Flats">Flats</option>
                  <option value="Plots">Plots</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Rental Properties">Rental Properties</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-emerald-700 focus:outline-none focus:border-gold-500 bg-slate-50"
                >
                  <option value="FOR SALE">FOR SALE</option>
                  <option value="FOR RENT">FOR RENT</option>
                  <option value="SOLD">SOLD</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Price *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹ 65 Lakh"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-navy-900 focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Price Note / Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Negotiable / All Inclusive"
                  value={formData.priceNote}
                  onChange={(e) => handleChange('priceNote', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Patna Locality</label>
                <select
                  value={formData.localityKey}
                  onChange={(e) => {
                    const l = e.target.value;
                    handleChange('localityKey', l);
                    handleChange('location', `${l}, Patna, Bihar`);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                >
                  {localities.map((loc) => (
                    <option key={loc.name} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Location Address</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Dimensions & Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-600 border-b pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>2. Specifications & Dimensions</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Total Area *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1,650 sq.ft"
                  value={formData.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Built-up Area</label>
                <input
                  type="text"
                  placeholder="e.g. 1,650 sq.ft"
                  value={formData.builtUpArea}
                  onChange={(e) => handleChange('builtUpArea', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Bedrooms (BHK)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.beds}
                  onChange={(e) => handleChange('beds', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Bathrooms</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.baths}
                  onChange={(e) => handleChange('baths', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Floor</label>
                <input
                  type="text"
                  placeholder="e.g. 4th Floor of 8"
                  value={formData.floor}
                  onChange={(e) => handleChange('floor', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Facing</label>
                <input
                  type="text"
                  placeholder="e.g. East Facing"
                  value={formData.facing}
                  onChange={(e) => handleChange('facing', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Parking</label>
                <input
                  type="text"
                  placeholder="e.g. 1 Covered Car"
                  value={formData.parking}
                  onChange={(e) => handleChange('parking', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Furnishing</label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => handleChange('furnishing', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                >
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Possession</label>
                <input
                  type="text"
                  placeholder="e.g. Ready to Move"
                  value={formData.possession}
                  onChange={(e) => handleChange('possession', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Ownership</label>
                <input
                  type="text"
                  placeholder="e.g. Freehold"
                  value={formData.ownership}
                  onChange={(e) => handleChange('ownership', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Road Width</label>
                <input
                  type="text"
                  placeholder="e.g. 30 ft Road"
                  value={formData.roadWidth}
                  onChange={(e) => handleChange('roadWidth', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Balconies</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={formData.balconies}
                  onChange={(e) => handleChange('balconies', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Imagery & Gallery */}
          <div className="space-y-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-600 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>3. Media & Photography Gallery</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  {formData.gallery.length} Gallery {formData.gallery.length === 1 ? 'Photo' : 'Photos'}
                </span>
                {formData.gallery.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllGallery}
                    className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors"
                  >
                    Clear Gallery
                  </button>
                )}
              </div>
            </div>

            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* A. Main Cover Image */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Main Cover Image *
                </label>
                <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setCoverInputMode('upload')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      coverInputMode === 'upload'
                        ? 'bg-navy-950 text-gold-400 shadow-sm'
                        : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverInputMode('url')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      coverInputMode === 'url'
                        ? 'bg-navy-950 text-gold-400 shadow-sm'
                        : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Image URL
                  </button>
                </div>
              </div>

              {coverInputMode === 'upload' ? (
                <div className="space-y-3">
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileUpload}
                    className="hidden"
                  />
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingCover(true);
                    }}
                    onDragLeave={() => setIsDraggingCover(false)}
                    onDrop={handleCoverDrop}
                    onClick={() => coverFileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      isDraggingCover
                        ? 'border-gold-500 bg-gold-50/50 scale-[0.99]'
                        : 'border-slate-300 hover:border-gold-400 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-navy-950">
                        {isUploading ? 'Processing Image...' : 'Click to browse or drag & drop cover photo'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Supports high-resolution JPG, PNG, WEBP (Max 10MB)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        coverFileInputRef.current?.click();
                      }}
                      className="mt-1 px-4 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-400 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Select Cover Photo</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Paste a direct image link from Unsplash, Cloudinary, or web hosting.
                  </p>
                </div>
              )}

              {/* Cover Preview Card */}
              {formData.image && (
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={formData.image}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute top-1 left-1 bg-navy-950/90 text-gold-400 text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      Cover
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-navy-950">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Active Primary Cover</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {formData.image.startsWith('data:') ? 'Local file uploaded' : formData.image}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        className="text-[11px] font-bold text-navy-900 hover:text-gold-600 flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Change Photo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* B. Gallery Photography Upload */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Property Gallery Images
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Upload multiple room photos, exterior views, floor plans, and amenities.
                  </p>
                </div>
                <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setGalleryInputMode('upload')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      galleryInputMode === 'upload'
                        ? 'bg-navy-950 text-gold-400 shadow-sm'
                        : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Upload Files
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryInputMode('url')}
                    className={`px-3 py-1 rounded-md transition-all ${
                      galleryInputMode === 'url'
                        ? 'bg-navy-950 text-gold-400 shadow-sm'
                        : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Add by URL
                  </button>
                </div>
              </div>

              {galleryInputMode === 'upload' ? (
                <div>
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryFilesUpload}
                    className="hidden"
                  />
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingGallery(true);
                    }}
                    onDragLeave={() => setIsDraggingGallery(false)}
                    onDrop={handleGalleryDrop}
                    onClick={() => galleryFileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      isDraggingGallery
                        ? 'border-gold-500 bg-gold-50/50 scale-[0.99]'
                        : 'border-slate-300 hover:border-gold-400 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-navy-950/5 text-navy-950 flex items-center justify-center">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-navy-950">
                        {isUploading ? 'Uploading Photos...' : 'Drag & drop multiple property photos here'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Select one or multiple photos simultaneously from your phone or PC
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        galleryFileInputRef.current?.click();
                      }}
                      className="mt-1 px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Multiple Photos</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste additional image URL and click Add"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-5 py-2.5 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Gallery</span>
                  </button>
                </div>
              )}

              {/* Gallery Grid */}
              {formData.gallery.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Uploaded Gallery Photos ({formData.gallery.length})</span>
                    <span className="text-slate-400">Hover photo to set as cover or remove</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {formData.gallery.map((img, idx) => {
                      const isCover = formData.image === img;
                      return (
                        <div
                          key={idx}
                          className={`group relative h-24 rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${
                            isCover ? 'border-gold-500 ring-2 ring-gold-400/30' : 'border-slate-200 hover:border-gold-400'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80';
                            }}
                          />

                          {/* Index Badge */}
                          <div className="absolute top-1.5 left-1.5 bg-navy-950/80 backdrop-blur-xs text-slate-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                            #{idx + 1}
                          </div>

                          {/* Cover Badge */}
                          {isCover && (
                            <div className="absolute bottom-1.5 left-1.5 bg-gold-500 text-navy-950 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
                              <Star className="w-2.5 h-2.5 fill-navy-950" />
                              <span>Cover</span>
                            </div>
                          )}

                          {/* Hover Actions Overlay */}
                          <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-xs text-white flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => handleSetCover(img)}
                                className="w-full py-1 bg-gold-500 hover:bg-gold-400 text-navy-950 text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors"
                                title="Set as Main Cover Photo"
                              >
                                <Star className="w-3 h-3" />
                                <span>Set Cover</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="w-full py-1 bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* C. Property Walkthrough Video */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-gold-600" />
                      <span>Property Walkthrough Video</span>
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Upload a walkthrough video file or paste a YouTube / Vimeo / MP4 link.
                    </p>
                  </div>
                  <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setVideoInputMode('url')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        videoInputMode === 'url'
                          ? 'bg-navy-950 text-gold-400 shadow-sm'
                          : 'text-slate-600 hover:text-navy-900'
                      }`}
                    >
                      Video URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoInputMode('upload')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        videoInputMode === 'upload'
                          ? 'bg-navy-950 text-gold-400 shadow-sm'
                          : 'text-slate-600 hover:text-navy-900'
                      }`}
                    >
                      Upload Video
                    </button>
                  </div>
                </div>

                {videoInputMode === 'url' ? (
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/... or .mp4 direct link"
                      value={formData.video}
                      onChange={(e) => handleChange('video', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-white"
                    />
                    <p className="text-[11px] text-slate-500">
                      Paste a YouTube, Vimeo, or hosted MP4 video link.
                    </p>
                  </div>
                ) : (
                  <div>
                    <input
                      ref={videoFileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      onChange={handleVideoFileUpload}
                      className="hidden"
                    />
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingVideo(true);
                      }}
                      onDragLeave={() => setIsDraggingVideo(false)}
                      onDrop={handleVideoDrop}
                      onClick={() => videoFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                        isDraggingVideo
                          ? 'border-gold-500 bg-gold-50/50 scale-[0.99]'
                          : 'border-slate-300 hover:border-gold-400 bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
                        <Film className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-navy-950">
                          {isUploading ? 'Processing Video...' : 'Click to select or drag & drop property video'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Supports MP4, WebM, MOV (Max 50MB)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          videoFileInputRef.current?.click();
                        }}
                        className="mt-1 px-4 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-400 text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Select Video File</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Video Preview Card */}
                {formData.video && (
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-navy-950">Active Video Tour Attached</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleChange('video', '')}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Video</span>
                      </button>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-black aspect-video max-h-64 flex items-center justify-center">
                      {getYouTubeEmbedUrl(formData.video) ? (
                        <iframe
                          src={getYouTubeEmbedUrl(formData.video)}
                          title="YouTube Video Tour"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={formData.video}
                          controls
                          className="w-full h-full max-h-64 object-contain"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Descriptions */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-600 border-b pb-2 flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>4. Overview, Description & SEO Content</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Property Overview (Short Paragraph)</label>
              <textarea
                rows={2}
                value={formData.overview}
                onChange={(e) => handleChange('overview', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Detailed Listing Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Location Advantage</label>
                <textarea
                  rows={2}
                  value={formData.locationAdvantage}
                  onChange={(e) => handleChange('locationAdvantage', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Suitable For</label>
                <textarea
                  rows={2}
                  value={formData.suitableFor}
                  onChange={(e) => handleChange('suitableFor', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Amenities */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-600 border-b pb-2 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>5. Features & Amenities Checklist</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ALL_AMENITIES.map((item) => {
                const checked = formData.amenities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleAmenityToggle(item)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-colors text-left ${
                      checked
                        ? 'bg-gold-50 border-gold-500 text-gold-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center ${checked ? 'bg-gold-600 text-white' : 'border border-slate-300'}`}>
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 6: Nearby Landmarks */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold-600 border-b pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>6. Nearby Places & Landmarks</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Landmark name (e.g. Paras Hospital / St. Karen's)"
                value={newLandmark.name}
                onChange={(e) => setNewLandmark({ ...newLandmark, name: e.target.value })}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
              />
              <input
                type="text"
                placeholder="Distance (e.g. 1.2 km)"
                value={newLandmark.distance}
                onChange={(e) => setNewLandmark({ ...newLandmark, distance: e.target.value })}
                className="w-full sm:w-36 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
              />
              <button
                type="button"
                onClick={handleAddLandmark}
                className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Place</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {formData.nearbyPlaces.map((place, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <span className="font-medium text-navy-900">{place.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gold-100 text-gold-800 rounded font-bold">{place.distance}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLandmark(i)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-gold-glow transition-all"
            >
              {isEditing ? 'Save Changes' : 'Publish Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
