"use client";
import React, { useState, useEffect } from "react";
import { Kanit } from "next/font/google";
import { useRouter, useParams } from "next/navigation";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Reviewsubject from "@/app/components/reviewsubject";
import Swal from "sweetalert2";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const API_BASE = "http://localhost:8080";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const { code } = params;
  const subjectCode = Array.isArray(code) ? code[0] : code || "";

  const [subject, setSubject] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subjectCode) {
      fetchData();
    }
  }, [subjectCode]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Subject Info
      const subjectRes = await fetch(`${API_BASE}/api/subjects/${encodeURIComponent(subjectCode)}`);
      if (!subjectRes.ok) throw new Error("ไม่พบข้อมูลวิชา");
      const subjectData = await subjectRes.json();
      setSubject(subjectData);

      // 2. Fetch Posts for this subject
      const postsRes = await fetch(`${API_BASE}/api/posts/subject/${subjectData.subjectId}`);
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setReviews(postsData);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      Swal.fire("ผิดพลาด", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    router.push("/home");
  };

  const handleCreate = () => {
    router.push(`/posts/${code}/createpost`);
  };

  if (loading) {
    return (
      <div className={`${kanit.className} min-h-screen flex items-center justify-center text-white`}>
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  if (!subject) {
    return (
      <div className={`${kanit.className} min-h-screen flex flex-col items-center justify-center text-white`}>
        <p className="mb-4 text-xl">ไม่พบข้อมูลรายวิชานี้</p>
        <button onClick={handleGoHome} className="bg-[#AAD7BF] text-black px-6 py-2 rounded-xl">กลับหน้าหลัก</button>
      </div>
    );
  }

  return (
    <div className={`${kanit.className} min-h-screen py-10`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-10 md:mx-24 shadow-lg overflow-hidden">

        {/* Navigation Buttons (TOP) */}
        <div className="flex justify-between items-center px-8 py-6 bg-gray-50/50 border-b border-gray-100">
          <button
            onClick={handleGoHome}
            className="text-[#2D3436] font-bold hover:text-[#0984E3] transition-colors flex items-center gap-2"
          >
            <span className="text-xl">←</span> กลับหน้าหลัก
          </button>
          <button
            className="bg-[#FDE69E] hover:bg-[#FADC7A] text-[#2D3436] font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2"
            onClick={handleCreate}
          >
            <span className="text-xl">+</span> เพิ่มงานของตัวเอง
          </button>
        </div>

        {/* Subject Header */}
        <div className="relative pt-8 px-8 w-full border-b border-gray-100 pb-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-[#2D3436] mb-1">
              {subject.subjectNameId} - {subject.subjectNameTh}
            </h1>
            <p className="text-xl text-gray-400 font-medium">{subject.subjectNameEn}</p>

            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-gray-600 bg-blue-50/50 border border-blue-100 px-4 py-2 rounded-2xl">
                <DescriptionIcon className="text-[#0984E3] text-xl" />
                <span className="text-sm font-semibold">ผลงาน: {reviews.length}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-red-50/50 border border-red-100 px-4 py-2 rounded-2xl">
                <ThumbUpIcon className="text-[#FF7675] text-xl" />
                <span className="text-sm font-semibold">ความชอบ: 0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="px-8 py-10 flex flex-col gap-y-8">
          <h2 className="text-2xl font-bold text-[#2D3436]">ผลงานและรีวิวทั้งหมด ({reviews.length})</h2>

          {reviews.length === 0 ? (
            <div className="text-center py-24 bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[2rem] text-gray-400">
              <div className="text-4xl mb-4">📝</div>
              ยังไม่มีใครลงผลงานในวิชานี้ มาเริ่มเป็นคนแรกกันเลย!
            </div>
          ) : (
            reviews.map((post) => (
              <Reviewsubject
                key={post.postId}
                username={post.userName || "ไม่ระบุชื่อ"}
                date={post.createdAt ? new Date(post.createdAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }) : "ไม่ระบุวันที่"}
                projectName={post.projectName}
                detail={post.projectDetail}
                image={post.projectImage || "/img2.png"}
                likeCount={0}
                comment={0}
                postId={post.postId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
