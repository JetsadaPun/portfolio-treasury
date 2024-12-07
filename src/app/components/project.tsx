import React from "react";

const Project = () => {
  return (
    <div className="border border-[#000000] w-full rounded-lg p-3 shadow-lg">
      <div className="text-gray-900">
        <span className="font-bold mr-2">ชื่อโปรเจกต์: </span>{" "}
      </div>
      <div className="md:flex mx-6 gap-4">
        <div>
          <img src="/kaij.jpg" alt="" className="w-full md:w-36 rounded-lg my-2"/>
        </div>
        <div>
          <div className="text-gray-900 my-2">
            วิธีทอดไข่เจียวให้กรอบ 1. เทน้ำมันใส่กระทะ ตั้งน้ำมันให้ร้อน
            ตอกไข่ ปรุงรส แล้วตีให้เข้ากัน 2.
            พอน้ำมันเดือดนำกระชอนมากรองไข่ใส่กระทะให้ไข่ฟู
            พอไข่เริ่มมีสีเหลืองทองแล้วพลิกไข่อีกด้าน{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
