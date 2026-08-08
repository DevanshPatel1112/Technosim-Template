// ============================================================
// CampusVerse OS — App.jsx
// Global Auth Gate + RBAC + React Router v6
// ============================================================

import { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EventsFeed from './pages/EventsFeed';
import AdminPortal from './pages/AdminPortal';
import GlobalLogin from './pages/GlobalLogin';
import InteractiveMap from './pages/InteractiveMap';
import VendorDashboard from './pages/VendorDashboard';
import ManageMenu from './pages/ManageMenu';

/* ── Placeholder pages ─────────────────────────────────── */
const PlaceholderPage = ({ emoji, title, sub, accent }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5">
    <div className="text-6xl">{emoji}</div>
    <div className="text-center">
      <h1 className="text-2xl font-extrabold text-ckp-pure-white">{title}</h1>
      <p className="text-sm mt-2 text-ckp-muted-lavender">{sub}</p>
    </div>
    <button
      className="mt-2 rounded-[8px] text-sm font-semibold text-ckp-pure-white transition-all cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${accent}cc, ${accent}88)`,
        border: `1px solid ${accent}44`,
        boxShadow: `0 0 24px ${accent}33`,
        padding: '10px 24px'
      }}
    >
      Coming on Hackathon Day →
    </button>
  </div>
);

const NotFound         = () => <PlaceholderPage emoji="🔍" title="404 — Page Not Found"    sub="This route doesn't exist in CampusVerse OS."           accent="#EC4899" />;
const EventsHub        = () => <PlaceholderPage emoji="🎉" title="Events Hub"              sub="Event listing, RSVP, and calendar system."            accent="#7048E8" />;
const CampusServices   = () => <PlaceholderPage emoji="🛎️" title="Campus Services"         sub="Library, canteen, transport portals."                  accent="#10B981" />;

// New Placeholders
const ProposeEvent     = () => <PlaceholderPage emoji="📝" title="Propose Event"           sub="Form to submit event proposals for approval."          accent="#7048E8" />;
const LiveOrders       = () => <PlaceholderPage emoji="🔥" title="Live Orders"             sub="Real-time order queue for the cafeteria."              accent="#F59E0B" />;
const ApproveEvents    = () => <PlaceholderPage emoji="✅" title="Approve Events"          sub="Moderation queue for student-proposed events."         accent="#EC4899" />;
const BroadcastCenter  = () => <PlaceholderPage emoji="📡" title="Broadcast Center"        sub="Send push notifications to all users."                 accent="#EC4899" />;
const SystemHealth     = () => <PlaceholderPage emoji="⚙️" title="System Health"           sub="Server metrics, API uptime, and database status."      accent="#EC4899" />;

const INITIAL_MENU_ITEMS = [
  { id: 1, name: 'Paneer Biryani', category: 'Meals', price: 140, inStock: true },
  { id: 2, name: 'Veg Thali', category: 'Meals', price: 120, inStock: true },
  { id: 3, name: 'Chole Bhature', category: 'Meals', price: 100, inStock: false },
  { id: 4, name: 'Masala Dosa', category: 'Snacks', price: 70, inStock: true },
  { id: 5, name: 'Veg Sandwich', category: 'Snacks', price: 50, inStock: true },
  { id: 6, name: 'Samosa Pav', category: 'Snacks', price: 30, inStock: true },
  { id: 7, name: 'French Fries', category: 'Snacks', price: 60, inStock: false },
  { id: 8, name: 'Cold Coffee', category: 'Beverages', price: 60, inStock: true },
  { id: 9, name: 'Masala Chai', category: 'Beverages', price: 15, inStock: true },
  { id: 10, name: 'Fresh Lime Soda', category: 'Beverages', price: 40, inStock: true },
];

/* ── App ─────────────────────────────────────────────────── */
const App = () => {
  // null = not logged in | 'visitor' | 'student' | 'vendor' | 'admin'
  const [currentUser, setCurrentUser] = useState(null);
  const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);

  const handleLogin  = (role) => setCurrentUser(role);
  const handleLogout = ()     => setCurrentUser(null);

  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        {currentUser === null ? (
          /* ── Global Login Gate — no Sidebar/Header rendered ── */
          <GlobalLogin key="login" onLogin={handleLogin} />
        ) : (
          /* ── Authenticated App Shell ── */
          <Routes key="app">
            <Route
              path="/"
              element={
                <Layout 
                  currentUser={currentUser} 
                  onLogout={handleLogout} 
                  menuItems={menuItems} 
                  setMenuItems={setMenuItems} 
                />
              }
            >
              {/* Default: always go to Dashboard */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={currentUser === 'vendor' ? <VendorDashboard /> : <Dashboard />} />

              {/* Map & Events */}
              <Route path="map" element={<InteractiveMap />} />
              <Route path="events" element={['visitor', 'student'].includes(currentUser) ? <EventsHub /> : <NotFound />} />

              {/* Student Only */}
              <Route path="services" element={currentUser === 'student' ? <CampusServices /> : <NotFound />} />
              <Route path="propose-event" element={currentUser === 'student' ? <ProposeEvent /> : <NotFound />} />

              {/* Vendor Only */}
              <Route path="manage-menu" element={currentUser === 'vendor' ? <ManageMenu /> : <NotFound />} />
              <Route path="live-orders" element={currentUser === 'vendor' ? <LiveOrders /> : <NotFound />} />

              {/* Admin Only */}
              <Route path="approve-events" element={currentUser === 'admin' ? <ApproveEvents /> : <NotFound />} />
              <Route path="broadcast" element={currentUser === 'admin' ? <BroadcastCenter /> : <NotFound />} />
              <Route path="system-health" element={currentUser === 'admin' ? <SystemHealth /> : <NotFound />} />
              <Route path="admin" element={currentUser === 'admin' ? <AdminPortal /> : <NotFound />} />
              <Route path="template-events-feed" element={currentUser === 'admin' ? <EventsFeed /> : <NotFound />} />

              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        )}
      </AnimatePresence>
    </HashRouter>
  );
};

export default App;


