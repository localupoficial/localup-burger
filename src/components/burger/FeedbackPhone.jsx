import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const HIGHLIGHT =
  'https://www.instagram.com/stories/highlights/18111333787415325/';

const VIDEOS = [
  '/feedbacks/feedback-1.mp4',
  '/feedbacks/feedback-2.mp4',
  '/feedbacks/feedback-3.mp4',
];

export default function FeedbackPhone() {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setProgress(0);
    video.currentTime = 0;
    const play = video.play();
    if (play) play.catch(() => {});
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + VIDEOS.length) % VIDEOS.length);
  const next = () => setIndex((i) => (i + 1) % VIDEOS.length);

  const onTime = () => {
    const video = videoRef.current;
    if (!video?.duration) return;
    setProgress(video.currentTime / video.duration);
  };

  return (
    <section className="container feedback-section" id="feedbacks" aria-labelledby="feedback-title">
      <div className="feedback-copy">
        <div className="eyebrow">
          <span /> QUEM PROVA, VOLTA
        </div>
        <h2 id="feedback-title">
          FEEDBACKS <span>DE VERDADE.</span>
        </h2>
        <p>
          Clientes da Best Burguer 013, em vídeo, no mesmo formato dos destaques do Instagram.
        </p>
        <a className="outline-btn" href={HIGHLIGHT} target="_blank" rel="noopener noreferrer">
          Abrir destaque no Instagram
        </a>
      </div>

      <div className="phone-mock" aria-label="Celular com feedbacks em vídeo">
        <div className="phone-mock__bezel">
          <div className="phone-mock__notch" aria-hidden="true" />
          <div className="phone-mock__screen">
            <video
              ref={videoRef}
              className="story-video"
              src={VIDEOS[index]}
              muted={muted}
              playsInline
              autoPlay
              onTimeUpdate={onTime}
              onEnded={next}
            />

            <div className="story-bars" aria-hidden="true">
              {VIDEOS.map((src, i) => (
                <span
                  key={src}
                  className={i === index ? 'is-active' : i < index ? 'is-done' : ''}
                  style={i === index ? { '--story-progress': `${progress * 100}%` } : undefined}
                />
              ))}
            </div>

            <div className="story-head">
              <span className="story-avatar" aria-hidden="true">
                BB
              </span>
              <div>
                <strong>best_burguer013</strong>
                <small>Feedback</small>
              </div>
              <button
                type="button"
                className="story-sound"
                onClick={() => setMuted((value) => !value)}
                aria-label={muted ? 'Ativar som' : 'Silenciar'}
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            <div className="story-nav">
              <button type="button" onClick={prev} aria-label="Feedback anterior">
                <ChevronLeft size={22} />
              </button>
              <button type="button" onClick={next} aria-label="Próximo feedback">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
