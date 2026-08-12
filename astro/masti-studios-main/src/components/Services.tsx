const SERVICES = [
  {
    code: '01 / WIDE',
    title: 'Cinematography',
    desc: 'We shoot things people want to keep watching. Brand films, product stories, campaigns, reels and everything between "action" and "one more take."',
    tags: ['Brand Films', 'Product Films', 'Social Video', 'Lifestyle', 'Campaigns', 'Photography'],
  },
  {
    code: '02 / CUT',
    title: 'Video Editing',
    desc: 'Raw footage goes in. Something considerably more addictive comes out. Pacing, colour, music, sound and cuts engineered for people with very fast thumbs.',
    tags: ['Short Form', 'Long Form', 'Colour', 'Sound', 'Motion', 'Campaign Cutdowns'],
  },
  {
    code: '03 / ID',
    title: 'Brand Building',
    desc: 'Not just a nice logo. We build visual worlds that make your brand recognisable before anyone even reads the username.',
    tags: ['Identity', 'Visual Direction', 'Typography', 'Campaign Systems', 'Creative Direction'],
  },
  {
    code: '04 / LAYOUT',
    title: 'Graphic Design',
    desc: 'Posts. Carousels. Key art. Campaigns. Thumbnails. All the little rectangles your brand has to live inside—made considerably less boring.',
    tags: ['Social Design', 'Carousels', 'Key Art', 'Campaigns', 'Static Creative'],
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-eyebrow">What We Do</div>
        <h2>Four disciplines. One slightly chaotic studio.</h2>

        {SERVICES.map((s) => (
          <div className="shot" key={s.title}>
            <div className="shot-code">
              SCENE<span className="n">{s.code}</span>
            </div>
            <div className="shot-title">{s.title}</div>
            <div>
              <div className="shot-desc">{s.desc}</div>
              <div className="shot-tags">
                {s.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}