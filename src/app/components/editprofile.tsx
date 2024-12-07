"use client";
import React, { useState } from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
    education: "",
    dob: "",
    image: "",  
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
  
      // ตรวจสอบว่าไฟล์ที่ได้รับเป็นประเภทที่รองรับ เช่น รูปภาพ
      if (file && file.type.startsWith('image')) {
        const fileURL = URL.createObjectURL(file);
        setFormData((prev) => ({
          ...prev,
          image: fileURL,  // เก็บ URL ของไฟล์ที่อัปโหลด
        }));
      } else {
        console.error("ไฟล์ไม่ถูกต้อง กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ข้อมูลที่ถูกส่ง:", formData);

    // รีเซ็ตฟอร์มหลังจากส่งข้อมูล
    setFormData({
      username: "",
      email: "",
      phone: "",
      bio: "",
      education: "",
      dob: "",
      image: "",  
    });
  };

  const handleCancel = () => {
    console.log("ยกเลิกการกรอกข้อมูล");
    setFormData({
      username: "",
      email: "",
      phone: "",
      bio: "",
      education: "",
      dob: "",
      image: "", 
    });
  };

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-60 my-16 p-8">
        <h1 className="text-lg text-center font-medium mb-6 text-black">แก้ไขโปรไฟล์</h1>
        {/* ฟอร์ม */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            {/* ส่วนของรูปภาพ */}
            <div className="relative w-36 h-42 bg-gray-200 rounded-md mr-6 flex items-center justify-center">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center w-full h-full">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-md" // ให้ใช้ object-cover ที่จะขยายภาพให้เต็มพื้นที่
                  />
                ) : (
                  <span className="text-black text-sm">อัปโหลดรูป</span>
                )}
              </label>
            </div>

            <div className="relative flex flex-col justify-between w-96">
              <div className="flex items-center mb-4">
                <label className="block text-base font-medium text-black w-20">ชื่อผู้ใช้:</label>
                <input
                  type="text"
                  name="username"
                  placeholder="กรอกชื่อผู้ใช้"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>
              {/* อีเมล */}
              <div className="flex items-center mb-4">
                <label className="block text-base font-medium text-black w-20">อีเมล:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@ku.th"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>
              {/* เบอร์โทร */}
              <div className="flex items-center mb-4">
                <label className="block text-base font-medium text-black w-20">เบอร์โทร:</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="กรอกเบอร์โทร"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  pattern="^[0-9]{10}$"
                  title="กรุณากรอกเบอร์โทรที่มี 10 หลัก"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-medium text-black mx-20 mb-4">เกี่ยวกับฉัน</h2>
            {/* ประวัติส่วนตัว */}
            <div className="mb-4 mx-20">
              <label className="block text-base font-medium text-black">ประวัติส่วนตัว:</label>
              <textarea
                name="bio"
                placeholder="เพิ่มประวัติส่วนตัว..."
                rows={4}
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"
              ></textarea>
            </div>
            {/* ประวัติการศึกษา */}
            <div className="mb-4 mx-20 flex items-center">
              <label className="block text-base font-medium text-black w-40">ประวัติการศึกษา:</label>
              <input
                type="text"
                name="education"
                placeholder="กรอกประวัติการศึกษา"
                value={formData.education}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"
              />
            </div>
            {/* วันเกิด */}
            <div className="mb-4 mx-20 flex items-center">
              <label className="block text-base font-medium text-black w-20">วันเกิด:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* ปุ่ม */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="text-black bg-[#FDA49E] py-2 px-6 rounded-[15px] m-6">ยกเลิก</button>
            <button
              type="submit"
              className="text-black bg-[#AAD7BF] py-2 px-6 rounded-[15px] m-6">ยืนยัน</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
