'use client';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="neon-card">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="neon-glow">{video.title}</h3>
        <p className="mt-1 text-xs text-gray-500">{video.duration}</p>
      </div>
    </div>
  );
}
