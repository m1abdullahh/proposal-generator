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
    <div className="w-full h-full grid place-items-center">
      <p>Redirecting to Proposal Generator.</p>
    </div>
  );
}
