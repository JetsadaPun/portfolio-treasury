import React from "react";

import Nav from "@/app/components/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b from-[#4D7CBF] to-[#AFBDD0] min-h-screen text-white relative">
      <div><Nav/></div>
      <main className="p-16">{children}</main>
    </div>
  );
}
