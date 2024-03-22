"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import rocketIcon from "../../public/rocket_icon.png";
import { useGetProfile } from "@/api/helpers/useGetProfile";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

export default function Header() {
  const {
    data: profileData,
    isLoading: fetchingProfile,
    isError: hasError,
  } = useGetProfile();
  return (
    <header className="flex items-center justify-between bg-white py-4 px-8 border border-b-gray-200">
      <div className="flex items-center space-x-4">
        <Image
          alt="Logo"
          className="h-10 w-10"
          height="40"
          src={rocketIcon}
          style={{
            aspectRatio: "40/40",
            objectFit: "cover",
          }}
          width="40"
        />
        <h1 className="text-xl font-bold">Upwork Proposal Generator</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button className="bg-[#FFD700] text-black">Be Premium</Button>
        {fetchingProfile ? (
          <ClipLoader size={28} color="black" />
        ) : hasError ? (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        ) : (
          <p>Hi, {profileData?.fullName.split(" ")[0]}</p>
        )}
      </div>
    </header>
  );
}
