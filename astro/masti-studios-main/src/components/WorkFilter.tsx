import { useEffect, useMemo, useState } from 'react';
import VideoLightbox from './VideoLightbox';
import ProjectCard from './ProjectCard';
import PhotoProjectCard from './PhotoProjectCard';

type Category = 'fashion' | 'fnb' | 'automobile' | 'events' | 'realestate' | 'personalbranding';
type Service = 'cinematography' | 'editing' | 'brand' | 'design' | 'photography';

interface Project {
  category: Category;
  service: Service;
  label: string;
  title: string;
  // Video projects
  video?: string;
  poster?: string;
  posterFrame?: number;
  // Photo projects
  photo?: string;
  alt?: string;
}

const CATEGORY_META: Record<Category, { name: string; className: string }> = {
  fashion: { name: 'Fashion', className: 'cat-fashion' },
  fnb: { name: 'F&B', className: 'cat-fnb' },
  automobile: { name: 'Automobile', className: 'cat-automobile' },
  realestate: { name: 'Real Estate', className: 'cat-realestate' },
  events: { name: 'Events', className: 'cat-events' },
  personalbranding: { name: 'Personal Branding', className: 'cat-personalbranding' },
};

// Scene codes echo the Services section (SCENE 01/WIDE, 02/CUT, 03/ID, 04/LAYOUT)
const SERVICE_META: Record<Service, { name: string; code: string; className: string }> = {
  cinematography: { name: 'Cinematography', code: 'WIDE', className: 'svc-cine' },
  editing: { name: 'Video Editing', code: 'CUT', className: 'svc-edit' },
  brand: { name: 'Brand Building', code: 'ID', className: 'svc-brand' },
  design: { name: 'Graphic Design', code: 'LAYOUT', className: 'svc-design' },
  photography: { name: 'Photography', code: 'FRAME', className: 'svc-photo' },
};

