import React, { useState } from "react";
import { useMovies } from "../hooks/useMovies"; // Hook'un doğru yolu
import {
  TextField,
  Typography,
  CircularProgress,
  Button,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import "../styles/MoviesList.scss";
import placeholderImage from "../assets/placeholder.webp";
import back from "../assets/back.png"
import next from "../assets/next.png"
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";

const MoviesList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("Pokemon");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [type, setType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { setImdbID } = useMovieContext();
  const [submittedFilters, setSubmittedFilters] = useState({
    query: "Pokemon",
    type: "all",
    year: "",
  });

  const { data, isLoading, isError, error, isFetching } = useMovies(
    submittedFilters.query,
    currentPage,
    submittedFilters.type,
    submittedFilters.year
  );

  const handleNavigate = (id: string) => {
    setImdbID(id);
    navigate(`/moviedetail?imdbID=${id}`);
  };
  const validateYear = (year: string): string => {
    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(year)) {
      return "Year must be a 4-digit number.";
    }
    const numericYear = parseInt(year, 10);
    if (numericYear < 1895 || numericYear > currentYear) {
      return `Year must be between 1895 and ${currentYear}.`;
    }
    return "";
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setYear(value);
    if (value !== "") {
      setYearError(validateYear(value));
    } else {
      setYearError("")
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

  const handleSubmit = () => {
    if (validateYear(year) && year !== "") {
      return;
    }
    setSubmittedFilters({
      query: searchQuery,
      type,
      year,
    });
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (data && currentPage < Math.ceil(data.totalResults / 10)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="movies-list">
      <div className="search-section">
        <Box sx={{
          display: "flex", gap: 2, marginBottom: 2, zIndex: 3,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <TextField
            // fullWidth
            variant="outlined"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <TextField
            // fullWidth
            variant="outlined"
            placeholder="Enter a year..."
            value={year}
            onChange={handleYearChange}
            error={!!yearError}
          />
          <Select
            value={type}
            onChange={handleTypeChange}
            displayEmpty
          // fullWidth
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="movie">Movies</MenuItem>
            <MenuItem value="series">Series</MenuItem>
            <MenuItem value="episode">Episodes</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleSubmit} disabled={!!yearError}>
            Search
          </Button>
        </Box>
        <div className="pagination-container">
          <div>
            Page {currentPage} of {Math.ceil(data?.totalResults / 10)} - Total Results: {data?.totalResults}
          </div>
          <div className="back-page-button" onClick={handlePrevPage}>
            <img
              src={back}
              alt={"back-icon"}
              className="pagination-icon"
              style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
            />
          </div>
          <div className="next-page-button" onClick={handleNextPage}>
            <img
              src={next}
              alt={"next-icon"}
              className="pagination-icon"
              style={{ opacity: data && currentPage >= Math.ceil(data.totalResults / 10) ? 0.5 : 1, cursor: data && currentPage >= Math.ceil(data.totalResults / 10) ? "not-allowed" : "pointer" }}
            />
          </div>
        </div>
      </div>
      {isLoading || isFetching ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress size={100} />
        </div>
      ) : isError ? (
        <Typography color="error">{(error as Error).message}</Typography>
      ) : (
        <div className="movie-container" >
          {data?.Search?.map((movie: any) => (
            <div onClick={() => handleNavigate(movie.imdbID)} key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-details">
                <Typography variant="h6">{movie.Title}</Typography>
                <Typography sx={{ color: "#fff" }} variant="body2" color="text.secondary">
                  {movie.Year}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesList;