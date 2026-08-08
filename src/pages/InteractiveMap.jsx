import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Info, Layers, Compass, ExternalLink, Shield, Home, Users, FileText } from 'lucide-react';
import FloorplanModal from '../components/FloorplanModal';

const BASE = import.meta.env.BASE_URL || '/';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CAMPUS DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const campusData = {
  Admin: {
    id: 'Admin',
    title: 'Administrative Block',
    subtitle: 'Admissions & T&P Cell',
    description: 'Central hub for admissions, document verification, and the Training & Placement (T&P) Cell. The Auditorium is located right next to it.',
    image: `${BASE}images/campus/admin.jpg`,
  },
  D1: {
    id: 'D1',
    title: 'Seminar Hall D1',
    subtitle: 'Computer Engineering Dept.',
    description: 'Home to the Computer Engineering Department. Features classrooms, labs, faculty rooms, and the official Seminar Hall in room 108.',
    image: `${BASE}images/campus/d1.jpg`,
  },
  Cafeteria: {
    id: 'Cafeteria',
    title: 'Main Canteen',
    subtitle: 'Social & Dining Hub',
    description: 'Spacious social hub with proper cross-ventilation. Serves snacks, Indian, and Chinese cuisine.',
    image: `${BASE}images/campus/cafeteria.jpg`,
  },
  Sports: {
    id: 'Sports',
    title: 'Sports Complex',
    subtitle: 'C.K. Pithawalla Stadium',
    description: 'C.K. Pithawalla Stadium. Includes a cricket ground, athletics track, football ground, and indoor sports facilities.',
    image: `${BASE}images/campus/sports.jpg`,
  },
  Library: {
    id: 'Library',
    title: 'Reading Room',
    subtitle: 'Quiet Study & Reading Area',
    description: 'Spacious, well-lit study area equipped with individual reading desks and quiet zones for focused learning.',
    image: `${BASE}images/campus/library.jpg`,
  },
  Hostel: {
    id: 'Hostel',
    title: 'Campus Hostels (Boys & Girls)',
    subtitle: 'RESIDENTIAL HUB',
    description: 'Secure, twin-sharing on-campus accommodation featuring lush green surroundings, mess facilities, and 24/7 security. Helpdesk: 7990653634.',
    image: `${BASE}images/campus/hostel.jpg`,
    wardens: [
      { type: "Boys (H2)", capacity: "80 Rooms / 160 Students", warden: "Prof. Mahesh N. Patel", email: "mahesh.patel@ckpcet.ac.in" },
      { type: "Girls (H1)", capacity: "52 Rooms / 104 Students", warden: "Prof. Honey S. Lalwani", email: "honey.lalwani@ckpcet.ac.in" }
    ],
    facilities: ["Twin Sharing", "Attached Toilet/Bathroom", "Geysers & RO Water", "Study Tables & Wardrobes", "Sports Ground"],
    actionLinks: [
      { label: "Hostel Registration Form", url: "https://drive.google.com/file/d/1axFKG_F9U0SqD-Nne36DuOvi-lqTx7Ww/view" },
      { label: "View Facilities Gallery", url: "https://drive.google.com/file/d/11pFIeOsdeQVa0mco3oRCWlQP06eZlr6w/view" },
      { label: "Hostel Fee Structure", url: "https://drive.google.com/file/d/1TS9RdhD-jUShRojsu9ji19P9gSwQk9dH/view" }
    ]
  }
};

const DIRECTORY = [
  { id: 'Admin',     name: 'Administrative Block' },
  { id: 'D1',        name: 'Seminar Hall D1' },
  { id: 'Cafeteria', name: 'Main Canteen' },
  { id: 'Sports',    name: 'Sports Complex' },
  { id: 'Library',   name: 'Reading Room' },
  { id: 'Hostel',    name: 'Campus Hostels' },
];

const BUILDINGS = [
  { id: 'D1',        label: 'D1',             gridClass: 'col-span-2 row-span-1' },
  { id: 'Library',   label: 'READING ROOM',   gridClass: 'col-span-2 row-span-2' },
  { id: 'Admin',     label: 'ADMIN',          gridClass: 'col-span-2 row-span-1' },
  { id: 'Cafeteria', label: 'CANTEEN',        gridClass: 'col-span-2 row-span-1' },
  { id: 'Sports',    label: 'SPORTS',         gridClass: 'col-span-4 row-span-1' },
  { id: 'Hostel',    label: 'CAMPUS HOSTELS', gridClass: 'col-span-4 row-span-1' },
];

