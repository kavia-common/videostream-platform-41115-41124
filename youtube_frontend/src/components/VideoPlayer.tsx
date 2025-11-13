"use client";

import React from "react";
import type { Video } from "@/lib/types";

export default function VideoPlayer({ video }: { video: Video }) {
  if (!video.videoUrl) {
    return (
      <div className="aspect-video w-full rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600">
        <div className="text-center">
          <p className="font-medium">No video file available</p>
          <p className="text-sm">This is a placeholder preview.</p>
        </div>
      </div>
    );
  }
  return (
    <video
      className="aspect-video w-full rounded-lg border border-gray-200 bg-black"
      controls
      preload="metadata"
      poster={video.posterUrl}
    >
      <source src={video.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
