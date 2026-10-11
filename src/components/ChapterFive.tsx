import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CHAPTER_FIVE, INITIAL_WISHES } from '../data/scrapbookData';
import { BirthdayWish } from '../types/scrapbook';
import { AudioPlayer } from './AudioPlayer';
import { Heart, Mail, Send, Plus, X } from 'lucide-react';

export const ChapterFive: React.FC = () => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [wishes, setWishes] = useState<BirthdayWish[]>(INITIAL_WISHES);
  const [senderName, setSenderName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState<'pink' | 'cream' | 'yellow' | 'mint' | 'lavender'>('pink');
  const [isAddingWish, setIsAddingWish] = useState(false);

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
    confetti({
      particleCount: 60,
      spread: 65,
      origin: { y: 0.7 },
      colors: ['#8EA889', '#A8BEA3', '#FAF2DC', '#E8BAC2', '#5A7555'],
    });
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !wishMessage.trim()) return;

    const newWish: BirthdayWish = {
      id: `wish-${Date.now()}`,
      name: senderName.trim(),
      message: wishMessage.trim(),
      color: selectedColor,
      rotation: (Math.random() * 8) - 4,
      timestamp: 'Today',
    };

    setWishes([newWish, ...wishes]);
    setSenderName('');
    setWishMessage('');
    setIsAddingWish(false);

    confetti({
      particleCount: 45,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#8EA889', '#C2D5BD', '#FAF0D7', '#E5BAC0'],
    });
  };

  const colorStyles = {
    pink: 'bg-[#FFF0F3] border-[#FDB6C2]',
    cream: 'bg-[#FFFDF7] border-[#E5E7EB]',
    yellow: 'bg-[#FEFCE8] border-[#FEF08A]',
    mint: 'bg-[#F0FDF4] border-[#BBF7D0]',
    lavender: 'bg-[#FAF5FF] border-[#E9D5FF]',
  };

  return (
    <section id="chapter-5" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Chapter 5 header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-mono text-neutral-600 mb-3 shadow-2xs">
          <span>CHAPTER 05</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>OUR SONGS & LIFELONG DREAMS</span>
        </div>

        {/* Rainbow divider */}
        <div className="w-full max-w-md mx-auto h-3 rounded-full overflow-hidden my-4 shadow-xs opacity-90">
          <img
            src={CHAPTER_FIVE.rainbowBanner}
            alt="Rainbow Banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).parentElement!.className = "w-full max-w-md mx-auto h-2 rounded-full bg-gradient-to-r from-emerald-200 via-amber-100 to-rose-200 my-4";
            }}
          />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-neutral-900 tracking-tight leading-snug">
          “{CHAPTER_FIVE.climaxQuote}”
        </h2>

        <p className="font-script text-2xl sm:text-3xl text-neutral-600 mt-3">
          {CHAPTER_FIVE.songPrompt}
        </p>
      </div>

      {/* Music Player embedded matching 0908 */}
      <div className="mb-16">
        <AudioPlayer />
      </div>

      {/* Love Letter Interactive Envelope */}
      <div className="max-w-xl mx-auto mb-20 text-center">
        <div className="relative inline-block group">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenLetter}
            className="p-8 sm:p-10 bg-white border-2 border-dashed border-neutral-300 rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer relative overflow-hidden text-center flex flex-col items-center"
          >
            <div className="w-24 h-5 washi-sage absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs" />
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 shadow-inner">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-neutral-900">
              Surat Rahasia Ulang Tahun 💌
            </h3>
            <p className="font-script text-lg text-neutral-600 mt-1">
              Khusus untuk Siti Maryam (Buka Surat)
            </p>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold">
              Buka Sekarang ✉️
            </div>
          </motion.button>
        </div>
      </div>

      {/* Final Question */}
      <div className="text-center mb-16">
        <p className="font-cursive text-2xl sm:text-4xl text-neutral-800 tracking-wide">
          {CHAPTER_FIVE.finalQuestion}
        </p>
      </div>

      {/* Birthday Wishes Sticky Board */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 scrapbook-paper shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-editorial font-bold text-neutral-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <span>Papan Ucapan & Doa Scrapbook</span>
            </h3>
            <p className="font-script text-lg text-neutral-600">
              Tinggalkan catatan manis & doa terbaik untuk Siti Maryam di hari bahagianya 🌸
            </p>
          </div>
          <button
            onClick={() => setIsAddingWish(true)}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Ucapan Manis</span>
          </button>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishes.map((w) => (
            <motion.div
              key={w.id}
              whileHover={{ scale: 1.02, rotate: 0 }}
              initial={{ rotate: w.rotation }}
              className={`p-5 rounded-2xl border shadow-sm relative flex flex-col justify-between min-h-[170px] ${
                colorStyles[w.color]
              }`}
            >
              <div className="w-16 h-3.5 washi-kraft absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-xs pointer-events-none" />
              <p className="font-script text-xl text-neutral-900 leading-relaxed mb-4">
                “{w.message}”
              </p>
              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="font-bold text-neutral-900">— {w.name}</span>
                <span>{w.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Love Letter Modal */}
      <AnimatePresence>
        {isLetterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-2xl scrapbook-lined max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsLetterOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-32 h-5 washi-sage absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs" />

              <div className="text-center mb-6">
                <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">
                  Untuk Siti Maryam · 09.08
                </span>
                <h3 className="text-3xl font-bold font-editorial text-neutral-900 mt-1">
                  Surat Kasih & Doa Tulus
                </h3>
                <p className="font-script text-xl text-neutral-700">
                  Dari Fairuz Harits, dengan segenap cinta 🤍
                </p>
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed">
                <p>
                  Dear Maryam,
                </p>
                <p>
                  Melihat kembali perjalanan yang kita lalui bersama, dari percakapan pertama kita di lab komputer hingga detik ini, rasanya tidak ada yang lebih membahagiakan selain bisa tumbuh dan bermimpi di sampingmu.
                </p>
                <p>
                  Jalan ini mungkin tidak selalu mulus, tapi setiap tawa, setiap obrolan larut malam, setiap gigitan croffle dan sushi, serta semua pelukan hangat saat dunia terasa berat — adalah pengingat betapa berharganya kehadiranmu.
                </p>
                <p>
                  Di usiamu yang baru ini, aku berdoa agar semua mimpimu perlahan terwujud: perjalanan Disney impianmu, setiap kanvas seni yang ingin kamu lukis, dan hari-hari yang selalu dipenuhi dengan rasa aman dan dicintai tanpa syarat.
                </p>
                <p className="font-script text-2xl text-rose-600 pt-2">
                  Selamat ulang tahun, Siti Maryam. Terima kasih sudah memberi warna terindah di hidupku. ❤️
                </p>
                <div className="pt-4 border-t border-neutral-200 flex justify-end font-script text-xl text-neutral-900">
                  — Fairuz Harits
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Wish Modal */}
      <AnimatePresence>
        {isAddingWish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-editorial text-xl font-bold text-neutral-900">
                  Tulis Ucapan Manis 💌
                </h4>
                <button
                  onClick={() => setIsAddingWish(false)}
                  className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddWish} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Nama Kamu
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Contoh: Sahabat Maryam"
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Ucapan & Doa
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    placeholder="Tuliskan ucapan selamat ulang tahun..."
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Pilih Warna Sticky Note
                  </label>
                  <div className="flex items-center gap-2">
                    {(['mint', 'cream', 'yellow', 'pink', 'lavender'] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          colorStyles[c]
                        } ${selectedColor === c ? 'scale-115 ring-2 ring-neutral-700' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingWish(false)}
                    className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Tempel di Board</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
