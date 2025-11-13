"use client";

import React from "react";
import VideoCard from "./VideoCard";
import type { Video } from "@/lib/types";
import * as api from "@/lib/api/client";
import { CardSkeleton } from "./Skeletons";
import { useStore } from "@/lib/state/store";

export default function VideoGrid({ query }: { query?: string }) {
  const { state } = useStore();
  const [loading, setLoading] = React.useState(true);
  const [videos, setVideos] = React.useState<Video[]>([]);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    const load = async () => {
      try {
        let data: Video[] = [];
        if (query) {
          data = await api.searchVideos(query);
        } else if (state.selectedCategory && state.selectedCategory !== "all") {
          data = await api.listByCategory(state.selectedCategory);
        } else {
          data = await api.listVideos({ limit: 24 });
        }
        if (active) setVideos(data);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [query, state.selectedCategory]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!videos.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-600">
        No videos found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}
