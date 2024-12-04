import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#FDE69E] min-h-screen flex">
      <div className="flex-1 basis-4/6 flex items-center justify-center">
        <div className="bg-[#FFF9EF] px-28 py-4 rounded-lg shadow-lg">
          <img src="/bg_login.png" alt="background" className="rounded-lg" />
        </div>
      </div>
      <main className="flex basis-2/6 items-center bg-[#FFF9EF] shadow-2xl">
        {children}
      </main>
    </div>
  );
}