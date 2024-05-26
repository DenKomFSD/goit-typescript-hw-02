import css from "./LoadMoreBtn.module.css";

export default function LoadMore({ onClick }) {
  return (
    <>
      <button className={css.loadbtn} onClick={onClick}>
        Load More
      </button>
    </>
  );
}
