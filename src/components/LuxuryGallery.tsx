import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Film,
  ExternalLink,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import { Language } from '../data/translations';
import { GalleryMediaItem, DEFAULT_GALLERY_ITEMS } from '../data/customization';

interface LuxuryGalleryProps {
  lang: Language;
  items?: GalleryMediaItem[];
  initialTab?: 'all' | 'photos' | 'videos';
}

// Realistic audio generator using Web Audio API for high-pressure spray and foaming sound
class CarWashSoundEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isPlaying = false;

  public start(volume: number = 0.4) {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) return;

      // Generate 3 seconds of looping white noise filtered to mimic water jets and foam fizz
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Bandpass filter centered around 1800Hz with resonance to sound like pressurized mist & foam
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'bandpass';
      this.filterNode.frequency.value = 1600;
      this.filterNode.Q.value = 1.2;

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

      this.noiseNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.noiseNode.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext not allowed or supported', e);
    }
  }

  public setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime);
    }
  }

  public stop() {
    try {
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      this.isPlaying = false;
    } catch {
      // ignore
    }
  }
}

const globalSoundEngine = new CarWashSoundEngine();

export function LuxuryGallery({
  lang,
  items = DEFAULT_GALLERY_ITEMS,
  initialTab = 'all',
}: LuxuryGalleryProps) {
  const [galleryTab, setGalleryTab] = useState<'all' | 'photos' | 'videos'>(initialTab);
  const displayItems = items && items.length > 0 ? items : DEFAULT_GALLERY_ITEMS;

  // Separate Photos and Videos into two distinct collections
  const photosList = displayItems.filter((item) => item.type === 'image' || !item.type);
  const videosList = displayItems.filter((item) => item.type === 'video');

  // Photo Category Filtering
  const [photoCategory, setPhotoCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryMediaItem | null>(null);

  // Video Player State
  const [activeVideo, setActiveVideo] = useState<GalleryMediaItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);
  const [inlinePlayingId, setInlinePlayingId] = useState<string | null>(null);

  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const photoCategories = [
    { id: 'all', labelAr: 'جميع الصور', labelEn: 'All Photos' },
    { id: 'wash', labelAr: 'رغوة ثلجية', labelEn: 'Snow Foam' },
    { id: 'detailing', labelAr: 'تلميع وجنوط', labelEn: 'Detailing' },
    { id: 'steam', labelAr: 'بخار وتعقيم', labelEn: 'Steam Care' },
    { id: 'facility', labelAr: 'مرافق المغسلة', labelEn: 'Lounge & Facilities' },
  ];

  const filteredPhotos =
    photoCategory === 'all'
      ? photosList
      : photosList.filter((item) => (item.category || 'wash') === photoCategory);

  // Play audio when a video modal opens or inline video starts
  const playVideoWithSound = (video: GalleryMediaItem) => {
    setActiveVideo(video);
    setIsPlayingAudio(true);
    // Start realistic audio sound engine
    globalSoundEngine.start(0.45);
  };

  const closeVideoModal = () => {
    setActiveVideo(null);
    globalSoundEngine.stop();
  };

  const toggleSound = () => {
    if (isPlayingAudio) {
      globalSoundEngine.stop();
      setIsPlayingAudio(false);
      if (videoElementRef.current) {
        videoElementRef.current.muted = true;
      }
    } else {
      globalSoundEngine.start(0.45);
      setIsPlayingAudio(true);
      if (videoElementRef.current) {
        videoElementRef.current.muted = false;
        videoElementRef.current.volume = 1;
      }
    }
  };

  useEffect(() => {
    return () => {
      globalSoundEngine.stop();
    };
  }, []);

  return (
    <section id="gallery" className="py-10 sm:py-14 relative bg-[#05070c] scroll-mt-20 border-t border-cyan-500/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">

        {/* Gallery Sub-Tabs: Photos & Videos in same Gallery Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setGalleryTab('all')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-['Alexandria',sans-serif] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              galleryTab === 'all'
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-300'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'ar' ? 'عرض الكل (صور وفيديوهات)' : 'All Media'}</span>
          </button>

          <button
            type="button"
            onClick={() => setGalleryTab('photos')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-['Alexandria',sans-serif] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              galleryTab === 'photos'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-300'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'ar' ? '📸 الصور فقط' : 'Photos Only'}</span>
          </button>

          <button
            type="button"
            onClick={() => setGalleryTab('videos')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-['Alexandria',sans-serif] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              galleryTab === 'videos'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{lang === 'ar' ? '🎬 الفيديوهات' : 'Videos'}</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* معرض الصور الفوتوغرافية                                   */}
        {/* ======================================================== */}
        {(galleryTab === 'all' || galleryTab === 'photos') && (
          <div id="gallery-photos" className="scroll-mt-24">
          {/* Photos Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ar' ? 'معرض الصور الفوتوغرافية' : 'Photo Gallery'}</span>
            </div>

            <h2 className="font-['Cairo',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-normal mb-3">
              {lang === 'ar' ? 'لقطات من واقع صالات ومسارات RM.STAR' : 'Pristine Shots From Our Facilities'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'شاهد كثافة رغوة شامبو لايف لاينز، لمعان الجنوط والطلاء، وتكييس المقصورة الداخلية لسيارات عملائنا في فرعي الربوة والقرينية بجدة.'
                : 'Witness the thick snow foam, deep wheel shine, and interior protection for our client cars.'}
            </p>
          </div>

          {/* Photo Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {photoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPhotoCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-['Alexandria',sans-serif] font-bold transition-all cursor-pointer ${
                  photoCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {lang === 'ar' ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-cyan-500/20 hover:border-cyan-400/70 cursor-pointer shadow-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:-translate-y-1"
              >
                <img
                  src={photo.url}
                  alt={photo.titleAr}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-cyan-300 font-bold flex items-center gap-1">
                  <Camera className="w-3 h-3 text-cyan-400" />
                  <span>{lang === 'ar' ? 'صورة عالية الدقة' : 'HD Photo'}</span>
                </div>

                {/* Caption at Bottom */}
                <div className="absolute bottom-3 right-3 left-3 text-right">
                  <h4 className="font-['Alexandria',sans-serif] font-bold text-sm sm:text-base text-white drop-shadow truncate">
                    {lang === 'ar' ? photo.titleAr : photo.titleEn}
                  </h4>
                  {photo.descAr && (
                    <p className="text-[11px] text-slate-300 line-clamp-1 mt-1">
                      {lang === 'ar' ? photo.descAr : photo.descEn}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Divider Between Sections */}
        {galleryTab === 'all' && (
          <div className="relative py-2">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="absolute left-1/2 -translate-x-1/2 -top-3 px-4 py-1 rounded-full bg-[#05070c] border border-cyan-500/30 text-[11px] text-cyan-300 font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ar' ? 'فيديوهات الغسيل' : 'Wash Videos'}</span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* معرض الفيديوهات والتجارب الحية                           */}
        {/* ======================================================== */}
        {(galleryTab === 'all' || galleryTab === 'videos') && (
          <div id="gallery-videos" className="scroll-mt-24">
          {/* Videos Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
              <Film className="w-4 h-4 text-red-400" />
              <span>{lang === 'ar' ? 'فيديوهات الغسيل' : 'Wash Videos'}</span>
            </div>

            <h2 className="font-['Cairo',sans-serif] text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-normal mb-3">
              {lang === 'ar' ? 'فيديوهات وتجارب حية من داخل المغسلة' : 'Real-Life Wash & Detailing Videos'}
            </h2>
          </div>

          {/* Videos Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videosList.map((video) => (
              <div
                key={video.id}
                onClick={() => playVideoWithSound(video)}
                className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-red-500/60 cursor-pointer shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:-translate-y-1"
              >
                {/* Video Preview Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={video.thumbnailUrl || video.url}
                    alt={video.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Backing */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Big Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.7)] group-hover:scale-115 transition-transform">
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Video Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-red-500/40 text-red-300 text-[10px] font-bold flex items-center gap-1.5">
                      <Film className="w-3 h-3 text-red-400" />
                      <span>{lang === 'ar' ? 'فيديو حقيقي' : 'Real Video'}</span>
                    </span>
                  </div>
                </div>

                {/* Video Info Bottom Panel */}
                <div className="p-4 sm:p-5 text-right bg-gradient-to-b from-slate-950 to-[#070b16]">
                  <h3 className="font-['Alexandria',sans-serif] font-black text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                    {lang === 'ar' ? video.titleAr : video.titleEn}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {lang === 'ar' ? video.descAr : video.descEn}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-cyan-400 font-bold flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-cyan-400" />
                      <span>{lang === 'ar' ? 'مشاهدة الفيديو' : 'Watch Video'}</span>
                    </span>

                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      RM.STAR Live
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Official TikTok Callout in Videos Section */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#101c34] to-[#0d1627] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-right">
              <div className="w-12 h-12 rounded-xl bg-black border border-cyan-400/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Film className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-['Alexandria',sans-serif] font-black text-sm sm:text-base text-white">
                  {lang === 'ar' ? 'تابع يوميات وتجارب الغسيل على تيك توك الرسمي' : 'Follow Daily Washes on TikTok'}
                </h4>
                <p className="text-xs text-slate-300">
                  {lang === 'ar' ? '@rm.star.carwash — فيديوهات حصرية للمسارات وتجارب العملاء' : '@rm.star.carwash — Exclusive daily car wash clips'}
                </p>
              </div>
            </div>

            <a
              href="https://www.tiktok.com/@rm.star.carwash"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white font-['Alexandria',sans-serif] font-bold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'فتح حساب التيك توك' : 'Open TikTok'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* Photo Lightbox Modal                                     */}
      {/* ======================================================== */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 z-10 cursor-pointer shadow-xl"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.url}
              alt={activePhoto.titleAr}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-cyan-500/30"
            />

            <div className="mt-4 text-center text-white px-4">
              <h3 className="font-['Alexandria',sans-serif] font-bold text-lg sm:text-xl text-cyan-300">
                {lang === 'ar' ? activePhoto.titleAr : activePhoto.titleEn}
              </h3>
              {activePhoto.descAr && (
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-1.5 leading-relaxed">
                  {lang === 'ar' ? activePhoto.descAr : activePhoto.descEn}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Video Player Modal with SOUND ACTIVE                     */}
      {/* ======================================================== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeVideoModal}
        >
          <button
            onClick={closeVideoModal}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 z-10 cursor-pointer shadow-xl"
            title="إغلاق الفيديو"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-3xl w-full flex flex-col items-center bg-[#070b16] rounded-2xl border border-red-500/40 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                <h3 className="text-xs sm:text-sm font-black text-white truncate">
                  {lang === 'ar' ? activeVideo.titleAr : activeVideo.titleEn}
                </h3>
              </div>

              {/* Sound Toggle Button */}
              <button
                onClick={toggleSound}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 ${
                  isPlayingAudio
                    ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
                title={isPlayingAudio ? (lang === 'ar' ? 'كتم الصوت' : 'Mute') : (lang === 'ar' ? 'تشغيل الصوت' : 'Unmute')}
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'ar' ? 'تشغيل' : 'Sound'}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-400" />
                    <span>{lang === 'ar' ? 'كتم' : 'Mute'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
              <video
                ref={videoElementRef}
                src={activeVideo.url}
                poster={activeVideo.thumbnailUrl}
                controls
                autoPlay
                playsInline
                loop
                muted={!isPlayingAudio}
                className="w-full h-full object-cover"
                onPlay={() => {
                  if (isPlayingAudio) globalSoundEngine.start(0.45);
                }}
                onPause={() => {
                  globalSoundEngine.stop();
                }}
              />
            </div>

            {/* Video Meta Info */}
            <div className="mt-4 w-full text-right">
              <div className="flex items-center justify-between">
                <h3 className="font-['Alexandria',sans-serif] font-black text-lg text-white">
                  {lang === 'ar' ? activeVideo.titleAr : activeVideo.titleEn}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                  RM.STAR Car Wash
                </span>
              </div>

              {activeVideo.descAr && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {lang === 'ar' ? activeVideo.descAr : activeVideo.descEn}
                </p>
              )}

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{lang === 'ar' ? 'مغسلة آر إم ستار — فرعي الربوة والقرينية' : 'RM.STAR — Rabwah & Qurayniyyah'}</span>
                <a
                  href="https://www.tiktok.com/@rm.star.carwash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>{lang === 'ar' ? 'المزيد على تيك توك' : 'More on TikTok'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
