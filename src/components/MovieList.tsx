// components/MovieList.tsx
"use client";
import { FC } from "react";

import { Movie } from "@/types/Movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  title: string;
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const MovieList: FC<MovieListProps> = ({ title, movies, onMovieSelect }) => {
  return (
    <section className="mb-5">
      <div className="d-flex align-items-center justify-content-between px-2 mb-3">
        <h2 className="text-2xl font-semibold m-0">{title}</h2>
        <a href="#" className="text-primary small fw-semibold">See All</a>
      </div>
      <div className="movie-scroll-row d-flex flex-row overflow-auto pb-2" style={{gap: '1.5rem'}}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ minWidth: 220, flex: '0 0 auto' }}>
            <MovieCard movie={movie} onPlay={onMovieSelect} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
