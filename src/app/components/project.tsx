"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface ProjectProps {
  userId?: string;
}

const API_BASE = "http://localhost:8080";

const Project: React.FC<ProjectProps> = ({ userId }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/posts/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">กำลังโหลดผลงาน...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-2xl w-full border-2 border-dashed border-gray-200">
        <div className="text-gray-400 mb-2">ยังไม่มีผลงานที่แชร์</div>
        <div className="text-sm text-gray-300">เริ่มแชร์ผลงานของคุณในรายวิชาต่างๆ ได้เลย!</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {posts.map((post) => (
        <div key={post.postId} className="border border-gray-200 w-full rounded-2xl p-6 shadow-sm bg-white hover:shadow-md transition-shadow">
          <div className="text-gray-900 mb-4 border-b border-gray-50 pb-3 flex justify-between items-center">
            <div>
              <span className="font-bold mr-2 text-gray-700">ชื่อโปรเจกต์:</span>
              <span className="text-[#2D3436] font-semibold">{post.projectName}</span>
            </div>
            {/* คุณสามารถเพิ่มปุ่มแก้ไข หรือสถานะตรงนี้ได้ */}
          </div>
          <div className="md:flex gap-6">
            {post.projectImage && (
              <div className="flex-shrink-0">
                <img
                  src={post.projectImage.startsWith('http') ? post.projectImage : `${API_BASE}${post.projectImage}`}
                  alt={post.projectName}
                  className="w-full md:w-48 h-32 object-cover rounded-xl shadow-sm border border-gray-100"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="text-gray-600 text-sm leading-relaxed mb-4">
                {post.projectDetail}
              </div>

              <div className="flex flex-wrap gap-3">
                {post.projectLink && (
                  <a
                    href={post.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    🔗 ลิงก์โปรเจกต์
                  </a>
                )}
                {post.projectDocs && (
                  <a
                    href={post.projectDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
                  >
                    📄 เอกสารประกอบ
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
