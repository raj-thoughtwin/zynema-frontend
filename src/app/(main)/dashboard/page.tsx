"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MovieList from "@/components/MovieList";
import { useState } from "react";
import { Movie } from "@/types/Movie";
import { useLoader } from "@/utils/LoaderContext";

interface MovieApiResponse {
  [category: string]: Movie[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { loading, setLoading } = useLoader();

  const [moviesByCategory, setMoviesByCategory] = useState<MovieApiResponse>(
    {}
  );
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  const [error, setError] = useState<string | null>(null);
  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BACKEND_BASE_URL}/api/videos`);
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        console.log('data',data)
        // Transform flat array into grouped object by category
        const grouped: { [category: string]: Movie[] } = {};
        let firstMovie: Movie | null = null;
        const videos = Array.isArray(data.videos) ? data.videos : [];
        for (const movie of videos) {
          const category = movie.category || "Uncategorized";
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push({ ...movie, category });
          if (!firstMovie) firstMovie = { ...movie, category };
        }
        setMoviesByCategory(grouped);
        setFeaturedMovie(firstMovie);
      } catch (err: any) {
        setError(err.message || "Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [router]);

  const handleMovieSelect = (movie: Movie) => {
    router.push(`/watch/${movie.id}`);
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      {/* Hero Banner */}
      <section
        className="position-relative"
        style={{ height: "80vh", overflow: "hidden" }}
      >
        {featuredMovie ? (
          <>
            {/* Full-size video player as hero background */}
            {(featuredMovie.url || featuredMovie.id) ? (
              <>
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
                  <video
                    className="w-100 h-100 object-fit-cover"
                    src={featuredMovie.url || `${BACKEND_BASE_URL}/api/videos/stream/${featuredMovie.id}`}
                    poster={featuredMovie.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                  {/* Optional dark overlay for readability */}
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.7) 100%)', zIndex: 2 }} />
                  {/* Centered Play Button Overlay */}
                  <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 3 }}>
                    <button
                      className="btn btn-danger btn-lg rounded-circle shadow-lg"
                      style={{ width: 80, height: 80, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.92 }}
                      onClick={() => {
                        const video = document.querySelector('.hero-video') as HTMLVideoElement;
                        if (video) video.play();
                      }}
                    >
                      <i className="bi bi-play-fill"></i>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <img
                src={
                  featuredMovie.poster || "https://via.placeholder.com/1500x800"
                }
                alt={featuredMovie.title}
                className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover animate__animated animate__fadeIn animate__faster"
                style={{ objectPosition: "top", zIndex: 1 }}
              />
            )}
            {/* Overlay movie info and controls */}
            <div className="position-absolute bottom-0 start-0 text-white p-5 z-3" style={{ zIndex: 3, width: '100%', maxWidth: 900 }}>
              <h1 className="display-3 fw-bold mb-3" style={{ textShadow: '0 2px 16px #000' }}>{featuredMovie.title}</h1>
              <p className="lead text-secondary mb-4" style={{ fontSize: 18, lineHeight: 1.3, maxWidth: 600 }}>
                {(() => {
                  const desc = featuredMovie.description || featuredMovie.plot || "No description available.";
                  return desc.length > 130 ? desc.slice(0, 127) + '...' : desc;
                })()}
              </p>
              <div className="d-flex gap-3">
                <button
                  className="btn btn-danger btn-lg"
                  onClick={() => handleMovieSelect(featuredMovie)}
                >
                  ▶ Play
                </button>
                <button className="btn btn-outline-light btn-lg">
                  + My List
                </button>
              </div>
              <div className="mt-3">
                <span className="badge bg-secondary me-2">
                  {featuredMovie.year}
                </span>
                <span className="badge bg-info me-2">
                  {featuredMovie.rating}⭐
                </span>
                {featuredMovie.category && (
                  <span className="badge bg-dark">
                    {featuredMovie.category}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          // fallback static hero
          <>
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTkxMjEzMjcxM15BMl5BanBnXkFtZTgwNjU1MTU4MzI@._V1_.jpg"
              alt="Hero"
              className="w-100 h-100 object-fit-cover"
              style={{ objectPosition: "top" }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient" />
            <div className="position-absolute bottom-0 start-0 text-white p-5 z-3">
              <h1 className="display-4 fw-bold">The Matrix</h1>
              <p className="lead text-secondary mb-4">
                A computer hacker learns from mysterious rebels about the true
                nature of his reality and his role in the war against its
                controllers.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-danger btn-lg">▶ Play</button>
                <button className="btn btn-outline-light btn-lg">
                  + My List
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Movie Lists */}
      <div className="container py-5">

        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && Object.keys(moviesByCategory).length === 0 && (
          <div className="text-center text-secondary">No movies found.</div>
        )}
        {!loading &&
          !error &&
          Object.entries(moviesByCategory).map(([category, movies]) => (
            <MovieList
              key={category}
              title={category}
              movies={Array.isArray(movies) ? movies : []}
              onMovieSelect={handleMovieSelect}
            />
          ))}
      </div>
    </div>
  );
}
