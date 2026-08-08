// ============================================================
// CampusVerse OS — AdminPortal.jsx
// Admin Illusion — Fake role-based auth + dashboard
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, ShieldCheck, Eye, EyeOff, LogOut,
  Users, Bell, Activity, Megaphone, Settings,
  CheckCircle, AlertTriangle, ArrowUpRight,
  Send, ChevronDown, Wifi, Coffee, BookOpen,
  Bus, Dumbbell, ToggleLeft, ToggleRight,
  CalendarPlus, MapPin,
} from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATS DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const STATS = [
  {
    label: 'Active Campus Users',
    value: '1,245',
    trend: '+18 today',
    trendUp: true,
    icon: Users,
    hex: '#10B981',
    glow: 'rgba(16,185,129,0.25)',
  },
  {
    label: 'Pending Notices',
    value: '4',
    trend: '2 urgent',
    trendUp: false,
    icon: Bell,
    hex: '#F59E0B',
    glow: 'rgba(245,158,11,0.25)',
  },
  {
    label: 'System Health',
    value: '99.9%',
    trend: 'All systems nominal',
    trendUp: true,
    icon: Activity,
    hex: '#10B981',
    glow: 'rgba(16,185,129,0.25)',
  },
];

const CATEGORIES = [
  'General Announcement',
  'Academic Notice',
  'Exam / Schedule',
  'Event',
  'Hostel & Mess',
  'Emergency Alert',
];

