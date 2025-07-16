import React from "react";
import MovieCard from "./MovieCard";

// MovieList renders a list of movies. If isTrending is true, shows index and uses $id as key.
function MovieList({ movies, isTrending }) {
  if (!movies || movies.length === 0) return null;
  console.log("isTrending value: ", isTrending);
  return (
    <ul className={isTrending ? "trending-list" : "movie-list"}>
      {movies.map((movie, index) => (
        isTrending ? (
          <li key={movie.$id} className="trending-item">
            <p>{index + 1}</p>
            {/* Only show poster and title for trending movies */}
            <div className="trending-movie">
              <img src={movie.poster_url} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          </li>
        ) : (
          <li key={movie.id} className="movie-item">
            <MovieCard movie={movie} />
          </li>
        )
      ))}
    </ul>
  );
}

export default MovieList; 