"use client";
import React from "react";

interface AboutmeProps {
  user?: any;
  initialData?: any; // alternative name
  isReadOnly?: boolean;
}

const Aboutme: React.FC<AboutmeProps> = ({ user, initialData, isReadOnly = false }) => {
  const data = user || initialData;

  return (
    <div className="w-full">
      <div className="flex text-gray-900 text-sm w-fit mb-4 items-center">
        <span className="font-bold mr-3 text-gray-700 min-w-[100px]">วันเกิด:</span>
        <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
          {data?.dob || "ยังไม่ได้ระบุ"}
        </span>
      </div>

      <div className="text-gray-900 text-sm mt-4 flex items-start">
        <span className="font-bold mr-3 text-gray-700 min-w-[100px] mt-1">การศึกษา:</span>
        <div className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg flex-1 min-h-[40px]">
          {data?.education || "ยังไม่ได้ระบุ"}
        </div>
      </div>

      <div className="text-gray-900 text-sm mt-6 flex flex-col">
        <span className="font-bold mb-3 text-gray-700">ประวัติส่วนตัว:</span>
        <div className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100 italic min-h-[100px]">
          {data?.bio || "ยังไม่ได้ระบุข้อมูลประวัติส่วนตัว"}
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
