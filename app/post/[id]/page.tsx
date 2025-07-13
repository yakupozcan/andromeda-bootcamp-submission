'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import PostCard from "@/components/PostCard";
import { useStore } from "@/lib/store";

// We'll pull the correct post via generateMockPosts()

const emojis = ["❤️", "👍", "😂", "😮", "🤔", "🔥", "🚀"];

export default function PostDetailPage() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [tipAmount, setTipAmount] = useState("");

  const formatDate = (d: Date) => {
    const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60);
    if (diff < 24) return `${Math.floor(diff)}h ago`;
    const days = Math.floor(diff / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  };

  const postId = typeof id === "string" ? id : undefined;

  const { posts, addComment } = useStore((state) => state);
  const currentPost = posts.find((p) => p.id === postId) || posts[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Comments Column */}
        <aside className="space-y-6 md:col-span-1">
          <h2 className="text-xl font-bold">Comments</h2>

          <ul className="space-y-4">
            {currentPost.comments.map((c) => (
              <li key={c.id} className="flex gap-3 rounded-md bg-gray-800 p-4">
                <img src={c.authorPFP} className="h-8 w-8 rounded-full object-cover" />
                <div className="flex-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-indigo-400">@{c.authorUsername}</span>
                    <span className="text-gray-400">{formatDate(new Date(c.timestamp))}</span>
                    {c.tipAmount > 0 && (
                      <span className="ml-auto rounded bg-indigo-600 px-2 py-0.5 text-xs font-semibold">
                        Tipped {c.tipAmount} ANDR
                      </span>
                    )}
                  </div>
                  {c.text && <p className="mt-1 text-gray-300">{c.text}</p>}
                  {c.emojis.length > 0 && (
                    <div className="mt-1 flex gap-1 text-lg">
                      {c.emojis.map((e) => (
                        <span key={e}>{e}</span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Comment Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!comment.trim()) return;
              addComment(currentPost.id, {
                authorUsername: "Guest",
                authorPFP: "https://picsum.photos/seed/guest/80/80",
                text: comment,
                emojis: [],
                tipAmount: Number(tipAmount) || 0,
              });
              setComment("");
              setTipAmount("");
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
            {/* Tip input */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder="Tip (Optional)"
                className="w-32 rounded-md border border-gray-600 bg-gray-800 p-2 text-sm text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                min="0"
              />
              <span className="text-sm text-gray-300">CONST</span>
            </div>

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