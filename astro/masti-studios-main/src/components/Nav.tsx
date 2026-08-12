import { GOOGLE_FORM_URL } from '../siteConfig';

interface NavProps {
  current?: 'home' | 'work' | 'photography';
}

export default function Nav({ current = 'home' }: NavProps) {
  const isHome = current === 'home';
  const servicesHref = isHome ? '#services' : '/#services';
  const contactHref = isHome ? '#contact' : '/#contact';

  return (
    <nav>
      <div className="wrap">
        <a href="/" className="logo">
          <span className="dot"></span>MASTI STUDIOS
        </a>
        <div className="nav-links">
          <a href={servicesHref}>Services</a>
          <a href="/work" className={current === 'work' ? 'current' : ''}>Work</a>
          <a href="/photography" className={current === 'photography' ? 'current' : ''}>Photography</a>
          <a href={contactHref}>Contact</a>
        </div>
        <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener" className="nav-cta">
          Start a project
        </a>
      </div>
    </nav>
  );
}