import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import type { Movie } from "@/types/movie";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import MovieModal from "@/components/MovieModal";
import MovieItem from "@/components/MovieItem";
import fetchMovies from "@/services";
import css from "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const data = await fetchMovies({ query: query });
      if (data.movies.length === 0) {
        toast("No movies found for your request", {
          style: {
            background: "#a20e0e",
            color: "#fff",
          },
        });
      }
      setMovies(data.movies);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
      setIsError(true);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader message="Loading movies, please wait..." />}

      {isError && (
        <ErrorMessage message="There was an error, please try again..." />
      )}

      {movies && <MovieGrid movies={movies} onSelect={handleSelect} />}

      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal}>
          <MovieItem movie={selectedMovie} />
        </MovieModal>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
