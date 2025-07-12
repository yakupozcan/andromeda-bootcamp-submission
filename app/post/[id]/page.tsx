'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import PostCard from "@/components/PostCard";
import { generateMockPosts } from "@/lib/mock-data";

// We'll pull the correct post via generateMockPosts()

const emojis = ["❤️", "👍", "😂", "😮", "🤔", "🔥", "🚀"];

export default function PostDetailPage() {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const mockComments = [
    { user: "CryptoCat", text: "Love this post!" },
    { user: "ChainGuru", text: "Very insightful, thanks for sharing." },
    { user: "BlockFan", text: "Can’t wait to see where this goes 🚀" },
  ];

  const postId = typeof id === "string" ? id : undefined;

  const allPosts = generateMockPosts();
  const currentPost = allPosts.find((p) => p.id === postId) || allPosts[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Comments Column */}
        <aside className="space-y-6 md:col-span-1">
          <h2 className="text-xl font-bold">Comments</h2>

          <ul className="space-y-4">
            {mockComments.map((c, idx) => (
              <li key={idx} className="rounded-md bg-gray-800 p-4">
                <p className="text-sm font-semibold text-indigo-400">@{c.user}</p>
                <p className="text-gray-300 text-sm mt-1">{c.text}</p>
              </li>
            ))}
          </ul>

          {/* Comment Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!comment.trim()) return;
              alert("Comment submitted: " + comment);
              setComment("");
            }}
            className="space-y-3 rounded-md bg-gray-900 p-4"
          >
            <div className="flex gap-2 text-xl">
              {emojis.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setComment((prev) => prev + emoji)}
                  className="transition hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Write your comment..."
              className="w-full rounded-md border border-gray-600 bg-gray-800 p-3 text-sm text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            >
              Submit Comment
            </button>
          </form>
        </aside>

        {/* Post Column */}
        <section className="md:col-span-2">
          <PostCard post={currentPost} />
        </section>
      </div>
    </main>
  );
} 