"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import rocketIcon from "../../public/rocket_icon.png";
import { useGetProfile } from "@/api/useGetProfile";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { Tooltip } from "./CustomTooltip";
import CreditsIcon from "~/public/credits.png";
import { ChadCNDialog } from "./ChadCNDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const {
    data: profileData,
    isLoading: fetchingProfile,
    isError: hasError,
  } = useGetProfile();
  return (
    <>
      <header className="flex items-center justify-between bg-white py-4 px-8 border border-b-gray-200">
        <Link href="/proposal-generator">
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
        </Link>
        <div className="flex items-center space-x-2">
          {fetchingProfile ? (
            <ClipLoader size={28} color="black" />
          ) : hasError ? (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <>
              <Tooltip tooltipText="Prompt Credits">
                <div className="bg-[#009EC01A] w-fit rounded-full flex items-center px-2 py-2">
                  <div>
                    <div className="bg-[#009EC0] ring-[#99d8e6] ring-[3px] w-fit h-fit px-1 py-1 rounded-full">
                      <Image
                        className="w-[18px] h-[18px]"
                        src={CreditsIcon}
                        alt="Credits Icon"
                      />
                    </div>
                  </div>
                  <div className="text-[#089CB3]  text-[14px] font-bold px-2">
                    {profileData?.promptCredits}
                  </div>
                </div>
              </Tooltip>
              <ChadCNDialog />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{`${profileData?.fullName[0].toUpperCase()}${profileData?.fullName
                  .split(" ")[1][0]
                  .toUpperCase()}`}</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </header>
    </>
  );
}
