import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "@/lib/utils";
import {
  HomeIcon,
  PinLeftIcon,
  PinRightIcon,
  TimerIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SideNavBar() {
  const handleLogout = () => {
    removeDataFromLocalStorage();
    location.reload();
  };

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = getDataFromLocalStorage();
    if (data.token) {
      setLoggedIn(true);
    }
  }, [router]);

  return (
    <aside className="sticky top-0 h-screen w-56 bg-gray-100 text-gray-800 p-4">
      <nav className="space-y-2">
        <Link href="/proposal-generator">
          <button
            className={clsx(
              "w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500",
              `${
                pathName === "/proposal-generator"
                  ? "bg-gray-200 text-gray-800"
                  : ""
              }`
            )}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </button>
        </Link>
        {loggedIn ? (
          <>
            <Link href="/proposal-generator/history">
              <button
                className={clsx(
                  "w-full flex items-center space-x-2 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500",
                  `${
                    pathName === "/proposal-generator/history"
                      ? "bg-gray-200 text-gray-800"
                      : ""
                  }`
                )}
              >
                <TimerIcon className="w-4 h-4" />
                <span className="text-sm font-medium">History</span>
              </button>
            </Link>
            <hr />
            <button
              onClick={handleLogout}
              className={clsx(
                "w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
              )}
            >
              <PinLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </>
        ) : (
          <>
            <hr />
            <Link
              href="/login"
              className={clsx(
                "w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500"
              )}
            >
              {" "}
              <PinRightIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
