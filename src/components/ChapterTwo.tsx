import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CHAPTER_TWO } from '../data/scrapbookData';
import { DraggablePolaroid } from './DraggablePolaroid';
import { Heart, UtensilsCrossed } from 'lucide-react';

export const ChapterTwo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTreat, setSelectedTreat] = useState<string | null>(null);

  return (
    <section id="chapter-2" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Chapter 2 header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-mono text-neutral-600 mb-3 shadow-2xs">
          <span>CHAPTER 02</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>OWNERSHIP & CHERISHED MOMENTS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-neutral-900 tracking-tight">
          {CHAPTER_TWO.leadText}
        </h2>
        <p className="font-script text-xl sm:text-2xl text-neutral-600 mt-3 leading-relaxed">
          {CHAPTER_TWO.bodyText}
        </p>
      </div>

      {/* Large interactive draggable scrapbook playground */}
      <div
        ref={containerRef}
        className="relative bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 scrapbook-grid shadow-md overflow-hidden min-h-[700px]"
      >
        {/* Floating aesthetic labels */}
        <div className="absolute top-4 left-6 z-0 pointer-events-none flex items-center gap-2">
          <span className="font-script text-2xl text-neutral-700">Maryam's Visual Diary</span>
          <span className="text-xs bg-neutral-200/70 text-neutral-800 px-2.5 py-0.5 rounded-full font-mono font-medium">
            9 Memories to explore
          </span>
        </div>

        {/* Polaroid items arranged across the board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-10 relative z-10">
          {CHAPTER_TWO.polaroids.map((p) => (
            <div key={p.id} className="flex justify-center">
              <DraggablePolaroid
                id={p.id}
                src={p.src}
                caption={p.caption}
                subcaption={p.detail}
                tag={p.tag}
                tapeColor={p.tapeColor}
                rotation={p.rotation}
                dragBoundaryRef={containerRef}
                className="w-full max-w-[280px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Healing Treats & Favorite Foods Shelf */}
      <div className="mt-16 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm relative">
        <div className="w-24 h-4 washi-sage absolute -top-2 left-8 rounded-xs pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-editorial font-bold text-neutral-900 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-rose-500" />
              <span>Best & Easy Way to Heal? Maryam's Favorite Bites</span>
            </h3>
            <p className="font-script text-lg text-neutral-600">
              Makanan & dessert kesayangan yang selalu bikin senyum Maryam balik lagi 🤍
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 tabular-nums shrink-0">
            Click any treat to taste
          </span>
        </div>

        {/* Treats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CHAPTER_TWO.healingTreats.map((treat) => {
            const isSelected = selectedTreat === treat.id;
            return (
              <motion.button
                key={treat.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTreat(isSelected ? null : treat.id)}
                className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[140px] relative overflow-hidden ${
                  isSelected
                    ? 'bg-rose-50 border-rose-300 shadow-sm'
                    : 'bg-neutral-50 border-neutral-200 hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-white p-1 border border-neutral-200 flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={treat.img}
                    alt={treat.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-xs text-neutral-900 line-clamp-1">{treat.name}</p>
                  <p className="font-script text-sm text-neutral-500">{treat.note}</p>
                </div>
                {isSelected && (
                  <span className="absolute top-1 right-1 text-xs text-rose-500">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
