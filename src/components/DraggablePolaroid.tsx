import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface DraggablePolaroidProps {
  id: string;
  src: string;
  caption: string;
  subcaption?: string;
  tag?: string;
  tapeColor?: 'pink' | 'yellow' | 'mint' | 'kraft';
  rotation?: number;
  className?: string;
  dragBoundaryRef?: React.RefObject<HTMLDivElement | null>;
}

export const DraggablePolaroid: React.FC<DraggablePolaroidProps> = ({
  src,
  caption,
  subcaption,
  tag,
  tapeColor = 'pink',
  rotation = 0,
  className = '',
  dragBoundaryRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Mouse normalized position for organic 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics with critical damping to prevent bouncing / jitter
  const springConfig = { damping: 35, stiffness: 350, mass: 0.8 };

  // Subtle interactive tilt (-5deg to +5deg) during hover
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const tapeStyles = {
    pink: 'washi-rose',
    yellow: 'washi-oat',
    mint: 'washi-sage',
    kraft: 'washi-kraft',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseEnter = () => {
    // Mouse hover active
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="inline-block w-full flex justify-center">
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={dragBoundaryRef || { left: -300, right: 300, top: -300, bottom: 300 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 50, power: 0 }}
        onDragStart={() => {
          setIsDragging(true);
          mouseX.set(0);
          mouseY.set(0);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ rotate: rotation }}
        animate={{ rotate: rotation }}
        whileHover={!isDragging ? { scale: 1.025 } : undefined}
        whileDrag={{
          scale: 1.04,
          zIndex: 60,
          cursor: 'grabbing',
          boxShadow: '0 20px 30px -6px rgba(0, 0, 0, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.12)',
        }}
        transition={{ type: 'tween', duration: 0.12, ease: 'easeOut' }}
        style={{
          rotateX: isDragging ? 0 : tiltX,
          rotateY: isDragging ? 0 : tiltY,
          transformStyle: 'preserve-3d',
          boxShadow: '0 10px 25px -4px rgba(60, 40, 30, 0.12), 0 4px 10px -2px rgba(60, 40, 30, 0.06)',
        }}
        className={`relative inline-block bg-white p-3 sm:p-4 rounded-sm polaroid-card border border-neutral-200/90 cursor-grab touch-none select-none transition-shadow will-change-transform ${className}`}
      >
        {/* Washi Tape Strip with subtle depth */}
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 ${tapeStyles[tapeColor]} rounded-xs shadow-xs pointer-events-none z-10`}
          style={{
            transform: `translateX(-50%) rotate(${rotation * -0.6}deg) translateZ(8px)`,
          }}
        />

        {/* Optional Pin or Sticker */}
        {tag && (
          <span
            className="absolute top-2 right-2 text-[10px] font-script tracking-wide text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200 z-10 pointer-events-none"
            style={{ transform: 'translateZ(6px)' }}
          >
            {tag}
          </span>
        )}

        {/* Image frame */}
        <div className="w-full bg-neutral-100 border border-neutral-200/60 overflow-hidden rounded-xs aspect-4/5 sm:aspect-square flex items-center justify-center relative">
          <img
            src={src}
            alt={caption}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full flex flex-col items-center justify-center p-3 text-center text-neutral-500';
                fallback.innerHTML = `<span class="text-2xl mb-1">📸</span><span class="text-xs font-script">${caption}</span>`;
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        {/* Handwritten Caption */}
        <div className="pt-3 pb-1 text-center">
          <p className="font-script text-lg sm:text-xl text-neutral-900 leading-snug tracking-wide">
            {caption}
          </p>
          {subcaption && (
            <p className="text-[11px] text-neutral-500 font-sans mt-0.5 line-clamp-1">
              {subcaption}
            </p>
          )}
        </div>

        {/* Subtle paper grain texture overlay */}
        <div className="absolute inset-0 bg-black/[0.01] pointer-events-none rounded-sm" />
      </motion.div>
    </div>
  );
};
