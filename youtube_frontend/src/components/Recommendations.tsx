"use client";

import React from "react";
import * as api from "@/lib/api/client";
import type { Video } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { formatDate, formatViews } from "@/lib/utils";

export default function Recommendations({ currentId }: { currentId?: string }) {
  const [items, setItems] = React.useState<Video[]>([]);
  React.useEffect(() => {
    let active = true;
    api.listRecommendations(currentId, 8).then((v) => {
      if (active) setItems(v);
    });
    return () => {
      active = false;
    };
  }, [currentId]);

  return (
    <div className="space-y-3">
      {items.map((v) => (
        <Link key={v.id} href={`/watch/${v.id}`} className="flex gap-3 rounded-md hover:bg-gray-50 p-2">
          <div className="relative aspect-video w-40 flex-none overflow-hidden rounded">
            <Image src={v.thumbnailUrl} alt={v.title} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold text-gray-900">{v.title}</p>
            <p className="mt-0.5 text-xs text-gray-600">{v.channelName}</p>
            <p className="mt-0.5 text-xs text-gray-500">
              {formatViews(v.views)} • {formatDate(v.createdAt)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
