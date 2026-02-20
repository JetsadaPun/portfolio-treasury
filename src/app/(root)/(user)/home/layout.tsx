import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { IconButton } from "@mui/material";
import UserNav from "@/app/components/usernav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b from-[#4D7CBF] to-[#AFBDD0] min-h-screen text-white relative">
      <UserNav />
      <main className="pt-24">{children}</main>
    </div>
  );
}
