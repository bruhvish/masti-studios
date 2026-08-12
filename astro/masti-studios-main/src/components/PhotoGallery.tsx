import { useState } from 'react';
import PhotoMasonry, { type Photo } from './PhotoMasonry';

// Drop files into /public/photos/ and update this list with your real photos.
const PHOTOS: Photo[] = [
  { src: '/photos/auto.png', alt: 'Photography sample 1', category: 'Campaign' },
  { src: '/photos/ugc1.png', alt: 'Photography sample 2', category: 'Lifestyle' },
  { src: '/photos/prod.jpg', alt: 'Photography sample 3', category: 'Product' },
  { src: '/photos/property1.JPG', alt: 'Photography sample 3', category: 'Property' },
  { src: '/photos/talab.png', alt: 'Photography sample 4', category: 'Campaign' },
  { src: '/photos/ugc2.png', alt: 'Photography sample 5', category: 'Lifestyle' },
  { src: '/photos/jewelry1.jpg', alt: 'Photography sample 6', category: 'Product' },
  { src: '/photos/property2.jpg', alt: 'Photography sample 3', category: 'Property' },
  { src: '/photos/thoughtful.png', alt: 'Photography sample 7', category: 'Campaign' },
  { src: '/photos/placeholder-05.jpg', alt: 'Photography sample 8', category: 'Lifestyle' },
  { src: '/photos/jewelry3.jpg', alt: 'Photography sample 6', category: 'Product' },
];

export default function PhotoGallery() {
  const [openPhoto, setOpenPhoto] = useState<Photo | null>(null);

  return (
    <section className="grid-section">
      <div className="wrap">
        <PhotoMasonry photos={PHOTOS} onOpen={setOpenPhoto} />
      </div>

      {openPhoto && (
        <div className="lightbox-overlay" onClick={() => setOpenPhoto(null)}>
          <div className="lightbox-box photo-lightbox-box" onClick={(e) => e.stopPropagation()}>
            <img src={openPhoto.src} alt={openPhoto.alt} />
            <button className="lightbox-close" onClick={() => setOpenPhoto(null)} aria-label="Close">✕</button>
          </div>
        </div>
      )}
    </section>
  );
}