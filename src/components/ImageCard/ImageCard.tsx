import css from "./ImageCard.module.css";

interface ImageCardProps {
  pic: {
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
  };
  openModal: (imageUrl: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ pic, openModal }) => {
  const handleImageClick = () => {
    openModal(pic.urls.regular);
  };

  return (
    <div className={css.card}>
      <img
        src={pic.urls.small}
        alt={pic.alt_description}
        onClick={handleImageClick}
      />
    </div>
  );
};

export default ImageCard;
