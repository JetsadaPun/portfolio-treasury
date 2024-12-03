"use client";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Showsubject from "../components/showsubject";
import { Kanit } from 'next/font/google';

const kanit = Kanit({
  subsets: ['thai','latin'],
  weight: '300',
});

const Page2 = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const buttonData = [
    "วิชาเฉพาะบังคับ",
    "วิชาเฉพาะเลือก",
    "วิชาที่ฉันรีวิวก่อนหน้านี้",
  ];
  const subjects = [
    {
      code: "01418496 - 65",
      title: "เรื่องเฉพาะทางวิทยาการคอมพิวเตอร์",
      subtitle: "Selected Topic in Computer Science",
      workCount: 0,
    },
    {
      code: "01418474 - 65",
      title: "การทดสอบและทวนสอบซอฟต์แวร์",
      subtitle: "Software Testing and Verification",
      workCount: 0,
    },
  ];
  const handleButtonClick = (button: any) => {
    setSelectedButtons((prev: any) => {
      if (!prev.includes(button)) {
        const newSelectedButtons = [...prev, button];
        console.log("Button selected:", newSelectedButtons);
        return newSelectedButtons;
      }
      return prev;
    });
  };
  const handleCloseClick = (button: any) => {
    setSelectedButtons((prev) => {
      const newSelectedButtons = prev.filter((item) => item !== button);
      console.log("Button removed:", newSelectedButtons);
      return newSelectedButtons;
    });
  };
  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="mx-24 my-16">
        <div>
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
                className="block w-full p-4 ps-10 text-sm text-[#1A1818] rounded-2xl opacity-75 bg-gray-50  focus:outline-none placeholder:italic placeholder:text-zinc-600"
                placeholder="01418474 การทดสอบและทวนสอบซอฟแวร์ Software Testing and Verification"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#7AA1BE] hover:bg-[#4a75ac] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="mx-8 my-4">
            <div className="bg-[#4A4D4D] text-[#FFF9EF] p-4 text-center rounded-2xl">
              เลือกหมวดหมู่ วิชาที่สนใจค้นหา และเพิ่มข้อมูล
            </div>
          </div>
          <div className="">
            <div className="flex justify-start gap-2 flex-wrap">
              {buttonData.map((button) => (
                <span
                  key={button}
                  className={`rounded-full px-3 py-1 text-sm font-semibold text-gray-600 ${
                    selectedButtons.includes(button)
                      ? "bg-[#FDE69E]"
                      : "bg-gray-100"
                  } hover:bg-[#FDE69E]`}
                  onClick={() => handleButtonClick(button)}
                >
                  {button}
                  <IconButton
                    size="small"
                    color="inherit"
                    className="ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseClick(button);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {subjects.map((card) => (
              <Showsubject
                key={card.code}
                code={card.code}
                title={card.title}
                subtitle={card.subtitle}
                workCount={card.workCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
