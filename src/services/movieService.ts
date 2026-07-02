import axios from "axios";
import type { Movie } from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface FatchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
}

interface MoviesHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface FetchMoviesResult {
  page: number;
  movies: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(
  params: FatchMoviesParams,
): Promise<FetchMoviesResult> {
  try {
    const response = await axios.get<MoviesHttpResponse>(BASE_URL, {
      params,
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });

    const { page, results, total_pages, total_results } = response.data;

    return {
      movies: results,
      page,
      total_pages,
      total_results,
    };
  } catch (error) {
    console.error("Ошибка при получении фильмов:", error);
    throw error;
  }
}
