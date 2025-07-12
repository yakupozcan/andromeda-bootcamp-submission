import React from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { generateMockPosts } from "@/lib/mock-data";

export default function Home() {
  // Mock data – replace with real data when backend is ready
  const mockPosts = generateMockPosts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-900 px-4 py-20 text-center text-white">
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
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
