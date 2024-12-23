"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface CardProps {
  code: string;
  title: string;
  subtitle: string;
  workCount: number;
}

const Showsubject: React.FC<CardProps> = ({
  code,
  title,
  subtitle,
  workCount,
}) => {
  const router = useRouter();

  const handleViewSubject = () => {
    router.push(`/posts/${code}`);
  };
  return (
    <div className="relative bg-[#FFFFFF] rounded-2xl p-4 w-full">
      <h2 className="text-base text-black">
        {code} - {title}
      </h2>
      <div className="flex">
        <h2 className="text-base text-[#FFFFFF]">{code} - </h2>
        <h2 className="text-base text-black"> {subtitle}</h2>
      </div>
      <p className="text-sm text-gray-500 mt-2">จำนวนผลงาน - {workCount}</p>
      <button
        onClick={handleViewSubject} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-700 flex items-center"
      >
        เข้าชมผลงาน
        <span className="ml-2">{">"}</span>
      </button>
    </div>
  );
};
export default Showsubject;
