"use client";
import React, { useState, useEffect } from "react";
import { Kanit } from "next/font/google";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EditIcon from "@mui/icons-material/Edit";
import Aboutme from "@/app/components/aboutme";
import Project from "@/app/components/project";
import EditProfile from "@/app/components/editprofile";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const API_BASE = "http://localhost:8080";

const ProfilePage = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("project");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      Swal.fire("Error", "ไม่สามารถดึงข้อมูลโปรไฟล์ได้", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    fetchUserProfile(); // Refresh data
  };

  if (loading) {
    return (
      <div className={`${kanit.className} min-h-screen flex items-center justify-center`}>
        กำลังโหลดข้อมูลโปรไฟล์...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`${kanit.className} min-h-screen flex flex-col items-center py-10 px-4`}>
      <div className="w-full max-w-5xl">
        {isEditing ? (
          <EditProfile
            user={user}
            onUpdateSuccess={handleUpdateSuccess}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-50">
            {/* Header / Cover area mockup */}
            <div className="h-32 bg-gradient-to-r from-[#AAD7BF] to-[#6189C2] opacity-80"></div>

            <div className="px-8 md:px-16 pb-12 -mt-16">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
                <div className="relative">
                  <img
                    src={user.profileImage || "/catprofile.jpg"}
                    alt="profile"
                    className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-lg bg-white"
                  />
                </div>

                <div className="flex-1 text-center md:text-left pb-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl transition-all active:scale-95 text-sm font-bold w-fit mx-auto md:mx-0"
                    >
                      <EditIcon fontSize="small" /> แก้ไขโปรไฟล์
                    </button>
                  </div>
                  <p className="text-gray-400 mt-1 font-medium">{user.email}</p>
                </div>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="bg-blue-50 text-blue-600 px-5 py-2 rounded-2xl flex items-center gap-2 border border-blue-100">
                  <span className="font-bold text-xs uppercase tracking-wider">รหัสนักศึกษา:</span>
                  <span className="font-semibold">{user.studentId || "ยังไม่ได้ระบุ"}</span>
                </div>
                <div className="bg-green-50 text-green-700 px-5 py-2 rounded-2xl flex items-center gap-2 border border-green-100">
                  <span className="font-bold text-xs uppercase tracking-wider">เบอร์โทร:</span>
                  <span className="font-semibold">{user.phone || "ยังไม่ได้ระบุ"}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-10 border-b border-gray-100 mb-8 relative">
                <div
                  className={`flex items-center gap-2 pb-4 cursor-pointer transition-all relative z-10 ${selectedTab === "project"
                      ? "text-blue-600 font-bold border-b-2 border-blue-600"
                      : "text-gray-400 font-medium hover:text-gray-600"
                    }`}
                  onClick={() => setSelectedTab("project")}
                >
                  <AssignmentIcon fontSize="small" />
                  <span>โปรเจกต์</span>
                </div>

                <div
                  className={`flex items-center gap-2 pb-4 cursor-pointer transition-all relative z-10 ${selectedTab === "aboutme"
                      ? "text-blue-600 font-bold border-b-2 border-blue-600"
                      : "text-gray-400 font-medium hover:text-gray-600"
                    }`}
                  onClick={() => setSelectedTab("aboutme")}
                >
                  <PersonIcon fontSize="small" />
                  <span>เกี่ยวกับฉัน</span>
                </div>
              </div>

              {/* Content area */}
              <div className="min-h-[300px] animate-fadeIn">
                {selectedTab === "project" ? (
                  <Project userId={user.id} />
                ) : (
                  <Aboutme user={user} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
