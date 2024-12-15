import { useQuery } from "react-query";
import axios from "axios";

const API_BASE_URL = "https://www.omdbapi.com/";

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const fetchMovieDetail = async (imdbID: string) => {
  const params = {
    i: imdbID,
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  };

  const { data } = await axios.get<MovieDetail>(API_BASE_URL, { params });

  if (data.Response === "False") {
    throw new Error("Movie not found.");
  }

  return data;
};

// useFetchMovieDetail Hook
export const useFetchMovieDetail = (imdbID: string | null) => {
  return useQuery<MovieDetail, Error>(
    ["movieDetail", imdbID],
    () => {
      if (!imdbID) throw new Error("IMDB ID is required");
      return fetchMovieDetail(imdbID);
    },
    {
      enabled: !!imdbID,
      retry: false,
    }
  );
};
