"use client";
import Showsubject from '@/app/components/showsubject2';
import React, { useState } from 'react'

const page = () => {
    const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
    
    const subjects = [
        {
          code: "01418496 - 65",
          title: "เรื่องเฉพาะทางวิทยาการคอมพิวเตอร์",
          projectname: "มะม่วงจิ้มรสดี",
          Name: "นายบีชอบกินไข่ปิ้ง",
        },
        {
          code: "01418474 - 65",
          title: "การทดสอบและทวนสอบซอฟต์แวร์",
          projectname: "มะม่วงจิ้มกะปิ",
          Name: "นายซีชอบกินปิ้งไก่",
        },
        {
          code: "01418474 - 65",
          title: "การทดสอบและทวนสอบซอฟต์แวร์",
          projectname: "มะม่วงผัดพริกแกง",
          Name: "นายชวาสัญญา",
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
                placeholder="เช่น นายบี..."
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
            
            {subjects.map((card, index) => (
              <Showsubject
                key={index} 
                code={card.code}
                title={card.title}
                projectname={card.projectname}
                Name={card.Name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page