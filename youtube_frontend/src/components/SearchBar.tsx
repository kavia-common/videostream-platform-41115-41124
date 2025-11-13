"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/state/store";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const { state, dispatch } = useStore();
  const [value, setValue] = React.useState<string>(params.get("q") || state.searchQuery || "");
  const [debounceTimer, setDebounceTimer] = React.useState<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setValue(next);
    if (debounceTimer) clearTimeout(debounceTimer);
    const t = setTimeout(() => {
      dispatch({ type: "setSearch", query: next });
    }, 250);
    setDebounceTimer(t);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (q.length === 0) {
      router.push("/");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function clear() {
    setValue("");
    dispatch({ type: "setSearch", query: "" });
  }

  return (
    <form onSubmit={onSubmit} role="search" aria-label="Search videos" className="w-full">
      <div className="relative">
        <input
          aria-label="Search"
          value={value}
          onChange={onChange}
          placeholder="Search"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder:text-gray-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        {value && (
          <button
            type="button"
            onClick={clear}
            className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
            title="Clear"
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
}
