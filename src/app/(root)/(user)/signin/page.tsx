import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex min-w-full min-h-full items-center justify-center p-8">
      <div className="py-8 text-center min-w-full min-h-full">
        <div className="text-4xl font-bold mb-4 text-gray-900">
          TREASURY PROJECT
        </div>
        <div className="text-sm text-[#807777] mb-8">
          <p className="">ระบบจะทำการส่งหน้าแก้ไขรหัสผ่านไป</p>
          <p className="">ที่ผู้ใช้เพื่อทำการสร้างรหัสผ่านใหม่</p>
        </div>
        <form className="max-w-md mx-auto">
          
          <div className="mb-3 text-left">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              กรอกอีเมลผู้ใช้
            </label>
            <input
              type="email"
              id="email"
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="name.s@ku.th"
              required
            />
          </div>
          {/* ชื่อผู้ใช้งาน */}
          <div className="mb-3 text-left">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              ชื่อผู้ใช้งาน
            </label>
            <input
              type="name"
              id="name"
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="Jetsada"
              required
            />
          </div>
          {/* รหัสผ่าน1 */}
          <div className="mb-5 text-left">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password1"
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="รหัสผ่านไม่ต่ำกว่า 8 ตัวอักษร"
              required
            />
          </div>
          {/* รหัสผ่าน2 */}
          <div className="mb-5 text-left">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              id="password2"
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="กรอกรหัสผ่านที่ตรงกับด้านบน"
              required
            />
          </div>
          <div className="flex justify-end pb-8">
            <div className="text-sm font-medium text-[#807777]">
            <Link href="/login">กลับหน้าล็อคอินเข้าสู่ระบบ</Link>
            </div>
          </div>
          <button
            type="submit"
            className="text-[#807777] shadow-md bg-[#FDE69E] font-medium rounded-full text-sm w-full sm:w-auto px-12 py-2.5 text-center"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
