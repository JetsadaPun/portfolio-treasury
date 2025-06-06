"use client"
import Showsubject from '@/app/components/showsubject2';
import React, { useState } from 'react'
import Searchpeople from '@/app/components/searchpeople';
const page = () => {
      const profile = [
      {
        code: "6521600192",
        profile_pic: "https://randomuser.me/api/portraits/men/1.jpg",
        name: "นายบีชอบกินไก่ปิ้ง",
      },
      {
        code: "6521600176",
        profile_pic: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "นายบีบอย",
      },
      {
        code: "6521600125",
        profile_pic: "https://randomuser.me/api/portraits/men/3.jpg",
        name: "นายเอลอย",
      },
    ];
  return (
    <div className={` min-h-screen`}>
      <div className="mx-24 py-20">
        <div>
          <form className="max-w-m w-full ">
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
                placeholder="เช่น นายลี..."
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
          
          <div className="">
            <div className="flex justify-start gap-2 flex-wrap">
              Search something...
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {profile.map((card, index) => (
              <Searchpeople
                key={index} 
                code={card.code}
                profile_pic={card.profile_pic}
                name={card.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page