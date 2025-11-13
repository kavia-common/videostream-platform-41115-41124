"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import VideoGrid from "@/components/VideoGrid";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q") || "";

  return (
    <div className="space-y-4">
      <h1 className="h2">Search results for &quot;{q}&quot;</h1>
      <VideoGrid query={q} />
    </div>
  );
}
