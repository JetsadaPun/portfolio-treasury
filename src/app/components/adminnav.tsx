"use client";
import React from "react";
import { FaFolder, FaUsersCog, FaBook, FaExclamationTriangle } from "react-icons/fa";
import { Arimo, Kanit } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";

const arimo = Arimo({ subsets: ["latin"], weight: "500" });
const kanit = Kanit({ subsets: ["thai"], weight: "300" });

const AdminNav = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <nav className="bg-[#2D3436] w-full z-10 shadow-xl border-b border-gray-700">
            <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto py-3 px-8">
                <span
                    className={`${arimo.className} self-center text-2xl whitespace-nowrap text-white flex items-center cursor-pointer group`}
                    onClick={() => router.push("/admin/dashboard")}
                >
                    <FaFolder className="text-yellow-400 mr-2 group-hover:rotate-12 transition-transform" style={{ fontSize: 26 }} />
                    <span className="font-bold tracking-wider">TREASURY</span>
                    <span className="ml-2 px-2 py-0.5 bg-yellow-400 text-black text-[10px] rounded font-black">ADMIN</span>
                </span>

                <div className={`${kanit.className} hidden md:block`}>
                    <ul className="flex flex-row space-x-6 items-center">
                        <li>
                            <a href="/home" className="text-gray-400 hover:text-white transition-colors text-sm">
                                หน้าหลัก (User)
                            </a>
                        </li>
                        <li className="h-6 w-[1px] bg-gray-600 mx-2"></li>
                        <li>
                            <a href="/subjects" className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all ${pathname === "/subjects" ? "bg-yellow-400 text-black font-bold" : "text-gray-300 hover:bg-gray-700"}`}>
                                <FaBook /> จัดการวิชา
                            </a>
                        </li>
                        <li>
                            <a href="/reports" className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all ${pathname === "/reports" ? "bg-red-500 text-white font-bold" : "text-gray-300 hover:bg-gray-700"}`}>
                                <FaExclamationTriangle /> จัดการรายงาน
                            </a>
                        </li>
                        {/* <li>
                            <a href="/users" className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all ${pathname === "/users" ? "bg-blue-500 text-white font-bold" : "text-gray-300 hover:bg-gray-700"}`}>
                                <FaUsersCog /> จัดการผู้ใช้
                            </a>
                        </li> */}
                        <li className="ml-4">
                            <button
                                onClick={handleLogout}
                                className="bg-transparent border border-gray-500 text-gray-400 hover:text-white hover:border-white px-4 py-1.5 rounded-md transition-all text-xs"
                            >
                                ออกจากระบบ
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNav;
