"use client";

import React from "react";
import styles from "../styles/components/loader.module.scss";
import { useLoader } from "@/utils/LoaderContext";

// Loader component (pure spinner animation)
const Loader: React.FC = () => (
<div className={styles.loading}>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
);

// GlobalLoader component (conditionally rendered based on loading state)
export default function GlobalLoader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader />
    </div>
  );
}
