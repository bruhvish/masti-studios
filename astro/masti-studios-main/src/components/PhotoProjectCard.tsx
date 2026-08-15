interface PhotoProjectCardProps {
  label: string;
  title: string;
  photo: string;
  alt: string;
  catClassName: string;
  catName: string;
  cardTint: string;
  onOpen: (src: string, alt: string) => void;
}

export default function PhotoProjectCard({
  label, title, photo, alt, catClassName, catName, cardTint, onOpen,
}: PhotoProjectCardProps) {
  return (
    <div
      className="project-card project-card--photo"
      style={{ ['--card-a' as any]: cardTint }}
      onClick={() => onOpen(photo, alt)}
      role="button"
      tabIndex={0}
    >
      <img
        className="project-photo"
        src={photo}
        alt={alt}
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div className={`project-cat ${catClassName}`}>
        <span className="swatch"></span>
        {catName}
      </div>
      <div className="project-expand" aria-hidden="true">⤢</div>
      <div className="project-client mono">{label}</div>
      <div className="project-title">{title}</div>
    </div>
  );
}