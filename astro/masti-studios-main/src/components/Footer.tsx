import { INSTAGRAM_URL } from '../siteConfig';

interface FooterProps {
  current?: 'home' | 'work' | 'about';
}

export default function Footer({ current = 'home' }: FooterProps) {
  const isHome = current === 'home';
  const servicesHref = isHome ? '#services' : '/#services';
  const contactHref = isHome ? '#contact' : '/#contact';

  return (
    <footer>
      <div className="wrap">
        <div className="foot-mono">© 2026 MASTI STUDIOS. DELHI, INDIA.</div>
        <div className="foot-links">
          <a href={servicesHref}>Services</a>
          <a href="/about">About</a>
          <a href="/work">Work</a>
          <a href={contactHref}>Contact</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram</a>
        </div>
      </div>
    </footer>
  );
}