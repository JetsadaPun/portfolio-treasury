"use client"
import React, { useState } from "react";
import Link from 'next/link'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isValidEmail = formData.email.endsWith("@ku.th");
  const isPasswordLongEnough = formData.password.length >= 8;
  const containsUpperCase = /[A-Z]/.test(formData.password);
  const containsLowerCase = /[a-z]/.test(formData.password);
  const containsNumber = /[0-9]/.test(formData.password);
  const containsSpecialChar = /[!@#$%^&*,.?":-]/.test(formData.password);

  const isPasswordValid =
    isPasswordLongEnough &&
    containsUpperCase &&
    containsLowerCase &&
    containsNumber &&
    containsSpecialChar;

  const isFormValid = isValidEmail && isPasswordValid;
  return (
    <div className="flex min-w-full min-h-full items-center justify-center p-8">
      <div className="py-8 text-center min-w-full min-h-full">
        <div className="text-4xl font-bold mb-4 text-gray-900">
          TREASURY PROJECT
        </div>
        <p className="text-sm text-[#807777] mb-8">
          ใส่ข้อมูลบัญชีผู้ใช้เพื่อเข้าสู่ระบบ
        </p>
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
              placeholder="อีเมล name.s@ku.th"
              required
            />
          </div>
          <div className="mb-5 text-left relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#807777]"
            >
              รหัสผ่าน
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border border-gray-300 text-[#807777] text-sm rounded-lg block w-full p-2.5 focus:outline-none"
              placeholder="ตัวอักษรไม่ต่ำกว่า 8 ตัวอักษร ประกอบด้วย A-Z, 0-9, อักขระพิเศษ"
              required
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>
            <div className="flex justify-between mb-8">
                <div className="text-sm font-medium text-[#807777]"><Link href="/signin">สร้างบัญชี</Link></div>
                <div className="text-sm font-medium text-[#807777]"><Link href="/ForgotPassword">ลืมรหัสผ่าน</Link></div>
            </div>
            <button
            type="submit"
            disabled={!isFormValid}
            className={`text-white font-medium rounded-full text-sm w-full sm:w-auto px-12 py-2.5 text-center ${
              isFormValid
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <div className="text-center">
        {!isValidEmail && formData.email.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              อีเมลต้องลงท้ายด้วย @ku.th
            </p>
          )}
          {!isPasswordLongEnough && formData.password.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร
            </p>
          )}
          {!containsUpperCase && formData.password.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              รหัสผ่านต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
            </p>
          )}
          {!containsLowerCase && formData.password.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              รหัสผ่านต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว
            </p>
          )}
          {!containsNumber && formData.password.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว
            </p>
          )}
          {!containsSpecialChar && formData.password.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว เช่น !@#$%^&*,.?":|-
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
