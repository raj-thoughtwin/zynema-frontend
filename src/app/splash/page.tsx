"use client";
import React from "react";
import dynamic from "next/dynamic";
import router from "next/router";

// Load Lottie dynamically to prevent SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Import animation JSON (place it in /public/animations or alongside this file)
const animationData = require("./person-watching-movie.json");

export default function SplashScreen() {
  // Animated styles for the app name
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setShow(true), 300); // delay for effect
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#181818",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        overflow: "hidden",
      }}
    >
      {/* Animated App Name */}
      <h1
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 800,
          fontSize: '2.5rem',
          letterSpacing: 1,
          marginBottom: 24,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #e50914, #fff 60%, #e50914)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0)' : 'translateY(-30px)',
          transition: 'opacity 0.9s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)',
          filter: 'drop-shadow(0 2px 8px rgba(229,9,20,0.12))',
        }}
      >
        Zynema  Har Raat, Filmy Baat!
      </h1>
      <div style={{ width: "100%", maxWidth: 500 }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
      <button
        onClick={() => router.push("/dashboard")}
        style={{
          marginTop: 40,
          padding: "16px 48px",
          fontSize: "1.25rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#e50914",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Get Started
      </button>
    </div>
  );
}
