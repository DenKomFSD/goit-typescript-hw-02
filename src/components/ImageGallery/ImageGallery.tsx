import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ pics, openModal }) {
  return (
    <>
      <ul className={css.container}>
        {pics.map((pic) => {
          return (
            <li className={css.img} key={pic.id}>
              <ImageCard className={css.img2} pic={pic} openModal={openModal} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
