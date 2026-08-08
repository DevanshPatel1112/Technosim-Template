import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Bell, Plus, Minus, CheckCircle, Clock, Utensils, AlertCircle } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INITIAL DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FALLBACK_MENU = [
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

const INITIAL_ORDERS = [
  { id: 402, items: '2x Veg Sandwich, 1x Cold Coffee', time: '2 mins ago', total: '₹160' },
  { id: 403, items: '1x Paneer Biryani', time: '4 mins ago', total: '₹140' },
  { id: 404, items: '3x Masala Dosa, 2x Samosa Pav', time: '6 mins ago', total: '₹270' },
  { id: 405, items: '1x Cold Coffee', time: '9 mins ago', total: '₹60' },
];

const VendorDashboard = () => {
  const context = useOutletContext();
  const [localMenu, setLocalMenu] = useState(FALLBACK_MENU);

  const menuItems = context?.menuItems || localMenu;
  const setMenuItems = context?.setMenuItems || setLocalMenu;

  const [isOpen, setIsOpen] = useState(true);
  const [waitTime, setWaitTime] = useState(12);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Toggle item stock
  const toggleStock = (id) => {
    setMenuItems(prev =>
      prev.map(item => item.id === id ? { ...item, inStock: !item.inStock } : item)
    );
  };

  // Mark order as ready (remove from queue)
  const markReady = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-extrabold text-[#FFFFFF] tracking-tight leading-tight flex items-center gap-2">
          Cafeteria Vendor <span className="text-[#F59E0B]">Dashboard</span> 🏪
        </h1>
        <p className="mt-1 text-[13px] text-[#94A3B8]">
          Manage live canteen status, update stock availability, and clear incoming student orders.
        </p>
      </div>

      {/* 1. Top Status Banner (Live Control) */}
      <div className="bg-[#1A1C29] border border-[#262837] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md">
        
        {/* Canteen Open/Closed Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#475569] self-start sm:self-center">
            Canteen Status:
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isOpen 
                  ? 'bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                  : 'bg-white/5 text-[#94A3B8] border border-[#262837]'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-white animate-pulse' : 'bg-[#475569]'}`} />
              OPEN
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                !isOpen 
                  ? 'bg-[#EC4899] text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]' 
                  : 'bg-white/5 text-[#94A3B8] border border-[#262837]'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${!isOpen ? 'bg-white animate-pulse' : 'bg-[#475569]'}`} />
              CLOSED
            </motion.button>
          </div>
        </div>

        {/* Live Wait Time Adjuster */}
        <div className="flex items-center justify-between sm:justify-start gap-4 bg-[#10121B] border border-[#262837] px-5 py-3 rounded-xl w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            <Clock size={16} className="text-[#F59E0B]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Est. Wait Time</p>
              <p className="text-sm font-bold text-white">~{waitTime} Mins</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setWaitTime(prev => Math.max(0, prev - 2))}
              className="w-8 h-8 rounded-lg bg-[#262837] text-white flex items-center justify-center hover:bg-[#7048E8] transition-colors cursor-pointer"
            >
              <Minus size={14} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setWaitTime(prev => prev + 2)}
              className="w-8 h-8 rounded-lg bg-[#262837] text-white flex items-center justify-center hover:bg-[#7048E8] transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </motion.button>
          </div>
        </div>

      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 2. Left Column: Live Menu Management */}
        <div className="lg:col-span-6 bg-[#1A1C29] border border-[#262837] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#262837] pb-4">
            <div className="flex items-center gap-2">
              <Utensils size={18} className="text-[#F59E0B]" />
              <h2 className="text-base font-bold text-white tracking-tight">Today's Menu Stock</h2>
            </div>
            <Settings size={16} className="text-[#475569]" />
          </div>

          <div className="flex flex-col gap-3">
            {menuItems.map(item => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl bg-[#10121B] border border-[#262837] hover:border-[#475569] transition-colors"
              >
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-[#F59E0B]">₹{item.price}</span>
                    <span className="text-[10px] text-[#475569]">• {item.category}</span>
                  </div>
                </div>

                {/* iOS Style Toggle Button */}
                <button
                  onClick={() => toggleStock(item.id)}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <span className={`text-xs font-bold ${item.inStock ? 'text-[#10B981]' : 'text-[#EC4899]'}`}>
                    {item.inStock ? 'In Stock' : 'Sold Out'}
                  </span>
                  
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${item.inStock ? 'bg-[#10B981]' : 'bg-[#262837]'}`}>
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`w-4 h-4 rounded-full bg-white shadow-md ${item.inStock ? 'ml-6' : 'ml-0'}`}
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Right Column: Active Order Queue */}
        <div className="lg:col-span-6 bg-[#1A1C29] border border-[#262837] rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#262837] pb-4">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-[#7048E8]" />
              <h2 className="text-base font-bold text-white tracking-tight">Live Order Queue</h2>
            </div>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#7048E8]/10 border border-[#7048E8]/30 text-[#9B7AFF]">
              {orders.length} Active
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[250px]">
            <AnimatePresence mode="popLayout">
              {orders.length > 0 ? (
                orders.map(order => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 rounded-xl bg-[#10121B] border border-[#262837] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase text-[#06B6D4] bg-[#06B6D4]/10 border border-[#06B6D4]/30 px-2 py-0.5 rounded">
                          Token #{order.id}
                        </span>
                        <span className="text-[11px] text-[#475569]">{order.time}</span>
                      </div>
                      <p className="text-sm font-semibold text-white mt-1">{order.items}</p>
                      <span className="text-xs font-bold text-[#F59E0B]">{order.total}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => markReady(order.id)}
                      className="px-4 py-2.5 rounded-lg bg-[#7048E8] hover:bg-[#8B5CF6] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(112,72,232,0.3)] transition-colors cursor-pointer self-end sm:self-center w-full sm:w-auto"
                    >
                      <CheckCircle size={14} />
                      Mark Ready
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                  <CheckCircle size={36} className="text-[#10B981]" />
                  <p className="text-sm font-bold text-white">All Orders Cleared!</p>
                  <p className="text-xs text-[#94A3B8]">New orders will appear here automatically.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

    </div>
  );
};

export default VendorDashboard;
