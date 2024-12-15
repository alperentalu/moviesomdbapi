import { useQuery } from "react-query";
import axios from "axios";

const API_BASE_URL = "https://www.omdbapi.com/";

const fetchMovies = async (
  search: string,
  page: number,
  type?: string,
  year?: string
) => {
  const params: { [key: string]: string | number } = {
    s: search,
    page: page,
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  };

  if (type && type !== "all") {
    params.type = type;
  }

  if (year && year !== "all") {
    params.y = year;
  }

  const { data } = await axios.get(API_BASE_URL, { params });

  if (data.Response === "False") {
    throw new Error(data.Error || "Unknown error occurred.");
  }

  return data;
};

// useMovies Hook'u
export const useMovies = (
  search: string,
  page: number,
  type?: string,
  year?: string
) => {
  return useQuery(
    ["movies", search, page, type, year],
    () => fetchMovies(search, page, type, year),
    {
      keepPreviousData: true, 
      retry: false,
    }
  );
};
