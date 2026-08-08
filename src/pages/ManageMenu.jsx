import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Save, CheckCircle2, IndianRupee, Layers } from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INITIAL MENU DATA
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FALLBACK_ITEMS = [
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

const CATEGORIES = ['Meals', 'Snacks', 'Beverages'];

const ManageMenu = () => {
  const context = useOutletContext();
  const [localItems, setLocalItems] = useState(FALLBACK_ITEMS);

  const items = context?.menuItems || localItems;
  const setItems = context?.setMenuItems || setLocalItems;

  const [savedToast, setSavedToast] = useState(false);

  // Toggle inStock state
  const handleToggleStock = (id) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
  };

  // Price change handler
  const handlePriceChange = (id, newPrice) => {
    const parsedPrice = parseInt(newPrice) || 0;
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, price: parsedPrice } : item))
    );
  };

  // Save notification
  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-12">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262837] pb-6">
        <div>
          <h1 className="text-[26px] font-extrabold text-[#FFFFFF] tracking-tight leading-tight flex items-center gap-2">
            Menu <span className="text-[#F59E0B]">Management</span> 🍔
          </h1>
          <p className="mt-1 text-[13px] text-[#94A3B8]">
            Toggle item availability and update pricing in real-time.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#7048E8] to-[#9B7AFF] shadow-[0_0_20px_rgba(112,72,232,0.35)] cursor-pointer self-start sm:self-center"
        >
          <Save size={16} />
          Save Changes
        </motion.button>
      </div>

      {/* Save Notification Toast */}
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 flex items-center gap-3 text-[#10B981]"
          >
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold text-white">Menu settings & pricing saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Categorized Menu List */}
      <div className="flex flex-col gap-8">
        {CATEGORIES.map(category => {
          const categoryItems = items.filter(item => item.category === category);
          
          return (
            <div key={category} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-l-4 border-[#F59E0B] pl-3">
                <h2 className="text-base font-extrabold text-white tracking-wide uppercase">
                  {category}
                </h2>
                <span className="text-xs font-bold text-[#475569] bg-[#10121B] px-2 py-0.5 rounded-full border border-[#262837]">
                  {categoryItems.length} Items
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-[#1A1C29] border border-[#262837] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-all shadow-md"
                  >
                    {/* Left: Food Name & Tag */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#10121B] border border-[#262837] flex items-center justify-center text-[#F59E0B] font-extrabold text-sm">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Controls Row (Middle Price & Right Toggle) */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#262837]">
                      
                      {/* Middle: Price Edit Input */}
                      <div className="flex items-center gap-1.5 bg-[#10121B] border border-[#262837] focus-within:border-[#7048E8]/50 px-2.5 py-1.5 rounded-lg transition-colors">
                        <span className="text-xs font-bold text-[#F59E0B]">₹</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          className="w-16 bg-transparent text-center text-xs font-bold text-white outline-none"
                        />
                      </div>

                      {/* Right: Master Toggle Switch */}
                      <button
                        onClick={() => handleToggleStock(item.id)}
                        className="flex items-center gap-3 cursor-pointer select-none"
                      >
                        <span className={`text-xs font-bold w-16 text-right ${item.inStock ? 'text-[#10B981]' : 'text-[#EC4899]'}`}>
                          {item.inStock ? 'In Stock' : 'Sold Out'}
                        </span>
                        
                        <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 relative ${item.inStock ? 'bg-[#10B981]' : 'bg-[#262837]'}`}>
                          <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className={`w-4 h-4 rounded-full bg-white shadow-md ${item.inStock ? 'ml-5' : 'ml-0'}`}
                          />
                        </div>
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ManageMenu;
