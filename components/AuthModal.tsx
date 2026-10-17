'use client';

import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Building2, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useERPStore } from '../lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'signin' | 'trial';
}

export function AuthModal({ isOpen, onClose, initialTab = 'signin' }: AuthModalProps) {
  const { login, startFreeTrial } = useERPStore();
  const [tab, setTab] = useState<'signin' | 'trial'>(initialTab);
  
  // Sign In State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Free Trial State
  const [fullName, setFullName] = useState('');
  const [trialEmail, setTrialEmail] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [trialPassword, setTrialPassword] = useState('');

  // Status/Error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      login({
        email: 'dr.priya@gmail.com',
        name: 'Dr. Priya Sharma',
        clinicName: 'Apex Smile Studio',
        provider: 'gmail'
      });
      setIsLoading(false);
      onClose();
    }, 700);
  };

  const handleAppleSignIn = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      login({
        email: 'doctor.apple@icloud.com',
        name: 'Dr. Priya Sharma',
        clinicName: 'Apex Smile Studio',
        provider: 'apple'
      });
      setIsLoading(false);
      onClose();
    }, 700);
  };

  const handleCredentialsSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email/User ID and password.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      login({
        email: email,
        name: email.split('@')[0].replace('.', ' '),
        provider: 'credentials'
      });
      setIsLoading(false);
      onClose();
    }, 700);
  };

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !trialEmail || !clinicName) {
      setError('Please fill in your name, clinic name, and email.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      startFreeTrial({
        name: fullName,
        email: trialEmail,
        clinicName: clinicName
      });
      setIsLoading(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-md w-full overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4f98db]/10 border border-[#4f98db]/30 flex items-center justify-center p-1.5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#333333]">Digital Marketing for Dentists</h3>
              <p className="text-[11px] text-slate-500">Practice Social & Creative Automation</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Free Trial */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-center">
            <button
              onClick={() => { setTab('signin'); setError(null); }}
              className={`py-2 rounded-lg transition-all ${
                tab === 'signin'
                  ? 'bg-white text-[#4f98db] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('trial'); setError(null); }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                tab === 'trial'
                  ? 'bg-white text-[#4f98db] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4f98db]" />
              Start Free Trial
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {error}
          </div>
        )}

        {/* TAB 1: SIGN IN */}
        {tab === 'signin' && (
          <div className="p-6 space-y-4">
            {/* 1. Google One-Click Login */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-all shadow-2xs hover:shadow-xs disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign in with Google (Gmail)
            </button>

            {/* Alternative SSO / Apple */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAppleSignIn}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.44-6.19-9.5-10.9-20.2-14.13-32.1-3.23-11.91-4.85-23.01-4.85-33.32 0-14.48 3.84-26.6 11.51-36.35 7.67-9.75 17.26-14.77 28.77-15.06 4.35 0 9.4 1.13 15.15 3.4 5.76 2.27 9.58 3.5 11.47 3.7 2.22-.33 6.18-1.63 11.89-3.9 5.71-2.27 10.43-3.27 14.15-3.02 12.01.65 21.6 4.79 28.77 12.43-10.66 6.42-15.88 15.34-15.66 26.78.22 9.04 3.77 16.71 10.66 23.01 4.58 4.24 9.92 7.08 16.03 8.52-2.18 6.53-4.89 13.08-8.13 19.65zM119.22 31.84c0-7.39 2.65-14.34 7.95-20.85 5.3-6.52 11.75-10.51 19.35-11.99.22 1.09.33 2.07.33 2.94 0 7.39-2.73 14.44-8.19 21.15-5.46 6.72-12.01 10.69-19.65 11.9-.11-1.09-.22-2.18-.22-3.15z"/>
                </svg>
                Apple ID
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('admin@apexdental.com');
                  setPassword('demo1234');
                }}
                className="flex items-center justify-center gap-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
                title="Fill demo credentials"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#4f98db]" />
                Clinic SSO
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">or User ID & Password</span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleCredentialsSignIn} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email or User ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="doctor@clinic.com or UserID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:border-[#4f98db] focus:ring-1 focus:ring-[#4f98db] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 border border-slate-200 rounded-xl focus:border-[#4f98db] focus:ring-1 focus:ring-[#4f98db] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#4f98db] focus:ring-[#4f98db]"
                  />
                  Remember me
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to registered clinic doctor email."); }} className="text-[#4f98db] hover:underline font-semibold">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isLoading}
                className="w-full mt-2 font-bold shadow-sm"
              >
                Sign In to Practice ERP
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>
        )}

        {/* TAB 2: FREE TRIAL (LIMITED FREE CREDITS) */}
        {tab === 'trial' && (
          <div className="p-6 space-y-4">
            {/* Free Trial Offer Highlight Badge */}
            <div className="p-3.5 bg-[#f0f7fd] border border-[#b9ddf7] rounded-2xl text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#4f98db]" />
                  <span className="font-bold text-[#333333]">14-Day Free Trial Starter Kit</span>
                </div>
                <Badge variant="primary" size="sm">0 Cost</Badge>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Test all AI Copywriting, Reel Creation, and Content Calendar features with free demo credits:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4f98db] shrink-0" />
                  <span><strong>25</strong> AI Copy Credits</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4f98db] shrink-0" />
                  <span><strong>5</strong> Video Renders</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4f98db] shrink-0" />
                  <span><strong>10</strong> Graphics & Flyers</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4f98db] shrink-0" />
                  <span><strong>2 GB</strong> Cloud Storage</span>
                </div>
              </div>
            </div>

            {/* Trial Registration Form */}
            <form onSubmit={handleTrialSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Doctor / Practice Owner Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Dr. Sarah Chen, DDS"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:border-[#4f98db] focus:ring-1 focus:ring-[#4f98db] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Dental Practice Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Manhattan Smiles Dental Studio"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:border-[#4f98db] focus:ring-1 focus:ring-[#4f98db] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Practice Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="doctor@manhattansmiles.com"
                    value={trialEmail}
                    onChange={(e) => setTrialEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:border-[#4f98db] focus:ring-1 focus:ring-[#4f98db] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={trialPassword}
                    onChange={(e) => setTrialPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:border-[#4f98db] focus:ring-1 focus:ring-[#4f98db] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-1">
                No credit card required. Instant activation with free credits quota.
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isLoading}
                className="w-full mt-2 font-bold shadow-sm"
              >
                Activate Free Trial (25 Free Credits)
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Enterprise HIPAA & Data Privacy Compliant • Digital Marketing for Dentists
        </div>
      </div>
    </div>
  );
}
