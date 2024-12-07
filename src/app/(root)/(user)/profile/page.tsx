"use client";
import React, { useState } from "react";
import { Kanit } from "next/font/google";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Aboutme from "@/app/components/aboutme";
import Project from "@/app/components/project";
import EditProfile from "@/app/components/editprofile";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});
const page = () => {
  const [selectedTab, setSelectedTab] = useState("project");
  return (
    <div
      className={`${kanit.className} min-h-screen flex items-start justify-center`}
    >
      <div className="bg-[#FFFFFF] rounded-2xl mx-6 md:mx-28 p-6 md:p-12 shadow-lg flex flex-col items-center w-screen h-full">
        <div className="mb-4 text-2xl font-semibold text-gray-700">
          นายบีชอบกินไข่ปิ้ง
        </div>

        <div className="mb-4">
          <img
            src="catprofile.jpg"
            alt="profile"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <div className="flex items-center text-center gap-4 w-full flex-col md:flex-row my-4">
          <div className="text-gray-700 flex-1 text-right">
            อีเมล: example@example.com
          </div>
          <div className="hidden md:flex mx-4 w-[1px] h-6 bg-black"></div>
          <div className="text-gray-700 flex-1 text-left">
            เบอร์โทร: 081-234-5678
          </div>
        </div>
        <div className="flex gap-4 w-full relative">
          <div
            className={`text-gray-700 flex text-left cursor-pointer ${
              selectedTab === "project"
                ? "font-bold border-b-2 border-[#2807E3] pb-2"
                : "text-base"
            }`}
            onClick={() => setSelectedTab("project")}
          >
            <AssignmentIcon /> โปรเจกต์
          </div>
          <div className="mx-1 md:mx-4 w-[1px] h-6 bg-black"></div>
          <div
            className={`text-gray-700 flex text-left cursor-pointer ${
              selectedTab === "aboutme"
                ? "font-bold border-b-2 border-[#2807E3] pb-2"
                : "text-base"
            }`}
            onClick={() => setSelectedTab("aboutme")}
          >
            <PersonIcon /> เกี่ยวกับฉัน
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black mt-2"></div>
        </div>

        <div className="flex mt-4 w-full">
          {selectedTab === "project" ? <Project /> : <Aboutme />}
          {/* <EditProfile/> */}
        </div>
      </div>
    </div>
  );
};

export default page;
