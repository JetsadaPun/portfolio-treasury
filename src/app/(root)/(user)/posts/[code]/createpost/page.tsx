"use client";
import React, { useState, useRef, useEffect } from "react";
import { Kanit } from "next/font/google";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const API_BASE = "http://localhost:8080";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { code } = params;

  const [formData, setFormData] = useState<{
    projectName: string;
    projectDetails: string;
    projectImage: File | null;
    projectFiles: File[];
    projectLink: string;
    projectDocument: File | null;
    members: string[];
  }>({
    projectName: "",
    projectDetails: "",
    projectImage: null,
    projectFiles: [],
    projectLink: "",
    projectDocument: null,
    members: ["You"],
  });

  const projectImageRef = useRef<HTMLInputElement | null>(null);
  const projectDocumentRef = useRef<HTMLInputElement | null>(null);

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

      if (name === "projectImage") {
        if (file.type.startsWith("image/")) {
          setFormData((prev) => ({
            ...prev,
            [name]: file,
          }));
        } else {
          Swal.fire({
            title: "ไฟล์ไม่ถูกต้อง",
            text: "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น",
            icon: "warning",
            confirmButtonColor: "#FDA49E"
          });
        }
      } else if (name === "projectDocument") {
        if (file.type === "application/pdf") {
          setFormData((prev) => ({
            ...prev,
            [name]: file,
          }));
        } else {
          Swal.fire({
            title: "ไฟล์ไม่ถูกต้อง",
            text: "กรุณาอัปโหลดไฟล์ PDF เท่านั้น",
            icon: "warning",
            confirmButtonColor: "#FDA49E"
          });
        }
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

  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validImages = filesArray.filter(file => file.type.startsWith("image/"));

      if (validImages.length < filesArray.length) {
        Swal.fire("ไฟล์ไม่ถูกต้อง", "บางไฟล์ไม่ใช่รูปภาพและจะไม่ถูกเพิ่ม", "warning");
      }

      setFormData(prev => ({
        ...prev,
        projectFiles: [...prev.projectFiles, ...validImages]
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projectFiles: prev.projectFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("กรุณาเข้าสู่ระบบ", "คุณต้องเข้าสู่ระบบก่อนเพิ่มโปรเจกต์", "error");
      router.push("/login");
      return;
    }

    try {
      Swal.fire({
        title: "กำลังบันทึก...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // 1. Decode token to get email
      const decoded = decodeJwt(token);
      const email = decoded?.sub; // JWT subject is email

      if (!email) throw new Error("Invalid token");

      // 2. Fetch User ID from profile endpoint
      const profileResp = await fetch(`${API_BASE}/api/users/profile/${email}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!profileResp.ok) throw new Error("Could not fetch user profile");
      const profile = await profileResp.json();
      const userId = profile.id;

      // 3. Find Subject ID
      const subjectsResp = await fetch(`${API_BASE}/api/subjects`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!subjectsResp.ok) throw new Error("Could not fetch subjects list");

      const subjects = await subjectsResp.json();

      let subjectId = 1; // default fallback

      if (Array.isArray(subjects)) {
        const matchedSubject = subjects.find((s: any) =>
          code?.toString().toLowerCase() === s.subjectNameId?.toLowerCase()
        );
        if (matchedSubject) {
          subjectId = matchedSubject.subjectId;
        } else {
          console.warn("No matching subject found for code:", code, "using default ID 1");
        }
      } else {
        console.error("Subjects data is not an array:", subjects);
        throw new Error("Invalid data format received from server");
      }

      // 4. Send Post Request using FormData
      const postRequestData = {
        subjectId: subjectId,
        projectName: formData.projectName,
        projectDetail: formData.projectDetails,
        projectLink: formData.projectLink,
        projectDocs: "",
        userId: userId
      };

      const submitData = new FormData();
      // Append the JSON data as a Blob with application/json type
      submitData.append("data", new Blob([JSON.stringify(postRequestData)], {
        type: "application/json"
      }));

      // Append all images
      formData.projectFiles.forEach((file) => {
        submitData.append("images", file);
      });

      // Append document if exists
      if (formData.projectDocument) {
        submitData.append("document", formData.projectDocument);
      }

      const response = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // Note: Browser will automatically set Content-Type to multipart/form-data with boundary
        },
        body: submitData
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to save post");
      }

      await Swal.fire({
        title: "สำเร็จ!",
        text: "บันทึกข้อมูลโปรเจกต์ของคุณเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#AAD7BF",
      });

      router.push(`/posts/${code}`);
    } catch (error: any) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.message || "ไม่สามารถบันทึกข้อมูลได้ในขณะนี้",
        icon: "error",
        confirmButtonText: "รับทราบ",
        confirmButtonColor: "#FDA49E",
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "แน่ใจหรือไม่?",
      text: "ข้อมูลที่คุณกรอกจะสูญหาย",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ใช่, ยกเลิก",
      cancelButtonText: "กรอกข้อมูลต่อ",
      confirmButtonColor: "#FDA49E",
      cancelButtonColor: "#gray",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/home");
      }
    });
  };

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-24 my-16 p-8">
        <div className="relative mb-6">
          <h2 className="text-lg font-medium text-black">
            สร้างรีวิว/ผลงานสำหรับวิชา: {code}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-base font-medium text-black">ชื่อโปรเจกต์</label>
            <input
              type="text"
              name="projectName"
              placeholder="เพิ่มชื่อโปรเจกต์"
              value={formData.projectName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-black">รายละเอียดเกี่ยวกับโปรเจกต์</label>
            <textarea
              name="projectDetails"
              placeholder="เพิ่มรายละเอียดเกี่ยวกับโปรเจกต์..."
              rows={4}
              value={formData.projectDetails}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-black mb-2">
              เพิ่มรูปภาพโปรเจกต์ (PNG, JPEG, JPG)
            </label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleMultipleFilesChange}
                  className="hidden"
                  id="multi-image-upload"
                />
                <label
                  htmlFor="multi-image-upload"
                  className="cursor-pointer px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl border-2 border-dashed border-indigo-200 hover:bg-indigo-100 transition-all font-medium text-sm flex items-center gap-2"
                >
                  📷 เลือกรูปภาพเพิ่ม
                </label>
              </div>

              {formData.projectFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {formData.projectFiles.map((file, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-video flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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

          <div className="mb-6">
            <label className="block text-lg font-medium text-black">เอกสารเกี่ยวกับโปรเจกต์ (PDF)</label>
            <input
              ref={projectDocumentRef}
              type="file"
              name="projectDocument"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 hover:file:bg-gray-100"
              accept=".pdf"
            />
          </div>

          <div className="mb-6">
            <label className="block text-base font-medium text-black">สมาชิกโปรเจกต์</label>
            <div className="mt-2 flex items-center space-x-4">
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="inline-block w-8 h-8 bg-gray-300 rounded-full"></span>
                  <p className="ml-2 text-sm text-gray-700">{member}</p>
                </div>
              ))}
              <button type="button" onClick={handleAddMember} className="text-black hover:underline text-sm">+ เพิ่มสมาชิก</button>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button type="button" onClick={handleCancel} className="text-black bg-[#FDA49E] py-2 px-6 rounded-[15px] m-6">ยกเลิก</button>
            <button type="submit" className="text-black bg-[#AAD7BF] py-2 px-6 rounded-[15px] m-6">ยืนยัน</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
