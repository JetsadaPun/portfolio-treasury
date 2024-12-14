"use client";
import React from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const page = () => {
  const subjects = [
    {
      code: "01418496 - 65",
      title: "เรื่องเฉพาะทางวิทยาการคอมพิวเตอร์",
    },
  ];

  const reviewsubject = [
    {
      username: "นายบีชอบกินไข่ปิ้ง",
      date: "30 พ.ย. 2567",
      projectName: "มะม่วงจิ้มรสดี",
    },
    {
      username: "นายซีชอบกินปิ้งไก่",
      date: "1 ธ.ค. 2567",
      projectName: "มะม่วงจิ้มกะปิ",
    },
  ];

  const labels = {
    projectName: "ชื่อโปรเจกต์",
  };

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="mx-24 my-16 pt-20">
        {/* ช่องค้นหา */}
        <form className="max-w-m w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-[#1A1818] rounded-2xl opacity-75 bg-gray-50 focus:outline-none placeholder:italic placeholder:text-zinc-600"
              placeholder="ใส่คีย์เวิร์ดที่ผู้ใช้สนใจ เช่น มะม่วง"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-[#6189C2] hover:bg-[#4a75ac] focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        {/* รายการโปรเจกต์ */}
        <div className="w-full mt-8 space-y-6">
          {reviewsubject.map((review, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] rounded-2xl p-4 space-y-2 relative"
            >
              {subjects.map((subject, i) => (
                <p
                  key={i}
                  className="text-base font-medium text-black"
                >
                  {subject.code} {subject.title}
                </p>
              ))}

              <p className="text-base font-medium text-black">
                {labels.projectName}:{" "}
                <span>{review.projectName}</span>
              </p>

              <div className="flex items-center gap-2">
                <p className="text-base text-black">{review.username}</p>
                <p className="text-base text-gray-500">{review.date}</p>
              </div>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-700 flex items-center font-medium"
              >
                เข้าชมผลงาน
                <span className="ml-2">{">"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
