import { MemoryPhoto, LoveLanguageItem, ScrapbookItem, BirthdayWish } from '../types/scrapbook';

export const HERO_DATA = {
  badge: "09 · 08 CELEBRATION",
  titlePrefix: "Happy birthday…",
  name: "SITI MARYAM",
  emoji: "🛸",
  leadIn: "You came into my life and nothing’s been quite the same since. In the best way.",
  journeyNote: "This journey? I’m glad it’s ours.",
  dreamQuote: "We dreamed out loud. Now we just have to live it.",
  pathQuote: "Path hasn’t been easy, but I believe one day we’ll smile at how far we’ve come."
};

export const CHAPTER_ONE = {
  indicator: "/assets/photos/asset_23.png",
  title: "Chapter 1",
  subtitle: "Quite Start & The First Moments",
  quote: "“I remember every single of them...”",
  quoteBadge: "/assets/photos/asset_54.png",
  cards: [
    {
      id: "c1-1",
      src: "/assets/photos/asset_31.png",
      caption: "First meeting of Fairuz and Maryam at computer lab — start of our story",
      note: "Where it all quietly began 💻🌸",
      tapeColor: "mint" as const, // Sage/mint tape
      rotation: -3
    },
    {
      id: "c1-2",
      src: "/assets/photos/asset_20.png",
      caption: "Siti Maryam sitting during an organization event",
      note: "First time noticing you in that room 🌸",
      tapeColor: "yellow" as const,
      rotation: 2
    },
    {
      id: "c1-3",
      src: "/assets/photos/asset_00.png",
      caption: "Screenshot of Fairuz's first email to Siti Maryam",
      note: "Heart was racing when hitting send 📩🤍",
      tapeColor: "kraft" as const,
      rotation: -2
    },
    {
      id: "c1-4",
      src: "/assets/photos/asset_57.png",
      caption: "Ideologist Cafe, favorite date spot",
      note: "Countless coffees & conversations here ☕",
      tapeColor: "mint" as const,
      rotation: 3
    }
  ],
  quotesPillars: [
    { text: "Not yet but soon", sub: "Symbol of patience", img: "/assets/photos/asset_09.png" },
    { text: "Some things don't just happen", sub: "The true value of time", img: "/assets/photos/asset_19.png" },
    { text: "Grow", sub: "Growing together through time", img: "/assets/photos/asset_30.png" },
    { text: "You make me better just by being you", sub: "Forever grateful", img: "/assets/photos/asset_01.png" }
  ]
};

