import { IoIosSearch } from "react-icons/io";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = form.query.value.trim();

    if (!value) {
      toast.error("Your search term is empty", {
        style: {
          color: "#ffffff",
          backgroundColor: "red",
        },
      });
      return;
    }
    onSubmit(value);
    // form.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.formik} onSubmit={onSearch}>
        <input
          className={css.inputs}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.btn} type="submit">
          <IoIosSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