const INITIAL_SERVICES = [
  { id: 'canteen',  label: 'Canteen',        icon: Coffee,   active: true  },
  { id: 'library',  label: 'Library',        icon: BookOpen, active: true  },
  { id: 'wifi',     label: 'Campus Wi-Fi',   icon: Wifi,     active: true  },
  { id: 'sports',   label: 'Sports Complex', icon: Dumbbell, active: false },
  { id: 'bus',      label: 'Bus Service',    icon: Bus,      active: true  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED HELPERS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const inputStyle = {
  background: 'rgba(16,18,27,0.7)',
  border: '1px solid #262837',
  borderRadius: '10px',
  color: '#FFFFFF',
  padding: '11px 14px',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOGIN GATE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const LoginGate = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [shaking, setShaking]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials. Hint: password is "admin".');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center"
      style={{ padding: '40px 20px' }}
    >
      <motion.div
        key="login-card"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={shaking
          ? { opacity: 1, y: 0, scale: 1, x: [0, -10, 10, -8, 8, 0] }
          : { opacity: 1, y: 0, scale: 1, x: 0 }
        }
        transition={{ duration: shaking ? 0.4 : 0.55, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(26,28,41,0.85)',
          border: '1px solid #262837',
          borderRadius: '22px',
          padding: '44px 40px 40px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center" style={{ marginBottom: '36px' }}>
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 14 }}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #7048E8, #9B7AFF)',
              boxShadow: '0 0 36px rgba(112,72,232,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Lock size={28} color="#fff" />
          </motion.div>

          <h1 className="text-ckp-textMain font-extrabold text-[22px] tracking-tight">
            Admin Secured Access
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '13px', marginTop: '6px', textAlign: 'center' }}>
            Restricted to authorized CKPCET personnel only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Username */}
          <div>
            <label style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>
              USERNAME
            </label>
            <input
              type="text"
              placeholder="e.g. faculty.admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#7048E8')}
              onBlur={(e)  => (e.target.style.borderColor = '#262837')}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: '44px' }}
                onFocus={(e) => (e.target.style.borderColor = '#7048E8')}
                onBlur={(e)  => (e.target.style.borderColor = '#262837')}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                style={{
                  position: 'absolute', right: '13px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: '#64748B',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  background: 'rgba(236,72,153,0.1)',
                  border: '1px solid rgba(236,72,153,0.25)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#EC4899',
                  fontSize: '12.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <AlertTriangle size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(112,72,232,0.55)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: '8px',
              background: 'linear-gradient(135deg, #7048E8, #9B7AFF)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              padding: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 0 20px rgba(112,72,232,0.35)',
            }}
          >
            <ShieldCheck size={16} />
            Authenticate
          </motion.button>
        </form>

        {/* Footer hint */}
        <p style={{ color: '#475569', fontSize: '11.5px', textAlign: 'center', marginTop: '24px' }}>
          Password hint: <span style={{ color: '#7048E8' }}>admin</span>
        </p>
      </motion.div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STAT CARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const StatCard = ({ label, value, trend, trendUp, icon: Icon, hex, glow }) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: `0 12px 40px ${glow}` }}
    style={{
      background: 'rgba(26,28,41,0.9)',
      border: '1px solid #262837',
      borderRadius: '16px',
      padding: '22px 24px',
      cursor: 'default',
      transition: 'box-shadow 0.25s',
      height: '100%',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
      <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${hex}22`, border: `1px solid ${hex}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color={hex} />
      </div>
      <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 9px', borderRadius: '20px', background: trendUp ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)', color: trendUp ? '#10B981' : '#F59E0B', border: `1px solid ${trendUp ? 'rgba(16,185,129,0.25)' : 'rgba(245,158,11,0.25)'}`, display: 'flex', alignItems: 'center', gap: '3px' }}>
        {trendUp ? <ArrowUpRight size={11} /> : <AlertTriangle size={11} />}
        {trend}
      </span>
    </div>
    <p style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: 800, lineHeight: 1 }}>{value}</p>
    <p style={{ color: '#94A3B8', fontSize: '12.5px', marginTop: '6px', fontWeight: 500 }}>{label}</p>
  </motion.div>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANNOUNCEMENT CARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const AnnouncementCard = () => {
  const [text, setText]           = useState('');
  const [category, setCategory]   = useState(CATEGORIES[0]);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    if (!text.trim()) return;
    setPublished(true);
    setTimeout(() => { setPublished(false); setText(''); }, 2800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{ background: 'rgba(26,28,41,0.9)', border: '1px solid #262837', borderRadius: '18px', padding: '28px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Megaphone size={18} color="#EC4899" />
        </div>
        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 800 }}>Post New Announcement</h2>
          <p style={{ color: '#64748B', fontSize: '12px', marginTop: '1px' }}>Broadcast to all campus users instantly</p>
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>CATEGORY</label>
        <div style={{ position: 'relative' }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
            onFocus={(e) => (e.target.style.borderColor = '#EC4899')}
            onBlur={(e)  => (e.target.style.borderColor = '#262837')}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} style={{ background: '#1A1C29' }}>{c}</option>
            ))}
          </select>
          <ChevronDown size={14} color="#64748B" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>MESSAGE</label>
        <textarea
          rows={4}
          placeholder="Write your announcement here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit', lineHeight: '1.6' }}
          onFocus={(e) => (e.target.style.borderColor = '#EC4899')}
          onBlur={(e)  => (e.target.style.borderColor = '#262837')}
        />
        <p style={{ color: '#475569', fontSize: '11px', marginTop: '5px', textAlign: 'right' }}>
          {text.length} / 500
        </p>
      </div>

      <AnimatePresence mode="wait">
        {published ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '13px', color: '#10B981', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <CheckCircle size={16} /> Published to Campus!
          </motion.div>
        ) : (
          <motion.button
            key="btn"
            onClick={handlePublish}
            whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(236,72,153,0.45)' }}
            whileTap={{ scale: 0.97 }}
            style={{ width: '100%', background: 'linear-gradient(135deg, #EC4899, #F472B6)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 0 18px rgba(236,72,153,0.3)' }}
          >
            <Send size={15} />
            Publish to Campus
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ADD EVENT CARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EVENT_TYPES = [
  'Academic',
  'Workshop',
  'Cultural',
  'Sports',
  'Career / Placement',
  'Hackathon',
  'Seminar',
  'Other',
];

const AddEventCard = () => {
  const [title, setTitle]       = useState('');
  const [date, setDate]         = useState('');
  const [time, setTime]         = useState('');
  const [location, setLocation] = useState('');
  const [type, setType]         = useState(EVENT_TYPES[0]);
  const [scheduled, setScheduled] = useState(false);

  const handleSchedule = () => {
    if (!title.trim() || !date || !time || !location.trim()) return;
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      setTitle(''); setDate(''); setTime(''); setLocation('');
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ background: 'rgba(26,28,41,0.9)', border: '1px solid #262837', borderRadius: '18px', padding: '28px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CalendarPlus size={18} color="#10B981" />
        </div>
        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 800 }}>Add New Event</h2>
          <p style={{ color: '#64748B', fontSize: '12px', marginTop: '1px' }}>Schedule and publish a campus event</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Event Title */}
        <div>
          <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>EVENT TITLE</label>
          <input
            type="text"
            placeholder="e.g. Zonal Hackathon 'Technoism' 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = '#10B981')}
            onBlur={(e)  => (e.target.style.borderColor = '#262837')}
          />
        </div>

        {/* Date + Time row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>DATE</label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark', paddingRight: '10px' }}
                onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                onBlur={(e)  => (e.target.style.borderColor = '#262837')}
              />
            </div>
          </div>
          <div>
            <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>TIME</label>
            <div style={{ position: 'relative' }}>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark', paddingRight: '10px' }}
                onFocus={(e) => (e.target.style.borderColor = '#10B981')}
                onBlur={(e)  => (e.target.style.borderColor = '#262837')}
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>LOCATION</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="e.g. D1-108 Seminar Hall, Computer Dept."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ ...inputStyle, paddingLeft: '36px' }}
              onFocus={(e) => (e.target.style.borderColor = '#10B981')}
              onBlur={(e)  => (e.target.style.borderColor = '#262837')}
            />
            <MapPin size={14} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>EVENT TYPE</label>
          <div style={{ position: 'relative' }}>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ ...inputStyle, appearance: 'none', paddingRight: '36px', cursor: 'pointer' }}
              onFocus={(e) => (e.target.style.borderColor = '#10B981')}
              onBlur={(e)  => (e.target.style.borderColor = '#262837')}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t} style={{ background: '#1A1C29' }}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} color="#64748B" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Schedule button */}
        <AnimatePresence mode="wait">
          {scheduled ? (
            <motion.div
              key="ev-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '12px', padding: '13px', color: '#10B981', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <CheckCircle size={16} /> Event Scheduled Successfully!
            </motion.div>
          ) : (
            <motion.button
              key="ev-btn"
              onClick={handleSchedule}
              whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(16,185,129,0.45)' }}
              whileTap={{ scale: 0.97 }}
              style={{ width: '100%', background: 'linear-gradient(135deg, #10B981, #34D399)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 0 18px rgba(16,185,129,0.3)' }}
            >
              <CalendarPlus size={15} />
              Schedule Event
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SERVICES CARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ServicesCard = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const toggle = (id) =>
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      style={{ background: 'rgba(26,28,41,0.9)', border: '1px solid #262837', borderRadius: '18px', padding: '28px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(112,72,232,0.15)', border: '1px solid rgba(112,72,232,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={18} color="#7048E8" />
        </div>
        <div>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 800 }}>Manage Services</h2>
          <p style={{ color: '#64748B', fontSize: '12px', marginTop: '1px' }}>Toggle campus service availability</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {services.map(({ id, label, icon: Icon, active }) => (
          <motion.div
            key={id}
            layout
            onClick={() => toggle(id)}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '12px', background: active ? 'rgba(16,185,129,0.06)' : 'rgba(16,18,27,0.5)', border: `1px solid ${active ? 'rgba(16,185,129,0.18)' : '#262837'}`, cursor: 'pointer', transition: 'all 0.25s ease' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: active ? 'rgba(16,185,129,0.15)' : 'rgba(38,40,55,0.8)', border: `1px solid ${active ? 'rgba(16,185,129,0.3)' : '#262837'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease' }}>
                <Icon size={16} color={active ? '#10B981' : '#64748B'} />
              </div>
              <span style={{ color: active ? '#FFFFFF' : '#94A3B8', fontSize: '13.5px', fontWeight: 600, transition: 'color 0.2s' }}>
                {label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: active ? '#10B981' : '#64748B', transition: 'color 0.2s' }}>
                {active ? 'ONLINE' : 'OFFLINE'}
              </span>
              {active
                ? <ToggleRight size={26} color="#10B981" />
                : <ToggleLeft  size={26} color="#475569" />
              }
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ADMIN DASHBOARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const AdminDashboard = ({ onLogout }) => (
  <motion.div
    key="dashboard"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    {/* Page header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg,#7048E8,#9B7AFF)', boxShadow: '0 0 20px rgba(112,72,232,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={18} color="#fff" />
          </div>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Admin Control Panel
          </h1>
        </div>
        <p style={{ color: '#64748B', fontSize: '13px', marginTop: '6px' }}>
          CKPCET OS — Management &amp; Broadcast Console
        </p>
      </div>

      <motion.button
        onClick={onLogout}
        whileHover={{ scale: 1.05, boxShadow: '0 0 18px rgba(236,72,153,0.35)' }}
        whileTap={{ scale: 0.95 }}
        style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: '10px', color: '#EC4899', fontSize: '13px', fontWeight: 700, padding: '9px 16px', cursor: 'pointer' }}
      >
        <LogOut size={14} /> Logout
      </motion.button>
    </div>

    {/* Quick Stats Row */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
        >
          <StatCard {...s} />
        </motion.div>
      ))}
    </div>

    {/* Action Cards Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
      <AnnouncementCard />
      <AddEventCard />
      <ServicesCard />
    </div>
  </motion.div>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROOT EXPORT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const AdminPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isAuthenticated ? (
        <LoginGate key="login" onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <AdminDashboard key="dash" onLogout={() => setIsAuthenticated(false)} />
      )}
    </AnimatePresence>
  );
};

export default AdminPortal;
