import PhotoMasonry, { type Photo } from './PhotoMasonry';

// Drop files into /public/photos/ and update the paths below.
const PHOTOS: Photo[] = [
   { src: '/photos/jewelry1.jpg', alt: 'Photography sample 1',},
  { src: '/photos/jewelry3.jpg', alt: 'Photography sample 2',},
  { src: '/photos/jewelry2.jpg', alt: 'Photography sample 3',},
  { src: '/photos/ugc2.png', alt: 'Photography sample 4',},
  { src: '/photos/placeholder-05.jpg', alt: 'Photography sample 5',},
  { src: '/photos/ugc1.png', alt: 'Photography sample 6',},
  { src: '/photos/placeholder-06.jpg', alt: 'Photography sample 7',},
  { src: '/photos/placeholder-04.jpg', alt: 'Photography sample 8', },
  { src: '/photos/fingerprint-final.png', alt: 'Photography sample 9', },
  { src: '/photos/plant-necklace.png', alt: 'Photography sample 10', },
  { src: '/photos/property1.JPG', alt: 'Photography sample 11', },
  { src: '/photos/property2.jpg', alt: 'Photography sample 12', },
  { src: '/photos/talab.png', alt: 'Photography sample 13', },
];

export default function PhotoTeaser() {
  return (
    <section className="photo-teaser" id="photography">
      <div className="wrap">
        <div className="work-head">
          <div>
            <div className="section-eyebrow">Photography</div>
            <h2>Stills, too.</h2>
          </div>
          <a href="/photography" className="btn-ghost">View full gallery →</a>
        </div>
        <PhotoMasonry photos={PHOTOS} />
      </div>
    </section>
  );
}