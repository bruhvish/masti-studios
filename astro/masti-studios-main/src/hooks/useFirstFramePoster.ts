import { useEffect, useState } from 'react';

// Grabs a specific frame from a video and returns it as a data URL, to use as
// an automatic thumbnail when no manual `poster` image has been set.
// `frame` is the frame number (e.g. 30), `fps` is the video's frame rate (default 30).
export function useFirstFramePoster(
  src: string | undefined,
  explicitPoster?: string,
  frame: number = 5,
  fps: number = 24
) {
  const [autoPoster, setAutoPoster] = useState<string | null>(null);

  useEffect(() => {
    if (!src || explicitPoster) {
      setAutoPoster(null);
      return;
    }

    let cancelled = false;
    const vid = document.createElement('video');
    vid.src = src;
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'auto';

    const targetTime = frame / fps;

    const capture = () => {
      if (cancelled || !vid.videoWidth) return;
      const canvas = document.createElement('canvas');
      canvas.width = vid.videoWidth;
      canvas.height = vid.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
      setAutoPoster(canvas.toDataURL('image/jpeg', 0.82));
    };

    const onLoadedData = () => {
      try {
        vid.currentTime = targetTime;
      } catch {
        capture();
      }
    };

    vid.addEventListener('loadeddata', onLoadedData);
    vid.addEventListener('seeked', capture);
    vid.load();

    return () => {
      cancelled = true;
      vid.removeEventListener('loadeddata', onLoadedData);
      vid.removeEventListener('seeked', capture);
      vid.src = '';
    };
  }, [src, explicitPoster, frame, fps]);

  return explicitPoster || autoPoster;
}