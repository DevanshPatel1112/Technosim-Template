// ============================================================
// CampusVerse OS — StudentDashboard.jsx
// Exclusive Utility: Digital ID, Live Wait Times, Quick Actions
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ckpcetLogo from '../assets/logos/ckpcet-logo.png';
import {
  QrCode, Printer, Wallet, Coffee, BookOpen, Wifi,
  Users, CalendarCheck, CheckCircle, ChevronRight
} from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPERS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const toRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : '255,255,255';
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// 1. Digital ID Card
const DigitalIDCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[20px] p-6 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(135deg, rgba(112,72,232,0.1) 0%, rgba(112,72,232,0.02) 100%)',
        border: '1px solid rgba(112,72,232,0.3)',
        boxShadow: '0 8px 32px rgba(112,72,232,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        minHeight: '220px'
      }}
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#7048E8] opacity-20 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex justify-between items-start z-10">
        <div>
          <h2 className="text-2xl font-extrabold text-ckp-pure-white tracking-tight leading-tight">
            Devansh Patel
          </h2>
          <p className="text-[#9B7AFF] text-sm font-semibold mt-1 tracking-wide uppercase">
            B.E. Computer Engineering
          </p>
          <p className="text-ckp-muted-lavender text-xs mt-1 font-mono">
            ID: CKP-2026-CSE-104
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1 flex items-center justify-center overflow-hidden shrink-0 h-12 w-12 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <img src={ckpcetLogo} alt="CKPCET Logo" className="w-full h-full object-contain" />
          </div>
          <div className="bg-white/10 p-2.5 rounded-[12px] border border-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(112,72,232,0.5)]">
            <QrCode size={28} className="text-ckp-pure-white" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-8 z-10 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2">
          <Printer size={16} className="text-[#06B6D4]" />
          <span className="text-ckp-pure-white text-sm font-medium">Quota: <span className="text-[#06B6D4] font-bold">45 Pages</span></span>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-2">
          <Wallet size={16} className="text-[#10B981]" />
          <span className="text-ckp-pure-white text-sm font-medium">Wallet: <span className="text-[#10B981] font-bold">₹320</span></span>
        </div>
      </div>
    </motion.div>
  );
};

// 2. Pulse Card
const PulseCard = ({ icon: Icon, title, status, text, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="p-5 rounded-[16px] border flex flex-col gap-3 relative overflow-hidden group"
      style={{
        background: 'rgba(26,28,41,0.6)',
        borderColor: 'rgba(38,40,55,1)',
      }}
    >
      {/* Hover glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      />
      
      <div className="flex justify-between items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `rgba(${toRgb(color)}, 0.15)` }}>
          <Icon size={18} color={color} />
        </div>
        <span 
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md"
          style={{ background: `rgba(${toRgb(color)}, 0.1)`, color: color, border: `1px solid rgba(${toRgb(color)}, 0.2)` }}
        >
          {status}
        </span>
      </div>
      <div>
        <h3 className="text-ckp-pure-white text-sm font-bold">{title}</h3>
        <p className="text-ckp-muted-lavender text-xs mt-1 font-medium">{text}</p>
      </div>
    </motion.div>
  );
};

// 3. Action Button
const ActionButton = ({ icon: Icon, label, onClick, color }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-[14px] border cursor-pointer transition-all duration-300"
      style={{
        background: 'rgba(26,28,41,0.8)',
        borderColor: 'rgba(38,40,55,1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgba(${toRgb(color)}, 0.4)`;
        e.currentTarget.style.background = `rgba(${toRgb(color)}, 0.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(38,40,55,1)';
        e.currentTarget.style.background = 'rgba(26,28,41,0.8)';
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `rgba(${toRgb(color)}, 0.1)` }}>
        <Icon size={18} color={color} />
      </div>
      <span className="text-ckp-pure-white text-sm font-semibold flex-1 text-left">{label}</span>
      <ChevronRight size={16} className="text-[#475569]" />
    </motion.button>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN DASHBOARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const StudentDashboard = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-extrabold text-ckp-pure-white tracking-tight leading-tight">
          Welcome, <span className="text-[#9B7AFF]">Ckpian</span> ✨
        </h1>
        <p className="mt-1 text-[13px] text-ckp-muted-lavender">
          Your exclusive campus utilities and live status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ID Card & Quick Actions */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <DigitalIDCard />
          
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#475569]">
              Quick Actions
            </h2>
            <ActionButton 
              icon={Users} 
              label="Book Group Discussion Room" 
              color="#7048E8"
              onClick={() => showToast('GD Room booking request initiated.')}
            />
            <ActionButton 
              icon={CalendarCheck} 
              label="Request Faculty Appointment" 
              color="#EC4899"
              onClick={() => showToast('Faculty appointment portal opened.')}
            />
          </div>
        </div>

        {/* Right Column: Live Wait Times */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-[#475569]">
            Live Facility Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <PulseCard 
              icon={Coffee}
              title="Cafeteria"
              status="Busy"
              text="~12 Min Wait Time"
              color="#F59E0B"
              delay={0.1}
            />
            <PulseCard 
              icon={BookOpen}
              title="Library Reading Room"
              status="Available"
              text="42 Seats Open"
              color="#10B981"
              delay={0.2}
            />
            <PulseCard 
              icon={Wifi}
              title="Campus Wi-Fi"
              status="Optimal"
              text="150 Mbps Average"
              color="#06B6D4"
              delay={0.3}
            />
          </div>

          {/* Toast Notification */}
          <AnimatePresence>
            {toast && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 flex items-center gap-3 p-4 rounded-[12px] bg-[#10B981]/10 border border-[#10B981]/30 self-start"
              >
                <CheckCircle size={16} className="text-[#10B981]" />
                <span className="text-sm font-medium text-ckp-pure-white">{toast}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
