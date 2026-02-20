"use client";
import React from "react";
import { FaFolder, FaShieldAlt } from "react-icons/fa";
import { Arimo, Kanit } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";

const arimo = Arimo({ subsets: ["latin"], weight: "500" });
const kanit = Kanit({ subsets: ["thai"], weight: "300" });

const UserNav = () => {
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <nav className="bg-transparent absolute top-0 left-0 w-full z-10 transition-all duration-300">
            <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto py-4 px-8">
                <span
                    className={`${arimo.className} self-center text-2xl whitespace-nowrap text-white flex items-center cursor-pointer hover:scale-105 transition-transform`}
                    onClick={() => router.push("/home")}
                >
                    <FaFolder style={{ fontSize: 28, color: "#FDE69E", marginRight: "8px" }} />
                    TREASURY PROJECT
                </span>

                <div className={`${kanit.className} hidden md:block`}>
                    <ul className="flex flex-row space-x-8 items-center">
                        <li>
                            <a href="/searchprofile" className={`hover:text-yellow-200 transition-colors ${pathname === "/searchprofile" ? "text-yellow-300 font-bold" : "text-white"}`}>
                                ค้นหาโปรไฟล์เพื่อน
                            </a>
                        </li>
                        <li>
                            <a href="/searchproject" className={`hover:text-yellow-200 transition-colors ${pathname === "/searchproject" ? "text-yellow-300 font-bold" : "text-white"}`}>
                                ค้นหาโปรเจกต์
                            </a>
                        </li>
                        <li>
                            <a href="/profile" className={`hover:text-yellow-200 transition-colors ${pathname === "/profile" ? "text-yellow-300 font-bold" : "text-white"}`}>
                                โปรไฟล์
                            </a>
                        </li>

                        {/* ปุ่มของ Admin จะถูกวางไว้ท้ายสุดเพื่อให้เมนูหลักไม่ขยับ (ลดการกระพริบ) */}
                        {isAdmin && (
                            <li className="border-l border-white/30 pl-6 ml-2">
                                <a href="/subjects" className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-yellow-300 transition-all shadow-lg active:scale-95">
                                    <FaShieldAlt className="text-sm" />
                                    จัดการระบบ (Admin)
                                </a>
                            </li>
                        )}

                        {isLoggedIn ? (
                            <li>
                                <button onClick={handleLogout} className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition-all text-sm shadow-lg">
                                    ออกจากระบบ
                                </button>
                            </li>
                        ) : (
                            <li>
                                <a href="/login" className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full border border-white/50 transition-all text-sm">
                                    ลงชื่อเข้าใช้
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default UserNav;
