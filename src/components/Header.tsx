import { Button } from "@/components/ui/button";
import Image from "next/image";
import rocketIcon from "../../public/rocket_icon.png";

export default function Header() {
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
        <Button variant="outline">Login</Button>
      </div>
    </header>
  );
}
