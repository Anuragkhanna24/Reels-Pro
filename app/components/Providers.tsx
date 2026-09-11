"use client";

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "imagekitio-next";
import { NotificationProvider } from "./Notification";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

if (!urlEndpoint || !publicKey) {
  console.error("Missing ImageKit configuration in environment variables");
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const res = await fetch("/api/imagekit-auth");
      if (!res.ok) {
        const errorData = await res.json();
        console.error("ImageKit auth response error:", errorData);
        throw new Error(
          errorData.details || "Failed to authenticate with ImageKit",
        );
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("ImageKit authenticator error:", error);
      throw error;
    }
  };

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <NotificationProvider>
        <ImageKitProvider
          publicKey={publicKey || ""}
          urlEndpoint={urlEndpoint || ""}
          authenticator={authenticator}
        >
          {children}
        </ImageKitProvider>
      </NotificationProvider>
    </SessionProvider>
  );
}