export const CHAPTER_TWO = {
  indicator: "/assets/photos/asset_34.png",
  title: "Chapter 2",
  leadText: "As children, love often feels like ownership",
  bodyText: "We want what we see — candy, toys, pets… If someone else has it, we want it too. At this stage, we share so much in common — yet some things still aren’t ours to hold.",
  polaroids: [
    {
      id: "c2-p1",
      src: "/assets/photos/asset_04.jpg",
      caption: "Umm, that's so sexy 💄",
      detail: "Siti Maryam selfie with new purple hair — favorite look moment",
      tapeColor: "mint" as const,
      rotation: -4,
      tag: "Favorite Look"
    },
    {
      id: "c2-p2",
      src: "/assets/photos/asset_03.png",
      caption: "Look at his Paws!!! 😫",
      detail: "Corgi dog paws — shared dream pet of Fairuz & Maryam",
      tapeColor: "yellow" as const,
      rotation: 3,
      tag: "Future Pet"
    },
    {
      id: "c2-p3",
      src: "/assets/photos/asset_42.jpg",
      caption: "But, i think u haven't seen this ☝🏻",
      detail: "Mirror selfie of Siti Maryam at Awan Group restroom",
      tapeColor: "kraft" as const,
      rotation: -2,
      tag: "Candid Gem"
    },
    {
      id: "c2-p4",
      src: "/assets/photos/asset_52.png",
      caption: "You and your hair routines... i still don’t get it 😶",
      detail: "Pink hair illustration representing Maryam’s hair routines",
      tapeColor: "pink" as const,
      rotation: 4,
      tag: "Hair Routine"
    },
    {
      id: "c2-p5",
      src: "/assets/photos/asset_33.png",
      caption: "My favourite big boy little heart 🤍",
      detail: "Malamute dog illustration — Fairuz’s dream dog",
      tapeColor: "mint" as const,
      rotation: -3,
      tag: "Big Boy"
    },
    {
      id: "c2-p6",
      src: "/assets/photos/asset_26.png",
      caption: "Best & easy way to heal maybe?",
      detail: "Swimming woman illustration — Siti Maryam's healing sanctuary",
      tapeColor: "yellow" as const,
      rotation: 2,
      tag: "Healing Sanctuary"
    },
    {
      id: "c2-p7",
      src: "/assets/photos/asset_28.png",
      caption: "MaryArt, BAMMM",
      detail: "Art palette illustration — Siti Maryam’s unbounded love for art",
      tapeColor: "kraft" as const,
      rotation: -3,
      tag: "Art & Soul"
    },
    {
      id: "c2-p8",
      src: "/assets/photos/asset_05.png",
      caption: "About fashion? Just believe in her 🙏🏻",
      detail: "Blue dress illustration — representing Maryam's effortless fashion sense",
      tapeColor: "mint" as const,
      rotation: 3,
      tag: "Fashion Queen"
    },
    {
      id: "c2-p9",
      src: "/assets/photos/asset_36.png",
      caption: "Yeah, your beloved color",
      detail: "Pink dolphin illustration — symbol of Siti Maryam’s favorite color",
      tapeColor: "pink" as const,
      rotation: -2,
      tag: "Favorite Tone"
    }
  ],
  healingTreats: [
    { id: "t1", name: "Sushi", note: "Delicious favorite", icon: "🍣", img: "/assets/photos/asset_48.png" },
    { id: "t2", name: "Croffle with Cream", note: "Crispy & sweet", icon: "🥐", img: "/assets/photos/asset_47.png" },
    { id: "t3", name: "Chocolate Cake", note: "Pure comfort", icon: "🍫", img: "/assets/photos/asset_07.png" },
    { id: "t4", name: "Ice Cream", note: "Cold & lovely", icon: "🍦", img: "/assets/photos/asset_50.png" },
    { id: "t5", name: "Seafood Feast", note: "Special dinner", icon: "🦐", img: "/assets/photos/asset_43.png" },
    { id: "t6", name: "Pink Donut", note: "Sweet bite", icon: "🍩", img: "/assets/photos/asset_46.png" }
  ]
};

export const CHAPTER_THREE = {
  indicator: "/assets/photos/asset_44.png",
  title: "Chapter 3",
  leadText: "At some point, love starts to feel like an exchange",
  subText: "We give affection and hope to receive it back. But true love is pure and because it is pure, it always gives back what we sow.",
  bannerMessage: "HEY THERE, MOVE ME…",
  actionQuote: "We measure love by actions — By replies, by time, by effort. So no one has to fight alone.",
  disneySection: {
    title: "Disney's in your heart",
    subtitle: "I truly hope one day you check off every stop on your Disney journey!",
    character: "/assets/photos/asset_18.png", // Stitch holding heart
    mickeyTokyo: "/assets/photos/asset_38.jpg",
    princess: "/assets/photos/asset_37.png",
    stitchQuote: "Sweet and salty? You’re just like Stitch — always craving those sweet and salty bites!"
  },
  dreamMachines: [
    {
      title: "Ferrari Dream",
      forPerson: "Maryam's dream car",
      src: "/assets/photos/asset_24.png",
      color: "#6E8568"
    },
    {
      title: "BMW M3 Touring",
      forPerson: "Fairuz's dream ride",
      src: "/assets/photos/asset_56.png",
      color: "#4A6145"
    }
  ],
  trips: [
    {
      id: "trip-1",
      title: "Jogja Trip Memories",
      src: "/assets/photos/asset_16.png",
      note: "Unforgettable laughter & sunset walks",
      tapeColor: "yellow" as const
    },
    {
      id: "trip-2",
      title: "Movie Night Silence",
      src: "/assets/photos/asset_49.png",
      note: "Cinema chair peaceful moments",
      tapeColor: "mint" as const
    },
    {
      id: "trip-3",
      title: "Together As One",
      src: "/assets/photos/asset_06.png",
      note: "Hug illustration — love and unity",
      tapeColor: "mint" as const
    }
  ]
};

