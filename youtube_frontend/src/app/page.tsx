"use client";

import PillTabs from "@/components/PillTabs";
import VideoGrid from "@/components/VideoGrid";

export default function Home() {
  return (
    <div className="space-y-4">
      <PillTabs />
      <VideoGrid />
    </div>
  );
}
