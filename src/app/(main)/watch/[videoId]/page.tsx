"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";

const spinnerStyle: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 20,
  width: 60,
  height: 60,
  border: '7px solid #333',
  borderTop: '7px solid #e50914',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  boxShadow: '0 0 24px 2px #000a',
};

const loaderOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(10,10,10,0.75)',
  zIndex: 19,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.44)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9,
};

const playButtonStyle: React.CSSProperties = {
  background: '#e50914',
  border: 'none',
  borderRadius: 60,
  width: 70,
  height: 70,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginBottom: 18,
  boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
};

const playIconStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  fill: '#fff',
  marginLeft: 6,
};

// Add keyframes for spinner
const styleSheet = typeof window !== 'undefined' ? document.createElement('style') : null;
if (styleSheet && !document.getElementById('custom-spinner-keyframes')) {
  styleSheet.id = 'custom-spinner-keyframes';
  styleSheet.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`;
  document.head.appendChild(styleSheet);
}


export default function WatchPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState<any>(null);
  const [error, setError] = useState("");
  const [adUrl, setAdUrl] = useState<string | null>(null);
  const [playingAd, setPlayingAd] = useState(false);
  const [mainVideoUrl, setMainVideoUrl] = useState<string | null>(null);
  const [playerPlaying, setPlayerPlaying] = useState(false);
  const [playerBuffering, setPlayerBuffering] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

  // Fetch video metadata and check ad in a single call
  useEffect(() => {
    const fetchVideoAndAd = async () => {
      try {
        const res = await fetch(
          `${BACKEND_BASE_URL}/api/videos/stream/${videoId}`,
          {
            headers: {
              Range: "bytes=0-",
            },
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Video not found");
        }
        // If server returns JSON (error), handle it
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setError(data.error || "Video not found");
          return;
        }
        // Otherwise, just proceed: let <video> handle streaming, do not parse as JSON
        setVideo({ id: videoId });
        setAdUrl(null);
        setPlayingAd(false);
      } catch (err) {
        setError("Video not found");
      }
    };
    fetchVideoAndAd();
  }, [videoId]);

  // When ad finishes, play main video
  const handleAdEnded = () => {
    setPlayingAd(false);
    setMainVideoUrl(
      `${BACKEND_BASE_URL}/api/videos/stream/${video.id}?ad=played`
    );
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }
  if (!video) {
    // Inline loading skeleton from loading.tsx
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-6" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }


  // Optionally, use a thumbnail or fallback image for the light prop
  const videoThumb = video?.poster || video?.thumbnail || undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="aspect-w-16 aspect-h-9 relative"
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #181823 0%, #23243a 100%)',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 8px 36px 0 rgba(0,0,0,0.35)',
          minHeight: 320,
        }}
      >
        {/* Loader overlay */}
        {(!playerReady || playerBuffering) && (
          <div style={loaderOverlayStyle}>
            <div style={spinnerStyle}></div>
          </div>
        )}
        {playingAd && adUrl ? (
          <>
            <ReactPlayer
              url={adUrl}
              playing={playerPlaying}
              controls
              width="100%"
              height="100%"
              light={videoThumb}
              volume={0.8}
              muted={false}
              playbackRate={1}
              loop={false}
              pip={true}
              onClickPreview={() => console.log('Preview clicked (Ad)')}
              onReady={() => { setPlayerReady(true); console.log('Player ready (Ad)'); }}
              onStart={() => console.log('Media started (Ad)')}
              onPlay={() => { setPlayerPlaying(true); console.log('Play (Ad)'); }}
              onPlaying={() => console.log('Media actually playing (Ad)')}
              onProgress={state => console.log('Progress (Ad):', state)}
              onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => console.log('Time update (Ad):', e)}
              onDuration={duration => console.log('Duration (Ad):', duration)}
              onPause={() => { setPlayerPlaying(false); console.log('Pause (Ad)'); }}
              onBuffer={() => { setPlayerBuffering(true); console.log('Buffering (Ad)'); }}
              onBufferEnd={() => { setPlayerBuffering(false); console.log('Buffer end (Ad)'); }}
              onWaiting={() => console.log('Waiting for buffer (Ad)')}
              onSeeking={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => console.log('Seeking (Ad):', e)}
              onSeeked={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => console.log('Seeked (Ad):', e)}
              onRateChange={(rate: number) => console.log('Rate changed (Ad):', rate)}
              onEnded={handleAdEnded}
              onError={err => console.error('Playback error (Ad):', err)}
              onEnterPictureInPicture={() => console.log('Entered PiP (Ad)')}
              onLeavePictureInPicture={() => console.log('Left PiP (Ad)')}
            />
            {!playerPlaying && !playerBuffering && playerReady && (
              <div style={{...overlayStyle, background: 'rgba(16,18,24,0.62)', borderRadius: 18}}>
                <button style={{...playButtonStyle, boxShadow: '0 4px 24px #e5091477'}} onClick={() => setPlayerPlaying(true)}>
                  <svg style={playIconStyle} viewBox="0 0 48 48"><polygon points="16,10 40,24 16,38"/></svg>
                </button>
                <div style={{fontSize: 22, fontWeight: 700, marginBottom: 8, textShadow: '0 2px 8px #000'}}> {video.title || 'Advertisement'}</div>
                <div style={{fontSize: 15, color: '#eee', textAlign: 'center', maxWidth: 420, textShadow: '0 1px 6px #000a'}}>
                  {video.description || video.plot || "No description available."}
                </div>
              </div>
            )}
          </>
        ) : !playingAd && video ? (
          <>
            <ReactPlayer
              url={`${BACKEND_BASE_URL}/api/videos/stream/${video.id}?ad=played`}
              playing={playerPlaying}
              controls
              width="100%"
              height="100%"
              light={videoThumb}
              volume={0.8}
              muted={false}
              playbackRate={1}
              loop={false}
              pip={true}
              onClickPreview={() => console.log('Preview clicked (Main)')}
              onReady={() => { setPlayerReady(true); console.log('Player ready (Main)'); }}
              onStart={() => console.log('Media started (Main)')}
              onPlay={() => { setPlayerPlaying(true); console.log('Play (Main)'); }}
              onPlaying={() => console.log('Media actually playing (Main)')}
              onProgress={(state: any) => console.log('Progress (Main):', state)}
              onTimeUpdate={(e: any) => console.log('Time update (Main):', e)}
              onDuration={(duration: any) => console.log('Duration (Main):', duration)}
              onPause={() => { setPlayerPlaying(false); console.log('Pause (Main)'); }}
              onBuffer={() => { setPlayerBuffering(true); console.log('Buffering (Main)'); }}
              onBufferEnd={() => { setPlayerBuffering(false); console.log('Buffer end (Main)'); }}
              onWaiting={() => console.log('Waiting for buffer (Main)')}
              onSeeking={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => console.log('Seeking (Main):', e)}
              onSeeked={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => console.log('Seeked (Main):', e)}
              onRateChange={(rate: number) => console.log('Rate changed (Main):', rate)}
              onEnded={() => { console.log('Playback ended (Main)'); }}
              onError={(err: React.SyntheticEvent<HTMLVideoElement, Event>) => console.error('Playback error (Main):', err)}
              onEnterPictureInPicture={() => console.log('Entered PiP (Main)')}
              onLeavePictureInPicture={() => console.log('Left PiP (Main)')}
            />
            {!playerPlaying && !playerBuffering && playerReady && (
              <div style={{...overlayStyle, background: 'rgba(16,18,24,0.62)', borderRadius: 18}}>
                <button style={{...playButtonStyle, boxShadow: '0 4px 24px #e5091477'}} onClick={() => setPlayerPlaying(true)}>
                  <svg style={playIconStyle} viewBox="0 0 48 48"><polygon points="16,10 40,24 16,38"/></svg>
                </button>
                <div style={{fontSize: 22, fontWeight: 700, marginBottom: 8, textShadow: '0 2px 8px #000'}}>{video.title}</div>
                <div style={{fontSize: 15, color: '#eee', textAlign: 'center', maxWidth: 420, textShadow: '0 1px 6px #000a'}}>
                  {video.description || video.plot || "No description available."}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-secondary">Preparing stream...</div>
        )}
      </div>
      <div className="mt-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-2 text-white drop-shadow-lg" style={{letterSpacing: 0.5}}>{video.title}</h1>
        <p className="text-gray-300 text-lg max-w-2xl text-center" style={{textShadow: '0 2px 8px #000a'}}>
          {(() => {
            const desc =
              video.description || video.plot || "No description available.";
            return desc.length > 180 ? desc.slice(0, 177) + "..." : desc;
          })()}
        </p>
      </div>
    </div>
  );
}

