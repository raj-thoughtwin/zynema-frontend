'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [hover, setHover] = useState(false);

  const headerStyle: React.CSSProperties = {
    background: hover ? 'linear-gradient(90deg, #e50914 60%, #ff6a00 100%)' : 'transparent',
    color: '#fff',
    border: 'none',
    borderRadius: 7,
    fontWeight: 600,
    fontSize: 17,
    boxShadow: hover ? '0 2px 8px rgba(229,9,20,0.15)' : 'none',
    transition: 'background 0.2s, box-shadow 0.2s, color 0.2s',
    padding: '12px 16px',
    marginTop: 6,
    width: '100%',
  };

  return (
    <nav
      className="navbar navbar-expand-lg neon-navbar shadow-lg px-3 py-2"
      style={headerStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="container-fluid">
        <Link href="/" className="navbar-brand neon-glow fs-3">
          Zynema
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto gap-2">
            {[
              { href: '/dashboard', label: 'Dashboard' },
              { href: '/watch', label: 'Watch' },
              { href: '/movies', label: 'Movies' },
              { href: '/series', label: 'Series' },
            ].map(({ href, label }) => (
              <li className="nav-item" key={href}>
                <Link
                  href={href}
                  className={`nav-link px-3 rounded ${pathname.startsWith(href) ? 'active bg-opacity-25' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link href="/search" className="text-white fs-5">
              <i className="bi bi-search"></i>
            </Link>

            <button
              className="btn neon-btn d-flex align-items-center justify-content-center"
              type="button"
              title="Toggle theme"
            >
              <i className="bi bi-moon"></i>
            </button>

            <div className="dropdown">
              <button
                className="btn p-0 border-0 bg-transparent dropdown-toggle text-white"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* Replace image with icon */}
                <i className="bi bi-person-circle text-white" style={{ fontSize: '40px' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-dark text-white" aria-labelledby="userDropdown">
                <li>
                  <Link className="dropdown-item text-white" href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-white" href="/profile">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
