import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Overlay({ title, children, onClose, drawer = false }) {
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener('keydown', close);
    };
  }, [onClose]);

  return (
    <div
      className={`overlay ${drawer ? 'drawer-overlay' : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={drawer ? 'drawer-panel' : 'modal-panel'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-heading">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={22} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
