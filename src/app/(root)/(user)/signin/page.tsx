"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Arimo } from 'next/font/google';
import { Kanit } from 'next/font/google';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

const arimo = Arimo({
  subsets: ['latin'],
  weight: '700',
});

const kanit = Kanit({
  subsets: ['thai'],
  weight: '300',
});

const API_BASE = "http://localhost:8080";
const page = () => {
  const router = useRouter();

  const [phase, setPhase] = useState<"register" | "verify">("register");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const [verifyCode, setVerifyCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState(""); // email ที่เพิ่งสมัคร (ใช้ส่งไป verify)
  const [sending, setSending] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordLongEnough = formData.password.length >= 8;
  const containsUpperCase = /[A-Z]/.test(formData.password);
  const containsLowerCase = /[a-z]/.test(formData.password);
  const containsNumber = /[0-9]/.test(formData.password);
  const containsSpecialChar = /[!@#$%^&*,.?":-]/.test(formData.password);
  const samepassword = formData.password === formData.password2;
  const isNamenotnull = formData.name.length > 3;

  const isPasswordValid =
    isPasswordLongEnough &&
    containsUpperCase &&
    containsLowerCase &&
    containsNumber &&
    containsSpecialChar &&
    samepassword;

  const isFormValid = isValidEmail && isPasswordValid && isNamenotnull;

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setSending(true);
      const res = await fetch(`${API_BASE}/api/register/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (!res.ok || result.success === false) {
        Swal.fire("ผิดพลาด", result.error || "สมัครไม่สำเร็จ", "error");
        return;
      }

      // ✅ สมัครเฟสแรกสำเร็จ → เปลี่ยนเป็นหน้า/เฟสกรอกรหัส
      setPendingEmail(formData.email.trim().toLowerCase());
      setPhase("verify");
      setVerifyCode("");
      Swal.fire("สำเร็จ", "ส่งโค้ดยืนยันไปที่อีเมลแล้ว กรุณากรอกรหัสเพื่อยืนยันบัญชี", "success");

    } catch (err) {
      console.error(err);
      Swal.fire("ผิดพลาด", "เกิดข้อผิดพลาดในระบบ", "error");
    } finally {
      setSending(false);
    }
  };

  const handleSubmitVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSending(true);
      const res = await fetch(`${API_BASE}/api/register/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingEmail,
          code: verifyCode.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok || result.success === false) {
        Swal.fire("ผิดพลาด", result.error || "ยืนยันไม่สำเร็จ", "error");
        return;
      }

      Swal.fire("สำเร็จ", "ยืนยันบัญชีสำเร็จ! สามารถเข้าสู่ระบบได้แล้ว", "success");
      router.push("/login");

    } catch (err) {
      console.error(err);
      Swal.fire("ผิดพลาด", "เกิดข้อผิดพลาดในระบบ", "error");
    } finally {
      setSending(false);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const handleGoogleLogin = () => {
    // Redirect ไปยัง Backend เพื่อเริ่มกระบวนการ OAuth2
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };


  return (
    <div className="flex min-w-full min-h-full items-center justify-center p-8">
      <div className="py-8 text-center min-w-full min-h-full">
        <div className={`${arimo.className} text-3xl mb-4 text-gray-900`}>
          TREASURY PROJECT
        </div>

        <div className={`${kanit.className}`}>
          {/* เปลี่ยนข้อความตามเฟส */}
          {phase === "register" ? (
            <div className="text-sm text-[#807777] mb-8">
              <p>กรอกข้อมูลเพื่อสมัครสมาชิก</p>
              <p>ระบบจะส่งรหัสยืนยันไปยังอีเมลของคุณ</p>
            </div>
          ) : (
            <div className="text-sm text-[#807777] mb-8">
              <p>เราได้ส่งรหัสยืนยันไปที่ <b>{pendingEmail}</b></p>
              <p>โปรดกรอกรหัสเพื่อยืนยันบัญชีของคุณภายใน 15 นาที</p>
            </div>
          )}

          {/* ====== FORM ====== */}
          {phase === "register" ? (
            <form className="max-w-md mx-auto" onSubmit={handleSubmitRegister}>
              {/* Email */}
              <div className="mb-3 text-left">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#807777]">
                  กรอกอีเมลผู้ใช้
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

              {/* Name */}
              <div className="mb-3 text-left">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#807777]">
                  ชื่อผู้ใช้งาน
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  placeholder="Jetsada"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-5 text-left relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#807777]">
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
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-5 text-left relative">
                <label htmlFor="password2" className="block mb-2 text-sm font-medium text-[#807777]">
                  ยืนยันรหัสผ่าน
                </label>
                <input
                  type={showPassword2 ? "text" : "password"}
                  id="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  placeholder="กรอกรหัสผ่านที่ตรงกับด้านบน"
                  required
                />
                <div
                  className="absolute top-9 right-3 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility2}
                >
                  {showPassword2 ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </div>
              </div>

              <div className="flex justify-end pb-8">
                <div className="text-sm font-medium text-[#807777]">
                  <Link href="/login">กลับหน้าล็อกอินเข้าสู่ระบบ</Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || sending}
                className={`text-white font-medium rounded-full text-sm w-full sm:w-auto px-12 py-2.5 text-center transition-all ${isFormValid && !sending ? "bg-green-500 hover:bg-green-600 active:scale-95" : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                {sending ? "กำลังส่งโค้ด..." : "สมัครสมาชิก"}
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
                <span>สมัครสมาชิกด้วย Google</span>
              </button>

              {/* Validation messages */}
              <div className="text-left mt-5">
                {!isValidEmail && formData.email.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">รูปแบบอีเมลไม่ถูกต้อง</p>
                )}
                {!isNamenotnull && formData.name.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">ชื่อมีความยาวมากกว่า 3 ตัวอักษร</p>
                )}
                {!isPasswordLongEnough && formData.password.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">รหัสผ่านต้องอย่างน้อย 8 ตัวอักษร</p>
                )}
                {!containsUpperCase && formData.password.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">ต้องมีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว</p>
                )}
                {!containsLowerCase && formData.password.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">ต้องมีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว</p>
                )}
                {!containsNumber && formData.password.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">ต้องมีตัวเลขอย่างน้อย 1 ตัว</p>
                )}
                {!containsSpecialChar && formData.password.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว เช่น !@#$%^&*,.?":|-</p>
                )}
                {!samepassword && formData.password2.length > 0 && (
                  <p className="text-red-500 text-sm mt-2">รหัสผ่านไม่ตรงกัน</p>
                )}
              </div>
            </form>
          ) : (
            // ===== VERIFY FORM =====
            <form className="max-w-md mx-auto" onSubmit={handleSubmitVerify}>
              <div className="mb-3 text-left">
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-[#807777]">
                  กรอกรหัสยืนยัน (6 หลัก)
                </label>
                <input
                  type="text"
                  id="code"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  placeholder="เช่น 123456"
                  required
                />
              </div>

              <div className="flex justify-between items-center pb-8">
                <button
                  type="button"
                  onClick={() => setPhase("register")}
                  className="text-sm text-[#807777] underline"
                >
                  กลับไปแก้ไขข้อมูลสมัคร
                </button>
                <div className="text-sm font-medium text-[#807777]">
                  <Link href="/login">กลับหน้าล็อกอิน</Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={!verifyCode.trim() || sending}
                className={`text-white font-medium rounded-full text-sm w-full sm:w-auto px-12 py-2.5 text-center ${verifyCode.trim() && !sending ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                {sending ? "กำลังยืนยัน..." : "ยืนยันบัญชี"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
