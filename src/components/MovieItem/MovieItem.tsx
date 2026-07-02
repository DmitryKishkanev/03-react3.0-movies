import noImage from "@/assets/no-image.jpg";
import type { Movie } from "@/types/movie";
import css from "./MovieItem.module.css";

interface MovieItemProps {
  movie: Movie;
}

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <>
      <img
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : noImage
        }
        alt={movie.title}
        className={css.image}
      />
      <div className={css.content}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average}/10
        </p>
      </div>
    </>
  );
}
