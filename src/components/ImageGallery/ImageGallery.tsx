import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  pics: Image[];
  openModal: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ pics, openModal }) => {
  return (
    <ul className={css.container}>
      {pics.map((pic) => (
        <li className={css.img} key={pic.id}>
          <ImageCard pic={pic} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
