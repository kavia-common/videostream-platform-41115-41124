"use client";

import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import { useStore } from "@/lib/state/store";
import { classNames } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className={classNames(
        "sticky top-0 z-40 w-full border-b border-gray-200",
        "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      )}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Image src="/assets/logo.svg" alt="Logo" width={28} height={28} />
          <span className="text-xl font-semibold text-gray-900">OceanTube</span>
        </Link>
        <div className="flex-1 max-w-2xl mx-auto">
          <SearchBar />
        </div>
        <HeaderActions />
      </div>
    </header>
  );
}

function HeaderActions() {
  useStore(); // ensure context is initialized if needed; no state usage
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/upload"
        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 hover-elevate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Upload a new video"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current" aria-hidden="true">
          <path d="M12 2a1 1 0 0 1 1 1v8h4a1 1 0 1 1 0 2h-4v8a1 1 0 1 1-2 0v-8H7a1 1 0 1 1 0-2h4V3a1 1 0 0 1 1-1Z" />
        </svg>
        <span className="hidden sm:inline">Upload</span>
      </Link>
    </div>
  );
}
