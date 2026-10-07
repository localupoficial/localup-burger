import React, { useState } from 'react';

/**
 * Hambúrguer em camadas — explodido por padrão, monta no hover (desktop)
 * ou no toque (mobile).
 */
export default function ExplodedBurger() {
  const [assembled, setAssembled] = useState(false);

  return (
    <button
      type="button"
      className={`bb013-burger${assembled ? ' is-assembled' : ''}`}
      aria-label="Hambúrguer Best Burguer 013 — passe o mouse ou toque para montar"
      aria-pressed={assembled}
      onClick={() => setAssembled((v) => !v)}
      onMouseEnter={() => setAssembled(true)}
      onMouseLeave={() => setAssembled(false)}
      onBlur={() => setAssembled(false)}
    >
      <div className="bb013-burger__glow" aria-hidden="true" />

      <div className="bb013-burger__stage" aria-hidden="true">
        {/* Top bun */}
        <div className="bb013-layer bb013-layer--top">
          <div className="bb013-bun-top">
            <span className="bb013-seed" />
            <span className="bb013-seed bb013-seed--2" />
            <span className="bb013-seed bb013-seed--3" />
            <span className="bb013-seed bb013-seed--4" />
          </div>
        </div>

        {/* Bacon */}
        <div className="bb013-layer bb013-layer--bacon">
          <div className="bb013-bacon">
            <span />
            <span />
          </div>
        </div>

        {/* Cheese + patty */}
        <div className="bb013-layer bb013-layer--patty">
          <div className="bb013-cheese" />
          <div className="bb013-patty" />
        </div>

        {/* Tomato */}
        <div className="bb013-layer bb013-layer--tomato">
          <div className="bb013-tomato">
            <span />
            <span />
          </div>
        </div>

        {/* Lettuce */}
        <div className="bb013-layer bb013-layer--lettuce">
          <div className="bb013-lettuce" />
        </div>

        {/* Bottom bun */}
        <div className="bb013-layer bb013-layer--bottom">
          <div className="bb013-bun-bottom" />
        </div>

        {/* Steam wisps */}
        <div className="bb013-steam bb013-steam--1" />
        <div className="bb013-steam bb013-steam--2" />
        <div className="bb013-steam bb013-steam--3" />
      </div>

      <span className="bb013-burger__hint">
        {assembled ? 'Montado. Sabor na hora.' : 'Passe o mouse · monte o burger'}
      </span>
    </button>
  );
}
