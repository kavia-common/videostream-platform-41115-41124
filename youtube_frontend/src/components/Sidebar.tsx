"use client";

import Link from "next/link";
import React from "react";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import { useStore } from "@/lib/state/store";
import { classNames } from "@/lib/utils";

export default function Sidebar() {
  const { state, dispatch } = useStore();

  const links = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Explore" },
    { href: "#", label: "Subscriptions" }, // UI only
    { href: "/upload", label: "Upload" },
  ];

  return (
    <aside
      className={classNames(
        "hidden lg:block border-r border-gray-200 bg-white",
        state.sidebarCollapsed ? "w-16" : "w-64"
      )}
      aria-label="Sidebar navigation"
    >
      <div className="px-4 py-4">
        <nav className="space-y-1">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-4 py-2 border-t border-gray-100">
        <p className="px-3 py-2 text-xs font-semibold text-gray-500">Categories</p>
        <div className="flex flex-col gap-1">
          {DEFAULT_CATEGORIES.map((c) => {
            const active = state.selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => dispatch({ type: "setCategory", categoryId: c.id })}
                className={classNames(
                  "text-left rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                )}
                aria-pressed={active}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
