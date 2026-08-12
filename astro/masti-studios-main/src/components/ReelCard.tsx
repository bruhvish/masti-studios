import { useRef, useState } from 'react';
import { useFirstFramePoster } from '../hooks/useFirstFramePoster';

interface ReelCardProps {
  index: number;
  client: string;
  project: string;
  type: string;
  year: string;
  video?: string;
  poster?: string;
  posterFrame?: number;
  posterFps?: number;
  onOpen: (src: string, title: string, poster?: string) => void;
}

export default function ReelCard({ index, client, project, type, year, video, poster, posterFrame, posterFps, onOpen }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const resolvedPoster = useFirstFramePoster(video, poster, posterFrame ?? 5, posterFps ?? 30);

  const handleEnter = () => {
    setHovering(true);
    videoRef.current?.play().catch((error) => {
  console.error('Video playback failed:', error);
});
  };

  const handleLeave = () => {
    setHovering(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
      className={`reel-cell reel-cell-${index % 3} ${video ? 'has-video' : ''}`}
      onMouseEnter={() => video && handleEnter()}
      onMouseLeave={() => video && handleLeave()}
      onClick={() => video && onOpen(video, project, resolvedPoster || undefined)}
      role={video ? 'button' : undefined}
      tabIndex={video ? 0 : undefined}
    >
      {video && resolvedPoster && (
        <img
          className="reel-poster"
          src={resolvedPoster}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
      )}
      {video && (
        <video
          ref={videoRef}
          className="reel-video"
          src={video}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            opacity: hovering ? 1 : 0,
            transition: 'opacity .25s ease',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        />
      )}

      <div className="rlabel mono">{client}</div>
      <div className="rtitle">{project}</div>
      <div className="rmeta mono">"{type.toUpperCase()}" / {year}</div>

      <div className="rhover mono">
        {video ? 'PLAY ▶' : 'VIEW →'}
      </div>
    </div>
  );
}