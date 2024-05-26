import { useEffect, useState } from "react";
import "./App.css";
import { fetchImages, FetchImagesResponse } from "./pictures-api";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoadMore from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [pics, setPics] = useState<FetchImagesResponse["results"]>([]);
  //add spinner
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //error tate
  const [error, setError] = useState<boolean>(false);
  //saving current query
  const [query, setQuery] = useState<string>("");
  // page state
  const [page, setPage] = useState<number>(1);
  // modal states
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>("");
  // end of collection
  const [endOfCollection, setEndOfCollection] = useState<boolean>(false);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);

  const openModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (newQuery: string) => {
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
