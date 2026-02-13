import React from "react";
import { Arimo } from 'next/font/google';
import { Kanit } from 'next/font/google';

const arimo = Arimo({
  subsets: ['latin'],
  weight: '700',
});

const kanit = Kanit({
  subsets: ['thai'],
  weight: '400',
});

const Page1 = () => {
  return (
    <div className="py-20 flex flex-col px-24">
      <div className="flex items-center text-[#FFF9EF] font-bold">
        <span className={`${arimo.className} text-[4vh] sm:text-[4vw] md:text-[4vw] lg:text-[6vw] xl:text-[8vw] text-center leading-none`}>
          Share your project
        </span>
        <img
          src="/img2.png"
          className="w-24 h-24 ml-6 relative -translate-y-6"
          alt="dec2"
        />
      </div>
      <div className="my-6 text-[#FDE69E] text-[4vh] sm:text-[4vw] md:text-[4vw] lg:text-[6vw] xl:text-[8vw] flex items-center">
        <span className={`${arimo.className} mr-6`}>with other</span>
        <img src="/img1.png" className="w-20 h-20" alt="dec1" />
      </div>

      <div className={`${kanit.className} mt-16 text-[#FFF9EF] text-2xl`}>
        ร่วมแชร์ผลงานในรายวิชาร่วมกับเพื่อน ๆ
      </div>
      <div className={`${kanit.className} my-3 text-[#4A4D4D] text-2xl flex justify-between items-center`}>
        หรือเข้าชมผลงานของรุ่นพี่ในแต่ละรายวิชา ก่อนทำการตัดสินใจลงทะเบียน
      </div>
    </div>
  );
};

export default Page1;
