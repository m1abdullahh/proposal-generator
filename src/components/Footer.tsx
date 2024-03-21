import Image from "next/image";
import Link from "next/link";
import rocketIcon from "../../public/rocket_icon.png";

export function Footer() {
  return (
    <footer className="w-full py-6">
      <div className="container flex flex-col items-center gap-4 px-4 md:px-6 text-sm">
        <div className="flex items-center gap-2">
          <Image
            alt="Logo"
            className="rounded-lg"
            height="32"
            src={rocketIcon}
            style={{
              aspectRatio: "32/32",
              objectFit: "cover",
            }}
            width="32"
          />
          <div className="grid gap-1">
            <p className="font-semibold">ABServes Inc.</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Abdullah is on a mission to make GenAI accessible for everyone.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 min-[400px]:flex-row">
          <p className="text-xs text-gray-500 dark:text-gray-400 sm:mr-2">
            © 2024 ABServes, Inc. All rights reserved.
          </p>
          <div className="flex gap-2 text-sm">
            <Link
              className="text-gray-500 underline dark:text-gray-400"
              href="#"
            >
              Terms
            </Link>
            <Link
              className="text-gray-500 underline dark:text-gray-400"
              href="#"
            >
              Privacy
            </Link>
            <Link
              className="text-gray-500 underline dark:text-gray-400"
              href="#"
            >
              Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
