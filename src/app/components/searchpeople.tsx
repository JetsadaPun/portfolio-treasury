"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface CardProps {
  profile_pic: string;
  name: string;
  code: string;
}

const Searchpeople: React.FC<CardProps> = ({
  profile_pic,
  name,
  code,
}) => {
  const router = useRouter();

  const handleView_people = () => {
    router.push(`/people/${code}`);
  };
  return (
    <div className="relative bg-[#FFFFFF] rounded-2xl p-4 w-full flex items-center">
      {/* รูปโปรไฟล์ */}
      <img
        src={profile_pic}
        alt={name}
        className="w-12 h-12 rounded-full object-cover mr-4 border"
      />
      
      {/* ชื่อ */}
      <h2 className="text-base text-black">{name}</h2>

      {/* ปุ่มเข้าชมโปรไฟล์ */}
      <button
        onClick={handleView_people}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-700 flex items-center"
      >
        เข้าชมโปรไฟล์
        <span className="ml-2">{">"}</span>
      </button>
    </div>
  );
};
export default Searchpeople;
