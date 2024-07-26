import { useEffect, useState } from "react";

const KEY = "3645e995";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
    // handleCloseMovie();
  }, [query]);

  return { movies, error };
};
