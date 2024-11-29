import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import { IconButton } from "@mui/material";
import Nav from "@/app/components/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b from-[#4D7CBF] to-[#AFBDD0] min-h-screen max-h-screen text-white relative">
      <Nav/>
      <main>{children}</main>
    </div>
  );
}
