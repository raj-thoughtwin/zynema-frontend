'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [hover, setHover] = useState(false);

  const headerStyle: React.CSSProperties = {
    background: hover
      ? 'linear-gradient(90deg, #e50914 60%, #ff6a00 100%)'
      : 'transparent',
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
                  className={`nav-link px-3 rounded ${
                    pathname.startsWith(href) ? 'active bg-opacity-25' : ''
                  }`}
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
                <i
                  className="bi bi-person-circle text-white"
                  style={{ fontSize: '40px' }}
                ></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end bg-dark text-white"
                aria-labelledby="userDropdown"
              >
                <div className="card">
                  {/* Profile Section */}
                  <div className="profile-section d-flex flex-column align-items-center py-2 mb-2">
                    <i className="bi bi-person-circle text-white mb-2" style={{ fontSize: '38px' }}></i>
                    <span className="fw-bold text-white">John Doe</span>
                    <Link href="/profile" className="dropdown-item text-center mt-1 text-primary" style={{ fontWeight: 500 }}>
                      View Profile
                    </Link>
                  </div>
                  <div className="separator"></div>
                  {/* Menu Options */}
                  <ul className="list">
                    <li className="element">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7e8590"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-pencil"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                        <path d="m15 5 4 4"></path>
                      </svg>
                      <p className="label">Rename</p>
                    </li>
                    <li className="element">
                      <svg
                        className="lucide lucide-user-round-plus"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                        <circle r="5" cy="8" cx="10"></circle>
                        <path d="M19 16v6"></path>
                        <path d="M22 19h-6"></path>
                      </svg>
                      <p className="label">Add Member</p>
                    </li>
                  </ul>
                  <div className="separator"></div>
                  <ul className="list">
                    <li className="element">
                      <svg
                        className="lucide lucide-settings"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle r="3" cy="12" cx="12"></circle>
                      </svg>
                      <p className="label">Settings</p>
                    </li>
                    <li className="element delete">
                      <svg
                        className="lucide lucide-trash-2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line y2="17" y1="11" x2="10" x1="10"></line>
                        <line y2="17" y1="11" x2="14" x1="14"></line>
                      </svg>
                      <p className="label">Delete</p>
                    </li>
                  </ul>
                  <div className="separator"></div>
                  <ul className="list">
                    <li className="element">
                      <svg
                        className="lucide lucide-users-round"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 21a8 8 0 0 0-16 0"></path>
                        <circle r="5" cy="8" cx="10"></circle>
                        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                      </svg>
                      <p className="label">Team Access</p>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
