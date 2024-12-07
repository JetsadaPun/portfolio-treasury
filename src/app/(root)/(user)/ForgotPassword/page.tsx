"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Arimo } from 'next/font/google';
import { Kanit } from 'next/font/google';

const arimo = Arimo({
  subsets: ['latin'], 
  weight: '700', 
});

const kanit = Kanit({
  subsets: ['thai'],
  weight: '300',
});

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
  });


  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form Data:", formData); 
  };

  const isValidEmail = formData.email.endsWith("@ku.th");
  return (
    <div className="flex min-w-full min-h-full items-center justify-center p-8">
      <div className="py-8 text-center min-w-full min-h-full">
        <div className={`${arimo.className} text-3xl mb-4 text-gray-900`}>
          TREASURY PROJECT
        </div>
        <div className={`${kanit.className}`}>
          <div className="text-sm text-[#807777] mb-8">
            <p className="">ระบบจะทำการส่งหน้าแก้ไขรหัสผ่านไป</p>
            <p className="">ที่ผู้ใช้เพื่อทำการสร้างรหัสผ่านใหม่</p>
          </div>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5 text-left">
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#807777]"
              >
                อีเมล ผู้ใช้งาน
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                placeholder="ตัวอย่าง name.s@ku.th"
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
              disabled={!isValidEmail}
              className={`text-white font-medium rounded-full text-sm w-full sm:w-auto px-12 py-2.5 text-center ${
                isValidEmail
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            ><Link href="/ForgotPassword/resetpassword">ส่งอีเมลยืนยัน</Link>

            </button>
            <div className="text-left mt-5">
              {!isValidEmail && formData.email.length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  ใช้อีเมล @ku.th เท่านั้น
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page