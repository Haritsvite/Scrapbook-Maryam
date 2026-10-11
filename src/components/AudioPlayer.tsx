import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc3 } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(94); // ~1:34 min default
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may be restricted by browser until user gesture
      });
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio play error:", err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white backdrop-blur-md border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden">
      {/* Decorative washi tape on top of player */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-5 washi-sage rotate-1 opacity-90 rounded-sm pointer-events-none" />

      <audio
        ref={audioRef}
        src="/assets/birthday_song.mp3"
        preload="metadata"
      />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Spinning Vinyl Album Art */}
        <div className="relative group shrink-0">
          <div
            className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full border-4 border-neutral-800 bg-[#1A1817] flex items-center justify-center shadow-md relative overflow-hidden ${
              isPlaying ? 'animate-spin [animation-duration:5s]' : ''
            }`}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-1 rounded-full border border-neutral-700/60" />
            <div className="absolute inset-2.5 rounded-full border border-neutral-700/40" />
            {/* Center label */}
            <div className="w-7 h-7 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center overflow-hidden">
              <img
                src="/assets/photos/asset_18.png"
                alt="Stitch"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {/* Center hole */}
            <div className="w-1.5 h-1.5 rounded-full bg-white z-10" />
          </div>
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white/95 text-neutral-900 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
        </div>

        {/* Info & Controls */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-neutral-900 truncate flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Recently Played — Our Journey Song</span>
              </h4>
              <p className="text-xs text-neutral-500 font-script text-base leading-none">
                Special melody dedicated to Siti Maryam 🌿
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-9 h-9 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 transition-transform flex items-center justify-center shadow-sm"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Timeline slider */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono tabular-nums text-neutral-400 shrink-0">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 94}
              step="0.5"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
            />
            <span className="text-[11px] font-mono tabular-nums text-neutral-400 shrink-0">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
