"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from "./BubbleBg.module.scss";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.bubbleBg}>
      {/* Background bubbles */}
      <div className={`${styles.bubble} ${styles.bubble1}`}></div>
      <div className={`${styles.bubble} ${styles.bubble2}`}></div>
      <div className={`${styles.bubble} ${styles.bubble3}`}></div>
      <div className={`${styles.bubble} ${styles.bubble4}`}></div>

      {/* Glass card container */}
      <div className={styles.bubbleGlassCard}>
        <div className={styles.bubbleLoginHeader}>Login</div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            className={styles.bubbleInput}
            autoComplete="username"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            className={styles.bubbleInput}
            autoComplete="current-password"
            required
          />
          <div className={styles.bubbleLoginRow}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" className={styles.bubbleCheckbox} />
              <span style={{ marginLeft: "6px" }}>Remember Me</span>
            </label>
            <a href="#" className={styles.bubbleForgot}>
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.bubbleLoginBtn}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* SSO Login Button */}
        <div className={styles.ssoButtonWrapper}>
          <button type="button" className={styles.ssoButton}>
            <svg width="22" height="22" viewBox="0 0 48 48" style={{ marginRight: 8 }}><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.8 0 5.4 1 7.4 2.6l6.2-6.2C33.8 6.2 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c2.8 0 5.4 1 7.4 2.6l6.2-6.2C33.8 6.2 29.2 4 24 4c-7 0-13 4.1-16.1 10.1z"/><path fill="#FBBC05" d="M24 44c5.2 0 9.8-1.7 13.2-4.7l-6.1-5.1C29.5 36.5 26.9 37.5 24 37.5c-6.1 0-11.2-4.1-13.1-9.6l-7 5.4C7.9 39.6 15.4 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.7 8.5-11.7 8.5-7 0-12.7-5.7-12.7-12.5S17 11.5 24 11.5c3.8 0 7.3 1.5 9.9 4.1l7.4-7.4C37.6 4.4 31.2 1.5 24 1.5 12.1 1.5 2.5 11.1 2.5 23S12.1 44.5 24 44.5c10.3 0 18.5-7.7 18.5-17.5 0-1.3-.1-2.7-.2-4z"/></g></svg>
            Continue with Google
          </button>
        </div>
        <div className={styles.bubbleLoginFooter}>
          Don&apos;t have an account?{" "}
          <a href="/auth/register">Register</a>
        </div>
      </div>
    </div>
  );
}
