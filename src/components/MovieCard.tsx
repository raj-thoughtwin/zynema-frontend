'use client';

import { Movie } from '@/types/Movie';

interface MovieCardProps {
  movie: Movie;
  onPlay?: (movie: Movie) => void;
}

export default function MovieCard({ movie, onPlay }: MovieCardProps) {
  const hasPoster = !!movie.poster;

  return (
    <div
      className="movie-card position-relative rounded-4 shadow-lg overflow-hidden bg-dark"
      style={{
        width: 210,
        height: 320,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        border: 'none',
      }}
      onClick={() => onPlay?.(movie)}
    >
      {hasPoster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-100 h-100 object-fit-cover"
          style={{ objectPosition: 'center', filter: 'brightness(0.85)' }}
        />
      ) : (
        <div
          className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-secondary"
          style={{ backgroundColor: '#2c2c2c' }}
        >
          <i className="bi bi-image" style={{ fontSize: 50, marginBottom: 10 }}></i>
          <div style={{ fontSize: '0.9rem', textAlign: 'center' }}>
            No Poster Available
          </div>
        </div>
      )}

      {/* Overlay gradient */}
      <div
        className="position-absolute bottom-0 start-0 w-100"
        style={{
          height: '45%',
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.85) 90%)',
        }}
      />

      {/* Title and year */}
      <div
        className="position-absolute bottom-0 start-0 w-100 px-3 pb-3 text-white"
        style={{ zIndex: 2 }}
      >
        <div
          className="fw-bold"
          style={{ fontSize: '1.1rem', textShadow: '0 2px 8px #000' }}
        >
          {movie.title}
        </div>
        <div className="small text-secondary">{movie.year}</div>
      </div>

      {/* Play button on hover */}
      <div
        className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
        style={{ zIndex: 3, opacity: 0, transition: 'opacity 0.2s' }}
      >
        <button
          className="btn btn-light btn-lg rounded-circle shadow"
          style={{
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
          }}
        >
          <i className="bi bi-play-fill"></i>
        </button>
      </div>

      <style jsx>{`
        .movie-card:hover {
          transform: scale(1.04);
        }
        .movie-card:hover .position-absolute.top-50.start-50 {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
