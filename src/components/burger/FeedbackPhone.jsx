import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const HIGHLIGHT =
  'https://www.instagram.com/stories/highlights/18111333787415325/';
const STORIES = 5;

/**
 * Mockup de celular no formato dos destaques do Instagram (Feedback).
 * Os vídeos reais ficam no highlight oficial — o Instagram não permite incorporá-los.
 */
export default function FeedbackPhone() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % STORIES), 4200);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + STORIES) % STORIES);
  const next = () => setIndex((i) => (i + 1) % STORIES);

  return (
    <section className="container feedback-section" aria-labelledby="feedback-title">
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

      <div className="phone-mock" aria-label="Mockup de celular com feedbacks em vídeo">
        <div className="phone-mock__bezel">
          <div className="phone-mock__notch" aria-hidden="true" />
          <div className="phone-mock__screen">
            <div className="story-bars" aria-hidden="true">
              {Array.from({ length: STORIES }).map((_, i) => (
                <span key={i} className={i === index ? 'is-active' : i < index ? 'is-done' : ''} />
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
            </div>

            <a
              className="story-play"
              href={HIGHLIGHT}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Assistir feedback ${index + 1} de ${STORIES} no Instagram`}
            >
              <Play size={28} fill="currentColor" />
              <span>Assistir vídeo {index + 1}</span>
            </a>

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
