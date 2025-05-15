"use client";
import React from "react";
import { Movie } from "@/types/Movie";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

interface MovieGridProps {
  movies: Movie[];
  header: string;
}

export default function MovieGrid({ movies, header }: MovieGridProps) {
  return (
    <>
      <h2 style={styles.subheader}>{header}</h2>
      <div style={styles.gridContainer}>
        {movies.length === 0 && <div style={styles.emptyText}>No videos uploaded yet.</div>}
        {movies.map(movie => (
          <div key={movie.id} style={styles.videoCard}>
            <div style={styles.thumbnailWrapper}>
              <video
                src={`${BACKEND_BASE_URL}/api/videos/stream/${movie.id}`}
                controls
                style={styles.videoThumb}
                poster={movie.poster || "/video-placeholder.png"}
              />
            </div>
            <div style={styles.cardBody}>
              <strong style={styles.videoTitle}>{movie.title}</strong>
              <div style={styles.cardFooter}>
                <span style={styles.videoMeta}>ID: {movie.id}</span>
                {movie.year && <span style={styles.videoMeta}>Year: {movie.year}</span>}
                {movie.rating && <span style={styles.videoMeta}>Rating: {movie.rating}</span>}
                {movie.category && <span style={styles.videoMeta}>Category: {movie.category}</span>}
              </div>
              {movie.description && <div style={{marginTop: 8, color: '#ccc', fontSize: 14}}>{movie.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  subheader: {
    fontSize: "1.5rem",
    marginTop: 36,
    fontWeight: 600,
    marginBottom: 16,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
    marginTop: 16,
  },
  videoCard: {
    background: "#23272f",
    borderRadius: 13,
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.18s, box-shadow 0.18s",
    cursor: "pointer",
    overflow: "hidden",
    minHeight: 320,
    border: "1.5px solid #23272f",
  },
  thumbnailWrapper: {
    width: "100%",
    background: "#141414",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 180,
  },
  videoThumb: {
    width: "100%",
    maxHeight: 180,
    objectFit: "cover",
    border: 0,
    borderRadius: 0,
    background: "#191c24",
  },
  cardBody: {
    padding: "18px 16px 12px 16px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 6,
    color: "#fff",
    textShadow: "0 2px 8px rgba(0,0,0,0.08)",
    wordBreak: "break-word",
  },
  cardFooter: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 13,
    color: "#aaa",
  },
  videoMeta: {
    fontSize: 13,
    color: "#aaa",
  },
  emptyText: {
    color: "#aaa",
    textAlign: "center",
    fontSize: 16,
    marginTop: 32,
  },
};
