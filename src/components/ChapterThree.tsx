import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { CHAPTER_THREE } from '../data/scrapbookData';
import { DraggablePolaroid } from './DraggablePolaroid';
import { Heart, Compass, Car } from 'lucide-react';

export const ChapterThree: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="chapter-3" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Chapter 3 header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-mono text-neutral-600 mb-3 shadow-2xs">
          <span>CHAPTER 03</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>LOVE AS AN EXCHANGE & PURE DEVOTION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-neutral-900 tracking-tight">
          {CHAPTER_THREE.leadText}
        </h2>
        <p className="font-script text-xl sm:text-2xl text-neutral-600 mt-3 leading-relaxed">
          {CHAPTER_THREE.subText}
        </p>

        {/* Playful "HEY THERE, MOVE ME..." tag */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block mt-4 px-4 py-1.5 bg-neutral-100 border border-neutral-200 rounded-full text-xs font-mono font-bold text-neutral-800 shadow-2xs"
        >
          {CHAPTER_THREE.bannerMessage}
        </motion.div>
      </div>

      {/* Action Quote callout */}
      <div className="max-w-2xl mx-auto mb-14 p-6 bg-white border border-neutral-200 rounded-xl text-center shadow-sm relative">
        <div className="w-20 h-4 washi-sage absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
        <p className="font-editorial text-xl sm:text-2xl text-neutral-900 font-bold">
          “{CHAPTER_THREE.actionQuote}”
        </p>
      </div>

      {/* Disney & Stitch Feature Box */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 mb-14 relative overflow-hidden scrapbook-paper shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Stitch & Heart character illustration */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 50, power: 0 }}
              whileHover={{ scale: 1.03 }}
              whileDrag={{
                scale: 1.05,
                zIndex: 40,
                cursor: 'grabbing',
                boxShadow: '0 20px 30px -5px rgba(0, 0, 0, 0.18), 0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              whileTap={{ scale: 1.02 }}
              transition={{ type: 'tween', duration: 0.12, ease: 'easeOut' }}
              className="relative p-4 bg-white rounded-2xl polaroid-card border border-neutral-200 cursor-grab touch-none inline-block max-w-[280px] select-none transition-shadow"
            >
              <div className="w-24 h-5 washi-sage absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs pointer-events-none" />
              <img
                src={CHAPTER_THREE.disneySection.character}
                alt="Stitch Holding Heart"
                className="w-56 h-56 object-contain pointer-events-none"
              />
              <p className="font-script text-xl text-neutral-900 mt-2">
                Stitch & Maryam 💙
              </p>
              <span className="text-[11px] font-sans text-neutral-500">
                drag me around!
              </span>
            </motion.div>
          </div>

          {/* Right: Disney Journey text and imagery */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Magical Dream Destination</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-editorial font-bold text-neutral-900">
              {CHAPTER_THREE.disneySection.title}
            </h3>
            <p className="font-script text-xl sm:text-2xl text-neutral-700">
              {CHAPTER_THREE.disneySection.subtitle}
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {CHAPTER_THREE.disneySection.stitchQuote}
            </p>

            {/* Tokyo & Princess Mini Polaroids */}
            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="p-2 bg-white rounded-sm shadow-xs border border-neutral-200 rotate-2 w-32 cursor-pointer transition-shadow hover:shadow-md"
              >
                <img
                  src={CHAPTER_THREE.disneySection.mickeyTokyo}
                  alt="Tokyo Disney"
                  className="w-full aspect-square object-cover rounded-xs pointer-events-none"
                />
                <p className="font-script text-[11px] text-center mt-1 text-neutral-800">Tokyo Disney 🏰</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.08, rotate: -4, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="p-2 bg-white rounded-sm shadow-xs border border-neutral-200 -rotate-2 w-32 cursor-pointer transition-shadow hover:shadow-md"
              >
                <img
                  src={CHAPTER_THREE.disneySection.princess}
                  alt="Princess"
                  className="w-full aspect-square object-contain p-1 pointer-events-none"
                />
                <p className="font-script text-[11px] text-center mt-1 text-neutral-800">The Princess 👑</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Dream Machines & Shared Ambitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
        {CHAPTER_THREE.dreamMachines.map((car, idx) => (
          <div
            key={idx}
            className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm relative overflow-hidden"
          >
            <div className="w-20 h-4 washi-kraft absolute -top-1.5 right-6 rounded-xs pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold">
                  {car.forPerson}
                </span>
                <h4 className="text-xl font-bold font-editorial text-neutral-900">
                  {car.title}
                </h4>
              </div>
              <Car className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="w-full h-44 bg-neutral-100/70 rounded-xl border border-neutral-200 p-2 flex items-center justify-center overflow-hidden">
              <img
                src={car.src}
                alt={car.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            <p className="font-script text-base text-neutral-600 mt-3 text-center">
              One day, driving together with the wind in our hair 🚗
            </p>
          </div>
        ))}
      </div>

      {/* Draggable Trip Memories Board */}
      <div
        ref={containerRef}
        className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 scrapbook-lined shadow-sm min-h-[380px] relative"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold font-editorial text-neutral-900">
            Shared Journey Notes & Silences
          </h4>
          <span className="text-xs font-mono text-neutral-400">
            Drag & rearrange memories
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CHAPTER_THREE.trips.map((t) => (
            <div key={t.id} className="flex justify-center">
              <DraggablePolaroid
                id={t.id}
                src={t.src}
                caption={t.note}
                subcaption={t.title}
                tapeColor={t.tapeColor}
                rotation={t.id === 'trip-1' ? -3 : t.id === 'trip-2' ? 2 : -2}
                dragBoundaryRef={containerRef}
                className="w-full max-w-[260px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
