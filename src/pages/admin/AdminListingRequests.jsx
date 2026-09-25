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
  const { listingRequests, updateListingRequestStatus, approveListingRequest, deleteListingRequest } = useAdminData();

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
        !r.propertyType?.toLowerCase().includes(q)
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
    const msg = `Hello ${r.name}, this is Dhananjay Kumar from Shyam Homes. We received your property listing request for ${r.propertyType} in ${r.locality}. We'd like to schedule a quick call to proceed further.`;
    return `https://wa.me/91${r.phone}?text=${encodeURIComponent(msg)}`;
  };

  // Pre-fill property form from listing request
  const requestToPropertyFormData = (r) => r ? {
    title: `${r.propertyType} in ${r.locality}`,
    shortTitle: `${r.propertyType} – ${r.locality}`,
    type: r.propertyType === 'Plot' || r.propertyType === 'Land' ? r.propertyType : r.propertyType,
    category: r.propertyType === 'Plot' ? 'Plots' : r.propertyType === 'Flat' ? 'Flats' : r.propertyType === 'Commercial' ? 'Commercial' : 'Houses',
    status: 'INACTIVE',
    price: r.expectedPrice || 'Price on Request',
    priceNumeric: 0,
    priceNote: 'Negotiable',
    location: `${r.locality}, Patna, Bihar`,
    localityKey: r.locality,
    area: r.area || '',
    builtUpArea: r.area || '',
    beds: '',
    baths: '',
    balconies: '',
    floor: '',
    parking: '',
    furnishing: 'Unfurnished',
    facing: '',
    possession: 'Ready to Move',
    ownership: 'Freehold',
    roadWidth: '',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
    video: '',
    overview: r.message || 'Property submitted by owner for listing.',
    description: `Owner: ${r.name} (${r.phone}). ${r.message || ''}`,
    locationAdvantage: '',
    suitableFor: '',
    amenities: [],
    nearbyPlaces: [],
    mapQuery: `${r.locality}, Patna, Bihar`,
  } : null;

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
          {filtered.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Status & Type Header */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  {r.propertyType}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase border ${STATUS_COLORS[r.status] || STATUS_COLORS.Pending}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status] || STATUS_DOT.Pending}`} />
                  {r.status}
                </span>
              </div>

              {/* Owner Info */}
              <div>
                <h3 className="font-serif text-lg font-bold text-gunmetal-900">{r.name}</h3>
                <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">📞 {r.phone}</p>

                <div className="mt-3 py-3 border-y border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="font-semibold text-gunmetal-900">{r.locality}, Patna</span>
                  </div>
                  {r.area && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{r.area}</span>
                    </div>
                  )}
                  {r.expectedPrice && (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-bold text-gold-700">{r.expectedPrice}</span>
                    </div>
                  )}
                </div>

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
              <div className="space-y-2">
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
          ))}
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

      {/* Approve Modal — reuses PropertyFormModal with pre-filled data */}
      <PropertyFormModal
        isOpen={approveModalOpen}
        onClose={() => { setApproveModalOpen(false); setSelectedRequest(null); }}
        onSave={handleApproveAndPublish}
        property={requestToPropertyFormData(selectedRequest)}
      />
    </AdminLayout>
  );
}
