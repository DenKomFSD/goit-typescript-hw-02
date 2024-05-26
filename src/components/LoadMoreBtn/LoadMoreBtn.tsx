import css from "./LoadMoreBtn.module.css";
interface LoadMoreProps {
  onClick: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => {
  return (
    <>
      <button className={css.loadbtn} onClick={onClick}>
        Load More
      </button>
    </>
  );
};

export default LoadMore;
