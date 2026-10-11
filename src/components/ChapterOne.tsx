import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { CHAPTER_ONE } from '../data/scrapbookData';
import { DraggablePolaroid } from './DraggablePolaroid';
import { Move } from 'lucide-react';

export const ChapterOne: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="chapter-1" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Chapter header lockup */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-mono text-neutral-600 mb-3 shadow-2xs">
          <span>CHAPTER 01</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>QUITE START</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-neutral-900 tracking-tight">
          Where Our Story Quietly Began
        </h2>
        <p className="font-cursive text-xl sm:text-2xl text-neutral-600 mt-2">
          {CHAPTER_ONE.quote}
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 mt-3">
          <Move className="w-3.5 h-3.5" />
          <span>Semua foto di bawah bisa kamu geser & atur sesukamu (Drag & Drop)!</span>
        </div>
      </div>

      {/* Draggable polaroid board container */}
      <div
        ref={containerRef}
        className="relative bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-10 scrapbook-paper shadow-inner overflow-hidden min-h-[520px]"
      >
        {/* Decorative corner tape */}
        <div className="absolute -top-3 -left-3 w-28 h-6 washi-sage -rotate-45 pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-28 h-6 washi-oat -rotate-45 pointer-events-none" />

        {/* Floating sticky prompt */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-md border border-neutral-200 shadow-xs text-xs font-script text-neutral-600 rotate-2 pointer-events-none z-0 hidden sm:block">
          📌 Memory Board · Drag anywhere!
        </div>

        {/* Grid of polaroids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start relative z-10">
          {CHAPTER_ONE.cards.map((card) => (
            <div key={card.id} className="flex justify-center">
              <DraggablePolaroid
                id={card.id}
                src={card.src}
                caption={card.note}
                subcaption={card.caption}
                tapeColor={card.tapeColor}
                rotation={card.rotation}
                dragBoundaryRef={containerRef}
                className="w-full max-w-[260px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4 Quotes Pillars below */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CHAPTER_ONE.quotesPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="p-5 bg-white border border-neutral-200 rounded-xl shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
          >
            <div className="w-16 h-3.5 washi-kraft absolute -top-1 right-4 rounded-xs pointer-events-none" />
            <div>
              <p className="font-editorial text-lg font-bold text-neutral-900 mb-1">
                “{pillar.text}”
              </p>
              <p className="text-xs text-neutral-500 font-sans">
                {pillar.sub}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>0{idx + 1} // MILESTONE</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
