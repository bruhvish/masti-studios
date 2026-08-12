import { GOOGLE_FORM_URL, INSTAGRAM_URL, EMAIL } from '../siteConfig';

interface CTAProps {
  variant: 'home' | 'work';
}

export default function CTA({ variant }: CTAProps) {
  if (variant === 'work') {
    return (
      <section className="cta">
        <div className="wrap">
          <h2>
            YOUR BRAND
            <br />
            COULD BE <span className="accent">NEXT</span>
          </h2>
          <p className="cta-sub">Whatever world your brand lives in, we'll bring a camera to it.</p>
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener" className="btn-primary" style={{ marginTop: 34, display: 'inline-flex' }}>
            Start a project →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <h2>
          LET'S MAKE
          <br />
          SOMETHING <span className="accent">WORTH</span>
          <br />
          WATCHING
        </h2>
        <p className="cta-sub">
          Tell us about your brand and what you're trying to launch, grow or fix. We'll get back within a day.
        </p>
        <div className="hero-ctas">
          <a href={`mailto:${EMAIL}`} className="btn-primary">{EMAIL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="btn-ghost">Follow on Instagram</a>
        </div>
      </div>
    </section>
  );
}
