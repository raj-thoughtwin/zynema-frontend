"use client";
import React, { useRef, useState } from "react";

interface UploadedVideo {
  id: string;
  title: string;
  filename: string;
  mimetype: string;
  size: number;
}

const VideoUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState<UploadedVideo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    const res = await fetch("/api/videos");
    const data = await res.json();
    setVideos(data);
  };

  React.useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.length) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("video", fileInputRef.current.files[0]);
    formData.append("title", fileInputRef.current.files[0].name);
    try {
      const res = await fetch("/api/videos/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      await fetchVideos();
      fileInputRef.current.value = "";
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload} className="mb-6">
        <input type="file" accept="video/*" ref={fileInputRef} required />
        <button type="submit" disabled={uploading} className="ml-2 px-4 py-2 bg-red-700 text-white rounded">
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <h3 className="font-bold mb-4 text-xl">Uploaded Videos</h3>
      {videos.length === 0 ? (
        <div className="text-gray-400">No videos uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-[#181818] rounded-lg shadow-md overflow-hidden group flex flex-col">
              {/* Video thumbnail or fallback */}
              <div className="relative h-40 bg-black flex items-center justify-center">
                <video
                  src={`/api/videos/stream/${video.id}`}
                  className="w-full h-full object-cover"
                  controls={false}
                  poster="/default-video-thumb.png"
                  preload="metadata"
                  onError={(e) => { (e.target as HTMLVideoElement).poster = '/default-video-thumb.png'; }}
                />
                <a
                  href={`/api/videos/stream/${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/50"
                >
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z" />
                    </svg>
                  </button>
                </a>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="font-semibold text-lg mb-2 truncate" title={video.title}>{video.title}</div>
                <div className="text-xs text-gray-400">{(video.size / (1024 * 1024)).toFixed(2)} MB</div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default VideoUpload;
