export interface Photo {
  src: string;
  alt: string;
  category?: string;
}

interface PhotoMasonryProps {
  photos: Photo[];
  onOpen?: (photo: Photo) => void;
}

export default function PhotoMasonry({ photos, onOpen }: PhotoMasonryProps) {
  return (
    <div className="photo-masonry">
      {photos.map((p, i) => (
        <div
          className="photo-cell"
          key={i}
          onClick={() => onOpen?.(p)}
          role={onOpen ? 'button' : undefined}
          tabIndex={onOpen ? 0 : undefined}
        >
          <img src={p.src} alt={p.alt} loading="lazy" />
          {p.category && <span className="photo-cat mono">{p.category}</span>}
        </div>
      ))}
    </div>
  );
}