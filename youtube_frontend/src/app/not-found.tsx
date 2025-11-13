import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center p-8">
      <section className="rounded-lg border bg-white p-8 text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold text-gray-900">404 – Page Not Found</h1>
        <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
