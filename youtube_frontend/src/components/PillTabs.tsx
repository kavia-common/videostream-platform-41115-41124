"use client";

import React from "react";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import { useStore } from "@/lib/state/store";
import { classNames } from "@/lib/utils";

export default function PillTabs() {
  const { state, dispatch } = useStore();

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex items-center gap-2 min-w-max px-1">
        {DEFAULT_CATEGORIES.map((c) => {
          const active = state.selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => dispatch({ type: "setCategory", categoryId: c.id })}
              className={classNames(
                "px-4 py-1.5 rounded-full border text-sm transition-colors",
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50"
              )}
              aria-pressed={active}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