// NOTE: `service` values are my best guess from each label/title —
// please double-check these against the actual work before launch.
const PROJECTS: Project[] = [
  { category: 'fashion', service: 'cinematography', label: 'Product Reel', title: 'Amarkosh', video: '/video/jewelery.mp4', poster: '', posterFrame: 24 },
  { category: 'fashion', service: 'cinematography', label: 'Lookbook', title: 'Siesta O\'Clock', video: '/video/whitedress.mp4', poster: '', posterFrame: 230 },
  { category: 'fashion', service: 'brand', label: 'Brand Identity', title: 'Linetribe', video: '/video/delhi_6.mp4', poster: '', posterFrame: 500 },

  { category: 'fashion', service: 'photography', label: 'Product', title: 'Jewelry Product 01', photo: '/photos/jewelry3.jpg', alt: 'Jewelry product photograph' },
  { category: 'fashion', service: 'photography', label: 'Product', title: 'Jewelry Product 02', photo: '/photos/jewelry2.jpg', alt: 'Jewelry product photograph' },
  { category: 'fashion', service: 'photography', label: 'Product', title: 'Jewelry Product 03', photo: '/photos/jewelry1.jpg', alt: 'Jewelry product photograph' },

  { category: 'fnb', service: 'editing', label: 'Reel', title: 'The 1970 Shop', video: '/video/storytelling01.mp4', poster: '', posterFrame: 1 },
  { category: 'fnb', service: 'brand', label: 'Launch Campaign', title: 'Dandelions', video: '/video/dandelions.mp4', poster: '', posterFrame: 34 },
  { category: 'fnb', service: 'cinematography', label: 'Process', title: 'The 1970 Shop', video: '/video/besanladdooprocess.mp4', poster: '', posterFrame: 45 },

  { category: 'automobile', service: 'cinematography', label: 'Product Film', title: 'Saera', video: '/video/productfilm.mp4', poster: '', posterFrame: 31 * 30 },
  { category: 'automobile', service: 'cinematography', label: 'Product Reel', title: 'Royal Enfield', video: '/video/interceptor650.mp4', poster: '', posterFrame: 23 },
  { category: 'automobile', service: 'editing', label: 'Workshop Reel', title: 'n1 car detailing', video: '/video/n1cardetailing.mp4', poster: '', posterFrame: 80 * 30 },

  { category: 'realestate', service: 'cinematography', label: 'Property Walkthrough', title: 'Aramghar', video: '/video/aramgarhstay.mp4', poster: '', posterFrame: 45 },
  { category: 'realestate', service: 'brand', label: 'Marketing Suite', title: 'aaramghar stays', video: '/video/getaway.mp4', poster: '', posterFrame: 45 },
  { category: 'realestate', service: 'cinematography', label: 'Aerial Reel', title: 'Aramghar', video: '/video/nilaya.mp4', poster: '', posterFrame: 45 },

  { category: 'realestate', service: 'photography', label: 'Property', title: 'Property Look 01', photo: '/photos/property1.JPG', alt: 'Real estate property photograph' },
  { category: 'realestate', service: 'photography', label: 'Property', title: 'Property Look 02', photo: '/photos/property2.jpg', alt: 'Real estate property photograph' },
  { category: 'realestate', service: 'photography', label: 'Property', title: 'Property Look 03', photo: '/photos/property3.png', alt: 'Real estate property photograph' },

  { category: 'events', service: 'brand', label: 'Brand Activation', title: 'Royal Enfield', video: '/video/hunteractivationm.mp4', poster: '', posterFrame: 45 },
  { category: 'events', service: 'editing', label: 'Highlight Reel', title: 'Samarpit Band', video: '/video/samarpitband.mp4', poster: '', posterFrame: 12 },
  { category: 'events', service: 'cinematography', label: 'Event Coverage', title: 'Kohler', video: '/video/kohlereventvideo.mp4', poster: '', posterFrame: 13 * 30 },

  // --- Migrated from Photography tab. Genre + title are best guesses from
  // filename/category only — real client names weren't available. Please
  // correct genre, title, and (if any are design pieces, not photos) service.
  { category: 'personalbranding', service: 'photography', label: 'Campaign', title: 'Shaam Ki Chai', photo: '/photos/auto.png', alt: 'Automobile campaign photograph' },
  { category: 'personalbranding', service: 'photography', label: 'Campaign', title: 'Shaam Ki Chai', photo: '/photos/talab.png', alt: 'Campaign photograph' },
  { category: 'personalbranding', service: 'photography', label: 'Campaign', title: 'Shaam Ki Chai', photo: '/photos/thoughtful.png', alt: 'Campaign photograph' },
  { category: 'personalbranding', service: 'photography', label: 'Lifestyle', title: 'UGC Lifestyle 01', photo: '/photos/ugc1.png', alt: 'Lifestyle UGC photograph' },
 // { category: 'fnb', service: 'photography', label: 'Product', title: 'Product Shot', photo: '/photos/prod.jpg', alt: 'Product photograph' },
  
  { category: 'personalbranding', service: 'photography', label: 'Lifestyle', title: 'Lifestyle Shot', photo: '/photos/placeholder-05.jpg', alt: 'Lifestyle photograph' },
  { category: 'personalbranding', service: 'photography', label: 'Lifestyle', title: 'UGC Lifestyle 02', photo: '/photos/ugc2.png', alt: 'Lifestyle UGC photograph' },
];

const CARD_TINTS: Record<Category, string> = {
  fashion: 'rgba(229,72,107,0.28)',
  fnb: 'rgba(242,167,27,0.28)',
  automobile: 'rgba(31,61,61,0.55)',
  realestate: 'rgba(110,138,166,0.28)',
  events: 'rgba(155,107,201,0.28)',
  personalbranding: 'rgba(169,139,79,0.28)',
};

