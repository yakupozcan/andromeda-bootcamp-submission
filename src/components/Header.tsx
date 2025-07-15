'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  connectAndromedaClient,
  disconnectAndromedaClient,
  useAndromedaStore,
} from "@/zustand/andromeda";

export default function Header() {
  // Wallet state
  const walletAddress = useAndromedaStore(
    (state) => state.accounts[0]?.address ?? null,
  );
  const isConnecting = useAndromedaStore((state) => state.isLoading);

  // User profile state
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState("");

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("username") || "");
      setPfp(localStorage.getItem("pfp") || "");
    }
  }, []);

  // Save to localStorage
  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("username", username);
      localStorage.setItem("pfp", pfp);
    }
    setShowProfile(false);
  };

  const connect = () => {
    if (isConnecting) return;
    connectAndromedaClient("galileo-4");
  };

  const disconnect = () => {
    disconnectAndromedaClient();
  };

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      background: '#222',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
    }}>
      {/* Sol: Logo ve Proje İsmi */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="/favicon-32x32.png" alt="Gold Coin Logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
        <Link href="/" style={{ fontWeight: 'bold', fontSize: 20, color: '#fff', textDecoration: 'none' }}>
          Community Vault
        </Link>
      </div>
      {/* Sağ: Diğer Bileşenler */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link
          href="/posts/new"
          style={{
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            textDecoration: 'none',
            fontWeight: 500
          }}
        >
          Create New Post
        </Link>
        {walletAddress ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: '#ddd' }}>
              {truncateAddress(walletAddress)}
            </span>
            <button
              onClick={disconnect}
              style={{
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '6px 12px',
                fontWeight: 500
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connect}
            disabled={isConnecting}
            style={{
              background: '#6366f1',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '6px 12px',
              opacity: isConnecting ? 0.6 : 1,
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              fontWeight: 500
            }}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
        <button
          onClick={() => setShowProfile((v) => !v)}
          style={{
            background: '#fff',
            color: '#444',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            fontSize: 18,
            cursor: 'pointer'
          }}
          title="User Profile"
        >
          <span role="img" aria-label="user">👤</span>
        </button>
        {showProfile && (
          <div style={{
            position: 'absolute',
            right: 20,
            top: 60,
            background: '#fff',
            color: '#222',
            borderRadius: 8,
            padding: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 100
          }}>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              style={{ display: 'block', marginBottom: 8, width: '100%' }}
            />
            <input
              value={pfp}
              onChange={e => setPfp(e.target.value)}
              placeholder="Profile Pic URL"
              style={{ display: 'block', marginBottom: 8, width: '100%' }}
            />
            <button
              onClick={handleSave}
              style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px' }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
