import React, { useState } from 'react';
import {
  CalendarCheck, Search, Phone, MessageCircle, Trash2, Calendar,
  Clock, CheckCircle2, AlertCircle, Building2, Plus, X
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminVisits() {
  const { visits, addVisit, updateVisitStatus, deleteVisit, properties } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newVisitForm, setNewVisitForm] = useState({
    clientName: '',
    phone: '',
    propertyId: '',
    propertyTitle: '',
    date: new Date().toISOString().split('T')[0],
    time: 'Morning (10:00 AM - 1:00 PM)',
    status: 'Confirmed'
  });

  const handleCreateVisit = (e) => {
    e.preventDefault();
    if (!newVisitForm.clientName || !newVisitForm.phone) return;

    const selectedProp = properties.find((p) => p.id === newVisitForm.propertyId) || properties[0];

    addVisit({
      clientName: newVisitForm.clientName,
      phone: newVisitForm.phone,
      propertyId: selectedProp?.propertyId || 'SH-MANUAL',
      propertyTitle: newVisitForm.propertyTitle || selectedProp?.title || 'General Property Consultation',
      date: newVisitForm.date,
      time: newVisitForm.time,
      status: newVisitForm.status
    });

    setIsModalOpen(false);
    setNewVisitForm({
      clientName: '',
      phone: '',
      propertyId: '',
      propertyTitle: '',
      date: new Date().toISOString().split('T')[0],
      time: 'Morning (10:00 AM - 1:00 PM)',
      status: 'Confirmed'
    });
  };

  const filtered = visits.filter((item) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = item.clientName.toLowerCase().includes(q);
      const matchPhone = item.phone.includes(q);
      const matchProp = (item.propertyTitle || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchProp) return false;
    }
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  const getConfirmationWhatsApp = (visit) => {
    const text = `Hello ${visit.clientName}, your on-ground property visit for "${visit.propertyTitle}" has been confirmed for ${visit.date} during ${visit.time}. Dhananjay Kumar from Shyam Homes will accompany you. Please contact 7858832545 for landmark directions.`;
    return `https://wa.me/91${visit.phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AdminLayout
      title="Site Visits Schedule"
      subtitle={`Manage scheduled on-site inspections for ${visits.length} prospective buyers in Patna.`}
      actionButton={
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Visit</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Search visits by client name, mobile or property..."
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
              <option value="ALL">All Statuses ({visits.length})</option>
              <option value="Pending">Pending Confirmation</option>
              <option value="Confirmed">Confirmed Visits</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Visits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((visit) => (
            <div
              key={visit.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-navy-900 text-gold-400">
                    {visit.propertyId || 'SH-VISIT'}
                  </span>

                  <select
                    value={visit.status}
                    onChange={(e) => updateVisitStatus(visit.id, e.target.value)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold uppercase cursor-pointer border ${
                      visit.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : visit.status === 'Pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : visit.status === 'Completed'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : 'bg-rose-50 text-rose-700 border-rose-300'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <h3 className="font-serif text-lg font-bold text-navy-900">
                  {visit.clientName}
                </h3>
                <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">
                  📞 {visit.phone}
                </p>

                <div className="p-3 bg-surface-light rounded-2xl border border-slate-100 mt-3 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Target Property</span>
                  <h4 className="font-semibold text-navy-900 text-xs line-clamp-1">{visit.propertyTitle}</h4>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span className="font-bold text-navy-900">Date: {visit.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-600" />
                    <span>Slot: {visit.time}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <a
                  href={getConfirmationWhatsApp(visit)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-navy-950" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${visit.phone}`}
                    className="flex-1 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>Call Client</span>
                  </a>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete visit record for ${visit.clientName}?`)) deleteVisit(visit.id);
                    }}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Delete Visit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300">
            <CalendarCheck className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No scheduled visits found matching your filter.</p>
          </div>
        )}
      </div>

      {/* Book New Visit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 text-left space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block">Site Inspection</span>
                <h3 className="font-serif text-xl font-bold text-navy-900">Book Client Site Visit</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateVisit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Target Property</label>
                <select
                  value={newVisitForm.propertyId}
                  onChange={(e) => {
                    const prop = properties.find((p) => p.id === e.target.value);
                    setNewVisitForm({
                      ...newVisitForm,
                      propertyId: e.target.value,
                      propertyTitle: prop ? prop.title : ''
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                >
                  <option value="">-- Select Property in Patna --</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>{p.propertyId || 'SH'} - {p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newVisitForm.clientName}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Client Mobile No *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={newVisitForm.phone}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Visit Date *</label>
                  <input
                    type="date"
                    required
                    value={newVisitForm.date}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Time Slot</label>
                  <select
                    value={newVisitForm.time}
                    onChange={(e) => setNewVisitForm({ ...newVisitForm, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Initial Status</label>
                <select
                  value={newVisitForm.status}
                  onChange={(e) => setNewVisitForm({ ...newVisitForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-emerald-700 focus:outline-none focus:border-gold-500 bg-slate-50"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-sm transition-all"
                >
                  Save & Sync to Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
