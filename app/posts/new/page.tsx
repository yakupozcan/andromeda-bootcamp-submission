'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { useAndromedaStore } from "@/zustand/andromeda";
import { executeContract } from "@/lib/andrjs/functions";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const addPost = useStore((s) => s.addPost);
  const router = useRouter();

  // Andromeda wallet context
  const client = useAndromedaClient();
  const walletAddress = useAndromedaStore(
    (state) => state.accounts[0]?.address ?? "",
  );

  // Upload selected image to Pinata and return its IPFS hash (CID)
  const uploadToPinata = async (file: File) => {
    const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
    if (!JWT) {
      console.error("Pinata JWT is not set in environment variables.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      return res.data.IpfsHash as string;
    } catch (error) {
      console.error("Failed to upload to Pinata", error);
      return null;
    }
  };

  // Create metadata JSON and upload it to Pinata, returning its CID
  const uploadMetadataToPinata = async (
    title: string,
    content: string,
    imageCid: string
  ) => {
    const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
    if (!JWT) {
      console.error("Pinata JWT is not set in environment variables.");
      return null;
    }

    // Kullanıcı adı ve profil fotoğrafını localStorage'dan al
    const userName = typeof window !== "undefined" ? localStorage.getItem("username") || "Unknown" : "Unknown";
    const userPFP = typeof window !== "undefined" ? localStorage.getItem("pfp") || "https://picsum.photos/seed/guestpfp/100/100" : "https://picsum.photos/seed/guestpfp/100/100";

    const metadata = {
      name: title,
      description: content,
      image: `https://gateway.pinata.cloud/ipfs/${imageCid}`,
      author: userName,
      authorPFP: userPFP,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      return res.data.IpfsHash as string;
    } catch (error) {
      console.error("Failed to upload metadata to Pinata", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!client || !walletAddress) {
      setStatus("Cüzdan bağlı değil. Lütfen önce cüzdanınızı bağlayın.");
      return;
    }

    setIsLoading(true);
    setStatus("Uploading image to IPFS...");

    try {
      let imageUrl = "https://picsum.photos/seed/default/600/400";
      let imageCid = "";
      if (imageFile) {
        setStatus("Uploading image...");
        const uploadedCid = await uploadToPinata(imageFile);
        imageCid = uploadedCid ? uploadedCid : "";
        if (imageCid) {
          imageUrl = `https://gateway.pinata.cloud/ipfs/${imageCid}`;
        }
      }

      setStatus("Uploading metadata to IPFS...");
      // Metadata'ya author ve timestamp ekle
      const metadataCid = await uploadMetadataToPinata(
        title,
        content,
        imageCid
      );
      if (!metadataCid) throw new Error("Metadata IPFS yüklenemedi");

      setStatus("Minting NFT on blockchain...");
      await mintNFT(metadataCid);
      setStatus("Success! Redirecting...");
      router.push("/");
    } catch (err) {
      console.error(err);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mint the NFT of the post using metadata CID
  const mintNFT = async (metadataCid: string) => {
    const NFT_CONTRACT_ADDRESS = "andr1d9lez0z6jhf00dxhcgyg7hlvru89gupjs3h6xlcp9qdpvhpqm7cqmm7nld";
    const mintMsg = {
      mint: {
        token_id: `post-${Date.now()}`,
        owner: walletAddress,
        token_uri: `ipfs://${metadataCid}`,
        extension: { publisher: walletAddress },
      },
    };

    try {
      if (!client) throw new Error("Wallet not connected");
      await executeContract(client, NFT_CONTRACT_ADDRESS, mintMsg);
    } catch (err) {
      console.error("Failed to mint NFT", err);
      throw err;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-900 px-4 py-20 text-white">
      <h1 className="mb-8 text-center text-3xl font-extrabold sm:text-4xl md:text-5xl">
        Create a New Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-6 rounded-lg bg-gray-800 p-8 shadow-md"
      >
        <div className="flex flex-col text-left">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-300">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            placeholder="Enter post title"
          />
        </div>

        <div className="flex flex-col text-left">
          <label htmlFor="content" className="mb-2 font-semibold text-gray-300">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
            className="rounded-md border border-gray-600 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
            placeholder="Write post content here"
          />
        </div>

        {/* Image upload section */}
        <div className="flex flex-col text-left">
          <label htmlFor="image" className="mb-2 font-semibold text-gray-300">
            Image (Optional)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setImageFile(file);
            }}
            className="cursor-pointer rounded-md border border-gray-600 bg-gray-700 p-3 text-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
          />

          {/* Preview */}
          {imageFile && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Seçilen görsel önizlemesi"
                className="h-40 w-auto rounded-md border border-gray-600 object-contain"
              />
            </div>
          )}
        </div>

        {status && (
          <p className="text-sm text-gray-300">{status}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-block w-full rounded-lg bg-indigo-600 px-6 py-3 text-center text-base font-semibold shadow-md transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Processing..." : "Create Post"}
        </button>
      </form>
    </main>
  );
} 