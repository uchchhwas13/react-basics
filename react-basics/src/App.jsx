import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieList from "./components/MovieList";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Main App component
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [deboundSearchTerm, setDebounceSearchTerm] = useState("");

  // Debounce search input
  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  // Fetch movies when search term changes
  useEffect(() => {
    fetchMovies(deboundSearchTerm);
  }, [deboundSearchTerm]);

  // Load trending movies on mount
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  // Fetch movies from TMDB API
  async function fetchMovies(query = "") {
    setIsLoading(true);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.error || "Failed to fetch movies");
        setMovies([]);
        return;
      }
      setMovies(data.results);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  // Load trending movies from Appwrite
  async function loadTrendingMovies() {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <div className="Pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2> Trending Movies</h2>
            <MovieList movies={trendingMovies} isTrending={true} />
          </section>
        )}
        <section className="all-movies">
          <h2 className="mt-[40px]"> All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <MovieList movies={movies} />
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
