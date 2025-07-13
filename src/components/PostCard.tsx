import React from "react";
import Link from "next/link";
import { Post } from "@/lib/mock-data";

// ------------------- Helpers -------------------

const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffDays < 1) {
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// No aggregation needed; data now pre-computed in mock data.

// ------------------- Component -------------------

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { title, content, authorUsername, authorPFP, imageUrl, timestamp, totalTips, reactions } = post;
  const formattedDate = formatDate(new Date(timestamp));

  return (
    <Link
      href={`/post/${post.id}`}
      className="relative flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg transition hover:ring-2 hover:ring-indigo-500"
    >
      {/* Vertical separator bar on the left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gray-700/60"></div>

      <div className="grid grid-cols-3 items-center border-b border-gray-700 bg-gray-800 pl-6 pr-4 py-2 text-sm">
        {/* Username */}
        <span className="text-left font-medium text-gray-200">@{authorUsername}</span>

        {/* PFP */}
        <div className="flex justify-center">
          <img
            src={authorPFP}
            alt="pfp"
            className="h-14 w-14 rounded-full object-cover"
          />
        </div>

        {/* Timestamp */}
        <span className="text-right text-gray-400">{formattedDate}</span>
      </div>

      {/* Image */}
      <img src={imageUrl} alt={title} className="h-56 w-full object-cover" />

      {/* Section 3: Body */}
      <div className="flex flex-col gap-2 pl-6 pr-4 py-4 text-left">
        <h2 className="text-lg font-bold text-white line-clamp-2">{title}</h2>
        <p className="text-gray-300 line-clamp-3 text-sm">{content}</p>
      </div>

      {/* Section 4: Footer */}
      <div className="flex items-center justify-between border-t border-gray-700 pl-6 pr-4 py-2 text-sm">
        <button className="rounded-md px-3 py-1 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none">
          Comments
        </button>
        <div className="flex items-center gap-3">
          <span className="text-indigo-400 font-semibold text-xs">{totalTips} ANDR</span>
          {reactions.slice(0,7).map((r) => (
            <span
              key={r.emoji}
              className="flex items-center gap-1 rounded-md bg-gray-700 px-2 py-0.5 text-gray-200 text-xs"
            >
              {r.emoji} {r.count}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
