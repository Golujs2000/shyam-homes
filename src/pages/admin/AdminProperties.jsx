import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Edit3, Trash2, ExternalLink, Filter, Building2,
  MapPin, Eye, CheckCircle2, RotateCcw
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PropertyFormModal from '../../components/admin/PropertyFormModal';
import { useAdminData } from '../../context/AdminDataContext';
import { propertyTypes, localities } from '../../data/localities';

export default function AdminProperties() {
  const { properties, addProperty, updateProperty, deleteProperty, togglePropertyStatus } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  const handleOpenAdd = () => {
    setEditingProperty(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (prop) => {
    setEditingProperty(prop);
    setModalOpen(true);
  };

  const handleSave = (propertyData) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, propertyData);
    } else {
      addProperty(propertyData);
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete listing "${title}"?`)) {
      deleteProperty(id);
    }
  };

  const filtered = properties.filter((item) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchId = (item.propertyId || '').toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      if (!matchTitle && !matchId && !matchLoc) return false;
    }
    if (selectedStatus !== 'ALL' && item.status !== selectedStatus) return false;
    if (selectedType !== 'ALL' && item.type !== selectedType) return false;
    return true;
  });

  return (
    <AdminLayout
      title="Property Inventory"
      subtitle={`Manage all ${properties.length} residential, commercial and plot listings across Patna.`}
      actionButton={
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-gold-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Property</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Search by ID (SH-0001), Title, Locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-gold-500 bg-slate-50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 sm:top-3" />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-gold-500 bg-slate-50 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="FOR SALE">For Sale</option>
              <option value="FOR RENT">For Rent</option>
              <option value="SOLD">Sold</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-gold-500 bg-slate-50 cursor-pointer"
            >
              <option value="ALL">All Types</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {(searchTerm || selectedStatus !== 'ALL' || selectedType !== 'ALL') && (
              <button
                onClick={() => { setSearchTerm(''); setSelectedStatus('ALL'); setSelectedType('ALL'); }}
                className="p-2 text-slate-500 hover:text-navy-900 rounded-lg hover:bg-slate-100"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Property</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Locality</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-navy-900 text-gold-400">
                            {item.propertyId || 'SH-PROP'}
                          </span>
                          <h4 className="font-bold text-navy-900 line-clamp-1 mt-1">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 block">
                            {item.area} {item.beds ? `• ${item.beds} BHK` : ''}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs">
                        {item.type}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-navy-900">
                      {item.price}
                    </td>

                    {/* Locality */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span className="truncate max-w-[120px]">{item.localityKey || item.location}</span>
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => togglePropertyStatus(item.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer border ${
                          item.status === 'FOR SALE'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.status === 'FOR RENT'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : item.status === 'SOLD'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        <option value="FOR SALE">FOR SALE</option>
                        <option value="FOR RENT">FOR RENT</option>
                        <option value="SOLD">SOLD</option>
                        <option value="INACTIVE">INACTIVE</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/property/${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-navy-900 hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                          title="Preview on Website"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-gold-500 hover:text-navy-950 text-slate-600 flex items-center justify-center transition-colors"
                          title="Edit Property"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <Building2 className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">No property listings found matching your search.</p>
              <button
                onClick={handleOpenAdd}
                className="mt-3 text-xs font-bold text-gold-600 hover:underline"
              >
                + Create new listing
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Property Create / Edit Modal */}
      <PropertyFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        property={editingProperty}
      />
    </AdminLayout>
  );
}
