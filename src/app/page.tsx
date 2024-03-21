"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push("/proposal-generator");
  }, []);
  return (
    <main className="flex items-center min-h-[100vh] justify-center">
      <div className="text-center p-6">
        <p className="text-4xl font-bold">
          Redirecting to Proposal Genetator... 🚀
        </p>
      </div>
    </main>
  );
}