export const LOVE_LANGUAGES: LoveLanguageItem[] = [
  {
    id: "ll-1",
    number: 1,
    title: "Words of Affirmation",
    description: "Every sweet reminder that turns a difficult day into light.",
    note: "“You’re doing amazingly, and I’m so proud of you.”",
    sticker: "💌",
    color: "#FFF0F3", // Soft pastel rose
    tapeColor: "pink",
    initialRotation: -3
  },
  {
    id: "ll-2",
    number: 2,
    title: "Deep Conversations",
    description: "Late night talks where hours melt into seconds.",
    note: "From silly conspiracy theories to our future house plans.",
    sticker: "🌙",
    color: "#F0F9FF", // Soft sky blue tint
    tapeColor: "yellow",
    initialRotation: 2
  },
  {
    id: "ll-3",
    number: 3,
    title: "Quality Time",
    description: "Undivided presence where nothing else exists.",
    note: "Just sitting quietly side by side is enough.",
    sticker: "⏳",
    color: "#FEFCE8", // Warm vanilla tint
    tapeColor: "yellow",
    initialRotation: -4
  },
  {
    id: "ll-4",
    number: 4,
    title: "Shared Activities",
    description: "Finding new cafes, tasting pastries, making memories.",
    note: "Every road trip playlist and museum wander.",
    sticker: "🎨",
    color: "#FFF7ED", // Soft peach tint
    tapeColor: "kraft",
    initialRotation: 3
  },
  {
    id: "ll-5",
    number: 5,
    title: "Woiiiapalah",
    description: "Our inside joke code word that instantly sparks laughter.",
    note: "Nobody else understands it, but it’s our private language 🤍",
    sticker: "😜",
    color: "#FFE4E6", // Soft dusty rose accent
    tapeColor: "pink",
    initialRotation: -2
  },
  {
    id: "ll-6",
    number: 6,
    title: "Acts of Service",
    description: "Quiet actions that carry mountains of care.",
    note: "Bringing your favorite drink before you even ask.",
    sticker: "🧋",
    color: "#F0FDF4", // Soft fresh mint
    tapeColor: "mint",
    initialRotation: 4
  },
  {
    id: "ll-7",
    number: 7,
    title: "Small Surprises",
    description: "Unexpected notes, sweet bites, random hugs.",
    note: "Because seeing your eyes light up is everything.",
    sticker: "🎁",
    color: "#FEF9C3", // Light daisy yellow
    tapeColor: "yellow",
    initialRotation: -3
  },
  {
    id: "ll-8",
    number: 8,
    title: "Hand Holding",
    description: "Physical grounding whenever the world feels too fast.",
    note: "Warm fingers interlaced through every walk.",
    sticker: "🤝",
    color: "#FFFDF7", // Clean warm cream
    tapeColor: "kraft",
    initialRotation: 2
  },
  {
    id: "ll-9",
    number: 9,
    title: "Emotional Validation",
    description: "Listening without trying to fix, holding space with tenderness.",
    note: "“Your feelings are completely valid, I’m right here.”",
    sticker: "🌱",
    color: "#FAF5FF", // Soft lavender
    tapeColor: "pink",
    initialRotation: -1
  },
  {
    id: "ll-10",
    number: 10,
    title: "Feeling Prioritized",
    description: "Never an afterthought, always front and center in heart.",
    note: "Choosing you, deliberately, every single day.",
    sticker: "🌸",
    color: "#FDF2F8", // Soft petal pink
    tapeColor: "yellow",
    initialRotation: 3
  }
];

