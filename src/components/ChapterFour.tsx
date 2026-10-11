import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { LOVE_LANGUAGES } from '../data/scrapbookData';
import { Move, Heart, RefreshCw } from 'lucide-react';

export const ChapterFour: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleResetPositions = () => {
    setResetKey((prev) => prev + 1);
  };

  return (
    <section id="chapter-4" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Chapter 4 header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-mono text-neutral-600 mb-3 shadow-2xs">
          <span>CHAPTER 04</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>HOW WE SPEAK IN LOVE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-neutral-900 tracking-tight">
          OUR LOVE LANGUAGES ARE
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-neutral-600 mt-2">
          Move these one by one… 💌
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 mt-3">
          <span className="flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5" />
            <span>Klik & geser setiap kartu untuk melihat isi di baliknya</span>
          </span>
          <button
            onClick={handleResetPositions}
            className="flex items-center gap-1 text-neutral-700 hover:text-neutral-900 hover:underline font-medium"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Tata Ulang</span>
          </button>
        </div>
      </div>

      {/* Interactive Deck Playground */}
      <div
        key={resetKey}
        ref={containerRef}
        className="relative bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 scrapbook-paper shadow-inner overflow-hidden min-h-[620px]"
      >
        {/* Subtle background guide note */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <span className="font-cursive text-7xl text-neutral-900 rotate-[-5deg]">
            Siti Maryam & Fairuz Harits
          </span>
        </div>

        {/* 10 Draggable Cards Grid / Scatter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 relative z-10">
          {LOVE_LANGUAGES.map((lang, index) => (
            <motion.div
              key={lang.id}
              drag
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={containerRef}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 50, power: 0 }}
              whileDrag={{
                scale: 1.04,
                zIndex: 60,
                cursor: 'grabbing',
                boxShadow: '0 20px 30px -5px rgba(0, 0, 0, 0.18), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              whileHover={{
                scale: 1.025,
                y: -3,
                boxShadow: '0 12px 20px -4px rgba(0, 0, 0, 0.1)',
              }}
              whileTap={{ scale: 1.02 }}
              transition={{ type: 'tween', duration: 0.12, ease: 'easeOut' }}
              initial={{ rotate: lang.initialRotation }}
              animate={{ rotate: lang.initialRotation }}
              className="relative bg-white border border-neutral-200/90 rounded-xl p-4 sm:p-5 shadow-sm cursor-grab touch-none select-none transition-shadow flex flex-col justify-between min-h-[220px]"
              style={{
                backgroundColor: lang.color,
              }}
            >
              {/* Top Washi Tape */}
              <div
                className={`w-16 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs pointer-events-none ${
                  lang.tapeColor === 'pink'
                    ? 'washi-rose'
                    : lang.tapeColor === 'yellow'
                    ? 'washi-oat'
                    : lang.tapeColor === 'mint'
                    ? 'washi-sage'
                    : 'washi-kraft'
                }`}
              />

              {/* Number and Emoji */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-neutral-600 font-bold">
                    0{lang.number} / 10
                  </span>
                  <span className="text-xl" role="img" aria-label="sticker">
                    {lang.sticker}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-editorial text-neutral-900 leading-snug mb-1.5">
                  {lang.title}
                </h3>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  {lang.description}
                </p>
              </div>

              {/* Sweet note at bottom */}
              <div className="mt-3 pt-2.5 border-t border-neutral-300/60">
                <p className="font-script text-sm sm:text-base text-neutral-900 leading-tight">
                  {lang.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
