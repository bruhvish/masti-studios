import Timecode from './Timecode';
import { GOOGLE_FORM_URL } from '../siteConfig';

// Swap this for your best reel — used as the looping background behind the headline.
const HERO_VIDEO = '/video/hunteractivationm.mp4';
// Single still frame shown instantly while the video streams in behind it.
// Generate with: ffmpeg -i public/video/hunteractivationm.mp4 -ss 00:00:01 -vframes 1 public/video/hero-poster.jpg
const HERO_POSTER = '/video/hero-poster.jpg';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <video
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className="wrap">
        <div className="frame">
          <span className="corner tl"></span>
          <span className="corner tr"></span>
          <span className="corner bl"></span>
          <span className="corner br"></span>

          <div className="rec-row mono">
            <span className="rec-dot"></span> NOW SHOOTING / DELHI &amp; BEYOND
          </div>

          <h1>
            WE MAKE BRANDS
            <br />
            <em>IMPOSSIBLE</em>
            <br />
            TO SCROLL PAST.
          </h1>

          <p className="hero-sub">
            Masti Studios is a social-first creative studio making brands look, move and sound
            like something worth paying attention to.
          </p>

          <div className="hero-tags">
            <span className="tag">Cinematography</span>
            <span className="tag">Editing</span>
            <span className="tag">Brand Identity</span>
            <span className="tag">Design</span>
            <span className="tag">Social Creative</span>
          </div>

          <div className="hero-ctas">
            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener" className="btn-primary">
              Start a project →
            </a>
            <a href="#work" className="btn-ghost">▸ Watch the reel</a>
          </div>

          <p className="hero-float mono">TOO MANY IDEAS. JUST ENOUGH DEADLINES.</p>

          <Timecode />
        </div>
      </div>
    </section>
  );
}