export default function WorkFilter() {
  const [genreFilter, setGenreFilter] = useState<Category | 'all'>('all');
  const [serviceFilter, setServiceFilter] = useState<Service | 'all'>('all');
  const [openVideo, setOpenVideo] = useState<{ src: string; title: string; poster?: string } | null>(null);
  const [openPhoto, setOpenPhoto] = useState<{ src: string; alt: string } | null>(null);
  const [hideFilters, setHideFilters] = useState(false);

  // Pick up ?genre= and/or ?service= from the URL so links like
  // /work?service=photography land with the right filter already active.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get('service');
    const gen = params.get('genre');
    if (svc && Object.keys(SERVICE_META).includes(svc)) {
      setServiceFilter(svc as Service);
    }
    if (gen && Object.keys(CATEGORY_META).includes(gen)) {
      setGenreFilter(gen as Category);
    }
  }, []);

  // Collapse the filter bar on scroll-down, bring it back on scroll-up.
  // Stays visible near the top of the page so it doesn't flicker on landing.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const SHOW_NEAR_TOP = 80;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const goingDown = currentY > lastY;

        if (currentY < SHOW_NEAR_TOP) {
          setHideFilters(false);
        } else if (goingDown && currentY - lastY > 4) {
          setHideFilters(true);
        } else if (!goingDown && lastY - currentY > 4) {
          setHideFilters(false);
        }

        lastY = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (genreFilter === 'all' || p.category === genreFilter) &&
          (serviceFilter === 'all' || p.service === serviceFilter)
      ),
    [genreFilter, serviceFilter]
  );

  return (
    <>
      <section className={`filters ${hideFilters ? 'filters--hidden' : ''}`}>
        <div className="wrap">
          <div className="filter-row" role="group" aria-label="Filter work by category">
            <button
              className={`filter-btn ${genreFilter === 'all' ? 'active' : ''}`}
              onClick={() => setGenreFilter('all')}
            >
              All Work
            </button>
            {(Object.keys(CATEGORY_META) as Category[]).map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${CATEGORY_META[cat].className} ${genreFilter === cat ? 'active' : ''}`}
                onClick={() => setGenreFilter(cat)}
              >
                <span className="swatch"></span>
                {CATEGORY_META[cat].name}
              </button>
            ))}
          </div>

          <div className="filter-row filter-row--service mono" role="group" aria-label="Filter work by service">
            <button
              className={`filter-btn filter-btn--service ${serviceFilter === 'all' ? 'active' : ''}`}
              onClick={() => setServiceFilter('all')}
            >
              All Disciplines
            </button>
            {(Object.keys(SERVICE_META) as Service[]).map((svc) => (
              <button
                key={svc}
                className={`filter-btn filter-btn--service ${SERVICE_META[svc].className} ${serviceFilter === svc ? 'active' : ''}`}
                onClick={() => setServiceFilter(svc)}
              >
                <span className="svc-code">{SERVICE_META[svc].code}</span>
                {SERVICE_META[svc].name}
              </button>
            ))}
            <div className="filter-count mono">
              {visible.length} project{visible.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </section>

      <section className="grid-section">
        <div className="wrap">
          <div className="project-grid">
            {visible.map((p, i) => {
              const meta = CATEGORY_META[p.category];
              return p.video ? (
                <ProjectCard
                  key={`${p.category}-${p.service}-${i}`}
                  label={p.label}
                  title={p.title}
                  video={p.video}
                  poster={p.poster}
                  posterFrame={p.posterFrame}
                  catClassName={meta.className}
                  catName={meta.name}
                  cardTint={CARD_TINTS[p.category]}
                  onOpen={(src, title, poster) => setOpenVideo({ src, title, poster })}
                />
              ) : (
                <PhotoProjectCard
                  key={`${p.category}-${p.service}-${i}`}
                  label={p.label}
                  title={p.title}
                  photo={p.photo!}
                  alt={p.alt ?? p.title}
                  catClassName={meta.className}
                  catName={meta.name}
                  cardTint={CARD_TINTS[p.category]}
                  onOpen={(src, alt) => setOpenPhoto({ src, alt })}
                />
              );
            })}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">Nothing shot yet in this combo. Try loosening a filter.</div>
          )}
        </div>
      </section>

      {openVideo && (
        <VideoLightbox
          src={openVideo.src}
          title={openVideo.title}
          poster={openVideo.poster}
          onClose={() => setOpenVideo(null)}
        />
      )}

      {openPhoto && (
        <div className="lightbox-overlay" onClick={() => setOpenPhoto(null)}>
          <div className="lightbox-box photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <img src={openPhoto.src} alt={openPhoto.alt} />
            <button className="lightbox-close" onClick={() => setOpenPhoto(null)} aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </>
  );
}