"use client";

import React from "react";
import { useParams } from "next/navigation";
import * as api from "@/lib/api/client";
import type { Video } from "@/lib/types";
import { PlayerSkeleton } from "@/components/Skeletons";
import VideoPlayer from "@/components/VideoPlayer";
import { formatDate, formatViews } from "@/lib/utils";
import Recommendations from "@/components/Recommendations";



export default function WatchPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [video, setVideo] = React.useState<Video | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [showDesc, setShowDesc] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    api.getVideoById(String(id)).then((v) => {
      if (active) setVideo(v);
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading || !video) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PlayerSkeleton />
        </div>
        <div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 rounded bg-gray-100 shimmer" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <VideoPlayer video={video} />
        <h1 className="mt-4 text-xl font-semibold text-gray-900">{video.title}</h1>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{video.channelName}</span>
            <span className="mx-2">•</span>
            <span>{formatViews(video.views)}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(video.createdAt)}</span>
          </div>
          {/* UI-only actions */}
          <div className="flex items-center gap-2">
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">Like</button>
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">Share</button>
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">Save</button>
          </div>
        </div>

        <div className="mt-4 rounded-lg border bg-white p-4">
          <button
            onClick={() => setShowDesc((s) => !s)}
            className="text-sm font-medium text-gray-900"
            aria-expanded={showDesc}
          >
            Description
          </button>
          {showDesc && <p className="mt-2 whitespace-pre-line text-sm text-gray-700">{video.description}</p>}
        </div>
      </div>
      <div>
        <Recommendations currentId={video.id} />
      </div>
    </div>
  );
}
