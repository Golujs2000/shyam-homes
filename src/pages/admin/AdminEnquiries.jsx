import React, { useState } from 'react';
import {
  MessageSquare, Search, Phone, MessageCircle, Trash2, Mail, CheckCircle2
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminEnquiries() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = enquiries.filter((item) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = item.clientName.toLowerCase().includes(q);
      const matchPhone = item.phone.includes(q);
      const matchMsg = (item.message || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchMsg) return false;
    }
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  const getReplyWhatsApp = (enq) => {
    const text = `Hello ${enq.clientName}, this is Dhananjay Kumar from Shyam Homes regarding your enquiry "${enq.purpose || 'property consultation'}". How can I assist you with Patna properties?`;
    return `https://wa.me/91${enq.phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AdminLayout
      title="Customer Enquiries Inbox"
      subtitle={`Manage all ${enquiries.length} inquiries received from website contact and property forms.`}
    >
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Search enquiries by client, mobile, message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 sm:top-3" />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-gold-500 bg-slate-50 cursor-pointer"
            >
              <option value="ALL">All Enquiries ({enquiries.length})</option>
              <option value="Unread">Unread</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Enquiries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700">
                    {enq.purpose || 'General Enquiry'}
                  </span>

                  <select
                    value={enq.status}
                    onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold uppercase cursor-pointer border ${
                      enq.status === 'Unread'
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : enq.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    <option value="Unread">Unread</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <h3 className="font-serif text-lg font-bold text-navy-900">
                  {enq.clientName}
                </h3>
                <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">
                  📞 {enq.phone} {enq.email ? `• ✉️ ${enq.email}` : ''}
                </p>

                {enq.propertyTitle && (
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 mt-2 text-[11px]">
                    <span className="text-slate-400 font-semibold block">Property Reference:</span>
                    <span className="font-bold text-navy-900 line-clamp-1">{enq.propertyTitle}</span>
                  </div>
                )}

                <div className="mt-3 p-3 bg-surface-light rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                  "{enq.message}"
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <a
                  href={`tel:${enq.phone}`}
                  className="flex-1 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Call</span>
                </a>

                <a
                  href={getReplyWhatsApp(enq)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Reply WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete enquiry from ${enq.clientName}?`)) deleteEnquiry(enq.id);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300">
            <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No customer enquiries found matching your filter.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
