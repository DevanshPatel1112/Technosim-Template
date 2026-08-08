import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const FloorplanModal = ({ isOpen, onClose, imageUrl, title = 'Interactive Blueprint' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl bg-[#1A1C29] border border-[#262837] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#262837]">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#7048E8]" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {title} — Floorplan
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body / Image Container */}
            <div className="p-4 bg-[#10121B] flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-auto">
              <img
                src={imageUrl || '/images/campus/library.jpg'}
                alt={`${title} Floorplan`}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-[#262837] bg-[#1A1C29]/80">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                <ZoomIn size={14} className="text-[#06B6D4]" />
                <span>Pinch to zoom or drag to pan</span>
              </div>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloorplanModal;
