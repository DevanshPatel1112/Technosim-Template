// ============================================================
// CampusVerse OS — GlobalLogin.jsx
// Full-screen authentication gate with RBAC demo credentials
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertTriangle, ShieldCheck, User, Coffee, Map } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { email: 'visitor@ckpcet.ac.in', password: 'demo123', role: 'visitor', label: 'Guest View',      color: '#06B6D4' },
  { email: 'student@ckpcet.ac.in', password: 'demo123', role: 'student', label: 'Student View',    color: '#7048E8' },
  { email: 'vendor@ckpcet.ac.in',  password: 'demo123', role: 'vendor',  label: 'Vendor View',     color: '#F59E0B' },
  { email: 'admin@ckpcet.ac.in',   password: 'admin123', role: 'admin',   label: 'Admin View',      color: '#EC4899' },
];

const inputBase = {
  background: 'rgba(16,18,27,0.7)',
  border: '1px solid #262837',
  borderRadius: '10px',
  color: '#FFFFFF',
  fontSize: '14px',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const toRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : '255,255,255';
};

const GlobalLogin = ({ onLogin }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [shaking, setShaking]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a brief auth delay for realism
    await new Promise((r) => setTimeout(r, 600));

    const match = DEMO_ACCOUNTS.find(
      (a) => a.email === email.trim().toLowerCase() && a.password === password
    );

    if (match) {
      onLogin(match.role);
    } else {
      setLoading(false);
      setError('Invalid email or password. Use the demo credentials below.');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const fillDemo = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-ckp-app"
      style={{ padding: '24px' }}
    >
      {/* Ambient background glows */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(112,72,232,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <motion.div
        animate={shaking
          ? { x: [0, -12, 12, -10, 10, -6, 6, 0] }
          : { x: 0 }
        }
        transition={{ duration: 0.45 }}
        style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 10 }}
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(26,28,41,0.88)',
            border: '1px solid #262837',
            borderRadius: '24px',
            padding: '44px 40px 40px',
            backdropFilter: 'blur(28px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* ── Branding ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '36px' }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              style={{
                width: '68px', height: '68px', borderRadius: '20px',
                background: 'linear-gradient(135deg, #7048E8, #9B7AFF)',
                boxShadow: '0 0 40px rgba(112,72,232,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '18px',
              }}
            >
              <GraduationCap size={32} color="#fff" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <h1 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>
                CKPCET OS
              </h1>
              <p style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', marginTop: '5px',
                background: 'linear-gradient(90deg, #7048E8, #06B6D4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                CampusVerse
              </p>
              <p style={{ color: '#475569', fontSize: '12.5px', marginTop: '10px' }}>
                Sign in to access your campus portal
              </p>
            </motion.div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Email */}
            <div>
              <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="e.g. visitor@ckpcet.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ ...inputBase, padding: '11px 14px 11px 38px' }}
                  onFocus={(e) => (e.target.style.borderColor = '#7048E8')}
                  onBlur={(e)  => (e.target.style.borderColor = '#262837')}
                />
                <Mail size={14} color="#475569" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ color: '#94A3B8', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '7px' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ ...inputBase, padding: '11px 42px 11px 38px' }}
                  onFocus={(e) => (e.target.style.borderColor = '#7048E8')}
                  onBlur={(e)  => (e.target.style.borderColor = '#262837')}
                />
                <Lock size={14} color="#475569" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
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
                  style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: '9px', padding: '10px 13px', color: '#EC4899', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <AlertTriangle size={13} style={{ flexShrink: 0 }} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 36px rgba(112,72,232,0.6)' } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              style={{
                marginTop: '6px',
                background: loading
                  ? 'rgba(112,72,232,0.4)'
                  : 'linear-gradient(135deg, #7048E8, #9B7AFF)',
                border: 'none', borderRadius: '12px', color: '#fff',
                fontSize: '14px', fontWeight: 700, padding: '13px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 0 22px rgba(112,72,232,0.35)',
                transition: 'background 0.2s',
              }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Sign In to CampusVerse
                </>
              )}
            </motion.button>
          </form>

          {/* ── Demo Credentials ── */}
          <div style={{ marginTop: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: '#262837' }} />
              <span style={{ color: '#475569', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>DEMO CREDENTIALS</span>
              <div style={{ flex: 1, height: '1px', background: '#262837' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {DEMO_ACCOUNTS.map((account) => {
                let Icon = User;
                if (account.role === 'visitor') Icon = Map;
                if (account.role === 'vendor')  Icon = Coffee;
                if (account.role === 'admin')   Icon = ShieldCheck;

                return (
                  <motion.button
                    key={account.role}
                    type="button"
                    onClick={() => fillDemo(account)}
                    whileHover={{ scale: 1.03, borderColor: account.color }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: `rgba(${toRgb(account.color)}, 0.07)`,
                      border: `1px solid rgba(${toRgb(account.color)}, 0.2)`,
                      borderRadius: '10px',
                      padding: '11px 12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
                      <Icon size={13} color={account.color} />
                      <span style={{ color: account.color, fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                        {account.label.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: '10.5px', fontWeight: 500, fontFamily: 'monospace', lineHeight: 1.5 }}>
                      {account.email}<br />
                      <span style={{ color: '#64748B' }}>{account.password}</span>
                    </p>
                  </motion.button>
                );
              })}
            </div>
            <p style={{ color: '#94A3B8', fontSize: '11px', textAlign: 'center', marginTop: '10px' }}>
              Click a card to auto-fill credentials
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlobalLogin;
