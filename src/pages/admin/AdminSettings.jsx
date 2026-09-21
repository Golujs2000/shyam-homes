import React, { useState } from 'react';
import {
  Settings, Save, ShieldCheck, Phone, Mail, MapPin, Clock, RotateCcw, Check
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminSettings() {
  const { settings, updateSettings, resetToDefaultData } = useAdminData();

  const [formData, setFormData] = useState({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <AdminLayout
      title="Agency & Consultant Settings"
      subtitle="Update contact phone numbers, Patna office details, and agency information."
    >
      <div className="max-w-4xl space-y-6">
        {savedNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully! Contact numbers and details updated across the platform.</span>
          </div>
        )}

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-1">
                Consultant Profile
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                This information appears across the website header, footer, CTAs, and property enquiry forms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Consultant Name</label>
                  <input
                    type="text"
                    required
                    value={formData.consultantName}
                    onChange={(e) => setFormData({ ...formData, consultantName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Designation / Role</label>
                  <input
                    type="text"
                    required
                    value={formData.consultantRole}
                    onChange={(e) => setFormData({ ...formData, consultantRole: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-1">
                Contact Channels
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                All click-to-call and click-to-WhatsApp links automatically route to these numbers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Phone Number (Calling)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50 font-bold text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50 font-bold text-navy-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-1">
                Office & Timings
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Official location and service availability displayed on the Contact page.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Patna Office Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">Operating Hours</label>
                  <input
                    type="text"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all settings, sample properties, leads, and visits to original defaults?')) {
                    resetToDefaultData();
                    setFormData({ ...settings });
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-navy-900 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
