"use client";

import React, { useState, useRef } from "react";
import { Kanit } from "next/font/google";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const CreateReview = () => {
  const subjects = [
    {
      code: "01418496 - 65",
      title: "เรื่องเฉพาะทางวิทยาการคอมพิวเตอร์",
      subtitle: "Selected Topic in Computer Science",
    },
  ];

  const [formData, setFormData] = useState({
    projectName: "",
    projectDetails: "",
    projectImage: null,
    projectLink: "",
    projectDocument: null,
    members: ["You"], // สมาชิกเริ่มต้น
  });

  const projectImageRef = useRef<HTMLInputElement | null>(null);
  const projectDocumentRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      // ตรวจสอบว่าไฟล์เป็นรูปภาพ
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));
      } else {
        alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      }
    }
  };

  const handleAddMember = () => {
    const newMemberName = prompt("เพิ่มชื่อสมาชิกใหม่");
    if (newMemberName) {
      setFormData((prev) => ({
        ...prev,
        members: [...prev.members, newMemberName],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ข้อมูลที่ส่ง:", formData);

    const formDataToSend = new FormData();
    formDataToSend.append("projectName", formData.projectName);
    formDataToSend.append("projectDetails", formData.projectDetails);
    if (formData.projectImage) {
      formDataToSend.append("projectImage", formData.projectImage);
    }
    formDataToSend.append("projectLink", formData.projectLink);
    if (formData.projectDocument) {
      formDataToSend.append("projectDocument", formData.projectDocument);
    }
    // ส่งข้อมูลไปยัง API หรือ backend

    // รีเซ็ตฟอร์มหลังจากส่งข้อมูล
    setFormData({
      projectName: "",
      projectDetails: "",
      projectImage: null,
      projectLink: "",
      projectDocument: null,
      members: ["You"],
    });

    // ล้างไฟล์ที่เลือก
    if (projectImageRef.current) {
      projectImageRef.current.value = "";
    }
    if (projectDocumentRef.current) {
      projectDocumentRef.current.value = "";
    }
  };

  const handleCancel = () => {
    console.log("ยกเลิกการกรอกข้อมูล");

    // ล้างไฟล์ที่เลือกเมื่อยกเลิก
    if (projectImageRef.current) {
      projectImageRef.current.value = "";
    }
    if (projectDocumentRef.current) {
      projectDocumentRef.current.value = "";
    }
  };

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-24 my-16 p-8">
        {/* หัวข้อ */}
        <div className="relative mb-6">
          {subjects.map((subject, index) => (
            <div key={index}>
              <h2 className="text-lg font-medium text-black">{subject.code} {subject.title}</h2>
              <h3 className="text-sm text-gray-500">{subject.subtitle}</h3>
            </div>
          ))}
        </div>

        {/* ฟอร์ม */}
        <form onSubmit={handleSubmit}>
          {/* ชื่อโปรเจกต์ */}
          <div className="mb-6">
            <label className="block text-base font-medium text-black">ชื่อโปรเจกต์</label>
            <input
              type="text"
              name="projectName"
              placeholder="เพิ่มชื่อโปรเจกต์"
              value={formData.projectName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* รายละเอียดเกี่ยวกับโปรเจกต์ */}
          <div className="mb-6">
            <label className="block text-base font-medium text-black">รายละเอียดเกี่ยวกับโปรเจกต์</label>
            <textarea
              name="projectDetails"
              placeholder="เพิ่มรายละเอียดเกี่ยวกับโปรเจกต์..."
              rows={4}
              value={formData.projectDetails}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"
            ></textarea>
          </div>

          {/* เพิ่มรูปภาพโปรเจกต์ */}
          <div className="mb-6">
            <label className="block text-base font-medium text-black">เพิ่มรูปภาพโปรเจกต์</label>
            <input
              ref={projectImageRef}
              type="file"
              name="projectImage"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 hover:file:bg-gray-100"
              accept="image/*"  // จำกัดไฟล์ที่เป็นรูปภาพเท่านั้น
            />
          </div>

          {/* เพิ่มลิงก์ไปที่งาน */}
          <div className="mb-6">
            <label className="block text-base font-medium text-black">เพิ่มลิงก์ไปที่งาน <span className="text-red-500">*</span></label>
            <input
              type="url"
              name="projectLink"
              placeholder="เพิ่มลิงก์งาน"
              value={formData.projectLink}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* เอกสารเกี่ยวกับโปรเจกต์ */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-black">เอกสารเกี่ยวกับโปรเจกต์ <span className="text-red-500">*</span></label>
            <input
              ref={projectDocumentRef}
              type="file"
              name="projectDocument"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 hover:file:bg-gray-100"
              accept=".pdf" //จำกัดเฉพาะไฟล์ PDF
              required
            />
          </div>

          {/* เพิ่มสมาชิกโปรเจกต์ */}
          <div className="mb-6">
            <label className="block text-base font-medium text-black">เพิ่มสมาชิกโปรเจกต์</label>
            <div className="mt-2 flex items-center space-x-4">
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="inline-block w-8 h-8 bg-gray-300 rounded-full"></span>
                  <p className="ml-2 text-sm text-gray-700">{member}</p>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddMember}
                className="text-black hover:underline text-sm"
              >
                + เพิ่มสมาชิก
              </button>
            </div>
          </div>

          {/* ปุ่มยืนยันและยกเลิก */}
          <div className="flex justify-between mt-8">
            <button
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

export default CreateReview;
