import React, { useState } from 'react';
import {
  Users, Search, Phone, MessageCircle, Trash2, Calendar, MapPin,
  TrendingUp, CheckCircle2, Clock, Filter
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminLeads() {
  const { leads, updateLeadStatus, deleteLead } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'Seller', 'Buyer'
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = leads.filter((item) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchPhone = item.phone.includes(q);
      const matchLoc = (item.locality || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchLoc) return false;
    }
    if (filterType !== 'ALL' && item.type !== filterType) return false;
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  const getWhatsAppUrl = (lead) => {
    let msg = `Hello ${lead.name}, this is Dhananjay Kumar from Shyam Homes regarding your ${lead.type} requirement for ${lead.propertyType} in ${lead.locality || 'Patna'}. Are you available for a quick discussion?`;
    return `https://wa.me/91${lead.phone}?text=${encodeURIComponent(msg)}`;
  };

  const sellerCount = leads.filter((l) => l.type === 'Seller').length;
  const buyerCount = leads.filter((l) => l.type === 'Buyer').length;

  return (
    <AdminLayout
      title="Client Leads & Pipeline"
      subtitle={`Track and follow up with ${leads.length} property buyers and sellers in Patna.`}
    >
      <div className="space-y-6">
        {/* Top Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Search leads by client name, mobile or locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 sm:top-3" />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Type tabs */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${filterType === 'ALL' ? 'bg-white shadow text-navy-900' : 'text-slate-600'}`}
              >
                All ({leads.length})
              </button>
              <button
                onClick={() => setFilterType('Seller')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${filterType === 'Seller' ? 'bg-white shadow text-amber-700' : 'text-slate-600'}`}
              >
                Sellers ({sellerCount})
              </button>
              <button
                onClick={() => setFilterType('Buyer')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${filterType === 'Buyer' ? 'bg-white shadow text-blue-700' : 'text-slate-600'}`}
              >
                Buyers ({buyerCount})
              </button>
            </div>

            {/* Status Select */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-gold-500 bg-slate-50 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Visit Scheduled">Visit Scheduled</option>
              <option value="Deal Closed">Deal Closed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Leads Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left space-y-4"
            >
              <div>
                {/* Top Row: Type & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                    lead.type === 'Seller'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {lead.type} Lead
                  </span>

                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold uppercase cursor-pointer border ${
                      lead.status === 'New'
                        ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                        : lead.status === 'Contacted'
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : lead.status === 'Visit Scheduled'
                        ? 'bg-purple-50 text-purple-700 border-purple-300'
                        : lead.status === 'Deal Closed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visit Scheduled">Visit Scheduled</option>
                    <option value="Deal Closed">Deal Closed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                {/* Client Name & Details */}
                <h3 className="font-serif text-lg font-bold text-navy-900">
                  {lead.name}
                </h3>
                <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">
                  📞 {lead.phone}
                </p>

                <div className="mt-3 py-3 border-y border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Type:</span>
                    <span className="font-semibold text-navy-900">{lead.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Locality:</span>
                    <span className="font-semibold text-navy-900">{lead.locality || 'Patna'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lead.type === 'Seller' ? 'Asking Price:' : 'Budget:'}</span>
                    <span className="font-bold text-gold-700">{lead.expectedPrice || lead.budget || 'Negotiable'}</span>
                  </div>
                </div>

                {lead.message && (
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-3 line-clamp-2">
                    "{lead.message}"
                  </p>
                )}
              </div>

              {/* Bottom Quick Contact Actions */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <a
                  href={`tel:${lead.phone}`}
                  className="flex-1 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Call</span>
                </a>

                <a
                  href={getWhatsAppUrl(lead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete lead for ${lead.name}?`)) deleteLead(lead.id);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300">
            <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No leads found matching your criteria.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
