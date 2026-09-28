import React, { useState } from 'react';
import {
  ClipboardList, Search, Phone, MessageCircle, Trash2, CheckCircle2,
  XCircle, Clock, Building2, MapPin, IndianRupee, ExternalLink, Eye
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PropertyFormModal from '../../components/admin/PropertyFormModal';
import { useAdminData } from '../../context/AdminDataContext';
import { Link } from 'react-router-dom';

const STATUS_COLORS = {
  Pending:  'bg-amber-50 text-amber-800 border-amber-200',
  Approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
};

const STATUS_DOT = {
  Pending:  'bg-amber-400 animate-pulse',
  Approved: 'bg-emerald-500',
  Rejected: 'bg-rose-500',
};

export default function AdminListingRequests() {
  const { properties, listingRequests, updateListingRequestStatus, approveListingRequest, deleteListingRequest } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filtered = listingRequests.filter((r) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (
        !r.name?.toLowerCase().includes(q) &&
        !r.phone?.includes(q) &&
        !r.locality?.toLowerCase().includes(q) &&
        !r.propertyType?.toLowerCase().includes(q) &&
        !r.bhk?.toLowerCase().includes(q) &&
        !r.landmark?.toLowerCase().includes(q)
      ) return false;
    }
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    return true;
  });

  const pendingCount = listingRequests.filter((r) => r.status === 'Pending').length;
  const approvedCount = listingRequests.filter((r) => r.status === 'Approved').length;

  const handleOpenApproveModal = (request) => {
    setSelectedRequest(request);
    setApproveModalOpen(true);
  };

  const handleApproveAndPublish = async (propertyFormData) => {
    if (!selectedRequest) return;
    await approveListingRequest(selectedRequest, propertyFormData);
    setApproveModalOpen(false);
    setSelectedRequest(null);
  };

  const handleReject = async (r) => {
    if (window.confirm(`Reject listing request from ${r.name}?`)) {
      await updateListingRequestStatus(r.id, 'Rejected');
    }
  };

  const handleDelete = async (r) => {
    if (window.confirm(`Permanently delete listing request from ${r.name}?`)) {
      await deleteListingRequest(r.id);
    }
  };

  const getWhatsAppUrl = (r) => {
    const msg = `Hello ${r.name}, this is Dhananjay Kumar from Shyam Homes. We received your property listing request for ${r.bhk ? `${r.bhk} ` : ''}${r.propertyType} in ${r.locality}. We'd like to schedule a quick call to proceed further.`;
    return `https://wa.me/91${r.phone}?text=${encodeURIComponent(msg)}`;
  };

  // Pre-fill property form from listing request with FULL options & photos
  const requestToPropertyFormData = (r) => {
    if (!r) return null;
    const isRent = r.purpose === 'Rent' || r.purpose === 'Rent / Lease';
    const nextPropNumber = (properties?.length || 0) + 1;
    const autoPropertyId = `SH-${String(nextPropNumber).padStart(4, '0')}`;

    // Collect seller photos
    const sellerImages = (r.imageUrls && r.imageUrls.length > 0)
      ? r.imageUrls
      : (r.mediaUrls && r.mediaUrls.length > 0)
        ? r.mediaUrls
        : [];
    const coverImage = sellerImages[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
    const galleryImages = sellerImages.length > 0 ? sellerImages : [coverImage];
    const videoUrl = (r.videoUrls && r.videoUrls[0]) || r.video || '';

    // Determine type & category
    const propType = r.propertyType === 'Land' ? 'Plot' : (r.propertyType || 'House');
    const category = isRent
      ? 'Rental Properties'
      : (propType === 'Plot' ? 'Plots' : propType === 'Flat' ? 'Flats' : propType === 'Commercial' ? 'Commercial' : 'Houses');

    const bhkLabel = r.bhk ? `${r.bhk} ` : '';
    const title = `${bhkLabel}${propType} for ${isRent ? 'Rent' : 'Sale'} in ${r.locality}`;
    const shortTitle = `${bhkLabel}${propType} – ${r.locality}`;

    const formattedArea = r.area ? `${r.area}${r.areaUnit ? ` ${r.areaUnit}` : ' sq.ft'}` : '';

    return {
      title,
      shortTitle,
      propertyId: autoPropertyId,
      type: propType,
      category,
      status: isRent ? 'FOR RENT' : 'FOR SALE',
      price: r.expectedPrice || '',
      priceNumeric: 0,
      priceNote: r.priceNote || 'Negotiable',
      location: r.location || `${r.landmark ? `${r.landmark}, ` : ''}${r.locality}, Patna, Bihar`,
      localityKey: r.locality || 'Kankarbagh',
      area: formattedArea || 'Contact for Details',
      builtUpArea: r.builtUpArea || formattedArea || '',
      plotArea: r.plotArea || (propType === 'Plot' ? formattedArea : ''),
      beds: r.beds !== undefined && r.beds !== '' ? r.beds : (r.bhk ? parseInt(r.bhk, 10) : ''),
      baths: r.baths || '',
      balconies: r.balconies || '',
      floor: r.floor || '',
      parking: r.parking || '',
      furnishing: r.furnishing || 'Unfurnished',
      facing: r.facing || '',
      possession: r.possession || 'Ready to Move',
      ownership: r.ownership || 'Freehold',
      roadWidth: r.roadWidth || '',
      image: coverImage,
      gallery: galleryImages,
      video: videoUrl,
      overview: r.message || `${bhkLabel}${propType} located at ${r.locality}, Patna. Verified listing submitted by owner.`,
      description: `Owner: ${r.name} (${r.phone}${r.email ? `, ${r.email}` : ''})${r.userRole ? ` [${r.userRole}]` : ''}.\n${r.message || ''}`,
      locationAdvantage: r.landmark ? `Prime location near ${r.landmark} in ${r.locality}.` : '',
      suitableFor: '',
      amenities: r.amenities || [],
      nearbyPlaces: [],
      mapQuery: `${r.locality}, Patna, Bihar`,
      listedFromRequest: r.id,
      ownerName: r.name,
      ownerPhone: r.phone,
    };
  };

  return (
    <AdminLayout
      title="Listing Requests"
      subtitle={`${listingRequests.length} public property listing submissions — ${pendingCount} pending review.`}
    >
      <div className="space-y-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Requests', value: listingRequests.length, color: 'text-slate-700', bg: 'bg-white' },
            { label: 'Pending Review', value: pendingCount, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Approved & Listed', value: approvedCount, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border rounded-2xl p-4 text-center`}>
              <div className={`text-2xl font-serif font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Search by name, phone, locality, property type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 sm:top-3" />
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-xl shrink-0">
            {['ALL', 'Pending', 'Approved', 'Rejected'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === s
                    ? 'bg-white shadow text-gunmetal-900'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((r) => {
            const isRent = r.purpose === 'Rent' || r.purpose === 'Rent / Lease';
            const images = (r.imageUrls && r.imageUrls.length > 0)
              ? r.imageUrls
              : (r.mediaUrls && r.mediaUrls.length > 0)
                ? r.mediaUrls
                : [];
            const hasVideo = (r.videoUrls && r.videoUrls.length > 0) || !!r.video;

            return (
              <div
                key={r.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                {/* Status & Purpose Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        isRent ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {isRent ? 'FOR RENT' : 'FOR SALE'}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {r.bhk ? `${r.bhk} ` : ''}{r.propertyType}
                      </span>
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase border ${STATUS_COLORS[r.status] || STATUS_COLORS.Pending}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status] || STATUS_DOT.Pending}`} />
                      {r.status}
                    </span>
                  </div>

                  {/* Owner Info */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-gunmetal-900 leading-snug">{r.name}</h3>
                      <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">📞 {r.phone}</p>
                      {r.email && <p className="text-[11px] text-slate-400 mt-0.5">✉️ {r.email}</p>}
                    </div>
                    {r.userRole && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                        {r.userRole}
                      </span>
                    )}
                  </div>

                  {/* Property Specs Box */}
                  <div className="mt-3 py-3 border-y border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span className="font-semibold text-gunmetal-900">
                        {r.landmark ? `${r.landmark}, ` : ''}{r.locality}, Patna
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      {r.area && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium">{r.area}{r.areaUnit ? ` ${r.areaUnit}` : ' sq.ft'}</span>
                        </div>
                      )}
                      {r.expectedPrice && (
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-bold text-gold-700">{r.expectedPrice}</span>
                          {r.priceNote && <span className="text-[10px] text-slate-400">({r.priceNote})</span>}
                        </div>
                      )}
                    </div>

                    {/* Chips for Specs */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {r.furnishing && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                          🛋️ {r.furnishing}
                        </span>
                      )}
                      {r.floor && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                          🏢 {r.floor}
                        </span>
                      )}
                      {r.facing && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                          🧭 {r.facing}
                        </span>
                      )}
                      {r.parking && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                          🚗 {r.parking}
                        </span>
                      )}
                      {r.possession && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                          ⏱️ {r.possession}
                        </span>
                      )}
                      {r.roadWidth && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                          🛣️ {r.roadWidth}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Photos / Media Thumbnail Strip */}
                  {(images.length > 0 || hasVideo) && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                        <span>Submitted Media</span>
                        <div className="flex items-center gap-2">
                          {images.length > 0 && <span>📸 {images.length} photo{images.length > 1 ? 's' : ''}</span>}
                          {hasVideo && <span className="text-primary-700">🎬 Video</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {images.slice(0, 3).map((imgUrl, idx) => (
                          <a
                            key={idx}
                            href={imgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 hover:opacity-90 transition-opacity bg-slate-100"
                            title="Click to view full photo"
                          >
                            <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                          </a>
                        ))}
                        {images.length > 3 && (
                          <div className="w-16 h-12 rounded-lg bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-[11px] font-bold text-slate-600">
                            +{images.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Amenities Preview */}
                  {r.amenities && r.amenities.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {r.amenities.slice(0, 3).map((a, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200/70">
                          ✓ {a}
                        </span>
                      ))}
                      {r.amenities.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                          +{r.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {r.message && (
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-3 line-clamp-2">
                      "{r.message}"
                    </p>
                  )}

                  <p className="text-[10px] text-slate-400 mt-2">
                    Submitted: {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  {r.status === 'Pending' && (
                    <button
                      onClick={() => handleOpenApproveModal(r)}
                      className="w-full py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-gunmetal-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-primary-glow transition-all uppercase tracking-wide"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve & Publish as Property
                    </button>
                  )}

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${r.phone}`}
                      className="flex-1 py-2 rounded-xl bg-gunmetal-900 hover:bg-gunmetal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-primary-400" />
                      <span>Call</span>
                    </a>

                    <a
                      href={getWhatsAppUrl(r)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>

                    {r.status === 'Pending' && (
                      <button
                        onClick={() => handleReject(r)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                        title="Reject Request"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(r)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Delete Request"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {r.status === 'Approved' && (
                    <Link
                      to="/admin/properties"
                      className="w-full py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Published Property
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300">
            <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No listing requests found.</p>
            <p className="text-xs mt-1 text-slate-400">
              Listing requests will appear here when property owners submit via the public{' '}
              <Link to="/list-property" target="_blank" className="text-gold-600 hover:underline font-bold">
                /list-property
              </Link>{' '}
              page.
            </p>
          </div>
        )}
      </div>

      {/* Approve Modal — reuses PropertyFormModal with pre-filled data & approve mode */}
      <PropertyFormModal
        isOpen={approveModalOpen}
        onClose={() => { setApproveModalOpen(false); setSelectedRequest(null); }}
        onSave={handleApproveAndPublish}
        property={requestToPropertyFormData(selectedRequest)}
        mode="approve"
        requestInfo={selectedRequest}
      />
    </AdminLayout>
  );
}
