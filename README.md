# ⭐ Community Vault

**[▶️ Live Demo on Vercel](https://andromeda-bootcamp-submission.vercel.app/)**

---

### ⭐ Project Description

Community Vault is a decentralized social platform built on the Andromeda Testnet. It reimagines a social feed where content is truly owned by its creator. Each post, complete with an image and text, is minted as a unique NFT on the blockchain, creating a permanent and uncensorable record. This project serves as a proof-of-concept for a new generation of community-governed applications.

### ⭐ Project Vision

The long-term vision for the Community Vault is to evolve into a fully-fledged Decentralized Autonomous Organization (DAO). The goal is to create a self-sustaining ecosystem where the community not only creates the content but also governs the platform. Future versions will empower users to vote on proposals, manage a collective treasury funded by on-chain rewards, and truly own the platform they help build. This project aims to be a foundation for a more transparent, fair, and collaborative digital society.

### ⭐ Key Features

-   **NFT as Content:** Create posts with a title, content, and an image, which are then minted as a CW721 NFT on the Andromeda Testnet.
-   **On-Chain Data:** The main feed fetches and displays all post-NFTs directly from our custom smart contract.
-   **Decentralized Storage:** All post images and metadata are uploaded to IPFS via Pinata for permanent, decentralized storage.
-   **Web3 Wallet Integration:** Seamlessly connect with the Keplr wallet to interact with the platform.
-   **Modern Tech Stack:** Built with Next.js, React, and TypeScript for a fast, modern, and type-safe user experience.

### ⭐ Future Scope

-   **On-Chain Tipping & Rewards:** Implementing a direct peer-to-peer reward system.
-   **DAO & Treasury Management:** Introducing a community-governed treasury and on-chain voting for proposals.
-   **Rich Social Features:** Building out a richer social experience with on-chain comments, emoji reactions, and user profiles.

---

### 🚀 About Me

-   **Name:** Ekrem Özcan
-   **Bio:** A Computer Programming graduate from Turkey, passionate about diving deep into new technologies. This project is a part of my intensive learning operation, the "React Cooker," to master the React and Web3 ecosystems.
-   **Bootcamp:** Transition to Web3 Bootcamp Learner @riseinweb3 | #RiseInWeb3
-   **Connect:** You can follow my journey and other projects at my **[React-Cooker Organization on GitHub](https://github.com/React-Cooker)**.

---

### 🛠️ How to Install and Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yakupozcan/andromeda-bootcamp-submission.git](https://github.com/yakupozcan/andromeda-bootcamp-submission.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd andromeda-bootcamp-submission
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up your environment variables:**
    -   Create a `.env.local` file in the root directory.
    -   Add your Pinata JWT key: `NEXT_PUBLIC_PINATA_JWT='YOUR_PINATA_JWT_KEY'`

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
