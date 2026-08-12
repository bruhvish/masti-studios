import { useRef, useState } from 'react';
import { useFirstFramePoster } from '../hooks/useFirstFramePoster';

interface ProjectCardProps {
  label: string;
  title: string;
  video?: string;
  poster?: string;
  posterFrame?: number;
  posterFps?: number;
  catClassName: string;
  catName: string;
  cardTint: string;
  onOpen: (src: string, title: string, poster?: string) => void;
}

export default function ProjectCard({
  label, title, video, poster, posterFrame, posterFps, catClassName, catName, cardTint, onOpen,
}: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const resolvedPoster = useFirstFramePoster(video, poster, posterFrame ?? 5, posterFps ?? 30);

  const handleEnter = () => {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
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
      className={`project-card ${video ? 'has-video' : ''}`}
      style={{ ['--card-a' as any]: cardTint }}
      onMouseEnter={() => video && handleEnter()}
      onMouseLeave={() => video && handleLeave()}
      onClick={() => video && onOpen(video, title, resolvedPoster || undefined)}
      role={video ? 'button' : undefined}
      tabIndex={video ? 0 : undefined}
    >
      {video && resolvedPoster && (
        <img
          className="project-poster"
          src={resolvedPoster}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
      )}
      {video && (
        <video
          ref={videoRef}
          className="project-video"
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
      <div className={`project-cat ${catClassName}`}>
        <span className="swatch"></span>
        {catName}
      </div>
      <div className="project-play">▸</div>
      <div className="project-client mono">{label}</div>
      <div className="project-title">{title}</div>
    </div>
  );
}