'use client';

interface PlayerProps {
  videoUrl: string;
  poster: string;
}

export default function Player({ videoUrl, poster }: PlayerProps) {
  return (
    <div className="relative aspect-w-16 aspect-h-9">
      <video
        className="w-full h-full object-cover"
        src={videoUrl}
        poster={poster}
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
