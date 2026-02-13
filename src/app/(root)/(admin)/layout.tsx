import React from "react";
import Nav from "@/app/components/nav";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen relative flex flex-col">
            {/* Navbar wrapper: height h-20 matches standard nav height, relative so Nav absolute stays inside */}
            <header className="bg-[#2D3436] h-20 relative z-50">
                <Nav />
            </header>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
