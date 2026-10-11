import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="font-editorial font-bold text-base text-neutral-900">
            Siti Maryam · 09.08
          </p>
          <p className="font-script text-base text-neutral-500 mt-0.5">
            A heartfelt digital celebration of love & memories
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          <span>by Fairuz Harits for Siti Maryam</span>
        </div>

        <div className="text-[11px] font-mono text-neutral-400">
          <span>© 2026 · Scrapbook Celebration</span>
        </div>
      </div>
    </footer>
  );
};
