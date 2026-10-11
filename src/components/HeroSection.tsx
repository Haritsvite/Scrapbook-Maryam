import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { HERO_DATA } from '../data/scrapbookData';
import { Heart } from 'lucide-react';

interface HeroSectionProps {
  onSurpriseClick: () => void;
  onExploreCanvas: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSurpriseClick, onExploreCanvas }) => {
  const triggerConfetti = () => {
    // Canvas confetti burst with joyful celebratory colors
    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#FB7185', '#F59E0B', '#10B981', '#6366F1', '#EC4899'],
    });
    onSurpriseClick();
  };

  return (
    <section className="relative pt-24 pb-16 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center overflow-hidden">
      {/* Decorative floating scrapbook elements with gentle animations */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-4, -2, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:block absolute top-12 left-4 lg:left-8 bg-white p-2.5 rounded-sm polaroid-card border border-neutral-200/90 shadow-md z-10 w-36 pointer-events-none"
      >
        <div className="w-16 h-4 washi-sage absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
        <img
          src="/assets/photos/asset_04.jpg"
          alt="Maryam Polaroid"
          className="w-full aspect-square object-cover rounded-xs"
        />
        <p className="font-script text-xs text-center mt-1 text-neutral-700">09.08 Siti Maryam 🎂</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [5, 8, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="hidden md:block absolute top-16 right-4 lg:right-8 bg-white p-2 rounded-sm polaroid-card border border-neutral-200/90 shadow-md z-10 w-32 pointer-events-none"
      >
        <div className="w-14 h-4 washi-oat absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
        <img
          src="/assets/photos/asset_18.png"
          alt="Stitch Love"
          className="w-full aspect-square object-contain p-1"
        />
        <p className="font-script text-xs text-center text-neutral-700">Sweet & Salty 🤍</p>
      </motion.div>

      {/* Interactive "CLICK ME" badge with high contrast on white */}
      <div className="inline-block mb-6">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerConfetti}
          className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-neutral-800 transition-colors"
        >
          <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
          <span>CLICK ME</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="font-script lowercase text-sm font-normal text-neutral-300">tap for surprise</span>
        </motion.button>
      </div>

      {/* Main Title Banner */}
      <div className="relative mb-6">
        <p className="font-script text-2xl sm:text-3xl text-neutral-500 mb-2 tracking-wide">
          {HERO_DATA.titlePrefix}
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 font-editorial uppercase flex items-center justify-center gap-3 flex-wrap">
          <span>{HERO_DATA.name}</span>
          <span className="inline-block hover:scale-125 transition-transform cursor-pointer" title="UFO Alien 🛸">
            {HERO_DATA.emoji}
          </span>
        </h1>

        {/* Cursive subtitle */}
        <p className="font-cursive text-lg sm:text-xl md:text-2xl text-neutral-600 mt-3 max-w-xl mx-auto leading-relaxed">
          {HERO_DATA.leadIn}
        </p>
      </div>

      {/* Hand-written quote card container */}
      <div className="relative max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-white border border-neutral-200 rounded-xl shadow-md scrapbook-lined text-left transform -rotate-0.5">
        {/* Top washi tape */}
        <div className="absolute -top-3 left-12 w-28 h-5 washi-kraft rounded-xs shadow-xs" />
        <div className="absolute -top-3 right-12 w-24 h-5 washi-sage rounded-xs shadow-xs" />

        <div className="space-y-4 text-neutral-800">
          <p className="font-script text-2xl sm:text-3xl text-neutral-900 leading-snug">
            “{HERO_DATA.journeyNote}”
          </p>
          <p className="font-sans text-base sm:text-lg text-neutral-700 leading-relaxed">
            {HERO_DATA.dreamQuote}
          </p>
          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between flex-wrap gap-2">
            <p className="font-script text-lg text-neutral-600 italic">
              — {HERO_DATA.pathQuote}
            </p>
            <span className="text-xs font-mono text-neutral-400 tabular-nums">09 · 08 · 2026</span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mt-8">
        <a
          href="#chapter-1"
          className="px-6 py-2.5 rounded-lg bg-neutral-900 text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap shadow-sm"
        >
          Mulai Jelajahi Cerita 📖
        </a>
        <button
          onClick={onExploreCanvas}
          className="px-5 py-2.5 rounded-lg bg-white border border-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium hover:bg-neutral-50 transition-colors whitespace-nowrap shadow-xs flex items-center gap-2"
        >
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span>Mode Susun Scrapbook (Drag & Drop)</span>
        </button>
      </div>
    </section>
  );
};
