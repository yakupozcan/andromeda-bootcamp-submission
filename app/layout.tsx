import React, { ReactNode } from "react";
import "@/styles/globals.css";
import Providers from "./providers";
import { Metadata } from "next";
import PoweredByLogo from "@/modules/ui/PoweredByLogo";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: {
    default: "Community Vault",
    template: "%s | Community Vault",
  },
  description: "A decentralized, community-governed reward platform.",
};

interface Props {
  children?: ReactNode;
}

const RootLayout = async (props: Props) => {
  const { children } = props;

  return (
    <html lang="en">
      <body className="dark">
        <Providers>
          <Header />
          {children}
          <PoweredByLogo />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
