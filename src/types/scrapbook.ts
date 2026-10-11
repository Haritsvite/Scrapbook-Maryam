export interface ScrapbookItem {
  id: string;
  type: 'photo' | 'note' | 'sticker' | 'tape';
  title?: string;
  caption?: string;
  content?: string;
  imageUrl?: string;
  stickerEmoji?: string;
  x: number;
  y: number;
  rotation: number;
  scale?: number;
  zIndex: number;
  tapeColor?: 'pink' | 'yellow' | 'mint' | 'kraft';
  tapePosition?: 'top' | 'top-left' | 'top-right' | 'both';
  noteColor?: 'pink' | 'cream' | 'yellow' | 'mint' | 'lavender';
  category?: string;
}

export interface MemoryPhoto {
  id: string;
  src: string;
  caption: string;
  subcaption?: string;
  date?: string;
  tapeColor?: 'pink' | 'yellow' | 'mint' | 'kraft';
  rotation?: number;
}

export interface LoveLanguageItem {
  id: string;
  number: number;
  title: string;
  description: string;
  note: string;
  sticker: string;
  color: string;
  tapeColor: 'pink' | 'yellow' | 'mint' | 'kraft';
  initialRotation: number;
}

export interface BirthdayWish {
  id: string;
  name: string;
  message: string;
  color: 'pink' | 'cream' | 'yellow' | 'mint' | 'lavender';
  rotation: number;
  timestamp: string;
}
