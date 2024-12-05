"use client";
import React from "react";
import { Kanit } from "next/font/google";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Aboutme from "@/app/components/aboutme";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});
const page = () => {
  return (
    <div
      className={`${kanit.className} min-h-screen flex items-start justify-center`}
    >
      <div className="bg-[#FFFFFF] rounded-2xl mx-32 p-12 shadow-lg flex flex-col items-center w-screen h-full">
        {/* เพิ่มความกว้างของกรอบสีขาว */}
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

        <div className="flex items-center text-center gap-4 w-full">
          <div className="text-gray-700 flex-1 text-right">
            อีเมล: example@example.com
          </div>
          <div className="mx-4 w-[1px] h-6 bg-black"></div>
          <div className="text-gray-700 flex-1 text-left">
            เบอร์โทร: 081-234-5678
          </div>
        </div>
        <div className="flex items-start gap-4 w-full">
          <div className="text-gray-700">
            <AssignmentIcon /> โปรเจกค์
          </div>
          <div className="mx-2 w-[1px] h-6 bg-black"></div>
          <div className="text-gray-700 ">
            <PersonIcon /> เกี่ยวกับฉัน
          </div>
        </div>
        <div className="w-full h-[1px] bg-black "></div>
        <div>
          <Aboutme/>
        </div>
      </div>
    </div>
  );
};

export default page;
