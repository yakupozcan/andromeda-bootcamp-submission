import { create } from "zustand";
import { Comment, Post, generateMockPosts } from "@/lib/mock-data";

interface StoreState {
  posts: Post[];
  addComment: (
    postId: string,
    newComment: Omit<Comment, "id" | "timestamp">,
  ) => void;
  addPost: (
    data: Omit<Post, "id" | "timestamp" | "comments" | "totalTips" | "reactions"> & {
      imageUrl: string;
    },
  ) => void;
}

function recalculatePost(post: Post): Post {
  let totalTips = 0;
  const emojiCounts: Record<string, number> = {};

  post.comments.forEach((c) => {
    totalTips += c.tipAmount;
    new Set(c.emojis).forEach((e) => {
      emojiCounts[e] = (emojiCounts[e] || 0) + 1;
    });
  });

  const reactions = Object.entries(emojiCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([emoji, count]) => ({ emoji, count }));

  return { ...post, totalTips, reactions };
}

export const useStore = create<StoreState>()((set) => ({
  posts: generateMockPosts(),
  addComment: (postId, newComment) => {
    set((state) => {
      const posts = state.posts.map((p) => {
        if (p.id !== postId) return p;
        const comment: Comment = {
          id: Date.now().toString(),
          timestamp: new Date(),
          ...newComment,
        };
        const updated = { ...p, comments: [...p.comments, comment] };
        return recalculatePost(updated);
      });
      return { posts };
    });
  },
  addPost: (data) => {
    set((state) => {
      const newPost: Post = {
        id: Date.now().toString(),
        timestamp: new Date(),
        title: data.title,
        content: data.content,
        authorUsername: data.authorUsername,
        authorPFP: data.authorPFP,
        imageUrl: data.imageUrl,
        comments: [],
        totalTips: 0,
        reactions: [],
      } as Post;

      return { posts: [newPost, ...state.posts] };
    });
  },
})); 