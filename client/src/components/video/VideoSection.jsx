import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Clock, Film, Sparkles, CheckCircle2 } from "lucide-react";

const CATEGORY_THUMBNAILS = {
  crm: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  "project-management": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  accounting: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  "hr-payroll": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  "team-collaboration": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "video-conferencing": "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80",
  analytics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  "reviews-comparisons": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  all: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
};

export default function VideoSection({ video, category }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(225); // Default ~3:45 in seconds
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const videoRef = useRef(null);

  const fallbackData = {
    title: "How SaaS Pricing Works (Per Seat, Add-ons & Contracts)",
    duration: "3:45",
    chapters: [
      { time: "0:00", label: "Per-seat licenses vs usage billing" },
      { time: "0:45", label: "The annual vs monthly discount model" },
      { time: "1:30", label: "Spotting hidden add-on surcharges" },
      { time: "2:40", label: "Contract renewals and price uplifts" },
    ],
  };

  const data = video || fallbackData;

  const thumbnailUrl =
    video?.thumbnail ||
    video?.poster ||
    (category?.id ? CATEGORY_THUMBNAILS[category.id] : null) ||
    CATEGORY_THUMBNAILS.all;

  // Reset state when category/video changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveChapterIndex(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [video?.src, thumbnailUrl]);

  // Simulated progress timer when playing (even if native video doesn't stream)
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= duration) {
            setIsPlaying(false);
            return 0;
          }

          if (data.chapters && data.chapters.length > 0) {
            let idx = 0;
            data.chapters.forEach((chap, i) => {
              const [m, s] = chap.time.split(":").map(Number);
              const chapSecs = (m || 0) * 60 + (s || 0);
              if (next >= chapSecs) idx = i;
            });
            setActiveChapterIndex(idx);
          }

          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration, data.chapters]);

  const togglePlay = () => {
    if (isPlaying) {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Keep simulated preview running gracefully
            setIsPlaying(true);
          });
      } else {
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) {
      setIsMuted(!isMuted);
      return;
    }
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setCurrentTime(current);

    if (data.chapters && data.chapters.length > 0) {
      let idx = 0;
      data.chapters.forEach((chap, i) => {
        const [m, s] = chap.time.split(":").map(Number);
        const chapSecs = (m || 0) * 60 + (s || 0);
        if (current >= chapSecs) idx = i;
      });
      setActiveChapterIndex(idx);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const seekToChapter = (timeStr, idx) => {
    setActiveChapterIndex(idx);
    const [m, s] = timeStr.split(":").map(Number);
    const seconds = (m || 0) * 60 + (s || 0);
    setCurrentTime(seconds);

    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      if (!isPlaying) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(true));
      }
    } else {
      setIsPlaying(true);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-2xs space-y-3.5 transition-colors">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-foreground">
            SaaS Pricing Explainer
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
          <Clock className="w-3 h-3" />
          <span>{data.duration || "3:45"}</span>
        </div>
      </div>

      {/* Desktop side-by-side layout: chapters beside player on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch">
        {/* Left: Video Player Frame */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div
            onClick={togglePlay}
            className="relative aspect-video bg-zinc-950 rounded-xl overflow-hidden group shadow-md border border-border/80 cursor-pointer select-none"
          >
            {/* Category Demo Thumbnail Image */}
            <img
              src={thumbnailUrl}
              alt={data.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? "opacity-35 scale-100" : "opacity-90 group-hover:scale-105"
              }`}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Cinematic Gradient Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />

            {/* HTML5 Video Layer (muted background play if streamable) */}
            {video?.src && (
              <video
                ref={videoRef}
                src={video.src}
                poster={thumbnailUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                playsInline
                muted={isMuted}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
                  isPlaying ? "opacity-80" : "opacity-0"
                }`}
              />
            )}

            {/* Centered Play / Pause Action Button & Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-20">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 ${
                  isPlaying
                    ? "bg-white/20 text-white backdrop-blur-md scale-95 opacity-80 group-hover:opacity-100"
                    : "bg-white text-zinc-950 group-hover:scale-110 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white text-white" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-zinc-950 text-zinc-950 ml-0.5" />
                )}
              </div>

              {!isPlaying && (
                <div className="mt-3 space-y-1 max-w-sm">
                  <p className="font-bold text-xs sm:text-sm text-white line-clamp-1 drop-shadow-md">
                    {data.title}
                  </p>
                  <span className="inline-block text-[10px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    Chapter {activeChapterIndex + 1}: {data.chapters?.[activeChapterIndex]?.label || "Per-seat models"}
                  </span>
                </div>
              )}
            </div>

            {/* Custom Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white text-xs z-30 opacity-95">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-md hover:bg-white/20 transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <span className="text-[10px] font-mono text-zinc-300">
                  {formatTime(currentTime)} / {data.duration || "3:45"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 backdrop-blur-xs text-zinc-300">
                  1080p HD
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
              <div
                className="h-full bg-emerald-500 transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Desktop Chapters List */}
        <div className="md:col-span-5 flex flex-col justify-between bg-muted/30 border border-border/80 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-border/60">
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              Video Chapters
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {data.chapters?.length || 4} topics
            </span>
          </div>

          <div className="space-y-1.5 flex-1">
            {data.chapters?.map((chap, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => seekToChapter(chap.time, idx)}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-start gap-2 border ${
                    isActive
                      ? "bg-foreground/5 text-foreground font-semibold border-foreground/30 shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                      isActive
                        ? "bg-foreground text-background font-bold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {chap.time}
                  </span>
                  <span className="truncate leading-tight">{chap.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
            <span className="font-mono text-[10px]">Topic {activeChapterIndex + 1} of {data.chapters?.length || 4}</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] uppercase font-mono">
              Verified Intel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
