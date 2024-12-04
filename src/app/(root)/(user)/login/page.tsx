import React from "react";
import Link from 'next/link'

const page = () => {
  return (
    <div className="flex min-w-full min-h-full items-center justify-center p-8">
      <div className="py-8 text-center min-w-full min-h-full">
        <div className="text-4xl font-bold mb-4 text-gray-900">
          TREASURY PROJECT
        </div>
        <p className="text-sm text-[#807777] mb-8">
          ใส่ข้อมูลบัญชีผู้ใช้เพื่อเข้าสู่ระบบ
        </p>
        <form className="max-w-md mx-auto">
          <div className="mb-5 text-left">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              ชื่อ/อีเมล ผู้ใช้งาน
            </label>
            <input
              type="email"
              id="email"
              className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="name.s@ku.th"
              required
            />
          </div>
          <div className="mb-5 text-left">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              className="bg-transparent border border-gray-300 text-[#807777] text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="รหัสผ่านไม่ต่ำกว่า 8 ตัวอักษร"
              required
            />
          </div>
            <div className="flex justify-between mb-8">
                <div className="text-sm font-medium text-[#807777]"><Link href="/signin">สร้างบัญชี</Link></div>
                <div className="text-sm font-medium text-[#807777]"><Link href="/ForgotPassword">ลืมรหัสผ่าน</Link></div>
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
