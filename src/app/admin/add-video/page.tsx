"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/app/animations/Animation - 1747292599170.json";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

export default function AddVideoPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState<File | null>(null);
  const [rating, setRating] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [plot, setPlot] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!videoFile) return toast.error("Please select a video file.");
    setUploading(true);
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
      router.push("/admin");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={styles.outerWrap}>
      <div style={styles.leftCol}>
        <Lottie animationData={animationData} loop={true} style={{width: '100%', maxWidth: 400, margin: '0 auto'}} />
      </div>
      <div style={styles.rightCol}>
        <div style={{marginBottom: 12}}>
          <a href="/admin" style={{
            display: 'inline-block',
            background: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(68,68,68,0.15)',
            transition: 'background 0.2s, transform 0.2s',
            marginBottom: 4
          }}>&larr; Back</a>
        </div>
        <h1 style={styles.header}>Add New Video</h1>
        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
            style={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setPoster(e.target.files?.[0] || null)}
            style={styles.input}
          />
          <input
            type="number"
            value={rating}
            placeholder="Rating (0-10)"
            min={0}
            max={10}
            step={0.1}
            onChange={e => setRating(e.target.value === "" ? "" : Number(e.target.value))}
            style={styles.input}
          />
          <input
            type="number"
            value={year}
            placeholder="Year"
            min={1900}
            max={2100}
            onChange={e => setYear(e.target.value === "" ? "" : Number(e.target.value))}
            style={styles.input}
          />
          <input
            type="text"
            value={category}
            placeholder="Category (e.g. Action, Drama)"
            onChange={e => setCategory(e.target.value)}
            style={styles.input}
          />
          <textarea
            value={description}
            placeholder="Description"
            onChange={e => setDescription(e.target.value)}
            style={{...styles.input, minHeight: 48}}
          />
          <textarea
            value={plot}
            placeholder="Plot (optional)"
            onChange={e => setPlot(e.target.value)}
            style={{...styles.input, minHeight: 48}}
          />
          <input
            type="file"
            accept="video/*"
            onChange={e => setVideoFile(e.target.files?.[0] || null)}
            style={styles.input}
          />
          <button type="submit" disabled={uploading} style={styles.button}>
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  outerWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: '100vh',
    backgroundColor: '#191c24',
    color: '#fff',
    fontFamily: 'Inter, Arial, sans-serif',
    padding: 0,
    margin: 0,
  },
  leftCol: {
    flex: 1,
    background: 'linear-gradient(120deg, #23272f 60%, #191c24 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 0',
  },
  rightCol: {
    flex: 1,
    padding: '40px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#191c24',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
    fontSize: '2.3rem',
    letterSpacing: 1,
    fontWeight: 700,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    marginBottom: 32,
    background: '#23272f',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  input: {
    padding: '12px 14px',
    fontSize: 17,
    borderRadius: 7,
    border: '1.5px solid #333',
    backgroundColor: '#23272f',
    color: '#fff',
    outline: 'none',
    marginBottom: 2,
    transition: 'border 0.2s',
  },
  button: {
    padding: '12px 16px',
    fontSize: 17,
    background: 'linear-gradient(90deg, #e50914 60%, #ff6a00 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 7,
    cursor: 'pointer',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(229,9,20,0.15)',
    marginTop: 6,
    transition: 'background 0.2s, transform 0.2s',
  },
};
