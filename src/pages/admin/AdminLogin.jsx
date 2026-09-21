import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export default function AdminLogin() {
  const { login } = useAdminData();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('shyam@2026');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
    }
  };

  const handleDemoLogin = () => {
    login('admin', 'shyam@2026');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Glow graphics */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-navy-900 border border-navy-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-left">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-8 pb-6 border-b border-navy-800 text-center">
          <Link to="/" className="inline-block group mb-3">
            <img
              src="/shyam homes logo.png"
              alt="Shyam Homes"
              className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950 border border-gold-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <p className="text-[11px] text-gold-400 uppercase tracking-wider font-semibold">
              Admin & Consultant Portal
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-serif text-2xl font-bold text-white">Sign In</h2>
          <p className="text-xs text-slate-400 mt-1">
            Access listings, incoming client leads, and site visit schedules.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 font-medium"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 font-medium"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold uppercase tracking-wider text-xs transition-all shadow-gold-glow flex items-center justify-center gap-2 mt-4"
          >
            <span>Login to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Shortcut */}
        <div className="mt-6 pt-6 border-t border-navy-800">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-navy-950 hover:bg-navy-800 border border-gold-500/30 text-gold-400 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>1-Click Demo Login (admin / shyam@2026)</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
