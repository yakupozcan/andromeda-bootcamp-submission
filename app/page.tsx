"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { CW721_TOKENS } from "@/lib/andrjs/cw721/token";

const NFT_CONTRACT_ADDRESS = "andr1d9lez0z6jhf00dxhcgyg7hlvru89gupjs3h6xlcp9qdpvhpqm7cqmm7nld";

// Post type for UI
interface PostMeta {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorUsername: string;
  authorPFP: string;
  timestamp: string;
}

export default function Home() {
  const client = useAndromedaClient();
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      if (!client || !client.queryClient) return;
      setLoading(true);
      setError("");
      try {
        // 1. Tüm token_id'leri çek
        const allTokensMsg = CW721_TOKENS.getAllTokenIdMsg({ limit: 50 });
        const { tokens } = await client.queryClient.queryContractSmart(NFT_CONTRACT_ADDRESS, allTokensMsg) as { tokens: string[] };
        // 2. Her token_id için metadata çek
        const posts: PostMeta[] = (await Promise.all(
          tokens.reverse().map(async (token_id) => {
            try {
              const nftInfoMsg = CW721_TOKENS.getTokenInfoMsg(token_id);
              const nftInfo = await client.queryClient!.queryContractSmart(NFT_CONTRACT_ADDRESS, nftInfoMsg) as { token_uri: string };
              // IPFS linkini HTTP'ye çevir
              let ipfsUrl = nftInfo.token_uri;
              if (ipfsUrl.startsWith("ipfs://")) {
                ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsUrl.replace("ipfs://", "")}`;
              }
              // Metadata'yı IPFS'den çek
              const metaRes = await fetch(ipfsUrl);
              const meta = await metaRes.json();
              return {
                id: token_id,
                title: meta.name || "Untitled",
                content: meta.description || "",
                imageUrl: meta.image || "https://picsum.photos/seed/default/600/400",
                authorUsername: meta.author || "Unknown",
                authorPFP: meta.authorPFP || "https://picsum.photos/seed/guestpfp/100/100",
                timestamp: meta.timestamp || "",
              } as PostMeta;
            } catch (err) {
              return undefined;
            }
          })
        )).filter((p): p is PostMeta => !!p);
        setPosts(posts);
      } catch (err) {
        setError("Failed to fetch posts from blockchain.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [client]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 py-20 text-center text-white pt-20">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Community Vault
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-300 md:text-xl">
        A decentralized, community-governed reward platform.
      </p>

      <Link
        href="/posts/new"
        className="mt-10 inline-block rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-400/50"
      >
        Create New Post
      </Link>

      {/* Posts list */}
      <section className="mt-16 flex w-full max-w-2xl flex-col items-center gap-8">
        {loading && <div>Loading posts from blockchain...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={{
              ...post,
              timestamp: post.timestamp ? new Date(post.timestamp) : new Date(),
              comments: [],
              totalTips: 0,
              reactions: [],
            }}
          />
        ))}
        {!loading && posts.length === 0 && <div>No posts found.</div>}
      </section>
    </main>
  );
}
