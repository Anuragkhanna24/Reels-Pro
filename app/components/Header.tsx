"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="navbar bg-base-300 sticky top-0 z-40 px-2 sm:px-4">
      <div className="container-responsive flex justify-between items-center">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-lg sm:text-xl gap-1 sm:gap-2 normal-case font-bold px-2 sm:px-4"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline text-sm sm:text-base">
              ImageKit ReelsPro
            </span>
            <span className="inline xs:hidden text-xs">ReelsPro</span>
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-48 sm:w-64 mt-3 sm:mt-4 py-2"
            >
              {session ? (
                <>
                  <li className="px-3 sm:px-4 py-1">
                    <span className="text-xs sm:text-sm opacity-70">
                      {session.user?.email?.split("@")[0]}
                    </span>
                  </li>
                  <div className="divider my-1"></div>

                  <li>
                    <Link
                      href="/upload"
                      className="px-3 sm:px-4 py-2 hover:bg-base-200 block w-full text-sm sm:text-base"
                      onClick={() =>
                        showNotification("Welcome to Admin Dashboard", "info")
                      }
                    >
                      Video Upload
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleSignOut}
                      className="px-3 sm:px-4 py-2 text-error hover:bg-base-200 w-full text-left text-sm sm:text-base"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="px-3 sm:px-4 py-2 hover:bg-base-200 block w-full text-sm sm:text-base"
                    onClick={() =>
                      showNotification("Please sign in to continue", "info")
                    }
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
