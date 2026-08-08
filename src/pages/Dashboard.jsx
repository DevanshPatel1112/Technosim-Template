// ============================================================
// CampusVerse OS — Dashboard (Fixed)
// ✅ TiltCard: useMotionTemplate (no preserve-3d stacking bug)
// ✅ Scroll anims: Framer Motion whileInView (no GSAP trigger miss)
// ✅ Progress bars: dedicated component with whileInView
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import {
  CalendarDays, Bell, Zap, Activity, MapPin, Clock,
  ArrowUpRight, TrendingUp, BookOpen, Wifi, Coffee,
  Dumbbell, ChevronRight,
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
   ANIMATED COUNTER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Counter = ({ to, ms = 1200 }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const step = to / (ms / 16);
    let cur = 0;
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setV(to); clearInterval(id); }
      else setV(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [to, ms]);
  return <>{v}</>;
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROGRESS BAR — Framer Motion whileInView
   (replaces GSAP ScrollTrigger to avoid
    "stuck at opacity 0" bug)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ProgressBar = ({ pct, hex, delay = 0 }) => (
  <div
    className="h-[5px] rounded-full overflow-hidden"
    style={{ background: 'rgba(38,40,55,0.6)' }}
  >
    <motion.div
      className="h-full rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: `${pct}%` }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ background: `linear-gradient(90deg, ${hex}77, ${hex})` }}
    />
  </div>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3D TILT CARD
   Uses useMotionTemplate so the transform is
   a CSS string — avoids preserve-3d stacking
   context bugs that made card #1 bleed behind
   the sidebar.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const TiltCard = ({ children, style, className }) => {
  const ref  = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotX = useSpring(useTransform(rawY, [-70, 70], [7, -7]),  { stiffness: 350, damping: 30 });
  const rotY = useSpring(useTransform(rawX, [-70, 70], [-7, 7]),  { stiffness: 350, damping: 30 });

  const glareX = useTransform(rawX, [-70, 70], ['15%', '85%']);
  const glareY = useTransform(rawY, [-70, 70], ['15%', '85%']);

  // ✅ Correct approach: build CSS string via useMotionTemplate
  //    instead of using transformStyle:'preserve-3d' which
  //    creates a broken stacking context with fixed sidebars.
  const tiltTransform = useMotionTemplate`perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  const glareGradient = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 55%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    rawX.set(e.clientX - r.left  - r.width  / 2);
    rawY.set(e.clientY - r.top   - r.height / 2);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform: tiltTransform, willChange: 'transform', ...style }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          background: glareGradient, pointerEvents: 'none', zIndex: 10,
        }}
      />
    </motion.div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const STATS = [
  { label: 'Events Today',   value: 4,  icon: CalendarDays, hex: '#7048E8', sub: '+2 from yesterday' },
  { label: 'Active Notices', value: 12, icon: Bell,         hex: '#EC4899', sub: '3 unread'           },
  { label: 'Open Services',  value: 7,  icon: Zap,          hex: '#06B6D4', sub: 'All systems go'     },
  { label: 'Campus Alerts',  value: 1,  icon: Activity,     hex: '#F59E0B', sub: 'Low priority'       },
];

const EVENTS = [
  { title: "Zonal Hackathon 'Technoism'", location: 'D1-108 Seminar Hall', time: '08:30 AM', tag: 'Hackathon', hex: '#7048E8' },
  { title: 'Tech Fest 2026',        location: 'Main Auditorium',   time: '10:00 AM', tag: 'Featured', hex: '#7048E8' },
  { title: 'AI / ML Workshop',      location: 'CSE Lab 301',       time: '02:00 PM', tag: 'Workshop', hex: '#06B6D4' },
  { title: 'Placement Drive',       location: 'Seminar Hall B',    time: '09:00 AM', tag: 'Career',   hex: '#10B981' },
];

const SERVICES = [
  { name: 'Library',        pct: 78, hex: '#7048E8', icon: BookOpen },
  { name: 'Canteen',        pct: 92, hex: '#06B6D4', icon: Coffee   },
  { name: 'Sports Complex', pct: 45, hex: '#EC4899', icon: Dumbbell },
  { name: 'Campus Wi-Fi',   pct: 99, hex: '#10B981', icon: Wifi     },
];

const NOTICES = [
  "Technoism Hackathon registrations live! Register at forms.gle/29HZL2kVqCVPqeco9",
  "GUJCET 2026 Round 3 seat allotment result declared",
  "July 28, 2026: Gujarat ACPC Cutoff 2026 released",
  "July 20, 2026: B.E. 2nd Year (Sem 3) tuition fees notice",
  "July 9, 2026: Hostel Fees and Mess Charges notice",
];

const FEED = [
  { emoji: '📚', text: 'Library issued 23 books today',           time: '2 min ago',  hex: '#7048E8' },
  { emoji: '🎉', text: 'Tech Fest registrations now open',         time: '15 min ago', hex: '#7048E8' },
  { emoji: '🏋️', text: 'Sports complex: 45 % occupancy',          time: '32 min ago', hex: '#06B6D4' },
  { emoji: '📢', text: 'New circular: Exam schedule released',    time: '1 hr ago',   hex: '#F59E0B' },
  { emoji: '🍽️', text: "Canteen special today: Paneer Biryani",   time: '2 hr ago',   hex: '#10B981' },
  { emoji: '🚌', text: 'Bus route 4 delayed ~10 min',             time: '3 hr ago',   hex: '#EC4899' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FRAMER MOTION VARIANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeSlideUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } },
};


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DASHBOARD
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Dashboard = () => {
  const { currentUser } = useOutletContext();
  const userName = currentUser === 'admin' ? 'Admin' : currentUser === 'student' ? 'Ckpian' : 'Campus Explorer';

  const dateStr  = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>

      {/* ── HERO GREETING ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            animate={{ rotate: [0, 18, -8, 18, 0] }}
            transition={{ delay: 1.2, repeat: Infinity, repeatDelay: 4, duration: 1.1 }}
            style={{ display: 'inline-block', fontSize: 18 }}
          >
            👋
          </motion.span>
          <span
            className="text-[12px] font-semibold rounded-[6px]"
            style={{
              background: 'rgba(112,72,232,0.1)',
              border: '1px solid rgba(112,72,232,0.22)',
              color: '#9B7AFF',
              padding: '4px 12px'
            }}
          >
            Welcome back
          </span>
        </div>

        <h1 className="text-[26px] font-extrabold text-ckp-pure-white tracking-tight leading-tight whitespace-normal max-w-2xl">
          <span className="gradient-text">Welcome</span>, {userName} ✨
        </h1>
        <p className="mt-2 text-[12.5px] text-ckp-muted-lavender">
          Live snapshot of CKPCET — {dateStr}
        </p>
      </motion.div>

      {/* ── STAT CARDS ────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {STATS.map(({ label, value, icon: Icon, hex, sub }) => (
          <motion.div key={label} variants={fadeSlideUp}>
            <TiltCard
              className="rounded-[18px] cursor-pointer group relative flex flex-col items-start text-left"
              style={{
                padding: '32px 28px',
                background: `linear-gradient(145deg, rgba(${toRgb(hex)},0.13) 0%, rgba(${toRgb(hex)},0.04) 100%)`,
                border: `1px solid rgba(${toRgb(hex)},0.22)`,
                boxShadow: `0 4px 28px rgba(${toRgb(hex)},0.07)`,
              }}
            >
              {/* Corner Arrow */}
              <motion.div 
                className="absolute top-[24px] right-[24px]"
                whileHover={{ rotate: -45 }} 
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowUpRight size={26} style={{ color: `rgba(${toRgb(hex)},0.45)` }} />
              </motion.div>

              {/* Main Left Aligned Content */}
              <div
                className="w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0 mt-4"
                style={{
                  background: `rgba(${toRgb(hex)},0.15)`,
                  boxShadow: `0 0 22px rgba(${toRgb(hex)},0.3)`,
                }}
              >
                <Icon size={26} style={{ color: hex }} />
              </div>
              <div className="text-[24px] font-extrabold text-ckp-pure-white leading-none mb-2 tracking-tight" style={{ marginTop: '7px' }}>
                <Counter to={value} />
              </div>
              <p className="text-[15px] font-semibold text-ckp-muted-lavender">
                {label}
              </p>
              <p className="text-[12.5px] mt-1.5 font-medium" style={{ color: hex }}>
                {sub}
              </p>

              {/* Background glow blob */}
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: hex, filter: 'blur(28px)', pointerEvents: 'none' }}
              />
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* ── EVENTS + CAMPUS PULSE ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* ── Today's Events (col-span-3) ── */}
        <motion.div
          className="lg:col-span-3 rounded-[18px] bg-ckp-card-surface border border-ckp-layout-divider backdrop-blur-[20px]"
          style={{ padding: '28px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
            <h2 className="text-[18px] font-extrabold tracking-tight text-ckp-pure-white flex items-center gap-2">
              <CalendarDays size={18} style={{ color: '#7048E8' }} />
              Today's Events
            </h2>
            <button
              className="flex items-center gap-1 text-[11px] font-semibold rounded-full transition-all hover:bg-ckp-primary-indigo/10 cursor-pointer"
              style={{ color: '#7048E8', border: '1px solid rgba(112,72,232,0.2)', padding: '4px 10px', cursor: 'pointer' }}
            >
              View All <ChevronRight size={10} />
            </button>
          </div>

          {/* Event rows — whileInView on each row */}
          <div className="space-y-2">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                className="flex items-center gap-4 rounded-[12px] group cursor-pointer"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{
                  x: 5,
                  background: 'rgba(112,72,232,0.05)',
                  borderColor: 'rgba(112,72,232,0.15)',
                }}
                viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
                style={{ border: '1px solid #262837', padding: '16px' }}
              >
                {/* Index badge */}
                <div
                  className="w-11 h-11 rounded-[11px] flex items-center justify-center flex-shrink-0 text-[14px] font-extrabold"
                  style={{
                    background: `rgba(${toRgb(ev.hex)},0.12)`,
                    color: ev.hex,
                    border: `1px solid rgba(${toRgb(ev.hex)},0.18)`,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[15.5px] font-bold text-ckp-pure-white truncate">{ev.title}</p>
                  <div className="flex items-center gap-1.5 mt-[3px]">
                    <MapPin size={11} style={{ color: '#64748B' }} />
                    <p className="text-[13px] truncate" style={{ color: '#94A3B8' }}>
                      {ev.location}
                    </p>
                  </div>
                </div>

                {/* Tag + time */}
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span
                    className="text-[12px] rounded-full font-bold"
                    style={{
                      background: `rgba(${toRgb(ev.hex)},0.12)`,
                      color: ev.hex,
                      border: `1px solid rgba(${toRgb(ev.hex)},0.2)`,
                      padding: '2px 10px'
                    }}
                  >
                    {ev.tag}
                  </span>
                  <span
                    className="text-[12px] flex items-center gap-1.5 font-medium"
                    style={{ color: '#94A3B8' }}
                  >
                    <Clock size={11} style={{ color: '#64748B' }} /> {ev.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Campus Pulse (col-span-2) ── */}
        <motion.div
          className="lg:col-span-2 rounded-[18px] bg-ckp-card-surface border border-ckp-layout-divider backdrop-blur-[20px] flex flex-col"
          style={{ padding: '28px' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <h2 className="text-[18px] font-extrabold tracking-tight text-ckp-pure-white flex items-center gap-2" style={{ marginBottom: '24px' }}>
            <TrendingUp size={18} style={{ color: '#06B6D4' }} />
            Campus Pulse
          </h2>

          {/* Service usage bars */}
          <div className="space-y-4 flex-1">
            {SERVICES.map(({ name, pct, hex, icon: Icon }, i) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} style={{ color: hex }} />
                    <span className="text-[14px] font-semibold text-ckp-muted-lavender">
                      {name}
                    </span>
                  </div>
                  <span className="text-[14px] font-bold" style={{ color: hex }}>{pct}%</span>
                </div>
                <ProgressBar pct={pct} hex={hex} delay={i * 0.1} />
              </div>
            ))}
          </div>

          {/* Recent Notices */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #262837' }}>
            <p
              className="text-[12px] font-bold uppercase tracking-widest mb-3 text-ckp-pure-white"
            >
              🔔 Recent Notices
            </p>
            {NOTICES.map((notice, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2.5 group cursor-pointer"
                style={{ padding: '6px 0' }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 bg-ckp-gold/40 group-hover:bg-ckp-gold group-hover:shadow-[0_0_12px_rgba(245,158,11,0.9)] transition-all duration-300" />
                <p className="text-[13.5px] font-medium text-ckp-muted-lavender/60 group-hover:text-ckp-pure-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">
                  {notice}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── LIVE ACTIVITY FEED ────────────────────────── */}
      <motion.div
        className="rounded-[18px] bg-ckp-card-surface border border-ckp-layout-divider backdrop-blur-[20px]"
        style={{ padding: '28px' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -40px 0px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
          <h2 className="text-[18px] font-extrabold tracking-tight text-ckp-pure-white flex items-center gap-2">
            <Activity size={18} style={{ color: '#7048E8' }} />
            Live Activity Feed
          </h2>
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.18)',
              color: '#10B981',
              padding: '4px 10px'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ckp-emerald pulse-dot inline-block" />
            Live
          </span>
        </div>

        {/* Feed grid — each item whileInView */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEED.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 rounded-[12px] cursor-pointer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                background: 'rgba(112,72,232,0.05)',
                y: -2,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true, margin: '0px 0px -20px 0px' }}
              transition={{ duration: 0.38, ease: 'easeOut', delay: i * 0.06 }}
              style={{
                background: 'rgba(26,28,41,0.5)',
                border: '1px solid #262837',
                padding: '14px',
              }}
            >
              <span style={{ fontSize: 19, flexShrink: 0, marginTop: 1 }}>{item.emoji}</span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-medium text-ckp-pure-white leading-snug">{item.text}</p>
                <p className="text-[11px] mt-1 font-semibold" style={{ color: item.hex }}>
                  {item.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Trademark Footer ── */}
      <div 
        className="flex flex-col sm:flex-row items-center justify-between"
        style={{ 
          marginTop: '64px', 
          paddingTop: '24px',
          borderTop: '1px solid #262837',
          color: '#94A3B8',
          fontSize: '13px',
          fontWeight: '400',
        }}
      >
        <div>
          Copyright 2026. <strong className="text-ckp-primary-indigo font-semibold">Team NexusLabs</strong>. All Rights Reserved.
        </div>
        <div className="mt-4 sm:mt-0 cursor-pointer hover:text-ckp-pure-white transition-colors" style={{ fontWeight: '500' }}>
          Privacy Policy & Terms and Condition
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
