import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { INITIAL_CANVAS_ITEMS } from '../data/scrapbookData';
import { ScrapbookItem } from '../types/scrapbook';
import {
  Plus,
  Image as ImageIcon,
  FileText,
  Smile,
  RotateCw,
  RotateCcw,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  RotateCcw as ResetIcon,
  Download,
  Upload,
  Check,
  X
} from 'lucide-react';

const STICKER_OPTIONS = [
  { emoji: '🛸', name: 'Alien UFO' },
  { emoji: '💙', name: 'Blue Heart' },
  { emoji: '🤍', name: 'White Heart' },
  { emoji: '🎂', name: 'Birthday Cake' },
  { emoji: '🌸', name: 'Cherry Blossom' },
  { emoji: '🌿', name: 'Fresh Leaves' },
  { emoji: '🥐', name: 'Croffle' },
  { emoji: '🍣', name: 'Sushi' },
  { emoji: '☕', name: 'Coffee Cup' },
  { emoji: '🎀', name: 'Pink Ribbon' },
  { emoji: '🐾', name: 'Puppy Paws' },
  { emoji: '💌', name: 'Love Letter' },
];

const PRESET_PHOTOS = [
  { url: '/assets/photos/asset_04.jpg', title: 'Purple Hair Selfie', caption: "Umm, that's so sexy 💄" },
  { url: '/assets/photos/asset_18.png', title: 'Stitch Sweet & Salty', caption: "Craving sweet & salty bites!" },
  { url: '/assets/photos/asset_57.png', title: 'Ideologist Cafe', caption: "Our favorite coffee dates ☕" },
  { url: '/assets/photos/asset_42.jpg', title: 'Restroom Mirror Selfie', caption: "Haven't seen this ☝🏻" },
  { url: '/assets/photos/asset_03.png', title: 'Corgi Dream Pet', caption: "Look at his Paws!!! 😫" },
  { url: '/assets/photos/asset_16.png', title: 'Jogja Trip', caption: "Sunny day memories 🌴" },
  { url: '/assets/photos/asset_26.png', title: 'Swimming Sanctuary', caption: "Best healing time 🌊" },
  { url: '/assets/photos/asset_28.png', title: 'MaryArt Palette', caption: "Art is everything 🎨" },
];

