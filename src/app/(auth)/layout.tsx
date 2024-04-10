import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { QueryProvider } from "@/api/helpers/provider";
import { Suspense } from "react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth | ABServes",
  description: "Login to continue making appealing proposals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Suspense>
            <Toaster closeButton richColors />
            {children}
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