export const CHAPTER_FIVE = {
  indicator: "/assets/photos/asset_53.png",
  title: "Chapter 5",
  climaxQuote: "Thank you for adding color to my life. I hope we reach our dreams—together.",
  rainbowBanner: "/assets/photos/asset_51.jpg",
  songPrompt: "Let this recently played song lead you through our journey.",
  audioTrack: "/assets/birthday_song.mp3",
  durationText: "1:34",
  finalQuestion: "Love is (dare), everything? ❤️"
};

export const INITIAL_CANVAS_ITEMS: ScrapbookItem[] = [
  {
    id: "item-1",
    type: "photo",
    title: "Purple Hair Era",
    caption: "Umm, that's so sexy 💄",
    imageUrl: "/assets/photos/asset_04.jpg",
    x: 80,
    y: 60,
    rotation: -4,
    scale: 1,
    zIndex: 2,
    tapeColor: "mint"
  },
  {
    id: "item-2",
    type: "photo",
    title: "Stitch & Love",
    caption: "Always craving sweet & salty bites!",
    imageUrl: "/assets/photos/asset_18.png",
    x: 440,
    y: 80,
    rotation: 5,
    scale: 1,
    zIndex: 3,
    tapeColor: "yellow"
  },
  {
    id: "item-3",
    type: "note",
    title: "Birthday Note 💌",
    content: "Happy Birthday Siti Maryam! May every dream we spoke about turn into reality.",
    x: 780,
    y: 100,
    rotation: -2,
    scale: 1,
    zIndex: 4,
    noteColor: "mint",
    tapeColor: "kraft"
  },
  {
    id: "item-4",
    type: "photo",
    title: "Ideologist Cafe",
    caption: "Countless shared laughs & talks ☕",
    imageUrl: "/assets/photos/asset_57.png",
    x: 120,
    y: 430,
    rotation: 3,
    scale: 1,
    zIndex: 2,
    tapeColor: "mint"
  },
  {
    id: "item-5",
    type: "photo",
    title: "Restroom Mirror Selfie",
    caption: "But, i think u haven't seen this ☝🏻",
    imageUrl: "/assets/photos/asset_42.jpg",
    x: 460,
    y: 450,
    rotation: -3,
    scale: 1,
    zIndex: 3,
    tapeColor: "kraft"
  },
  {
    id: "item-6",
    type: "sticker",
    stickerEmoji: "🛸",
    caption: "SITI MARYAM 🛸",
    x: 820,
    y: 440,
    rotation: 8,
    scale: 1.2,
    zIndex: 5
  },
  {
    id: "item-7",
    type: "sticker",
    stickerEmoji: "🤍",
    caption: "Love You!",
    x: 340,
    y: 350,
    rotation: -8,
    scale: 1.1,
    zIndex: 6
  },
  {
    id: "item-8",
    type: "note",
    title: "Our Code 🤫",
    content: "“Woiiiapalah” — the secret joke that always brings a smile.",
    x: 780,
    y: 300,
    rotation: 4,
    scale: 1,
    zIndex: 4,
    noteColor: "cream",
    tapeColor: "mint"
  }
];

export const INITIAL_WISHES: BirthdayWish[] = [
  {
    id: "wish-1",
    name: "Fairuz Harits",
    message: "Happy birthday Maryam! I’m grateful for every shared breath, laugh, and dream. Here's to us! 🤍🌿",
    color: "mint",
    rotation: -2,
    timestamp: "September 8"
  },
  {
    id: "wish-2",
    name: "Bestie Squad",
    message: "Happy birthday queen Siti Maryam! Keep shining, dreaming big, and blessing us with your serene energy! 🌸🎂",
    color: "cream",
    rotation: 3,
    timestamp: "September 8"
  },
  {
    id: "wish-3",
    name: "Dreamer Friend",
    message: "Semoga semua impian Disney dan liburan manis terkabul tahun ini ya Maryam! Barakallah fii umrik! 🏰🎈",
    color: "yellow",
    rotation: -1,
    timestamp: "September 8"
  }
];
