import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, CalendarCheck, MessageSquare,
  Settings, ExternalLink, LogOut, Menu, X, Shield, ChevronRight, Bell, RefreshCw
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminLayout({ children, title, subtitle, actionButton }) {
  const { settings, logout, leads, visits, enquiries, firestoreStatus, syncWithFirestore } = useAdminData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const pendingVisitsCount = visits.filter((v) => v.status === 'Pending').length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const unreadEnquiriesCount = enquiries.filter((e) => e.status === 'Unread').length;

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Properties', path: '/admin/properties', icon: Building2 },
    { label: 'Leads', path: '/admin/leads', icon: Users, badge: newLeadsCount },
    { label: 'Site Visits', path: '/admin/visits', icon: CalendarCheck, badge: pendingVisitsCount },
    { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare, badge: unreadEnquiriesCount },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-left font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-navy-950 text-white border-r border-navy-800 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-5 border-b border-navy-800">
          <Link to="/" className="block group">
            <div className="flex items-center justify-start py-1">
              <img
                src="/shyam homes logo.png"
                alt="Shyam Homes"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider">
                Admin Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Consultant Profile Pill */}
        <div className="mx-4 my-4 p-3 rounded-2xl bg-navy-900 border border-navy-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold text-xs shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">{settings.consultantName}</h4>
            <p className="text-[10px] text-slate-400 truncate">{settings.phone}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gold-500 text-navy-950 font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-navy-900'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-navy-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-300 text-xs font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              <span>Live Website</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/40 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/90 py-3.5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg bg-slate-100 text-navy-900 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-serif font-bold text-navy-900">
                {title}
              </h1>
              {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
            </div>
          </div>

            <div className="flex items-center gap-2">
              {/* Firestore Status Pill */}
              <div 
                onClick={syncWithFirestore}
                title={firestoreStatus.connected ? `Connected to Firestore (shyam-homes). Click to re-sync.` : `Offline cache active: ${firestoreStatus.error || 'Click to retry'}`}
                className={`hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  firestoreStatus.connected 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100' 
                    : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${firestoreStatus.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="font-mono text-[11px]">
                  {firestoreStatus.syncing 
                    ? 'Syncing...' 
                    : firestoreStatus.connected 
                      ? 'Firestore Live' 
                      : 'Firestore Offline'}
                </span>
                <RefreshCw className={`w-3 h-3 text-slate-400 ${firestoreStatus.syncing ? 'animate-spin' : ''}`} />
              </div>

              {actionButton}

              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold-600" />
                <span>Visit Site</span>
              </Link>

              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-navy-950/80 backdrop-blur-sm flex">
          <div className="w-72 bg-navy-950 text-white flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-6">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/shyam homes logo.png"
                    alt="Shyam Homes"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      end={item.exact}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          isActive
                            ? 'bg-gold-500 text-navy-950 font-bold'
                            : 'text-slate-300 hover:bg-navy-900'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && item.badge > 0 ? (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                          {item.badge}
                        </span>
                      ) : null}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-navy-800 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center block text-xs font-semibold text-gold-400 bg-navy-900 rounded-xl"
              >
                View Public Site
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-center block text-xs font-semibold text-rose-400 hover:bg-rose-950 rounded-xl"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
