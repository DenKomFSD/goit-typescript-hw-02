import css from "./ImageCard.module.css";

export default function ImageCard({ pic, openModal }) {
  const handleClick = () => {
    openModal(pic.urls.regular);
  };
  return (
    <>
      <div className={css.img} onClick={handleClick}>
        <img src={pic.urls.small} alt={pic.alt_description} />
      </div>
    </>
  );
}
