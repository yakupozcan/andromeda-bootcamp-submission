'use client';

import React from "react";
import Link from "next/link";
import {
  connectAndromedaClient,
  disconnectAndromedaClient,
  useAndromedaStore,
} from "@/zustand/andromeda";

/**
 * Reusable site header with a wallet connect / disconnect UI.
 * Assumes a custom `useAndromeda` hook that exposes:
 *  - walletAddress: string | null
 *  - connect: () => Promise<void>
 *  - disconnect: () => Promise<void>
 */
const Header: React.FC = () => {
  const walletAddress = useAndromedaStore(
    (state) => state.accounts[0]?.address ?? null,
  );
  const isConnecting = useAndromedaStore((state) => state.isLoading);

  const connect = () => {
    if (isConnecting) return;
    connectAndromedaClient("constantine-3");
  };

  const disconnect = () => {
    disconnectAndromedaClient();
  };

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-gray-900/90 px-6 py-3 backdrop-blur border-b border-gray-700">
      {/* Site title or logo placeholder */}
      <Link href="/" className="flex items-center gap-2 text-white hover:text-indigo-400">
        <span className="text-2xl">🪙</span>
        <span className="text-lg font-semibold">Community Vault</span>
      </Link>

      {/* Wallet action area */}
      {walletAddress ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">
            {truncateAddress(walletAddress)}
          </span>
          <button
            onClick={disconnect}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/50"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </header>
  );
};

export default Header;
