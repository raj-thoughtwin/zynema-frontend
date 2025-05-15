'use client';

import React, { useState } from "react";
import Link from "next/link";

const adminHeaderStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  color: "#fff",
  padding: "18px 32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "2px solid #e50914",
  fontFamily: "Inter, Arial, sans-serif",
  zIndex: 100,
  transition: 'background 0.2s, box-shadow 0.2s',
};

const adminHeaderHoverStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #e50914 60%, #ff6a00 100%)',
  boxShadow: '0 2px 8px rgba(229,9,20,0.15)',
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: 28,
};

const linkStyle: React.CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 18,
  letterSpacing: 1,
  transition: "color 0.2s",
};

export default function AdminHeader() {
  const [hover, setHover] = useState(false);
  return (
    <header
      style={hover ? { ...adminHeaderStyle, ...adminHeaderHoverStyle } : adminHeaderStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href="/admin" style={{ ...linkStyle, fontSize: 24 }}>
        <span role="img" aria-label="Admin">🛡️</span> Admin Panel
      </Link>
      <nav style={navStyle}>
        <Link href="/admin" style={linkStyle}>Dashboard</Link>
        <Link href="/admin/users" style={linkStyle}>Users</Link>
        {/* Add more admin links here if needed */}
        <Link href="/" style={{ ...linkStyle, color: "#e50914" }}>Back to Site</Link>
      </nav>
    </header>
  );
}
