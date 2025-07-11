import React from "react";

// ------------------- Types -------------------
export type Reaction = {
  emoji: string;
  count: number;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorUsername: string;
  authorPFP: string;
  imageUrl: string;
  totalTips: number;
  reactions: Reaction[];
};

// Static placeholder reactions (until backend hooks up)
const PLACEHOLDER_REACTIONS: Reaction[] = [
  { emoji: "❤️", count: 6 },
  { emoji: "👍", count: 3 },
];

// ------------------- Component -------------------
interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { title, content, authorUsername, authorPFP, imageUrl, totalTips } = post;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg">
      {/* Section 1: Image */}
      <img src={imageUrl} alt={title} className="h-56 w-full object-cover" />

      {/* Section 2: Header */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <img
            src={authorPFP}
            alt="author PFP"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="font-medium text-gray-200">@{authorUsername}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-indigo-400 font-semibold">
            {totalTips} ANDR
          </span>
          <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50">
            Reward
          </button>
        </div>
      </div>

      {/* Section 3: Body */}
      <div className="flex flex-col gap-2 px-4 py-4 text-left">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-gray-300 line-clamp-4 text-sm">{content}</p>
      </div>

      {/* Section 4: Footer / Reactions */}
      <div className="flex items-center justify-between border-t border-gray-700 px-4 py-2 text-sm">
        <button className="rounded-md px-3 py-1 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none">
          Comments
        </button>
        <div className="flex items-center gap-2">
          {PLACEHOLDER_REACTIONS.map((r) => (
            <span
              key={r.emoji}
              className="flex items-center gap-1 rounded-md bg-gray-700 px-2 py-0.5 text-gray-200"
            >
              {r.emoji} {r.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