const InteractiveMap = () => {
  const [activeZone, setActiveZone] = useState('Admin');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedData = campusData[activeZone] || campusData.Admin;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-extrabold text-ckp-pure-white tracking-tight leading-tight">
          Interactive <span className="text-[#06B6D4]">Campus Map</span> 🗺️
        </h1>
        <p className="mt-1 text-[13px] text-ckp-muted-lavender">
          Click any location from the directory or grid to inspect real campus facilities and details.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* 1. Left Panel: Directory */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#1A1C29] border border-[#262837] rounded-[16px] p-5">
            <div className="flex items-center gap-2 mb-6 border-b border-[#262837] pb-4">
              <MapPin size={18} className="text-[#06B6D4]" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#475569]">
                Directory
              </h2>
            </div>
            
            <div className="flex flex-col gap-2">
              {DIRECTORY.map((loc) => {
                const isActive = activeZone === loc.id;
                return (
                  <motion.button
                    key={loc.id}
                    onClick={() => setActiveZone(loc.id)}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between py-3 pl-6 pr-4 rounded-r-[10px] cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#7048E8]/20 border-l-4 border-[#7048E8]' 
                        : 'bg-transparent border-l-4 border-transparent hover:bg-white/5'
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-[#94A3B8]'}`}>
                      {loc.name}
                    </span>
                    {isActive && <Navigation size={14} className="text-[#7048E8]" />}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Middle Panel: CSS Grid Blueprint */}
        <div className="lg:col-span-5">
          <div 
            className="bg-[#1A1C29] border border-[#262837] rounded-[16px] p-6 relative overflow-hidden flex flex-col justify-between"
            style={{ minHeight: '580px' }}
          >
            {/* Blueprint grid background effect */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
            
            {/* Overlay Grid */}
            <div className="relative w-full h-full grid grid-cols-4 grid-rows-5 gap-3" style={{ minHeight: '500px' }}>
              {BUILDINGS.map((b) => {
                const isActive = activeZone === b.id;
                
                return (
                  <motion.div
                    key={b.id}
                    layoutId={`building-${b.id}`}
                    onClick={() => setActiveZone(b.id)}
                    className={`
                      ${b.gridClass} 
                      rounded-[12px] flex items-center justify-center cursor-pointer transition-all duration-500 backdrop-blur-sm p-3
                      ${isActive 
                        ? 'bg-[#7048E8]/40 border-2 border-[#7048E8] shadow-[0_0_20px_rgba(112,72,232,0.5)] z-10' 
                        : 'bg-transparent border border-[#262837] hover:border-[#475569] text-[#94A3B8]'}
                    `}
                  >
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <span className={`text-xs sm:text-sm tracking-widest font-extrabold ${isActive ? 'text-white' : 'text-[#475569]'}`}>
                        {b.label}
                      </span>
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[11px] text-[#9B7AFF] font-medium leading-tight px-1"
                          >
                            {campusData[b.id]?.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-4 flex items-center justify-between px-3 py-2 rounded-lg bg-black/30 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Info size={13} className="text-[#06B6D4]" />
                <span className="text-[11px] font-semibold text-[#94A3B8]">
                  Select any block to view full details
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#475569]">
                Blueprint v2.5
              </span>
            </div>
          </div>
        </div>

        {/* 3. Right Panel: Dynamic Location Details Panel */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1A1C29] border border-[#262837] rounded-[16px] overflow-hidden flex flex-col shadow-2xl max-h-[640px]"
            >
              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1 p-0 scrollbar-thin scrollbar-thumb-[#262837]">
                
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-black/40 border-b border-[#262837]">
                  <img 
                    src={selectedData.image} 
                    alt={selectedData.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C29] via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/30 px-2.5 py-1 rounded-md backdrop-blur-md">
                      {selectedData.subtitle}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="text-ckp-textMain text-xl font-bold tracking-tight">
                      {selectedData.title}
                    </h3>
                    <p className="text-ckp-textMuted text-sm mt-2 leading-relaxed">
                      {selectedData.description}
                    </p>
                  </div>

                  {/* Wardens & Capacity (Grid) */}
                  {selectedData.wardens && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-[#262837]">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                        Warden & Capacity
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedData.wardens.map((w, idx) => (
                          <div key={idx} className="bg-[#10121B] border border-[#262837] p-2.5 rounded-lg flex flex-col gap-0.5">
                            <span className="text-[11px] font-bold text-[#06B6D4]">{w.type}</span>
                            <span className="text-xs text-white font-medium truncate">{w.warden}</span>
                            <span className="text-[10px] text-[#94A3B8]">{w.capacity}</span>
                            <span className="text-[10px] text-[#475569] truncate mt-0.5">{w.email}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Facilities (Pills) */}
                  {selectedData.facilities && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-[#262837]">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                        Hostel Amenities
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedData.facilities.map((fac, idx) => (
                          <span 
                            key={idx} 
                            className="bg-[#10121B] text-[#94A3B8] border border-[#262837] px-2.5 py-1 rounded-md text-xs font-medium"
                          >
                            {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Links */}
                  {selectedData.actionLinks && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-[#262837]">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#475569]">
                        Official Documents
                      </span>
                      <div className="flex flex-col gap-2">
                        {selectedData.actionLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-[#262837]/40 hover:bg-[#7048E8]/20 border border-[#262837] hover:border-[#7048E8]/40 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition-all group"
                          >
                            <span>{link.label}</span>
                            <ExternalLink size={13} className="text-[#06B6D4] group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Utility Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#262837] mt-1">
                    <motion.a
                      href="https://www.google.com/maps/dir/?api=1&destination=C.K.+Pithawalla+College+of+Engineering+and+Technology+Surat"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px] text-xs font-bold text-white bg-gradient-to-r from-[#7048E8] to-[#9B7AFF] hover:from-[#7C3AED] hover:to-[#8B5CF6] shadow-[0_0_15px_rgba(112,72,232,0.3)] transition-all cursor-pointer text-center"
                    >
                      <Compass size={14} />
                      Get Directions
                    </motion.a>
                    <motion.button
                      onClick={() => setIsModalOpen(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px] text-xs font-bold text-[#94A3B8] hover:text-white bg-white/5 hover:bg-white/10 border border-[#262837] cursor-pointer transition-colors"
                    >
                      <Layers size={14} />
                      View Floorplan
                    </motion.button>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Floorplan Modal */}
      <FloorplanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={selectedData.image}
        title={selectedData.title}
      />
    </div>
  );
};

export default InteractiveMap;
