"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../login/BubbleBg.module.scss";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) throw new Error("Registration failed");
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Registration failed");
      } else {
        toast.error("Registration failed");
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
        <div className={styles.bubbleLoginHeader}>Register</div>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            placeholder="Full Name"
            onChange={e => setName(e.target.value)}
            className={styles.bubbleInput}
            autoComplete="name"
            required
          />
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
            autoComplete="new-password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}
            className={styles.bubbleInput}
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={styles.bubbleLoginBtn}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className={styles.bubbleLoginFooter}>
          Already have an account?{' '}
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

