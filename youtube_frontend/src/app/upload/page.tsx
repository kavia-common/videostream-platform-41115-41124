"use client";

import React from "react";
import { useRouter } from "next/navigation";
import * as api from "@/lib/api/client";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import type { CreateVideoPayload } from "@/lib/types";

export default function UploadPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: CreateVideoPayload = {
      title: String(data.get("title") || ""),
      description: String(data.get("description") || ""),
      categoryId: String(data.get("category") || "all"),
      tags: String(data.get("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      file: null, // no server processing in mock
      thumbnailUrl: "/assets/placeholders/thumb_new.jpg",
      videoUrl: undefined,
      posterUrl: "/assets/placeholders/thumb_new.jpg",
    };

    setSubmitting(true);
    try {
      const created = await api.createVideo(payload);
      setSuccess("Demo upload complete. This is a client-only mock; no server was used.");
      setTimeout(() => {
        router.push(`/watch/${created.id}`);
      }, 600);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="h2">Upload</h1>
      <p className="mt-1 text-sm text-gray-600">Demo upload (no server). Data persists only during this session.</p>

      {success && (
        <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
          {success}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
          <input id="title" name="title" required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category</label>
          <select id="category" name="category" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="tags">Tags (comma separated)</label>
          <input id="tags" name="tags" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="file">Video file (demo only)</label>
          <input id="file" name="file" type="file" accept="video/*" className="mt-1 block w-full text-sm text-gray-600" />
          <p className="mt-1 text-xs text-gray-500">File is not uploaded to a server in this demo.</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
