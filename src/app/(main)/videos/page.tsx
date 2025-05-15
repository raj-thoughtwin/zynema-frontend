"use client";
import React, { useEffect, useState } from "react";
import { Movie } from "@/types/Movie";
import MovieGrid from "@/components/MovieGrid";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

export default function AllVideosPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllMovies();
  }, []);

  async function fetchAllMovies() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/videos`);
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setMovies(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🎞️ All Videos</h1>
      {error && <div style={styles.error}>{error}</div>}
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <MovieGrid movies={movies} header="🎞️ All Videos" />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1100,
    margin: "40px auto",
    padding: 24,
    backgroundColor: "#191c24",
    color: "#fff",
    borderRadius: 18,
    boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
    fontFamily: "Inter, Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: 28,
    fontSize: "2.3rem",
    letterSpacing: 1,
    fontWeight: 700,
  },
  error: {
    color: "#ff4d4f",
    marginBottom: 18,
    textAlign: "center",
    fontWeight: 500,
  },
  loading: {
    color: "#aaa",
    textAlign: "center",
    fontSize: 18,
    marginTop: 32,
  },
};
