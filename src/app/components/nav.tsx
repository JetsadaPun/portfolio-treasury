"use client";
import React from "react";
import { FaFolder } from "react-icons/fa";
import { Arimo } from "next/font/google";
import { Kanit } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";

const arimo = Arimo({
  subsets: ["latin"],
  weight: "500",
});

const kanit = Kanit({
  subsets: ["thai"],
  weight: "300",
});

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      const decoded = decodeJwt(token);
      setIsAdmin(decoded?.role === "ADMIN");
    } else {
      setIsAdmin(false);
    }
  }, [pathname]);

  const handlehomepage = () => {
    router.push(`/home`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <>
      <nav className="bg-transparent absolute top-0 left-0 w-full z-10">
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto py-4 px-8">
          <span
            className={`${arimo.className} self-center text-2xl whitespace-nowrap dark:text-white flex items-center cursor-pointer`}
            onClick={handlehomepage}
          >
            <FaFolder
              style={{ fontSize: 28, color: "#FDE69E", marginRight: "4px" }}
            />
            TREASURY PROJECT
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${kanit.className} hidden w-fit md:block md:w-auto" id="navbar-default`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="/searchprofile"
                  className={`block py-2 px-3 md:p-0 ${pathname === "/searchprofile" ? "text-black" : "text-white"
                    }`}
                  aria-current="page"
                >
                  ค้นหาโปรไฟล์เพื่อน
                </a>
              </li>
              <li>
                <a
                  href="/searchproject"
                  className={`block py-2 px-3 md:p-0 ${pathname === "/searchproject" ? "text-black" : "text-white"
                    }`}
                >
                  ค้นหาโปรเจกต์
                </a>
              </li>
              {isAdmin && (
                <li>
                  <a
                    href="/subjects"
                    className={`block py-2 px-3 md:p-0 ${pathname === "/subjects" ? "text-yellow-300" : "text-yellow-400 font-bold"
                      }`}
                  >
                    Admin: จัดการวิชา
                  </a>
                </li>
              )}
              <li>
                <a
                  href="/profile"
                  className={`block py-2 px-3 md:p-0 ${pathname === "/profile" ? "text-black" : "text-white"
                    }`}
                >
                  โปรไฟล์
                </a>
              </li>
              {isLoggedIn ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 md:p-0 text-white hover:text-red-400"
                  >
                    ลงชื่อออก
                  </button>
                </li>
              ) : (
                <li>
                  <a
                    href="/login"
                    className={`block py-2 px-3 md:p-0 ${pathname === "/login" ? "text-black" : "text-white"
                      }`}
                  >
                    ลงชื่อเข้าใช้
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
