import { useEffect, useState } from "react";
import "./App.css";
import { fetchImages } from "./pictures-api";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoadMore from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [pics, setPics] = useState([]);
  //add spinner
  const [isLoading, setIsLoading] = useState(false);
  //error tate
  const [error, setError] = useState(false);
  //saving current query
  const [query, setQuery] = useState("");
  // page state
  const [page, setPage] = useState(1);
  // modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  // end of collection
  const [endOfCollection, setEndOfCollection] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const openModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setPics([]);
    setEndOfCollection(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    //if no query
    if (!query) {
      return;
    }
    //http request continue
    async function getImages() {
      try {
        setIsLoading(true);
        const data = await fetchImages(query, page);
        if (data.results.length === 0) {
          setEndOfCollection(true);
          setShowLoadMore(false);
        } else {
          setPics((prevPics) => [...prevPics, ...data.results]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error && (
        <ErrorMessage
          message={"Failed to load images. Please try again later."}
        />
      )}
      {pics.length > 0 && <ImageGallery pics={pics} openModal={openModal} />}
      {showLoadMore && pics.length > 0 && <LoadMore onClick={handleLoadMore} />}
      {isLoading && <Loader isLoading={isLoading} />}
      <ImageModal
        isOpen={modalIsOpen}
        imageUrl={modalImageUrl}
        onRequestClose={closeModal}
      />
      {endOfCollection && <p>No more images available.</p>}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
