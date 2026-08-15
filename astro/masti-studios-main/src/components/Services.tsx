import { useState } from 'react';

const SERVICES = [
  {
    code: '01 / WIDE',
    title: 'Cinematography',
    desc: 'We shoot things people want to keep watching. Brand films, product stories, campaigns, reels and everything between "action" and "one more take."',
    tags: ['Brand Films', 'Product Films', 'Social Video', 'Lifestyle', 'Campaigns', 'Photography'],
    icon: 'aperture',
  },
  {
    code: '02 / CUT',
    title: 'Video Editing',
    desc: 'Raw footage goes in. Something considerably more addictive comes out. Pacing, colour, music, sound and cuts engineered for people with very fast thumbs.',
    tags: ['Short Form', 'Long Form', 'Colour', 'Sound', 'Motion', 'Campaign Cutdowns'],
    icon: 'timeline',
  },
  {
    code: '03 / ID',
    title: 'Brand Building',
    desc: 'Not just a nice logo. We build visual worlds that make your brand recognisable before anyone even reads the username.',
    tags: ['Identity', 'Visual Direction', 'Typography', 'Campaign Systems', 'Creative Direction'],
    icon: 'mark',
  },
  {
    code: '04 / LAYOUT',
    title: 'Graphic Design',
    desc: 'Posts. Carousels. Key art. Campaigns. Thumbnails. All the little rectangles your brand has to live inside—made considerably less boring.',
    tags: ['Social Design', 'Carousels', 'Key Art', 'Campaigns', 'Static Creative'],
    icon: 'layers',
  },
];

function ServiceIcon({ type, active }: { type: string; active: boolean }) {
  const common = { width: 34, height: 34, viewBox: '0 0 34 34', fill: 'none' };

  if (type === 'aperture') {
    return (
      <svg {...common} className={`svc-icon ${active ? 'svc-icon-active' : ''}`}>
        <circle cx="17" cy="17" r="14" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <g className="svc-icon-blades">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="17" y1="17" x2="17" y2="5"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
              transform={`rotate(${deg} 17 17)`}
            />
          ))}
        </g>
        <circle cx="17" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (type === 'timeline') {
    return (
      <svg {...common} className={`svc-icon ${active ? 'svc-icon-active' : ''}`}>
        <rect x="4" y="14" width="26" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <rect x="6" y="16" width="8" height="2" fill="currentColor" opacity="0.5" />
        <rect x="16" y="16" width="5" height="2" fill="currentColor" opacity="0.5" />
        <rect x="23" y="16" width="4" height="2" fill="currentColor" opacity="0.5" />
        <line className="svc-icon-playhead" x1="12" y1="10" x2="12" y2="24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle className="svc-icon-playhead" cx="12" cy="9" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'mark') {
    return (
      <svg {...common} className={`svc-icon ${active ? 'svc-icon-active' : ''}`}>
        <path
          className="svc-icon-draw"
          d="M17 5 L27 11 V23 L17 29 L7 23 V11 Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
        />
        <circle cx="17" cy="17" r="3" fill="currentColor" opacity="0.7" />
      </svg>
    );
  }

  // layers
  return (
    <svg {...common} className={`svc-icon ${active ? 'svc-icon-active' : ''}`}>
      <g className="svc-icon-layers">
        <rect x="8" y="7" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        <rect x="6" y="12" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <rect x="4" y="17" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-eyebrow">What We Do</div>
        <h2>Four disciplines. One slightly chaotic studio.</h2>

        <div className="svc-list">
          {SERVICES.map((s, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`svc-item ${isOpen ? 'svc-item-open' : ''}`} key={s.title}>
                <button
                  className="svc-header"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <div className="shot-code">
                    SCENE<span className="n">{s.code}</span>
                  </div>
                  <div className="svc-icon-wrap">
                    <ServiceIcon type={s.icon} active={isOpen} />
                  </div>
                  <div className="shot-title">{s.title}</div>
                  <div className={`svc-plus ${isOpen ? 'svc-plus-open' : ''}`}>
                    <span></span>
                    <span></span>
                  </div>
                </button>

                <div className="svc-body">
                  <div className="svc-body-inner">
                    <div className="shot-desc">{s.desc}</div>
                    <div className="shot-tags">
                      {s.tags.map((t) => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}