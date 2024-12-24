"use client";
import React, { useState } from "react";
import {
  useJoin,
  useIsConnected,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  LocalUser,
  RemoteUser,
} from "agora-rtc-react";
import { Mic, MicOff, Camera, CameraOff, PhoneCall, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const dynamic = "force-dynamic";

const Basics = () => {
  const [calling, setCalling] = useState(false);
//   const [screenSharing, setScreenSharing] = useState(false);
  const appId = process.env.NEXT_PUBLIC_PUBLIC_AGORA_APP_ID
  const channel = process.env.NEXT_PUBLIC_AGORA_CHANNEL_NAME
  const token=process.env.NEXT_PUBLIC_AGORA_APP_TOKEN

  const [uid, setUid] = useState<string>("");
//   const [screenTrack, setScreenTrack] = useState<any>(null);
//   const [joined, setJoined] = useState(false);
  const isConnected = useIsConnected();
  useJoin({ appid: appId as string, channel: channel as string, token: token || null, uid: uid }, calling);
  // Local user tracks
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);


  // Remote users
 
 

  // Join the channel


 

//     return () => {
//       if (client) {
//         client.removeAllListeners();
//       }
//     };
//   }, [client, screenTrack]);

//   const startScreenShare = async () => {
//     if (!client || !joined) {
//       console.error("Client not initialized or not joined");
//       return;
//     }

//     try {
//       const screenVideoTrack = await AgoraRTC.createScreenVideoTrack({
//         encoderConfig: "1080p_1",
//         optimizationMode: "detail",
//       });

//       // Unpublish camera if it's active
//       if (cameraOn && localCameraTrack) {
//         await client.unpublish(localCameraTrack);
//       }

//       // Publish screen track
//       await client.publish(screenVideoTrack);
//       setScreenTrack(screenVideoTrack);
//       setScreenSharing(true);

//       if (Array.isArray(screenVideoTrack)) {
//         screenVideoTrack[0].on("track-ended", stopScreenShare);
//       } else {
//         screenVideoTrack.on("track-ended", stopScreenShare);
//       }
//     } catch (error) {
//       console.error("Error starting screen share:", error);
//       setScreenSharing(false);
//     }
//   };

//   const stopScreenShare = async () => {
//     if (!client || !joined) {
//       console.error("Client not initialized or not joined");
//       return;
//     }

//     try {
//       if (screenTrack) {
//         await client.unpublish(screenTrack);
//         screenTrack.close();
//         setScreenTrack(null);

//         if (cameraOn && localCameraTrack) {
//           await client.publish(localCameraTrack);
//         }
//       }
//       setScreenSharing(false);
//     } catch (error) {
//       console.error("Error stopping screen share:", error);
//     }
//   };
usePublish([localMicrophoneTrack, localCameraTrack]);

const remoteUsers = useRemoteUsers();
return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        {isConnected ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div className="relative user">
              <LocalUser
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">You</span>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="relative user" key={user.uid}>
                <RemoteUser cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg" user={user}>
                  <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">{user.uid}</span>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Image
              src="https://cdn.prod.website-files.com/660affa848e8af81bdd03909/66ab7f671fb90c022fb7f1dc_Agora%20Logo%20Crisp.webp"
              alt="Agora Logo"
              width={200}
              height={50}
              className="mb-8"
            />
           
            <Input
              className="max-w-md"
              onChange={e => setUid(e.target.value)}
              placeholder="Your Name"
              value={uid}
            />
            <Button
              className="w-full max-w-md"
              disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              Join Channel
            </Button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMic(a => !a)}
            >
              {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCamera(a => !a)}
            >
              {cameraOn ? <Camera className="h-4 w-4" /> : <CameraOff className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            variant={calling ? "destructive" : "default"}
            size="icon"
            onClick={() => setCalling(a => !a)}
          >
            {calling ? <PhoneOff className="h-4 w-4" /> : <PhoneCall className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Basics;
