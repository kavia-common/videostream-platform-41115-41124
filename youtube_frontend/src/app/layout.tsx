import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/state/store";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "OceanTube",
  description: "A YouTube-like demo app with Ocean Professional theme",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="app-shell">
        <StoreProvider>
          <Header />
          <div className="app-content">
            <Sidebar />
            <main className="min-h-[calc(100dvh-56px)]">
              <div className="mx-auto max-w-7xl p-4">{children}</div>
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
