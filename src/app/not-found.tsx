"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import Lottie for client-side rendering only
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Import animation JSON (placed alongside this file or adjust the path if needed)
import animationData from "@/utils/jsons/pageNotFound.json";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 400, width: "100%" }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h1 style={{ color: "#000", marginTop: 32, fontSize: "2rem", fontWeight: "bold" }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: "#000", marginTop: 12, fontSize: "1.1rem" }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <button
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
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}
