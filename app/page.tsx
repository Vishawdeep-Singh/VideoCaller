"use client";

import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const AgoraRTCProvider = dynamic(
  () => import("agora-rtc-react").then((mod) => mod.AgoraRTCProvider),
  { ssr: false }
);

const Basics = dynamic(() => import("@/components/basics"), { ssr: false })


export default function Home() {
  
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  useEffect(() => {
    const rtcClient = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
    setClient(rtcClient);
  }, []);

  if (!client) return null;
  return (
    
  
    <AgoraRTCProvider client={client}>
    <Basics></Basics>
    </AgoraRTCProvider>
    
  );
}