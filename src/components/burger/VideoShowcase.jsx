import React, { useEffect, useRef, useState } from 'react';
import {
  Beef,
  ChevronLeft,
  ChevronRight,
  Flame,
  MessageCircle,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Wheat,
} from 'lucide-react';
import { business } from '@/data/burgerBoss';

const REELS = [
  { id: 'reel-1', src: '/assets/videos/reel-1.mp4', label: 'Na chapa 1' },
  { id: 'reel-2', src: '/assets/videos/reel-2.mp4', label: 'Na chapa 2' },
];

const BADGES = [
  { icon: Beef, label: '100% Carne Selecionada' },
  { icon: Wheat, label: 'Pão de Batata Macio & Selado' },
  { icon: Flame, label: 'Grelhado na Brasa' },
];

export default function VideoShowcase() {
  const videoRefs = useRef([]);
  const touchStartX = useRef(null);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function sync() {
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        if (i !== active) {
          video.pause();
          try {
            video.currentTime = 0;
          } catch {
            /* ignore seek errors */
          }
        }
      });

      const current = videoRefs.current[active];
      if (!current || cancelled) return;
      current.muted = muted;
      try {
        await current.play();
        if (!cancelled) setPlaying(true);
      } catch {
        if (!cancelled) setPlaying(false);
      }
    }

    sync();
    return () => {
      cancelled = true;
    };
  }, [active, muted]);

  function goTo(index) {
    setActive((index + REELS.length) % REELS.length);
    setHint(false);
  }

  function toggleMute(e) {
    e.stopPropagation();
    setMuted((prev) => {
      const next = !prev;
      if (!next) setHint(false);
      return next;
    });
  }

  function togglePlay(e) {
    e?.stopPropagation?.();
    const current = videoRefs.current[active];
    if (!current) return;

    if (current.paused) {
      current.muted = muted;
      current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      current.pause();
      setPlaying(false);
    }
    setHint(false);
  }

  function onTouchStart(e) {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(e) {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    goTo(active + (delta < 0 ? 1 : -1));
  }

  return (
    <section
      id="video"
      className="bb-section-elevated overflow-hidden py-6 sm:py-10 md:py-16 lg:py-20"
      aria-labelledby="video-title"
    >
      <div className="container grid grid-cols-1 items-center gap-6 overflow-hidden md:gap-8 lg:grid-cols-2 xl:gap-12">
        {/* Coluna texto */}
        <div className="relative z-10 order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <p className="bb-eyebrow">Na chapa</p>
          <h2
            id="video-title"
            className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:mt-3 md:text-4xl lg:text-5xl"
          >
            Sinta o sabor antes do primeiro pedaço
          </h2>
          <p className="bb-lead mx-auto mt-3 max-w-xl text-sm sm:text-base md:mt-5 lg:mx-0 lg:text-lg">
            Hambúrguer de verdade, grelhado na brasa e preparado com ingredientes frescos. Assista ao
            processo e abra o apetite.
          </p>

          <ul className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center md:mt-8 lg:items-start lg:justify-start">
            {BADGES.map(({ icon: Icon, label }) => (
              <li key={label} className="bb-pill-badge">
                <Icon size={16} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <a
            href={business.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn mt-6 w-full sm:w-auto md:mt-10"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Quero fazer meu pedido
          </a>
        </div>

        {/* Coluna celular */}
        <div className="relative z-0 order-1 flex min-w-0 justify-center overflow-hidden lg:order-2">
          <div className="flex w-full max-w-[280px] flex-col items-center gap-3 sm:max-w-[300px] md:max-w-[320px] md:gap-4">
            <div
              className="bb-phone-frame relative w-full overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="absolute left-1/2 top-0 z-30 h-4 w-24 -translate-x-1/2 rounded-b-2xl bg-[#1a1a1a] sm:h-5 sm:w-28"
                aria-hidden="true"
              />

              {/* Stories bars — área de toque ≥ 44px no mobile */}
              <div className="absolute inset-x-2 top-2 z-30 flex min-h-[44px] items-center gap-1.5 px-1 pt-2 sm:inset-x-3 sm:top-3 sm:min-h-0 sm:items-start sm:pt-4">
                {REELS.map((reel, index) => (
                  <button
                    key={reel.id}
                    type="button"
                    onClick={() => goTo(index)}
                    className="flex h-11 flex-1 items-center sm:h-auto sm:min-h-0"
                    aria-label={`Ir para ${reel.label}`}
                    aria-current={index === active}
                  >
                    <span className="h-1.5 w-full overflow-hidden rounded-full bg-white/25 sm:h-1">
                      <span
                        className={`block h-full rounded-full transition-all duration-300 ${
                          index === active
                            ? 'w-full bg-white'
                            : index < active
                              ? 'w-full bg-white/70'
                              : 'w-0 bg-white'
                        }`}
                      />
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.85rem] bg-[#0A0A0A]">
                <div
                  className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateX(-${active * 100}%)` }}
                >
                  {REELS.map((reel, index) => (
                    <div key={reel.id} className="relative h-full w-full shrink-0 grow-0 basis-full">
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        className="h-full w-full cursor-pointer object-cover"
                        src={reel.src}
                        muted={muted}
                        loop
                        playsInline
                        preload={index === active ? 'metadata' : 'none'}
                        onClick={togglePlay}
                        aria-label={`Reel ${reel.label}`}
                      >
                        Seu navegador não suporta vídeo HTML5.
                      </video>
                    </div>
                  ))}
                </div>

                {hint && (
                  <div className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-3 sm:top-12">
                    <span className="rounded-full border border-[var(--lu-border-strong)] bg-black/65 px-3 py-1.5 text-center font-heading text-[0.6rem] font-semibold uppercase tracking-wide text-[var(--lu-text-soft)] backdrop-blur sm:text-[0.65rem]">
                      Toque para ouvir o som da chapa
                    </span>
                  </div>
                )}

                {!playing && (
                  <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/35">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--lu-red)] text-white shadow-[0_0_30px_var(--lu-red-glow)] sm:h-14 sm:w-14">
                      <Play size={24} fill="currentColor" aria-hidden="true" />
                    </span>
                  </div>
                )}

                {/* Controles — 44x44 no mobile, sem sobrepor label */}
                <div className="absolute bottom-3 right-2 z-30 flex gap-2 sm:bottom-3 sm:right-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur transition hover:bg-[var(--lu-red)]"
                    aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                  >
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--lu-yellow)]/35 bg-black/55 text-[var(--lu-yellow)] backdrop-blur transition hover:bg-[var(--lu-yellow)] hover:text-[var(--lu-yellow-ink)]"
                    aria-label={muted ? 'Ativar som' : 'Desativar som'}
                  >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                </div>

                <p className="pointer-events-none absolute bottom-3 left-2 z-20 max-w-[42%] truncate rounded-full bg-black/50 px-2 py-1 font-heading text-[0.6rem] font-bold uppercase tracking-wide text-white/90 backdrop-blur sm:left-3 sm:max-w-none sm:px-2.5 sm:text-[0.65rem]">
                  {active + 1}/{REELS.length}
                </p>
              </div>
            </div>

            {/* Setas abaixo do frame — nunca saem da tela */}
            <div className="flex w-full max-w-full items-center justify-center gap-4 px-1">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-[var(--lu-red)]"
                aria-label="Vídeo anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1.5" aria-hidden="true">
                {REELS.map((reel, index) => (
                  <span
                    key={reel.id}
                    className={`h-2 w-2 rounded-full transition ${
                      index === active ? 'bg-[var(--lu-yellow)]' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-[var(--lu-red)]"
                aria-label="Próximo vídeo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
