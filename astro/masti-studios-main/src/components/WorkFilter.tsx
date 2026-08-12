import { useMemo, useState } from 'react';
import VideoLightbox from './VideoLightbox';
import ProjectCard from './ProjectCard';

type Category = 'fashion' | 'fnb' | 'automobile' | 'events' | 'realestate';

interface Project {
  category: Category;
  label: string;
  title: string;
  video?: string;
  // Leave blank to auto-use the video's first frame, or set a path from
  // /thumbnail-picker to override it, e.g. poster: '/video/royal-enfield-poster.jpg'
  poster?: string;
  posterFrame?: number;
}

const CATEGORY_META: Record<Category, { name: string; className: string }> = {
  fashion: { name: 'Fashion', className: 'cat-fashion' },
  fnb: { name: 'F&B', className: 'cat-fnb' },
  automobile: { name: 'Automobile', className: 'cat-automobile' },
  realestate: { name: 'Real Estate', className: 'cat-realestate' },
  events: { name: 'Events', className: 'cat-events' },
};

const PROJECTS: Project[] = [
  { category: 'fashion', label: 'Product Reel', title: 'Amarkosh', video: '/video/jewelery.mp4', poster: '', posterFrame: 24 },
  { category: 'fashion', label: 'Lookbook', title: 'Siesta O\'Clock', video: '/video/whitedress.mp4', poster: '', posterFrame: 230 },
  { category: 'fashion', label: 'Brand Identity', title: 'Linetribe', video: '/video/delhi_6.mp4', poster: '', posterFrame: 500},

  { category: 'fnb', label: 'Reel', title: 'The 1970 Shop', video: '/video/storytelling01.mp4', poster: '', posterFrame: 1 },
  { category: 'fnb', label: 'Launch Campaign', title: 'Dandelions', video: '/video/dandelions.mp4', poster: '', posterFrame: 34 },
  { category: 'fnb', label: 'Process', title: 'The 1970 Shop', video: '/video/besanladdooprocess.mp4', poster: '', posterFrame: 45 },

  { category: 'automobile', label: 'Product Film', title: 'Saera', video: '/video/productfilm.mp4', poster: '', posterFrame: 31*30 },
  { category: 'automobile', label: 'Product Reel', title: 'Royal Enfield', video: '/video/interceptor650.mp4', poster: '', posterFrame: 23},
  { category: 'automobile', label: 'Workshop Reel', title: 'n1 car detailing', video: '/video/n1cardetailing.mp4', poster: '', posterFrame: 80*30 },

  { category: 'realestate', label: 'Property Walkthrough', title: 'Aramghar', video: '/video/aramgarhstay.mp4', poster: '', posterFrame: 45 },
  { category: 'realestate', label: 'Marketing Suite', title: 'aaramghar stays', video: '/video/getaway.mp4', poster: '', posterFrame: 45 },
  { category: 'realestate', label: 'Aerial Reel', title: 'Aramghar', video: '/video/nilaya.mp4', poster: '', posterFrame: 45 },

  { category: 'events', label: 'Brand Activation', title: 'Royal Enfield', video: '/video/hunteractivationm.mp4', poster: '', posterFrame: 45 },
  { category: 'events', label: 'Highlight Reel', title: 'Samarpit Band', video: '/video/samarpitband.mp4', poster: '', posterFrame: 12},
  { category: 'events', label: 'Event Coverage', title: 'Kohler', video: '/video/kohlereventvideo.mp4', poster: '', posterFrame: 13*30 },
];

const CARD_TINTS: Record<Category, string> = {
  fashion: 'rgba(229,72,107,0.28)',
  fnb: 'rgba(242,167,27,0.28)',
  automobile: 'rgba(31,61,61,0.55)',
  realestate: 'rgba(110,138,166,0.28)',
  events: 'rgba(155,107,201,0.28)',
};

export default function WorkFilter() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [openVideo, setOpenVideo] = useState<{ src: string; title: string; poster?: string } | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <section className="filters">
        <div className="wrap">
          <div className="filter-row" role="group" aria-label="Filter work by category">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Work
            </button>
            {(Object.keys(CATEGORY_META) as Category[]).map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${CATEGORY_META[cat].className} ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                <span className="swatch"></span>
                {CATEGORY_META[cat].name}
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
              return (
                <ProjectCard
                  key={`${p.category}-${i}`}
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
              );
            })}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">No projects in this category yet.</div>
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
    </>
  );
}