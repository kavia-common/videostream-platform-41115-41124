import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { Video } from "@/lib/types";
import { classNames, formatDate, formatDuration, formatViews } from "@/lib/utils";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <Link
      href={`/watch/${video.id}`}
      className={classNames(
        "group block rounded-lg border border-transparent hover:border-blue-100 hover-elevate bg-white"
      )}
      aria-label={`Watch ${video.title} by ${video.channelName}`}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          priority={false}
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{video.title}</h3>
        <p className="mt-1 text-xs text-gray-600">{video.channelName}</p>
        <p className="mt-1 text-xs text-gray-500">
          {formatViews(video.views)} • {formatDate(video.createdAt)}
        </p>
      </div>
    </Link>
  );
}
