"use client";

import { cn } from "@/shared/lib/utils";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface OrbAvatarProps {
  size?: number;
  className?: string;
}

export default function OrbAvatar({ size = 24, className = "" }: OrbAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure the video plays automatically and loops
      video.play().catch(console.error);
    }
  }, []);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-full shadow-2xl ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: 1,
        transition: { duration: 0.3 },
      }}
    >
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full blur-sm animate-pulse" />

      {/* Inner orb container */}
      <motion.div
        className={cn("relative w-full h-full rounded-full overflow-hidden backdrop-blur-sm")}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => {
            // Ensure video starts playing when loaded
            videoRef.current?.play().catch(console.error);
          }}
        >
          <source src="/orb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-full" />
      </motion.div>

      {/* Animated ring effect */}
      <div
        className="absolute inset-0 rounded-full border border-white/30 animate-spin"
        style={{ animationDuration: "8s" }}
      />
    </motion.div>
  );
}
