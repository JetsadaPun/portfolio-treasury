"use client";
import React, { useState, useEffect } from "react";
import { Kanit } from "next/font/google";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Aboutme from "@/app/components/aboutme";
import Project from "@/app/components/project";
import { useParams, useRouter } from 'next/navigation';

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const API_BASE = "http://localhost:8080";

const PeopleProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const code = params?.code as string;
  const [selectedTab, setSelectedTab] = useState("project");
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      fetchUserProfile();
    }
  }, [code]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // Try fetching by studentId first (the 'code' we passed)
      const response = await fetch(`${API_BASE}/api/users/${code}`);
      if (response.ok) {
        const data = await response.json();
        setPerson(data);
      } else {
        // If not found by studentId, it might be a userId (UUID)
        // Note: For now we only have /{studentId} endpoint, 
        // but we could also have /profile/{email} or similar.
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`${kanit.className} min-h-screen flex items-center justify-center`}>
        กำลังโหลดโปรไฟล์...
      </div>
    );
  }

  if (!person) {
    return (
      <div className={`${kanit.className} min-h-screen flex flex-col items-center justify-center`}>
        <p className="mb-4 text-xl text-gray-400">ไม่พบโปรไฟล์ที่ระบุ</p>
        <button
          onClick={() => router.push('/searchprofile')}
          className="bg-blue-500 text-white px-6 py-2 rounded-xl"
        >
          กลับไปค้นหา
        </button>
      </div>
    );
  }

  return (
    <div className={`${kanit.className} min-h-screen flex items-start justify-center py-10`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-6 md:mx-28 p-6 md:p-12 shadow-lg flex flex-col items-center w-full max-w-5xl">

        <div className="w-full flex justify-start mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-black transition-colors"
          >
            ← กลับ
          </button>
        </div>

        <div className="mb-4 text-2xl font-semibold text-gray-700">
          {person.name}
        </div>
        <div className="mb-4">
          <img
            src={person.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`}
            alt={person.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>

        <div className="text-gray-400 text-sm mb-4">
          {person.studentId ? `รหัสนักศึกษา: ${person.studentId}` : ""}
        </div>

        <div className="flex items-center text-center gap-4 w-full flex-col md:flex-row my-4 px-4 bg-gray-50 py-4 rounded-2xl">
          <div className="text-gray-600 flex-1">
            <span className="font-bold mr-2 text-gray-400">อีเมล:</span>
            {person.email}
          </div>
          <div className="hidden md:flex w-[1px] h-6 bg-gray-200"></div>
          <div className="text-gray-600 flex-1">
            <span className="font-bold mr-2 text-gray-400">เบอร์โทร:</span>
            {person.phone || "ไม่ได้ระบุ"}
          </div>
        </div>

        <div className="flex gap-8 w-full relative mt-6 border-b border-gray-100">
          <div
            className={`flex items-center gap-2 cursor-pointer pb-3 transition-all ${selectedTab === "project"
                ? "font-bold text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400 hover:text-gray-600"
              }`}
            onClick={() => setSelectedTab("project")}
          >
            <AssignmentIcon fontSize="small" /> โปรเจกต์
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer pb-3 transition-all ${selectedTab === "aboutme"
                ? "font-bold text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400 hover:text-gray-600"
              }`}
            onClick={() => setSelectedTab("aboutme")}
          >
            <PersonIcon fontSize="small" /> เกี่ยวกับฉัน
          </div>
        </div>

        <div className="w-full mt-8">
          {selectedTab === "project" ? (
            <Project userId={person.id} />
          ) : (
            <Aboutme initialData={person} isReadOnly={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleProfilePage;