export const ScrapbookCanvas: React.FC = () => {
  const [items, setItems] = useState<ScrapbookItem[]>(() => {
    try {
      const saved = localStorage.getItem('maryam_scrapbook_items');
      return saved ? JSON.parse(saved) : INITIAL_CANVAS_ITEMS;
    } catch {
      return INITIAL_CANVAS_ITEMS;
    }
  });

  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [isAddingSticker, setIsAddingSticker] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // New Note State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteColor, setNoteColor] = useState<'pink' | 'cream' | 'yellow' | 'mint' | 'lavender'>('pink');
  const [noteTape, setNoteTape] = useState<'pink' | 'yellow' | 'mint' | 'kraft'>('kraft');

  // Custom Photo State
  const [customPhotoCaption, setCustomPhotoCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const saveToStorage = (updatedItems: ScrapbookItem[]) => {
    try {
      localStorage.setItem('maryam_scrapbook_items', JSON.stringify(updatedItems));
    } catch {
      // Storage unavailable or full
    }
  };

  const handleSave = () => {
    saveToStorage(items);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2200);
    confetti({ particleCount: 35, spread: 55, origin: { y: 0.5 }, colors: ['#8EA889', '#C2D5BD', '#FAF0D7'] });
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan kanvas ke susunan awal?')) {
      setItems(INITIAL_CANVAS_ITEMS);
      saveToStorage(INITIAL_CANVAS_ITEMS);
      setActiveItemId(null);
    }
  };

  const handleDeleteActive = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    saveToStorage(next);
    if (activeItemId === id) setActiveItemId(null);
  };

  const handleDragEnd = (id: string, info: { offset: { x: number; y: number } }) => {
    const canvas = canvasRef.current;
    const maxW = canvas ? canvas.clientWidth : 1200;
    const maxH = canvas ? canvas.clientHeight : 850;

    setItems((prev) => {
      const next = prev.map((item) => {
        if (item.id === id) {
          const rawX = Math.round(item.x + info.offset.x);
          const rawY = Math.round(item.y + info.offset.y);
          // Clamp within canvas boundaries so elements never get lost
          const clampedX = Math.max(10, Math.min(rawX, maxW - 120));
          const clampedY = Math.max(10, Math.min(rawY, maxH - 120));

          return {
            ...item,
            x: clampedX,
            y: clampedY,
          };
        }
        return item;
      });
      saveToStorage(next);
      return next;
    });
  };

  const handleRotate = (id: string, delta: number) => {
    const next = items.map((item) =>
      item.id === id ? { ...item, rotation: (item.rotation || 0) + delta } : item
    );
    setItems(next);
    saveToStorage(next);
  };

  const handleLayerOrder = (id: string, dir: 'up' | 'down') => {
    const maxZ = Math.max(...items.map((i) => i.zIndex || 1), 10);
    const minZ = Math.min(...items.map((i) => i.zIndex || 1), 1);

    const next = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          zIndex: dir === 'up' ? maxZ + 1 : Math.max(1, minZ - 1),
        };
      }
      return item;
    });
    setItems(next);
    saveToStorage(next);
  };

  const addPresetPhoto = (photo: typeof PRESET_PHOTOS[0]) => {
    const newItem: ScrapbookItem = {
      id: `photo-${Date.now()}`,
      type: 'photo',
      title: photo.title,
      caption: photo.caption,
      imageUrl: photo.url,
      x: 100 + (Math.random() * 200),
      y: 100 + (Math.random() * 150),
      rotation: (Math.random() * 10) - 5,
      zIndex: items.length + 5,
      tapeColor: 'pink',
    };
    const next = [...items, newItem];
    setItems(next);
    saveToStorage(next);
    setIsAddingPhoto(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem: ScrapbookItem = {
        id: `photo-custom-${Date.now()}`,
        type: 'photo',
        title: file.name.replace(/\.[^/.]+$/, ''),
        caption: customPhotoCaption || 'Special Memory 📷',
        imageUrl: dataUrl,
        x: 120 + (Math.random() * 150),
        y: 120 + (Math.random() * 150),
        rotation: (Math.random() * 8) - 4,
        zIndex: items.length + 5,
        tapeColor: 'kraft',
      };
      const next = [...items, newItem];
      setItems(next);
      saveToStorage(next);
      setCustomPhotoCaption('');
      setIsAddingPhoto(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newItem: ScrapbookItem = {
      id: `note-${Date.now()}`,
      type: 'note',
      title: noteTitle.trim() || 'Catatan Hati 🤍',
      content: noteContent.trim(),
      x: 140 + (Math.random() * 200),
      y: 140 + (Math.random() * 150),
      rotation: (Math.random() * 10) - 5,
      zIndex: items.length + 5,
      noteColor,
      tapeColor: noteTape,
    };
    const next = [...items, newItem];
    setItems(next);
    saveToStorage(next);
    setNoteTitle('');
    setNoteContent('');
    setIsAddingNote(false);
  };

  const addSticker = (emoji: string) => {
    const newItem: ScrapbookItem = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      stickerEmoji: emoji,
      caption: '',
      x: 160 + (Math.random() * 250),
      y: 160 + (Math.random() * 180),
      rotation: (Math.random() * 16) - 8,
      scale: 1.2,
      zIndex: items.length + 8,
    };
    const next = [...items, newItem];
    setItems(next);
    saveToStorage(next);
    setIsAddingSticker(false);
  };

  const noteColorMap = {
    pink: 'bg-[#FFF0F3] border-[#FDB6C2]',
    cream: 'bg-[#FFFDF7] border-[#E5E7EB]',
    yellow: 'bg-[#FEFCE8] border-[#FEF08A]',
    mint: 'bg-[#F0FDF4] border-[#BBF7D0]',
    lavender: 'bg-[#FAF5FF] border-[#E9D5FF]',
  };

  const tapeColorMap = {
    pink: 'washi-pink',
    yellow: 'washi-yellow',
    mint: 'washi-mint',
    kraft: 'washi-kraft',
  };

  return (
    <section id="scrapbook-canvas" className="py-12 sm:py-20 px-3 sm:px-6 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-mono text-neutral-600 mb-1.5 shadow-2xs">
            <span>SCRAPBOOK STUDIO</span>
            <span className="w-1 h-1 rounded-full bg-neutral-600" />
            <span>INTERACTIVE DRAG & DROP</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-neutral-900">
            Kanvas Bebas: Susun Foto & Catatan Sesukamu
          </h2>
          <p className="font-script text-lg text-neutral-600">
            Klik, seret, putar, atau tambahkan foto dan stiker baru ke lembaran scrapbook ini
          </p>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsAddingPhoto(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 hover:bg-neutral-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <ImageIcon className="w-4 h-4 text-rose-500" />
            <span>+ Foto</span>
          </button>
          <button
            onClick={() => setIsAddingNote(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 hover:bg-neutral-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span>+ Catatan</span>
          </button>
          <button
            onClick={() => setIsAddingSticker(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-medium text-neutral-800 hover:bg-neutral-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Smile className="w-4 h-4 text-emerald-500" />
            <span>+ Stiker</span>
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Simpan</span>
          </button>
          <button
            onClick={handleReset}
            title="Reset ke awal"
            className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 shadow-2xs"
          >
            <ResetIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selected Item Floating Controls */}
      {activeItemId && (
        <div className="mb-3 px-4 py-2 bg-white border border-neutral-200 rounded-xl shadow-md flex items-center justify-between gap-3 flex-wrap text-xs">
          <span className="font-mono text-neutral-600">
            Elemen Terpilih: {items.find((i) => i.id === activeItemId)?.title || 'Stiker'}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleRotate(activeItemId, -15)}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700"
              title="Putar Kiri (-15°)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleRotate(activeItemId, 15)}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700"
              title="Putar Kanan (+15°)"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLayerOrder(activeItemId, 'up')}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700"
              title="Bawa ke Depan"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleLayerOrder(activeItemId, 'down')}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700"
              title="Kirim ke Belakang"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleDeleteActive(activeItemId)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 ml-1"
              title="Hapus Elemen"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveItemId(null)}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Drag-and-Drop Canvas Board */}
      <div
        ref={canvasRef}
        className="relative w-full h-[760px] sm:h-[860px] bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-3xl scrapbook-grid shadow-inner overflow-hidden select-none"
      >
        {/* Subtle Watermark Label */}
        <div className="absolute top-4 left-6 pointer-events-none opacity-20 z-0">
          <p className="font-cursive text-3xl sm:text-4xl text-neutral-700">
            Siti Maryam’s Living Scrapbook
          </p>
        </div>

        {/* Canvas Elements */}
        {items.map((item) => {
          const isSelected = activeItemId === item.id;

          if (item.type === 'photo') {
            return (
              <motion.div
                key={item.id}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={canvasRef}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 50, power: 0 }}
                onDragEnd={(_e, info) => handleDragEnd(item.id, info)}
                whileHover={{ scale: 1.02 }}
                whileDrag={{
                  scale: 1.04,
                  cursor: 'grabbing',
                  boxShadow: '0 20px 30px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.12)',
                  zIndex: 100,
                }}
                whileTap={{ scale: 1.02 }}
                transition={{ type: 'tween', duration: 0.12, ease: 'easeOut' }}
                initial={{ x: item.x, y: item.y, rotate: item.rotation }}
                animate={{ rotate: item.rotation }}
                onClick={() => setActiveItemId(item.id)}
                className={`absolute p-3 sm:p-4 bg-white border border-neutral-200/90 rounded-sm polaroid-card cursor-grab touch-none select-none w-56 sm:w-64 transition-shadow ${
                  isSelected ? 'ring-2 ring-neutral-900 shadow-xl' : ''
                }`}
                style={{ zIndex: isSelected ? 90 : item.zIndex || 2 }}
              >
                {/* Washi Tape */}
                <div
                  className={`w-20 sm:w-24 h-5 absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-xs pointer-events-none shadow-2xs ${
                    tapeColorMap[item.tapeColor || 'pink']
                  }`}
                />
                <div className="w-full aspect-square bg-neutral-100 rounded-xs overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Scrapbook photo'}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <div className="pt-2 text-center">
                  <p className="font-script text-base sm:text-lg text-neutral-900 leading-tight">
                    {item.caption || item.title}
                  </p>
                </div>
              </motion.div>
            );
          }

          if (item.type === 'note') {
            return (
              <motion.div
                key={item.id}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={canvasRef}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 50, power: 0 }}
                onDragEnd={(_e, info) => handleDragEnd(item.id, info)}
                whileHover={{ scale: 1.02 }}
                whileDrag={{
                  scale: 1.04,
                  cursor: 'grabbing',
                  boxShadow: '0 20px 30px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -3px rgba(0, 0, 0, 0.12)',
                  zIndex: 100,
                }}
                whileTap={{ scale: 1.02 }}
                transition={{ type: 'tween', duration: 0.12, ease: 'easeOut' }}
                initial={{ x: item.x, y: item.y, rotate: item.rotation }}
                animate={{ rotate: item.rotation }}
                onClick={() => setActiveItemId(item.id)}
                className={`absolute p-4 sm:p-5 rounded-xl border shadow-sm cursor-grab touch-none select-none w-60 sm:w-72 transition-shadow ${
                  noteColorMap[item.noteColor || 'pink']
                } ${isSelected ? 'ring-2 ring-neutral-900 shadow-xl' : ''}`}
                style={{ zIndex: isSelected ? 90 : item.zIndex || 3 }}
              >
                {/* Washi Tape */}
                <div
                  className={`w-16 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rounded-xs pointer-events-none shadow-2xs ${
                    tapeColorMap[item.tapeColor || 'kraft']
                  }`}
                />
                <h4 className="font-editorial font-bold text-sm text-neutral-900 mb-1">
                  {item.title}
                </h4>
                <p className="font-script text-base sm:text-lg text-neutral-800 leading-relaxed">
                  {item.content}
                </p>
              </motion.div>
            );
          }

          if (item.type === 'sticker') {
            return (
              <motion.div
                key={item.id}
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={canvasRef}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 50, power: 0 }}
                onDragEnd={(_e, info) => handleDragEnd(item.id, info)}
                whileHover={{ scale: 1.1 }}
                whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 100 }}
                transition={{ type: 'tween', duration: 0.12, ease: 'easeOut' }}
                initial={{ x: item.x, y: item.y, rotate: item.rotation }}
                animate={{ rotate: item.rotation }}
                onClick={() => setActiveItemId(item.id)}
                className={`absolute cursor-grab touch-none p-2 rounded-xl transition-all ${
                  isSelected ? 'bg-white/90 shadow-md ring-2 ring-rose-400' : ''
                }`}
                style={{ zIndex: item.zIndex || 5 }}
              >
                <span className="text-4xl sm:text-5xl select-none" role="img" aria-label="sticker">
                  {item.stickerEmoji}
                </span>
                {item.caption && (
                  <p className="font-script text-xs text-center text-neutral-700 mt-0.5 whitespace-nowrap">
                    {item.caption}
                  </p>
                )}
              </motion.div>
            );
          }

          return null;
        })}
      </div>

      {/* Save Success Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-neutral-900 text-white text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Susunan scrapbook tersimpan rapi!</span>
        </div>
      )}

      {/* Add Photo Modal (Preset or Upload) */}
      {isAddingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-neutral-200 rounded-2xl p-6 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-xl font-bold text-neutral-900">
                Tambahkan Foto ke Scrapbook
              </h3>
              <button
                onClick={() => setIsAddingPhoto(false)}
                className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Custom Upload Section */}
            <div className="mb-6 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
              <p className="font-semibold text-xs text-neutral-900 mb-2 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-rose-500" />
                <span>Upload Foto dari Perangkat Kamu</span>
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="block w-full text-xs text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer"
              />
              <input
                type="text"
                placeholder="Tuliskan caption polaroid... (opsional)"
                value={customPhotoCaption}
                onChange={(e) => setCustomPhotoCaption(e.target.value)}
                className="mt-2 w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white text-neutral-800"
              />
            </div>

            {/* Preset Photos Selection */}
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                Atau Pilih dari Galeri Kenangan Siti Maryam:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_PHOTOS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => addPresetPhoto(p)}
                    className="p-2 border border-neutral-200 rounded-xl hover:border-neutral-400 hover:shadow-xs transition-all text-left group bg-white"
                  >
                    <div className="w-full aspect-square bg-neutral-100 rounded-md overflow-hidden mb-1.5">
                      <img
                        src={p.url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="font-script text-xs text-neutral-900 truncate">{p.caption}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {isAddingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-xl font-bold text-neutral-900">
                Tulis Catatan Scrapbook
              </h3>
              <button
                onClick={() => setIsAddingNote(false)}
                className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Judul Catatan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Our Favorite Cafe Date"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg text-neutral-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Isi Pesan
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tuliskan cerita, gombalan, atau memori manis..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg text-neutral-800"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Warna Kertas
                </label>
                <div className="flex items-center gap-2">
                  {(['pink', 'cream', 'yellow', 'mint', 'lavender'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNoteColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        noteColorMap[c]
                      } ${noteColor === c ? 'scale-115 ring-2 ring-neutral-700' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg"
                >
                  Tempel ke Kanvas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Sticker Modal */}
      {isAddingSticker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-neutral-200 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-xl font-bold text-neutral-900">
                Pilih Stiker Lucu
              </h3>
              <button
                onClick={() => setIsAddingSticker(false)}
                className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {STICKER_OPTIONS.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => addSticker(st.emoji)}
                  className="p-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 hover:scale-110 active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
                >
                  <span className="text-3xl">{st.emoji}</span>
                  <span className="text-[10px] text-neutral-600 font-sans truncate w-full text-center">
                    {st.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
