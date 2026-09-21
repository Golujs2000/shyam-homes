import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Users, CalendarCheck, MessageSquare, Plus, ArrowUpRight,
  TrendingUp, CheckCircle2, Clock, Phone, MessageCircle, RotateCcw,
  Database, RefreshCw, AlertCircle, ExternalLink
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PropertyFormModal from '../../components/admin/PropertyFormModal';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminDashboard() {
  const {
    properties, addProperty, leads, visits, enquiries,
    firestoreStatus, syncWithFirestore, resetToDefaultData
  } = useAdminData();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(null);

  const handleManualSync = async () => {
    setSyncLoading(true);
    setSyncFeedback(null);
    const res = await syncWithFirestore();
    setSyncLoading(false);
    if (res.success) {
      setSyncFeedback({ type: 'success', message: 'All properties, leads, visits & settings successfully pushed to Firestore!' });
    } else {
      setSyncFeedback({ type: 'error', message: res.error || 'Failed to push to Firestore. Check Rules in Firebase Console.' });
    }
  };

  const forSaleCount = properties.filter((p) => p.status === 'FOR SALE').length;
  const forRentCount = properties.filter((p) => p.status === 'FOR RENT').length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const pendingVisitsCount = visits.filter((v) => v.status === 'Pending').length;

  const handleSaveProperty = (propData) => {
    addProperty(propData);
  };

  const getWhatsAppLink = (phone, name) => {
    const text = `Hello ${name}, this is Dhananjay Kumar from Shyam Homes regarding your property enquiry. How can I assist you?`;
    return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Welcome back, Dhananjay. Here is a real-time summary of Shyam Homes operations."
      actionButton={
        <button
          onClick={() => setAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Firestore Database Sync & Status Banner */}
        <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          firestoreStatus.connected
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            : 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-sm'
        }`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                firestoreStatus.connected
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-500 text-white'
              }`}>
                <Database className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold">
                    {firestoreStatus.connected
                      ? '🟢 Firestore Database Connected (shyam-homes)'
                      : '⚠️ Firestore Setup: Permissions Required to Seed Collections'}
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-mono bg-white/70 border border-slate-200 text-slate-700">
                    Project: shyam-homes
                  </span>
                </div>

                {!firestoreStatus.connected && (
                  <p className="text-xs text-amber-900 leading-relaxed max-w-3xl">
                    By default, new Firebase projects lock write permissions (<code className="bg-amber-100 font-mono px-1 py-0.5 rounded">allow read, write: if false;</code>).
                    To populate your database: go to your open <strong>Firebase Console &gt; Rules tab</strong>, set <code className="bg-amber-100 font-mono px-1.5 py-0.5 rounded font-bold">allow read, write: if true;</code> and click <strong>Publish</strong>.
                  </p>
                )}

                {syncFeedback && (
                  <p className={`text-xs font-bold ${syncFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {syncFeedback.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={handleManualSync}
                disabled={syncLoading}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncLoading ? 'animate-spin' : ''}`} />
                <span>{syncLoading ? 'Syncing to Firestore...' : 'Push All Data to Firestore'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Properties */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Properties</span>
              <div className="w-10 h-10 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-serif font-bold text-navy-900">{properties.length}</div>
              <p className="text-xs text-slate-500 mt-1">
                <strong className="text-emerald-600 font-semibold">{forSaleCount} For Sale</strong> • {forRentCount} For Rent
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/admin/properties" className="text-gold-600 font-bold hover:underline flex items-center gap-1">
                <span>Manage listings</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 2: Leads */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Client Leads</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-serif font-bold text-navy-900">{leads.length}</div>
              <p className="text-xs text-slate-500 mt-1">
                <strong className="text-blue-600 font-semibold">{newLeadsCount} New leads</strong> require follow-up
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/admin/leads" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
                <span>View all leads</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 3: Site Visits */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Site Visits</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-serif font-bold text-navy-900">{visits.length}</div>
              <p className="text-xs text-slate-500 mt-1">
                <strong className="text-amber-600 font-semibold">{pendingVisitsCount} Pending visits</strong> booked
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/admin/visits" className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
                <span>View visit calendar</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 4: Enquiries */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enquiries</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-serif font-bold text-navy-900">{enquiries.length}</div>
              <p className="text-xs text-slate-500 mt-1">
                Incoming messages from website forms
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/admin/enquiries" className="text-purple-600 font-bold hover:underline flex items-center gap-1">
                <span>Open inbox</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Firestore Live Database Banner */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              firestoreStatus.connected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${firestoreStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <h3 className="font-serif text-base font-bold text-white">
                  Cloud Firestore Real-Time Sync
                </h3>
                <span className="text-[10px] bg-navy-800 text-gold-400 px-2 py-0.5 rounded-md font-mono border border-navy-700">
                  shyam-homes
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Both public frontend and admin panel are synced live via Cloud Firestore.
                {firestoreStatus.lastSync && <span className="text-slate-400 ml-1">(Last active sync: {firestoreStatus.lastSync})</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={syncWithFirestore}
              disabled={firestoreStatus.syncing}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-gold-400 font-bold text-xs border border-navy-700 flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${firestoreStatus.syncing ? 'animate-spin text-gold-400' : ''}`} />
              <span>{firestoreStatus.syncing ? 'Syncing...' : 'Sync Firestore Now'}</span>
            </button>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-7 border border-navy-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Quick Management Actions</h3>
            <p className="text-xs text-slate-400 mt-0.5">Instant shortcuts to update inventory or respond to Patna property inquiries</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Property</span>
            </button>
            <Link
              to="/admin/leads"
              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-gold-400" />
              <span>Review Leads</span>
            </Link>
            <Link
              to="/admin/visits"
              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs border border-slate-700 flex items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4 text-gold-400" />
              <span>Visits Schedule</span>
            </Link>
            <button
              onClick={() => {
                if (window.confirm('Reset all demo data back to default starter properties?')) {
                  resetToDefaultData();
                }
              }}
              className="px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-900 text-xs flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Recent Leads & Scheduled Visits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-serif text-lg font-bold text-navy-900">Recent Client Leads</h3>
                <p className="text-xs text-slate-500">From Sell Your Property & Buy requests</p>
              </div>
              <Link to="/admin/leads" className="text-xs font-bold text-gold-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 4).map((lead) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-2xl bg-surface-light border border-slate-100 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-900 text-sm">{lead.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        lead.type === 'Seller' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.type}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-1">
                      {lead.propertyType} in <strong>{lead.locality}</strong> • {lead.expectedPrice || lead.budget}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${lead.phone}`}
                      className="w-8 h-8 rounded-lg bg-slate-200 hover:bg-navy-900 hover:text-white text-navy-900 flex items-center justify-center transition-colors"
                      title="Call Client"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={getWhatsAppLink(lead.phone, lead.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-colors"
                      title="WhatsApp Client"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Site Visits */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-serif text-lg font-bold text-navy-900">Upcoming Site Visits</h3>
                <p className="text-xs text-slate-500">Accompanied on-ground property viewings</p>
              </div>
              <Link to="/admin/visits" className="text-xs font-bold text-gold-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {visits.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No site visits currently scheduled.</p>
              ) : (
                visits.slice(0, 4).map((visit) => (
                  <div
                    key={visit.id}
                    className="p-3.5 rounded-2xl bg-surface-light border border-slate-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-navy-900 text-sm block">{visit.clientName}</span>
                      <p className="text-slate-500 line-clamp-1 mt-0.5">
                        {visit.propertyTitle}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1">
                        <span className="font-semibold text-navy-900">📅 {visit.date}</span>
                        <span>•</span>
                        <span>{visit.time}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase block mb-2 ${
                        visit.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {visit.status}
                      </span>
                      <a
                        href={`https://wa.me/91${visit.phone}?text=${encodeURIComponent(`Hello ${visit.clientName}, confirming your property visit for ${visit.propertyTitle} on ${visit.date}. - Shyam Homes`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-emerald-600 hover:underline"
                      >
                        Confirm WA →
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Property Modal */}
      <PropertyFormModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSaveProperty}
      />
    </AdminLayout>
  );
}
