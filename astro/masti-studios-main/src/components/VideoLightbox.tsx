import { useEffect } from 'react';

interface VideoLightboxProps {
  src: string;
  title: string;
  poster?: string;
  onClose: () => void;
}

function isEmbed(src: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(src);
}

function toEmbedUrl(src: string) {
  const yt = src.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = src.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return src;
}

export default function VideoLightbox({ src, title, poster, onClose }: VideoLightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const embed = isEmbed(src);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close video">
          ✕
        </button>
        {embed ? (
          <iframe
            src={toEmbedUrl(src)}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={src} poster={poster || undefined} controls autoPlay playsInline />
        )}
      </div>
    </div>
  );
}