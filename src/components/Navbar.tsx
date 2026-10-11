import React from 'react';
import { Music, Layers, BookOpen } from 'lucide-react';

interface NavbarProps {
  onToggleMusic: () => void;
  activeTab: 'story' | 'canvas';
  setActiveTab: (tab: 'story' | 'canvas') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMusic,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      {/* Floating Glassmorphism Pill Capsule */}
      <nav
        aria-label="Navigasi Utama"
        className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/90 shadow-md shadow-neutral-900/5 transition-all duration-300 hover:bg-white hover:border-neutral-300"
      >
        {/* Tombol Laman Kanvas Drag & Drop / Kembali ke Cerita */}
        <button
          onClick={() => setActiveTab(activeTab === 'story' ? 'canvas' : 'story')}
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === 'canvas'
              ? 'bg-neutral-900 text-white shadow-xs hover:bg-neutral-800'
              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          {activeTab === 'canvas' ? (
            <>
              <BookOpen className="w-4 h-4 text-neutral-300 shrink-0" />
              <span>Kembali ke Cerita</span>
            </>
          ) : (
            <>
              <Layers className="w-4 h-4 text-neutral-800 shrink-0" />
              <span>Kanvas Drag & Drop</span>
            </>
          )}
        </button>

        {/* Subtle Glass Divider */}
        <div className="w-[1px] h-5 bg-neutral-200" aria-hidden="true" />

        {/* Tombol Logo Musik */}
        <button
          onClick={onToggleMusic}
          aria-label="Buka / Putar Musik"
          title="Putar Musik Perjalanan"
          className="relative p-2.5 rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:scale-95 transition-all cursor-pointer"
        >
          <Music className="w-4 h-4 text-neutral-800" />
          <span className="sr-only">Logo Musik</span>
        </button>
      </nav>
    </header>
  );
};
