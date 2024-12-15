import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMovieContext } from '../context/MovieContext';
import { useFetchMovieDetail } from '../hooks/useMovieDetail';
import { CircularProgress } from "@mui/material";

const MovieDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imdbID: globalImdbID } = useMovieContext();

    const queryParams = new URLSearchParams(location.search);
    const queryImdbID = queryParams.get("imdbID");

    const imdbID = queryImdbID || globalImdbID;

    const { data, isLoading, isError, error } = useFetchMovieDetail(imdbID);

    if (!imdbID) {
        return <p>Error: No IMDB ID provided</p>;
    }

    if (isLoading) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress size={100} />
        </div>;
    }

    if (isError) {
        return <p>Error: {(error as Error).message}</p>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.homeIcon} onClick={() => navigate("/")}>
                🏠
            </div>

            <div style={styles.card}>
                {data && (
                    <div style={styles.cardContent}>
                        <img src={data.Poster} alt={data.Title} style={styles.poster} />

                        <div style={styles.details}>
                            <h2 style={styles.title}>
                                {data.Title} ({data.Year})
                            </h2>
                            <p>
                                <strong>Director:</strong> {data.Director}
                            </p>
                            <p>
                                <strong>Plot:</strong> {data.Plot}
                            </p>
                            <p>
                                <strong>Genre:</strong> {data.Genre}
                            </p>
                            <p>
                                <strong>IMDB Rating:</strong> {data.imdbRating}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// CSS-in-JS styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        // padding: "20px",
        fontFamily: "Arial, sans-serif",
        position: "relative" as const,
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    },
    homeIcon: {
        position: "absolute" as const,
        top: "10px",
        left: "10px",
        fontSize: "50px",
        cursor: "pointer",
    },
    card: {
        display: "flex",
        flexDirection: "column" as const,
        maxWidth: "800px",
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "20px",
    },
    cardContent: {
        display: "flex",
        flexDirection: "row" as const,
        padding: "20px",
        gap: "20px",
    },
    poster: {
        width: "200px",
        borderRadius: "5px",
        objectFit: "cover" as const,
    },
    details: {
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "space-between",
    },
    title: {
        margin: "0 0 10px 0",
    },
};

export default MovieDetail;


