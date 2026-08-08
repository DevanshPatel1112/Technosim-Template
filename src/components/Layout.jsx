// ============================================================
// CampusVerse OS — Layout Shell (Complete Redesign)
// Dark Space OS with Glassmorphism + CKP Brand Palette
// ============================================================


import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map, CalendarDays, ConciergeBell, ShieldCheck,
  Bell, Search, GraduationCap, ChevronRight,
  LayoutDashboard, Sparkles, LogOut,
  Utensils, Activity, Radio, PlusCircle
} from 'lucide-react';

/* ── Nav Config ─────────────────────────────────────────── */
const NAV_CONFIG = {
  visitor: [
    { label: 'Dashboard',        path: '/dashboard',            icon: LayoutDashboard },
    { label: 'Interactive Map',  path: '/map',                  icon: Map },
    { label: 'Public Events',    path: '/events',               icon: CalendarDays },
  ],
  student: [
    { label: 'Dashboard',        path: '/dashboard',            icon: LayoutDashboard },
    { label: 'Interactive Map',  path: '/map',                  icon: Map },
    { label: 'Events Hub',       path: '/events',               icon: CalendarDays },
    { label: 'Campus Services',  path: '/services',             icon: ConciergeBell },
    { label: 'Propose Event',    path: '/propose-event',        icon: PlusCircle },
  ],
  vendor: [
    { label: 'Vendor Dashboard', path: '/dashboard',            icon: LayoutDashboard },
    { label: 'Manage Menu',      path: '/manage-menu',          icon: Utensils },
    { label: 'Live Orders',      path: '/live-orders',          icon: Bell },
  ],
  admin: [
    { label: 'Admin Dashboard',  path: '/dashboard',            icon: ShieldCheck },
    { label: 'Approve Events',   path: '/approve-events',       icon: CalendarDays },
    { label: 'Broadcast Center', path: '/broadcast',            icon: Radio },
    { label: 'System Health',    path: '/system-health',        icon: Activity },
  ],
};

const ROLE_PROFILES = {
  visitor: { initials: 'VV', name: 'Guest View',      subtitle: 'Read-only Access',     bg: 'linear-gradient(135deg, #06B6D4, #38BDF8)', glow: '0 0 14px rgba(6,182,212,0.5)' },
  student: { initials: 'SV', name: 'Student View',    subtitle: 'B.E. Computer Engg.',  bg: 'linear-gradient(135deg, #7048E8, #9B7AFF)', glow: '0 0 14px rgba(112,72,232,0.5)' },
  vendor:  { initials: 'VM', name: 'Cafeteria Mgr',   subtitle: 'Vendor Access',        bg: 'linear-gradient(135deg, #F59E0B, #FBBF24)', glow: '0 0 14px rgba(245,158,11,0.5)' },
  admin:   { initials: 'AD', name: 'Faculty Admin',   subtitle: 'Management Access',    bg: 'linear-gradient(135deg, #EC4899, #F472B6)', glow: '0 0 14px rgba(236,72,153,0.5)' },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SIDEBAR
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Sidebar = ({ currentUser, onLogout }) => {
  const navItems = NAV_CONFIG[currentUser] || NAV_CONFIG.visitor;
  const profile  = ROLE_PROFILES[currentUser] || ROLE_PROFILES.visitor;

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 h-screen bg-ckp-sidebar-darkest/92 backdrop-blur-[28px] border-r border-ckp-layout-divider flex flex-col z-50"
      style={{ width: '256px' }}
    >
      {/* ── Logo ── */}
      <div className="sidebar-logo flex items-center border-b border-ckp-layout-divider"
        style={{ 
          padding: '24px 20px',
          gap: '16px'
        }}>
        <motion.div
          whileHover={{ rotate: 360, scale: 1.15 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #7048E8, #9B7AFF)',
            boxShadow: '0 0 24px rgba(112,72,232,0.45), inset 0 1px 0 rgba(255,255,255,0.15)',
          }}
        >
          <GraduationCap size={17} className="text-ckp-pure-white" />
        </motion.div>
        <div>
          <p className="text-ckp-pure-white font-extrabold text-[15px] leading-none tracking-tight">
            CKPCET OS
          </p>
          <p className="gradient-text text-[10px] font-semibold mt-[3px] tracking-[0.18em] uppercase">
            CampusVerse
          </p>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto" style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 mb-5 text-ckp-faded-gray">
          Main Menu
        </p>

        {navItems.map(({ label, path, icon: Icon, end }) => (
          <div key={path} className="nav-link-item">
            <NavLink to={path} end={end}>
              {({ isActive }) => (
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center rounded-[6px] text-sm font-medium overflow-hidden transition-colors duration-300"
                  style={isActive ? {
                    padding: '12px 14px',
                    gap: '14px',
                    background: 'linear-gradient(135deg, rgba(112,72,232,0.18) 0%, rgba(112,72,232,0.08) 100%)',
                    border: '1px solid rgba(112,72,232,0.28)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 24px rgba(112,72,232,0.12)',
                  } : {
                    padding: '12px 14px',
                    gap: '14px',
                    background: 'transparent',
                    border: '1px solid transparent',
                    color: '#475569',
                  }}
                >
                  {/* Active left bar */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bar"
                      className="absolute left-[3px] top-[12px] bottom-[12px] w-[3px] rounded-[5px]"
                      style={{ background: 'linear-gradient(to bottom, #7048E8, #9B7AFF)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <Icon
                    size={16}
                    style={{ color: isActive ? '#9B7AFF' : '#475569', flexShrink: 0 }}
                  />
                  <span className="flex-1 text-[13.5px]">{label}</span>
                  {isActive && (
                    <ChevronRight size={12} style={{ color: 'rgba(112,72,232,0.7)' }} />
                  )}
                </motion.div>
              )}
            </NavLink>
          </div>
        ))}
      </nav>

      {/* ── User Profile ── */}
      <div className="px-4 pt-4 pb-6 border-t border-ckp-layout-divider" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <motion.div
          whileTap={{ scale: 0.97 }}
          className="flex items-center cursor-pointer border border-ckp-layout-divider"
          style={{
            padding: '12px 14px',
            gap: '14px',
            background: currentUser === 'admin' ? 'rgba(236,72,153,0.07)' : 'rgba(112,72,232,0.07)',
            borderRadius: '8px',
          }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: profile.bg, boxShadow: profile.glow }}>
            <span className="text-ckp-pure-white text-[11px] font-bold">{profile.initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-ckp-pure-white text-[13px] font-semibold truncate leading-tight">{profile.name}</p>
            <p className="text-[11px] truncate mt-[2px] text-ckp-muted-lavender">
              {profile.subtitle}
            </p>
          </div>
          {/* Pulsing online dot */}
          <div className="w-[7px] h-[7px] rounded-full bg-ckp-emerald flex-shrink-0 pulse-dot" />
        </motion.div>

        {/* Logout */}
        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            background: 'rgba(236,72,153,0.07)',
            border: '1px solid rgba(236,72,153,0.18)',
            borderRadius: '8px',
            color: '#94A3B8',
            fontSize: '12.5px', fontWeight: 600,
            padding: '9px',
            cursor: 'pointer',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#EC4899'; e.currentTarget.style.borderColor = 'rgba(236,72,153,0.35)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(236,72,153,0.18)'; }}
        >
          <LogOut size={13} />
          Sign Out
        </motion.button>
      </div>
    </motion.aside>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOP HEADER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const TopHeader = ({ currentUser }) => {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

  const profile = ROLE_PROFILES[currentUser] || ROLE_PROFILES.visitor;

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="fixed top-0 right-0 h-[84px] bg-ckp-sidebar-darkest/85 backdrop-blur-[24px] border-b border-ckp-layout-divider flex items-center justify-between z-40"
      style={{ left: '256px', padding: '0 32px' }}
    >
      {/* Search Input */}
      <motion.label
        whileHover={{ scale: 1.015 }}
        className="flex items-center gap-2.5 rounded-[10px] w-[260px] cursor-text transition-colors border border-ckp-layout-divider focus-within:border-ckp-primary-indigo/30 focus-within:bg-white/5"
        style={{
          background: 'rgba(26,28,41,0.5)',
          padding: '9px 16px',
        }}
      >
        <Search size={13} style={{ color: '#475569', flexShrink: 0 }} />
        <input 
          type="text" 
          placeholder="Search campus..."
          className="bg-transparent border-none outline-none text-[13px] text-ckp-pure-white flex-1 min-w-0 placeholder-ckp-faded-gray"
        />
        <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md font-mono hidden sm:block select-none border border-ckp-layout-divider"
          style={{ color: '#475569', background: 'transparent' }}>
          ⌘K
        </kbd>
      </motion.label>

      {/* Right controls */}
      <div className="flex items-center gap-3.5">
        {/* Date chip */}
        <div className="hidden md:flex items-center gap-2 rounded-full"
          style={{ background: 'rgba(112,72,232,0.08)', border: '1px solid rgba(112,72,232,0.15)', padding: '7px 14px' }}>
          <Sparkles size={11} style={{ color: '#7048E8' }} />
          <span className="text-[11.5px] font-medium text-ckp-muted-lavender">{today}</span>
        </div>

        {/* Bell */}
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-9 h-9 rounded-[10px] flex items-center justify-center cursor-pointer border border-ckp-layout-divider"
          style={{ background: 'rgba(26,28,41,0.5)' }}
        >
          <Bell size={14} style={{ color: '#F59E0B' }} />
          <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] rounded-full"
            style={{ background: '#7048E8', border: '2px solid #0B0C14', boxShadow: '0 0 8px rgba(112,72,232,0.9)' }} />
        </motion.button>

        <div className="w-px h-5 bg-ckp-layout-divider" />

        {/* Avatar — reflects current role */}
        <motion.div
          whileHover={{ scale: 1.12 }}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: profile.bg, boxShadow: profile.glow }}
        >
          <span className="text-ckp-pure-white text-[11px] font-bold">{profile.initials}</span>
        </motion.div>
      </div>
    </motion.header>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROOT LAYOUT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Layout = ({ currentUser, onLogout, menuItems, setMenuItems }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ckp-main-app-bg">

      <Sidebar currentUser={currentUser} onLogout={onLogout} />
      <TopHeader currentUser={currentUser} />

      <main
        style={{
          marginLeft: '256px',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 10,
          overflowX: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ padding: '96px 48px 15px' }}
          >
            <Outlet context={{ currentUser, menuItems, setMenuItems }} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
