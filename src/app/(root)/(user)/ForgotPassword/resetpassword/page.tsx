import React from "react";

const page = () => {
  return (
    <div className="flex min-w-full min-h-full items-center justify-center p-8">
      <div className="py-8 text-center min-w-full min-h-full">
        <div className="text-4xl font-bold mb-4 text-gray-900">
          TREASURY PROJECT
        </div>
        <div className="text-sm text-[#807777] mb-4">
          <p className="">ทำการสร้างรหัสผ่านใหม่</p>
        </div>
        <div className="text-sm text-[#807777] mb-8">
          <p>อีเมลผู้ใช้ที่ต้องการเปลี่ยนรหัสผ่าน</p>
          <p>naibee.c@ku.th</p>
        </div>
        <form className="max-w-md mx-auto">
          {/* รหัสผ่าน1 */}
          <div className="mb-5 text-left">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              สร้างรหัสผ่านใหม่
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
