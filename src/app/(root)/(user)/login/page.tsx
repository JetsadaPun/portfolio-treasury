"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Arimo } from "next/font/google";
import { Kanit } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";

const arimo = Arimo({
  subsets: ["latin"],
  weight: "700",
});

const kanit = Kanit({
  subsets: ["thai"],
  weight: "300",
});

const page = () => {
  const router = useRouter();
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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log("Submitting form", formData);

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const user = await response.json();
      if (response.ok && user.token) {
        localStorage.setItem('token', user.token); // เก็บ token ไว้ในเครื่อง
        router.push('/home');
      }
      console.log('Login successful', user);

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      router.push('/home');
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      alert("เกิดข้อผิดพลาดในระบบ");
    }
  };

  const handleGoogleLogin = () => {
    // Redirect ไปยัง Backend เพื่อเริ่มกระบวนการ OAuth2
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
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
        <div className={`${arimo.className} text-3xl mb-4 text-gray-900`}>
          TREASURY PROJECT
        </div>
        <div className={`${kanit.className}`}>
          <p className="text-sm text-[#807777] mb-8">
            ใส่ข้อมูลบัญชีผู้ใช้เพื่อเข้าสู่ระบบ
          </p>
          <form className="max-w-md mx-auto" onSubmit={handleLogin}>
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
                placeholder="ตัวอย่าง name@email.com"
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
                placeholder="ตัวอย่าง Abcd_1234"
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
              <div className="text-sm font-medium text-[#807777]">
                <Link href="/signin">สร้างบัญชี</Link>
              </div>
              <div className="text-sm font-medium text-[#807777]">
                <Link href="/ForgotPassword">ลืมรหัสผ่าน</Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`text-white font-medium rounded-full text-sm w-full sm:w-auto px-12 py-2.5 text-center transition-all ${isFormValid
                ? "bg-green-500 hover:bg-green-600 active:scale-95"
                : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              เข้าสู่ระบบ
            </button>

            <div className="flex items-center my-6 max-w-md mx-auto">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-400 text-sm">หรือ</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 w-full max-w-md mx-auto bg-white border border-gray-200 py-2.5 rounded-full hover:bg-gray-50 transition-all active:scale-95 shadow-sm text-gray-700 font-medium"
            >
              <FcGoogle size={24} />
              <span>เข้าสู่ระบบด้วย Google</span>
            </button>
            <div className="text-left mt-5">
              {!isValidEmail && formData.email.length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  รูปแบบอีเมลไม่ถูกต้อง
                </p>
              )}
              {!isPasswordLongEnough && formData.password.length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  รหัสผ่านต้องประกอบด้วย: ความยาวอย่างน้อย 8 ตัวอักษร
                </p>
              )}
              {!containsUpperCase && formData.password.length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  ตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว
                </p>
              )}
              {!containsLowerCase && formData.password.length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  ตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว
                </p>
              )}
              {!containsNumber && formData.password.length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  ตัวเลขอย่างน้อย 1 ตัว
                </p>
              )}
              {!containsSpecialChar && formData.password.length > 0 && (
                <p className="text-red-500 text-sm mt-2">
                  อักขระพิเศษอย่างน้อย 1 ตัว เช่น !@#$%^&*,.?":|-
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
