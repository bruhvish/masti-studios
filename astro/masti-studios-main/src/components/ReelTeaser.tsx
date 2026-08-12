import { useState } from 'react';
import VideoLightbox from './VideoLightbox';
import ReelCard from './ReelCard';

const CELLS = [
  { client: 'Royal Enfield', project: 'Himalayan Knot', type: 'Film', year: '2025', video: '/video/himalayanknot.mp4', poster: '', posterFrame: 68 },
  { client: 'The 1970 Shop', project: 'News Teaser', type: 'Social', year: '2025', video: '/video/newsteaser2.mp4', poster: '', posterFrame: 125 },
  { client: 'Sufi Sisters', project: 'Dama Dam', type: 'Brand', year: '2024', video: '/video/DamaDamVideo01.mp4', poster: '', posterFrame: 5 },
  { client: "Siesta O'clock", project: 'Backyard', type: 'Edit', year: '2024', video: '/video/amitbackyard.mp4', poster: '', posterFrame: 5 },
];

export default function ReelTeaser() {
  const [openVideo, setOpenVideo] = useState<{ src: string; title: string; poster?: string } | null>(null);

  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="work-head">
          <div>
            <div className="section-eyebrow">Showreel / Recent Takes</div>
            <h2>Selected chaos.</h2>
            <p className="work-sub">The work we're currently allowing out in public.</p>
          </div>
          <a href="/work" className="btn-ghost">View all work →</a>
        </div>
        <div className="reel-grid reel-grid-irregular">
          {CELLS.map((c, i) => (
            <ReelCard
              key={i}
              index={i}
              client={c.client}
              project={c.project}
              type={c.type}
              year={c.year}
              video={c.video}
              poster={c.poster}
              posterFrame={c.posterFrame}
              onOpen={(src, title, poster) => setOpenVideo({ src, title, poster })}
            />
          ))}
        </div>
      </div>

      {openVideo && (
        <VideoLightbox
          src={openVideo.src}
          title={openVideo.title}
          poster={openVideo.poster}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </section>
  );
}