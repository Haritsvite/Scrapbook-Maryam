/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ChapterOne } from './components/ChapterOne';
import { ChapterTwo } from './components/ChapterTwo';
import { ChapterThree } from './components/ChapterThree';
import { ChapterFour } from './components/ChapterFour';
import { ChapterFive } from './components/ChapterFive';
import { ScrapbookCanvas } from './components/ScrapbookCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';
import { Music, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'story' | 'canvas'>('story');
  const [audioTrigger, setAudioTrigger] = useState(false);
  const [showFloatingAudio, setShowFloatingAudio] = useState(false);

  const handleSurpriseClick = () => {
    setAudioTrigger(true);
    setShowFloatingAudio(true);
  };

  const handleToggleMusic = () => {
    setShowFloatingAudio(!showFloatingAudio);
  };

  const handleExploreCanvas = () => {
    setActiveTab('canvas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans-body selection:bg-rose-100 selection:text-neutral-900">
      {/* Top Navigation */}
      <Navbar
        onToggleMusic={handleToggleMusic}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="pt-2">
        {activeTab === 'story' ? (
          <div>
            {/* Hero Banner & Surprise Intro */}
            <HeroSection
              onSurpriseClick={handleSurpriseClick}
              onExploreCanvas={handleExploreCanvas}
            />

            {/* Chapter 1: Quite Start */}
            <ChapterOne />

            {/* Chapter 2: Ownership & Photo Gems */}
            <ChapterTwo />

            {/* Chapter 3: Pure Love & Disney & Stitch */}
            <ChapterThree />

            {/* Chapter 4: Our Love Languages Are */}
            <ChapterFour />

            {/* Chapter 5: Climax, Music, Letter, Wishes */}
            <ChapterFive />

            {/* Quick Banner to Switch to Canvas */}
            <section className="py-12 px-4 text-center bg-neutral-50 border-y border-neutral-200">
              <div className="max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Interactive Studio
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-neutral-900">
                  Ingin Menyusun Scrapbook Versimu Sendiri?
                </h3>
                <p className="font-script text-xl text-neutral-600">
                  Buka kanvas bebas dan atur tata letak foto, stiker, dan catatan sesuka hatimu!
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleExploreCanvas}
                    className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    Buka Mode Susun Scrapbook
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="pt-20 sm:pt-24 bg-white">
            <ScrapbookCanvas />
          </div>
        )}
      </main>

      {/* Floating Audio Bar popup when toggled from navbar */}
      {showFloatingAudio && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50">
          <div className="relative">
            <button
              onClick={() => setShowFloatingAudio(false)}
              className="absolute -top-3 -right-2 z-10 w-6 h-6 rounded-full bg-[#2C2420] text-white flex items-center justify-center text-xs shadow-md hover:bg-black"
              aria-label="Tutup player"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <AudioPlayer autoPlayTrigger={audioTrigger} />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
