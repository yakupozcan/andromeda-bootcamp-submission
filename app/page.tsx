import React from "react";
import Link from "next/link";
import PostCard, { Post } from "@/components/PostCard";

export default function Home() {
  // Mock data – replace with real data when backend is ready
  const mockPosts: Post[] = [
    {
      id: "1",
      title: "Welcome to the Vault",
      content:
        "This is a sample post created for the community vault while we wait for testnet tokens.",
      authorUsername: "VaultExplorer",
      authorPFP: "https://picsum.photos/seed/pfp1/100/100",
      imageUrl: "https://picsum.photos/seed/p1/600/400",
      totalTips: 15,
      reactions: [
        { emoji: "❤️", count: 8 },
        { emoji: "👍", count: 4 },
      ],
    },
    {
      id: "2",
      title: "Hunting Rare NFTs",
      content:
        "Another example post. This will be updated once real data arrives.",
      authorUsername: "NFT_Hunter",
      authorPFP: "https://picsum.photos/seed/pfp2/100/100",
      imageUrl: "https://picsum.photos/seed/p2/600/400",
      totalTips: 9,
      reactions: [
        { emoji: "❤️", count: 5 },
        { emoji: "👍", count: 2 },
      ],
    },
    {
      id: "3",
      title: "Philosophy of DAOs",
      content:
        "A final example post. The reward button is not functional yet.",
      authorUsername: "DAO_Philosopher",
      authorPFP: "https://picsum.photos/seed/pfp3/100/100",
      imageUrl: "https://picsum.photos/seed/p3/600/400",
      totalTips: 22,
      reactions: [
        { emoji: "❤️", count: 10 },
        { emoji: "👍", count: 6 },
      ],
    },
  ];
  mockPosts.push(
    {
      id: "4",
      title: "New Opportunities on the Blockchain",
      content: "Exploring fresh opportunities in the blockchain world!",
      authorUsername: "ChainExplorer",
      authorPFP: "https://picsum.photos/seed/pfp4/100/100",
      imageUrl: "https://picsum.photos/seed/p4/600/400",
      totalTips: 5,
      reactions: [
        { emoji: "❤️", count: 2 },
        { emoji: "👍", count: 1 },
      ],
    },
    {
      id: "5",
      title: "Let’s Talk Smart Contracts",
      content: "Starting a discussion about smart contracts!",
      authorUsername: "SmartContractor",
      authorPFP: "https://picsum.photos/seed/pfp5/100/100",
      imageUrl: "https://picsum.photos/seed/p5/600/400",
      totalTips: 12,
      reactions: [
        { emoji: "❤️", count: 7 },
        { emoji: "👍", count: 3 },
      ],
    },
  );

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
      <section className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
