"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

import { Movie } from "@/types/Movie";
import MovieGrid from "@/components/MovieGrid";

export default function AdminDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [plot, setPlot] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal state for Details and Play
  const [showDetails, setShowDetails] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Modal handlers
  function handleShowDetails(movie: Movie) {
    setSelectedMovie(movie);
    setShowDetails(true);
    setShowPlayer(false);
  }
  function handlePlayVideo(movie: Movie) {
    setSelectedMovie(movie);
    setShowPlayer(true);
    setShowDetails(false);
  }
  function closeModal() {
    setShowDetails(false);
    setShowPlayer(false);
    setSelectedMovie(null);
  }

  // Modal styles
  const modalBackdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const modalStyle: React.CSSProperties = {
    background: '#23272f',
    color: '#fff',
    borderRadius: 12,
    padding: 32,
    minWidth: 340,
    maxWidth: 420,
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
    position: 'relative',
    animation: 'fadeIn 0.2s',
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/videos`);
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setMovies(Array.isArray(data.videos) ? data.videos : []);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch videos");
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!videoFile) return;
    setUploading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      if (title) formData.append("title", title);
      if (poster) formData.append("poster", poster);
      if (rating !== "") formData.append("rating", String(rating));
      if (year !== "") formData.append("year", String(year));
      if (category) formData.append("category", category);
      if (description) formData.append("description", description);
      if (plot) formData.append("plot", plot);
      const res = await fetch(`${BACKEND_BASE_URL}/api/videos/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      toast.success("Video uploaded successfully!");
      setTitle("");
      setVideoFile(null);
      fetchVideos();
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // Summary stats for cards
  const totalVideos = movies.length;
  const categories = Array.from(new Set(movies.map(m => m.category))).filter(Boolean);
  const avgRating = movies.length ? (movies.reduce((acc, m) => acc + (Number(m.rating) || 0), 0) / movies.length).toFixed(2) : '-';
  const mostRecentYear = movies.length ? Math.max(...movies.map(m => Number(m.year) || 0)) : '-';

  return (
    <div style={styles.container}>
      <div style={styles.animatedBar} />
      <h1 style={{...styles.header, textShadow: '0 2px 16px #e50914, 0 1px 2px #000'}}>
        🎬 Admin Dashboard
      </h1>
      <div style={styles.summaryRow}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryTitle}>Total Videos</div>
          <div style={styles.summaryValue}>{totalVideos}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryTitle}>Categories</div>
          <div style={styles.summaryValue}>{categories.length}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryTitle}>Avg. Rating</div>
          <div style={styles.summaryValue}>{avgRating}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryTitle}>Most Recent Year</div>
          <div style={styles.summaryValue}>{mostRecentYear}</div>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 16}}>
        <a href="/admin/add-video" style={{background: '#e50914', color: '#fff', border: 'none', borderRadius: 7, padding: '12px 20px', fontWeight: 600, fontSize: 16, textDecoration: 'none', boxShadow: '0 2px 8px rgba(229,9,20,0.15)', transition: 'background 0.2s, transform 0.2s'}}>+ Add Video</a>
      </div>
      <h2 style={styles.subheader}>📂 Uploaded Videos (Admin)</h2>
      <div style={styles.card}>
        <div style={{overflowX: 'auto', marginTop: 0}}>
          <table style={{width: '100%', background: 'transparent', borderRadius: 10, borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: '#23272f', color: '#e50914'}}>
                <th style={{padding: '12px 8px'}}>Poster</th>
                <th style={{padding: '12px 8px', textAlign: 'left'}}>Title</th>
                <th style={{padding: '12px 8px'}}>Year</th>
                <th style={{padding: '12px 8px'}}>Category</th>
                <th style={{padding: '12px 8px'}}>URL</th>
                <th style={{padding: '12px 8px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.length === 0 && (
                <tr><td colSpan={5} style={{color: '#aaa', textAlign: 'center', padding: 24}}>No videos uploaded yet.</td></tr>
              )}
              {movies.map(movie => (
                <tr key={movie.id} style={{borderBottom: '1px solid #333'}}>
                  <td style={{padding: '10px 8px'}}>
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        style={styles.posterAvatar}
                      />
                    ) : (
                      <div style={styles.posterAvatarPlaceholder}>
                        <span role="img" aria-label="No poster">🎬</span>
                      </div>
                    )}
                  </td>
                  <td style={{padding: '10px 8px', fontWeight: 600}}>{movie.title}</td>
                  <td style={{padding: '10px 8px'}}>{movie.year || '-'}</td>
                  <td style={{padding: '10px 8px'}}>{movie.category || '-'}</td>
                  <td style={{padding: '10px 8px'}}>
                    <a href={`/admin/videos/${movie.id}`} style={{color: '#e50914', textDecoration: 'underline'}}>View URL</a>
                  </td>
                  <td style={{padding: '10px 8px'}}>
                    <button style={{marginRight: 8, background: '#444', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 12px', cursor: 'pointer'}} onClick={() => handleShowDetails(movie)}>Details</button>
                    <button style={{background: '#e50914', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 12px', cursor: 'pointer'}} onClick={() => handlePlayVideo(movie)}>Play</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Details Modal */}
      {selectedMovie && showDetails && (
        <div style={modalBackdropStyle} onClick={closeModal}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <h3 style={{marginBottom: 12}}>{selectedMovie.title}</h3>
            <p><strong>Year:</strong> {selectedMovie.year}</p>
            <p><strong>Category:</strong> {selectedMovie.category}</p>
            <p><strong>Rating:</strong> {selectedMovie.rating}</p>
            <p><strong>Description:</strong> {selectedMovie.description}</p>
            <p><strong>Plot:</strong> {selectedMovie.plot}</p>
            <p><strong>File Name:</strong> {selectedMovie.filename || '-'}</p>
            <button style={{marginTop: 18, background: '#e50914', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 16px', cursor: 'pointer'}} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {/* Video Player Modal */}
      {selectedMovie && showPlayer && (
        <div style={modalBackdropStyle} onClick={closeModal}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <h3 style={{marginBottom: 12}}>{selectedMovie.title}</h3>
            <video controls style={{width: '100%', borderRadius: 8}} src={`${BACKEND_BASE_URL}/api/videos/stream/${selectedMovie.id}`}></video>
            <button style={{marginTop: 18, background: '#e50914', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 16px', cursor: 'pointer'}} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    minWidth: '100vw',
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    background: 'linear-gradient(120deg, #1a233a 0%, #191c24 60%, #232747 100%)',
    color: '#fff',
    fontFamily: 'Inter, Arial, sans-serif',
    overflowX: 'hidden',
    position: 'relative',
  },
  animatedBar: {
    width: '100vw',
    height: 8,
    background: 'linear-gradient(90deg, #e50914, #ff6a00, #232747, #e50914)',
    backgroundSize: '200% 200%',
    animation: 'moveBar 4s linear infinite',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    opacity: 0.8,
  },
  '@keyframes moveBar': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '100% 50%' },
  },
  summaryRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 24,
    marginBottom: 36,
    marginTop: 12,
  },
  summaryCard: {
    background: 'rgba(35, 39, 47, 0.55)',
    borderRadius: 18,
    boxShadow: '0 4px 32px 4px rgba(229,9,20,0.08)',
    padding: '28px 18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minHeight: 90,
    border: '1.5px solid rgba(229,9,20,0.12)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'box-shadow 0.18s, border 0.18s',
    position: 'relative',
    overflow: 'hidden',
  },
  summaryCardHover: {
    boxShadow: '0 8px 32px 4px rgba(229,9,20,0.22)',
    border: '1.5px solid #e50914',
    transform: 'translateY(-2px) scale(1.03)',
  },
  summaryTitle: {
    fontSize: 15,
    color: '#aaa',
    marginBottom: 4,
    fontWeight: 500,
    letterSpacing: 0.5,
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: 1,
  },
  card: {
    background: 'rgba(35, 39, 47, 0.65)',
    borderRadius: 18,
    boxShadow: '0 4px 32px 4px rgba(0,0,0,0.22)',
    padding: 0,
    marginBottom: 32,
    overflow: 'hidden',
    border: '1.5px solid rgba(229,9,20,0.10)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  posterAvatar: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e50914',
    background: '#23272f',
    boxShadow: '0 2px 8px rgba(229,9,20,0.10)',
    display: 'block',
  },
  posterAvatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    background: '#23272f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
    fontSize: 22,
    border: '2px solid #333',
    boxShadow: '0 2px 8px rgba(229,9,20,0.05)',
  },
  header: {
    textAlign: "center",
    marginBottom: 28,
    fontSize: "2.3rem",
    letterSpacing: 1,
    fontWeight: 700,
  },
  subheader: {
    fontSize: "1.5rem",
    marginTop: 36,
    fontWeight: 600,
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginBottom: 32,
    background: "#23272f",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  input: {
    padding: "12px 14px",
    fontSize: 17,
    borderRadius: 7,
    border: "1.5px solid #333",
    backgroundColor: "#23272f",
    color: "#fff",
    outline: "none",
    marginBottom: 2,
    transition: "border 0.2s",
  },
  button: {
    padding: "12px 16px",
    fontSize: 17,
    background: "linear-gradient(90deg, #e50914 60%, #ff6a00 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(229,9,20,0.15)",
    marginTop: 6,
    transition: "background 0.2s, transform 0.2s",
  },
  error: {
    color: "#ff4d4f",
    marginTop: 8,
    fontWeight: 500,
  },
  success: {
    color: "#52ff90",
    marginTop: 8,
    fontWeight: 500,
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
  videoCardHover: {
    transform: "translateY(-4px) scale(1.02)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
    border: "1.5px solid #e50914",
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
