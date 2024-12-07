import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#FDE69E] min-h-screen flex flex-col md:flex-row">
      {/* ส่วนภาพพื้นหลัง */}
      <div className="hidden xl:flex relative sm:basis-3/6 md:basis-4/6 items-center justify-center">
        <div className="bg-[#FFF9EF] px-20 py-2 xl:px-28 xl:py-4 rounded-lg shadow-lg absolute ">
          <img src="/bg_login.png" alt="background" className="rounded-lg " />
        </div>
      </div>

      {/* ส่วนเนื้อหา */}
      <main className="flex xl:basis-2/6 items-center justify-center bg-[#FFF9EF] shadow-2xl opacity-90 md:opacity-100 w-screen h-screen">
        {children}
      </main>
    </div>
  );
}
