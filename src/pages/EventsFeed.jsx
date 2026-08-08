// =============================================================================
// CampusVerse OS — Notice Board & Events Hub Page Component
// File: src/pages/EventsFeed.jsx
// Description: Custom page component serving as the Notice Board & Events Hub.
// =============================================================================

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, MapPin, Clock, Activity, 
  Bell, ChevronRight, BookOpen, Laptop, 
  Wifi, Coffee, Megaphone, Shield, AlertTriangle
} from 'lucide-react';

const toRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
};

const tagTypeHex = {
  indigo: '#7048E8',
  cyan: '#06B6D4',
  emerald: '#10B981',
  rose: '#EC4899',
  gold: '#F59E0B',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DUMMY DATA ARRAYS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const todaysEvents = [
  {
    id: 1,
    number: "01",
    title: "Zonal Hackathon 2026 — 'Technoism'",
    location: "D1-108 Seminar Hall, Computer Dept.",
    tagType: "indigo",
    tagText: "Hackathon",
    time: "08:30 AM",
  },
  {
    id: 2,
    number: "02",
    title: "Tech Fest 2026 — Opening Ceremony",
    location: "Main Auditorium",
    tagType: "indigo",
    tagText: "Featured",
    time: "10:00 AM",
  },
  {
    id: 3,
    number: "03",
    title: "AI / ML Developer Workshop",
    location: "CSE Lab 301",
    tagType: "cyan",
    tagText: "Workshop",
    time: "02:00 PM",
  },
  {
    id: 4,
    number: "04",
    title: "Placement Orientation Drive Day 1",
    location: "Seminar Hall B",
    tagType: "emerald",
    tagText: "Career",
    time: "09:00 AM",
  },
];

const activityFeed = [
  {
    id: 1,
    iconType: "BookOpen",
    title: "Library issued 42 reference books today",
    timeAgo: "2 min ago",
    timeColor: "indigo",
  },
  {
    id: 2,
    iconType: "Laptop",
    title: "New AI workstation node deployed in CSE Lab",
    timeAgo: "15 min ago",
    timeColor: "cyan",
  },
  {
    id: 3,
    iconType: "Wifi",
    title: "Hostel Wi-Fi access point bandwidth upgraded",
    timeAgo: "32 min ago",
    timeColor: "emerald",
  },
  {
    id: 4,
    iconType: "Coffee",
    title: "Canteen serving special items: Paneer Biryani",
    timeAgo: "1 hr ago",
    timeColor: "gold",
  },
  {
    id: 5,
    iconType: "Megaphone",
    title: "Registrations opened for Hackathon 2026",
    timeAgo: "2 hr ago",
    timeColor: "rose",
  },
  {
    id: 6,
    iconType: "Shield",
    title: "Security systems audit completed successfully",
    timeAgo: "4 hr ago",
    timeColor: "emerald",
  },
];

const recentNotices = [
  "Zone Level Hackathon 2026 'Technoism' registrations open! Screening round on Aug 10 (Online) and Finals on Aug 14 at D1-108 Seminar Hall. Register a team of 3-5 at forms.gle/29HZL2kVqCVPqeco9. Queries: Prof. Juhi S. Mehta or Prof. Rakesh Katariya, COED.",
  "August 2026 Update: The GUJCET 2026 Round 3 seat allotment result for B.E. and B.Tech admissions has been declared.",
  "July 28, 2026: The Gujarat ACPC Cutoff 2026 for the college has been officially released under the Admission & Counseling portal.",
  "July 20, 2026: An admission notice was released for First Year Degree Engineering on NRI/Management Quota (MQ) seats for the 2026-27 academic year.",
  "July 20, 2026: A tuition fees notice was issued for B.E. 2nd Year (Semester 3) students for the 2026-2027 academic session.",
  "July 9, 2026: The college released a notice regarding Hostel Fees and Mess Charges for the 1st, 5th, and 7th semesters.",
  "June 24, 2026: A tuition fees notice was posted for the 2026-2027 Odd Semester for M.E. 2nd Year (Semester 3) and B.E. 4th Year (Semester 7).",
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPERS & LOOKUPS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */


const timeColors = {
  indigo: 'text-ckp-indigo',
  cyan: 'text-ckp-cyan',
  gold: 'text-ckp-gold',
  emerald: 'text-ckp-emerald',
  rose: 'text-ckp-rose',
};

const noticeBulletColors = [
  'bg-ckp-indigo',
  'bg-ckp-cyan',
  'bg-ckp-rose',
  'bg-ckp-gold',
  'bg-ckp-emerald',
];

const getActivityIcon = (type) => {
  switch (type) {
    case 'BookOpen': return <BookOpen size={15} className="text-ckp-indigo" />;
    case 'Laptop': return <Laptop size={15} className="text-ckp-cyan" />;
    case 'Wifi': return <Wifi size={15} className="text-ckp-emerald" />;
    case 'Coffee': return <Coffee size={15} className="text-ckp-rose" />;
    case 'Megaphone': return <Megaphone size={15} className="text-ckp-rose" />;
    case 'Shield': return <Shield size={15} className="text-ckp-gold" />;
    default: return <AlertTriangle size={15} className="text-ckp-gold" />;
  }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EventsFeed = () => {
  return (
    <div className="w-full flex flex-col gap-6" style={{ width: '100%' }}>
      
      {/* Page Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <h1 className="text-[26px] font-extrabold text-ckp-textMain tracking-tight leading-tight">
          Notice Board & Events Hub
        </h1>
        <p className="mt-1.5 text-[12.5px] text-ckp-textMuted">
          Live events schedule, activity feeds, and academic notices.
        </p>
      </motion.div>

      {/* Main Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
        
        {/* LEFT & CENTER COLUMN (Today's Events + Live Activity Feed) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* ── Today's Events Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="bg-ckp-card border border-ckp-divider rounded-[18px] backdrop-blur-[20px]"
            style={{ padding: '28px' }}
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
              <h2 className="text-[18px] font-extrabold tracking-tight text-ckp-textMain flex items-center gap-2.5">
                <CalendarDays size={18} className="text-ckp-indigo" />
                Today's Events
              </h2>
              <button
                className="flex items-center gap-1 text-[11px] font-semibold rounded-full transition-all hover:bg-ckp-indigo/10 cursor-pointer"
                style={{ color: '#7048E8', border: '1px solid rgba(112,72,232,0.2)', padding: '5px 12px', cursor: 'pointer' }}
              >
                View All <ChevronRight size={10} />
              </button>
            </div>

            {/* Event Stack */}
            <div className="space-y-2">
              {todaysEvents.map(({ id, number, title, location, tagType, tagText, time }) => {
                const hex = tagTypeHex[tagType] || '#7048E8';
                return (
                  <motion.div
                    key={id}
                    className="flex items-center gap-4 rounded-[12px] group cursor-pointer"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{
                      x: 5,
                      background: `rgba(${toRgb(hex)},0.05)`,
                      borderColor: `rgba(${toRgb(hex)},0.15)`,
                    }}
                    viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{ border: '1px solid #262837', padding: '16px' }}
                  >
                    {/* Index badge */}
                    <div
                      className="w-11 h-11 rounded-[11px] flex items-center justify-center flex-shrink-0 text-[14px] font-extrabold"
                      style={{
                        background: `rgba(${toRgb(hex)},0.12)`,
                        color: hex,
                        border: `1px solid rgba(${toRgb(hex)},0.18)`,
                      }}
                    >
                      {number}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[15.5px] font-bold text-ckp-textMain truncate">{title}</p>
                      <div className="flex items-center gap-1.5 mt-[3px]">
                        <MapPin size={11} style={{ color: '#64748B' }} />
                        <p className="text-[13px] truncate" style={{ color: '#94A3B8' }}>
                          {location}
                        </p>
                      </div>
                    </div>

                    {/* Tag + time */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span
                        className="text-[12px] rounded-full font-bold"
                        style={{
                          background: `rgba(${toRgb(hex)},0.12)`,
                          color: hex,
                          border: `1px solid rgba(${toRgb(hex)},0.2)`,
                          padding: '2px 10px'
                        }}
                      >
                        {tagText}
                      </span>
                      <span
                        className="text-[12px] flex items-center gap-1.5 font-medium"
                        style={{ color: '#94A3B8' }}
                      >
                        <Clock size={11} style={{ color: '#64748B' }} /> {time}
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Live Activity Feed Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-ckp-card border border-ckp-divider rounded-[18px] backdrop-blur-[20px]"
            style={{ padding: '28px 28px 36px 28px' }}
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
              <h2 className="text-[18px] font-extrabold tracking-tight text-ckp-textMain flex items-center gap-2.5">
                <Activity size={18} className="text-ckp-indigo animate-pulse" />
                Live Activity Feed
              </h2>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full select-none"
                style={{
                  background: 'rgba(16,185,129,0.08)',
                  border: '1px solid rgba(16,185,129,0.18)',
                  color: '#10B981',
                  padding: '5px 12px'
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ckp-emerald pulse-dot inline-block" />
                Live
              </span>
            </div>

            {/* Activity Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activityFeed.map(({ id, iconType, title, timeAgo, timeColor }, i) => (
                <motion.div
                  key={id}
                  className="flex items-start rounded-[14px] cursor-pointer group bg-ckp-card/50 border border-ckp-divider hover:bg-ckp-indigo/12 hover:border-ckp-indigo/35 transition-all duration-200"
                  style={{ padding: '16px 18px 20px 18px' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                  transition={{ duration: 0.38, ease: 'easeOut', delay: i * 0.06 }}
                >
                  {/* Left: Icon container */}
                  <div
                    className="rounded-[10px] bg-ckp-app flex items-center justify-center flex-shrink-0 border border-ckp-divider group-hover:border-ckp-indigo/30 transition-colors"
                    style={{ width: '40px', height: '40px', marginRight: '14px', marginTop: '2px' }}
                  >
                    {getActivityIcon(iconType)}
                  </div>

                  {/* Right: Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-ckp-textMain text-[14px] font-semibold leading-snug line-clamp-2" style={{ marginBottom: '8px' }}>
                      {title}
                    </p>
                    <span className={`text-[12px] font-semibold inline-block ${timeColors[timeColor] || 'text-ckp-textMuted'}`}>
                      {timeAgo}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* RIGHT COLUMN (Recent Notices Sidebar) */}
        <div className="lg:col-span-1 h-full">
          
          {/* ── Recent Notices Widget ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="bg-ckp-card border border-ckp-divider rounded-[18px] flex flex-col gap-6 backdrop-blur-[20px] h-full min-h-[500px]"
            style={{ padding: '28px' }}
          >
            {/* Widget Header */}
            <div className="flex items-center gap-2.5 border-b border-ckp-divider/60 pb-4">
              <Bell size={18} className="text-ckp-gold" />
              <h2 className="text-[16px] font-extrabold tracking-wider text-ckp-textMain uppercase">
                Recent Notices
              </h2>
            </div>

            {/* List stack */}
            <ul className="flex flex-col gap-5">
              {recentNotices.map((notice, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ckp-textMuted hover:text-ckp-textMain transition-colors duration-200"
                >
                  {/* Colored bullet point container aligned perfectly with first text line */}
                  <div className="h-[20px] flex items-center justify-center flex-shrink-0" style={{ width: '8px' }}>
                    <div className={`w-1.5 h-1.5 rounded-full ${noticeBulletColors[idx % noticeBulletColors.length]}`} />
                  </div>
                  <span className="flex-1">{notice}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default EventsFeed;
