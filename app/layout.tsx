import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./styles.css";

export const metadata: Metadata = {
  title: "Kurulus Asistani",
  description: "AI-assisted company formation preparation platform for Turkiye"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-4xl p-6">{children}</body>
    </html>
  );
}
