"use client";
import React, { useState, useEffect } from "react";
import { Kanit } from "next/font/google";
import Swal from "sweetalert2";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const API_BASE = "http://localhost:8080";

interface EditProfileProps {
  user: any;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onUpdateSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    education: user?.education || "",
    dob: user?.dob || "",
    studentId: user?.studentId || "",
    profileImage: user?.profileImage || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            profileImage: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire("ผิดพลาด", "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น", "error");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: formData.phone,
          bio: formData.bio,
          education: formData.education,
          dob: formData.dob,
          studentId: formData.studentId,
          profileImage: formData.profileImage,
        }),
      });

      if (response.ok) {
        await Swal.fire("สำเร็จ", "อัปเดตโปรไฟล์เรียบร้อยแล้ว", "success");
        onUpdateSuccess();
      } else {
        const errorData = await response.json();
        Swal.fire("ผิดพลาด", errorData.message || "ไม่สามารถอัปเดตโปรไฟล์ได้", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("ผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์", "error");
    }
  };

  return (
    <div className={`${kanit.className} w-full`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-xl font-bold mb-8 text-gray-800 text-center">แก้ไขข้อมูลส่วนตัว</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-40 h-40 group">
                <img
                  src={formData.profileImage || "/catprofile.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-gray-50 shadow-md transition-all group-hover:brightness-75"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-white text-sm font-bold bg-black/50 px-3 py-1 rounded-full">เปลี่ยนรูป</span>
                </label>
              </div>
              <p className="text-xs text-gray-400">ขนาดแนะนำ: 400x400 px</p>
            </div>

            {/* Read-only Basic Info */}
            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-1 ml-1">ชื่อผู้ใช้ (ไม่สามารถเปลี่ยนได้)</label>
                  <input
                    type="text"
                    value={formData.name}
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 mb-1 ml-1">อีเมล (ไม่สามารถเปลี่ยนได้)</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">รหัสนักศึกษา</label>
                <input
                  type="text"
                  name="studentId"
                  placeholder="เช่น 6521600XXX"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="เช่น 0812345678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-50 pt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">ข้อมูลเพิ่มเติม</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">วันเกิด</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">ประวัติการศึกษา</label>
                <input
                  type="text"
                  name="education"
                  placeholder="เช่น วิศวกรรมซอฟต์แวร์ มหาวิทยาลัย..."
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">ประวัติส่วนตัว (Bio)</label>
              <textarea
                name="bio"
                placeholder="บอกเล่าเรื่องราวของคุณสั้นๆ..."
                rows={4}
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all active:scale-95"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#AAD7BF] text-[#2D3436] font-bold hover:bg-[#8ec4a7] transition-all shadow-sm active:scale-95"
            >
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
