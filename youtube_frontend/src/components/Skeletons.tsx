import React from "react";

export function CardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video w-full rounded-lg bg-gray-200 shimmer" />
      <div className="mt-3 h-4 w-3/4 rounded bg-gray-200 shimmer" />
      <div className="mt-2 h-3 w-1/2 rounded bg-gray-200 shimmer" />
    </div>
  );
}

export function PlayerSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video w-full rounded-lg bg-gray-200 shimmer" />
      <div className="mt-4 h-5 w-1/2 rounded bg-gray-200 shimmer" />
      <div className="mt-2 h-4 w-1/3 rounded bg-gray-200 shimmer" />
    </div>
  );
}
