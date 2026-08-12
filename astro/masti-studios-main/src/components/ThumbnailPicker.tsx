import { useRef, useState } from 'react';

export default function ThumbnailPicker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [fps, setFps] = useState(30);
  const [frameInput, setFrameInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoUrl(URL.createObjectURL(file));
    setPreviewUrl(null);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    setTime(t);
    if (videoRef.current) videoRef.current.currentTime = t;
  };

  const jumpToFrame = () => {
    const frame = Number(frameInput);
    if (!frame && frame !== 0) return;
    const t = frame / fps;
    setTime(t);
    if (videoRef.current) videoRef.current.currentTime = t;
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPreviewUrl(canvas.toDataURL('image/jpeg', 0.9));
  };

  const downloadFrame = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = 'thumbnail.jpg';
    a.click();
  };

  const currentFrame = Math.round(time * fps);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px', fontFamily: 'sans-serif', color: 'var(--paper)' }}>
      <h1 style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontSize: 40, textTransform: 'uppercase', marginBottom: 8 }}>
        Thumbnail Picker
      </h1>
      <p style={{ color: 'var(--paper-dim)', marginBottom: 28, fontSize: 15 }}>
        Load a video, jump to an exact frame number (or scrub by hand), capture it,
        then download the image and drop it into <code>public/video/</code> alongside your clips.
      </p>

      <input type="file" accept="video/*" onChange={handleFile} style={{ marginBottom: 20, color: 'var(--paper)' }} />

      {videoUrl && (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            style={{ width: '100%', borderRadius: 6, background: '#000' }}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          />

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={time}
            onChange={handleSeek}
            style={{ width: '100%', marginTop: 16 }}
          />
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--paper-dim)', marginBottom: 24 }}>
            {time.toFixed(2)}s / {duration.toFixed(2)}s &nbsp;·&nbsp; frame ~{currentFrame}
          </div>

          <div
            style={{
              display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 24,
              padding: 16, border: '1px solid var(--ink-line)', borderRadius: 6,
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--paper-dim)', marginBottom: 6 }}>
                Frame rate (fps)
              </label>
              <input
                type="number"
                value={fps}
                onChange={(e) => setFps(Number(e.target.value) || 30)}
                style={{ width: 80, padding: 8, background: 'var(--ink-soft)', color: 'var(--paper)', border: '1px solid var(--ink-line)', borderRadius: 4 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'var(--paper-dim)', marginBottom: 6 }}>
                Frame number
              </label>
              <input
                type="number"
                value={frameInput}
                onChange={(e) => setFrameInput(e.target.value)}
                placeholder="e.g. 120"
                style={{ width: 120, padding: 8, background: 'var(--ink-soft)', color: 'var(--paper)', border: '1px solid var(--ink-line)', borderRadius: 4 }}
              />
            </div>
            <button
              onClick={jumpToFrame}
              style={{
                padding: '9px 18px', background: 'transparent', color: 'var(--paper)',
                border: '1px solid var(--paper-dim)', borderRadius: 4, cursor: 'pointer', fontWeight: 600,
              }}
            >
              Jump to frame
            </button>
          </div>

          <button
            onClick={captureFrame}
            style={{
              padding: '12px 22px', background: 'var(--coral)', color: 'var(--ink)',
              border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, marginRight: 12,
            }}
          >
            Capture this frame
          </button>

          {previewUrl && (
            <button
              onClick={downloadFrame}
              style={{
                padding: '12px 22px', background: 'transparent', color: 'var(--paper)',
                border: '1px solid var(--paper-dim)', borderRadius: 4, cursor: 'pointer', fontWeight: 600,
              }}
            >
              Download thumbnail.jpg
            </button>
          )}

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {previewUrl && (
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 13, color: 'var(--paper-dim)', marginBottom: 8 }}>Preview:</p>
              <img src={previewUrl} style={{ maxWidth: '100%', borderRadius: 6, border: '1px solid var(--ink-line)' }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}