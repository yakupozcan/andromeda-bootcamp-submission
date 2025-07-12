// Mock data types and generator for social feed
// -------------------------------------------------

export type Comment = {
  id: string;
  authorUsername: string;
  authorPFP: string; // profile picture URL
  text: string; // may be empty if only tip / emojis
  emojis: string[];
  tipAmount: number; // 0 when no tip
};

export type Post = {
  id: string;
  authorUsername: string;
  authorPFP: string;
  timestamp: Date;
  title: string;
  content: string;
  imageUrl: string;
  comments: Comment[];
};

// Helper to build relative dates
const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000);
const daysAgo = (d: number) => hoursAgo(d * 24);

// Generator
export const generateMockPosts = (): Post[] => {
  const posts: Post[] = [
    {
      id: "1",
      authorUsername: "VaultExplorer",
      authorPFP: "https://picsum.photos/seed/pfp1/100/100",
      timestamp: hoursAgo(4),
      title: "Welcome to the Vault",
      content: "Kick-starting our community vault project. Share your ideas below!",
      imageUrl: "https://picsum.photos/seed/post1/600/400",
      comments: [
        {
          id: "c1-1",
          authorUsername: "ChainGuru",
          authorPFP: "https://picsum.photos/seed/cg/80/80",
          text: "Great initiative!",
          emojis: [],
          tipAmount: 0,
        },
        {
          id: "c1-2",
          authorUsername: "EmojiFan",
          authorPFP: "https://picsum.photos/seed/ef/80/80",
          text: "",
          emojis: ["🚀", "🔥"],
          tipAmount: 0,
        },
        {
          id: "c1-3",
          authorUsername: "Tipster",
          authorPFP: "https://picsum.photos/seed/tip/80/80",
          text: "",
          emojis: [],
          tipAmount: 25,
        },
        {
          id: "c1-4",
          authorUsername: "HybridUser",
          authorPFP: "https://picsum.photos/seed/hy/80/80",
          text: "Love this ❤️",
          emojis: ["❤️"],
          tipAmount: 10,
        },
      ],
    },
    {
      id: "2",
      authorUsername: "NFT_Hunter",
      authorPFP: "https://picsum.photos/seed/pfp2/100/100",
      timestamp: daysAgo(1),
      title: "Hunting Rare NFTs",
      content: "Just snagged a rare piece on the marketplace—what do you think?",
      imageUrl: "https://picsum.photos/seed/post2/600/400",
      comments: [
        {
          id: "c2-1",
          authorUsername: "ArtLover",
          authorPFP: "https://picsum.photos/seed/al/80/80",
          text: "Looks amazing!",
          emojis: ["😍"],
          tipAmount: 0,
        },
        {
          id: "c2-2",
          authorUsername: "Collector42",
          authorPFP: "https://picsum.photos/seed/co/80/80",
          text: "",
          emojis: ["👏"],
          tipAmount: 5,
        },
      ],
    },
    {
      id: "3",
      authorUsername: "DAO_Philosopher",
      authorPFP: "https://picsum.photos/seed/pfp3/100/100",
      timestamp: daysAgo(5),
      title: "Philosophy of DAOs",
      content: "Decentralized governance raises deep questions—let's discuss!",
      imageUrl: "https://picsum.photos/seed/post3/600/400",
      comments: [
        {
          id: "c3-1",
          authorUsername: "Thinker",
          authorPFP: "https://picsum.photos/seed/th/80/80",
          text: "Interesting perspective 🤔",
          emojis: ["🤔"],
          tipAmount: 0,
        },
      ],
    },
    {
      id: "4",
      authorUsername: "ChainExplorer",
      authorPFP: "https://picsum.photos/seed/pfp4/100/100",
      timestamp: daysAgo(10),
      title: "New Opportunities on the Blockchain",
      content: "Exploring fresh opportunities in the blockchain world!",
      imageUrl: "https://picsum.photos/seed/post4/600/400",
      comments: [
        {
          id: "c4-1",
          authorUsername: "OpportunitySeeker",
          authorPFP: "https://picsum.photos/seed/os/80/80",
          text: "I'm in! 🚀",
          emojis: ["🚀"],
          tipAmount: 0,
        },
        {
          id: "c4-2",
          authorUsername: "Investor",
          authorPFP: "https://picsum.photos/seed/inv/80/80",
          text: "",
          emojis: [],
          tipAmount: 100,
        },
      ],
    },
    {
      id: "5",
      authorUsername: "SmartContractor",
      authorPFP: "https://picsum.photos/seed/pfp5/100/100",
      timestamp: daysAgo(20),
      title: "Let’s Talk Smart Contracts",
      content: "Starting a discussion about smart contracts!",
      imageUrl: "https://picsum.photos/seed/post5/600/400",
      comments: [
        {
          id: "c5-1",
          authorUsername: "DevDave",
          authorPFP: "https://picsum.photos/seed/dd/80/80",
          text: "Here's a tip for your great work!",
          emojis: [],
          tipAmount: 50,
        },
        {
          id: "c5-2",
          authorUsername: "LaughingLarry",
          authorPFP: "https://picsum.photos/seed/ll/80/80",
          text: "",
          emojis: ["😂"],
          tipAmount: 0,
        },
        {
          id: "c5-3",
          authorUsername: "SeriousSusan",
          authorPFP: "https://picsum.photos/seed/ss/80/80",
          text: "Great insights 🔥",
          emojis: ["🔥"],
          tipAmount: 0,
        },
      ],
    },
  ];

  return posts;
};
