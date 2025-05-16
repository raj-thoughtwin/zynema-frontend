"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/app/animations/Animation - 1747292599170.json";
import Link from "next/link";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

export default function RegisterPage() {
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
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Registration failed");
      toast.success("Registration successful! Please log in.");
      router.push("/auth/login");
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
    <div style={styles.outerWrap}>
      <div style={styles.leftCol}>
        <Lottie animationData={animationData} loop={true} style={{width: '100%', maxWidth: 400, margin: '0 auto'}} />
      </div>
      <div style={styles.rightCol}>
        <div style={{marginBottom: 12}}>
          <Link href="/" style={{
            display: 'inline-block',
            background: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: 7,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(68,68,68,0.15)',
            transition: 'background 0.2s, transform 0.2s',
            marginBottom: 4
          }}>&larr; Home</Link>
        </div>
        <h1 style={styles.header}>Register</h1>
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            autoComplete="username"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div style={{textAlign: 'center', marginTop: 14}}>
          <span style={{color: '#aaa'}}>Already have an account? </span>
          <Link href="/auth/login" style={{color: '#e50914', fontWeight: 600}}>Login</Link>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  outerWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: '100vh',
    backgroundColor: '#191c24',
    color: '#fff',
    fontFamily: 'Inter, Arial, sans-serif',
    padding: 0,
    margin: 0,
  },
  leftCol: {
    flex: 1,
    background: 'linear-gradient(120deg, #23272f 60%, #191c24 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px 0',
  },
  rightCol: {
    flex: 1,
    padding: '40px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#191c24',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
    fontSize: '2.3rem',
    letterSpacing: 1,
    fontWeight: 700,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    marginBottom: 32,
    background: '#23272f',
    padding: 20,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  input: {
    padding: '12px 14px',
    fontSize: 17,
    borderRadius: 7,
    border: '1.5px solid #333',
    backgroundColor: '#23272f',
    color: '#fff',
    outline: 'none',
    marginBottom: 2,
    transition: 'border 0.2s',
  },
  button: {
    padding: '12px 16px',
    fontSize: 17,
    background: 'linear-gradient(90deg, #e50914 60%, #ff6a00 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 7,
    cursor: 'pointer',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(229,9,20,0.15)',
    marginTop: 6,
    transition: 'background 0.2s, transform 0.2s',
  },
};
