import React from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import { useRouter } from "next/navigation";
import ReportIcon from "@mui/icons-material/Report";
import Swal from "sweetalert2";

interface Document {
  name: string;
  link: string;
}

interface ReviewProps {
  username: string;
  date: string;
  projectName: string;
  detail: string;
  image: string;
  comment: number;
  likeCount: number;
  documents?: Document[];
  github?: string;
  membertag?: string[];
  showDocuments?: boolean; // ควบคุมการแสดงเอกสาร
  showGithub?: boolean;    // ควบคุมการแสดง GitHub
  showMemberTags?: boolean; // ควบคุมการแสดงสมาชิกโปรเจกต์
  postId: number;
}

const Reviewsubject: React.FC<ReviewProps> = ({
  username,
  date,
  projectName,
  detail,
  image,
  comment,
  likeCount,
  documents = [],
  github = "",
  membertag = [],
  showDocuments = true,
  showGithub = true,
  showMemberTags = true,
  postId,
}) => {
  const router = useRouter();

  const handleReport = async () => {
    const { value: reason } = await Swal.fire({
      title: "รายงานโพสต์",
      input: "textarea",
      inputLabel: "สาเหตุที่รายงาน",
      inputPlaceholder: "ระบุเหตุผล เช่น เนื้อหาไม่เหมาะสม, ข้อมูลเท็จ...",
      showCancelButton: true,
      confirmButtonText: "ส่งรายงาน",
      cancelButtonText: "ยกเลิก",
      inputValidator: (value) => {
        if (!value) {
          return "กรุณาระบุเหตุผลในการรายงาน";
        }
      }
    });

    if (reason) {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("ผิดพลาด", "กรุณาเข้าสู่ระบบก่อนรายงาน", "error");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/reports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ postId, reason })
        });

        if (res.ok) {
          Swal.fire("สำเร็จ", "ส่งรายงานเรียบร้อยแล้ว แอดมินจะดำเนินการตรวจสอบโดยเร็วที่สุด", "success");
        } else {
          Swal.fire("ผิดพลาด", "ไม่สามารถส่งรายงานได้ในขณะนี้", "error");
        }
      } catch (error) {
        Swal.fire("ผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
      }
    }
  };
  return (
    <div className="relative rounded-2xl w-full border-[1px] border-black p-4 cursor-pointer"
      onClick={() => router.push(`/projects/${postId}`)}>
      {/* ข้อมูลผู้ใช้และวันที่ */}
      <div className="flex items-center mb-2">
        <p className="text-base font-medium text-black mr-2">{username}</p>
        <p className="text-base text-gray-500">{date}</p>
      </div>

      {/* ชื่อโปรเจกต์ */}
      <p className="text-base font-medium text-black inline">ชื่อโปรเจกต์: </p>
      <span className="text-base text-black">{projectName}</span>

      {/* รายละเอียดเกี่ยวกับโปรเจกต์ */}
      <p className="text-base font-medium text-black mt-2">รายละเอียดเกี่ยวกับโปรเจกต์</p>
      <span className="m-10 text-base text-black">{detail}</span>

      {/* แสดงภาพโปรเจกต์ */}
      <div className="flex justify-center items-center mt-4">
        <div className="relative">
          <img
            src={image}
            alt="Project"
            style={{
              maxWidth: "400px",
              minWidth: "200px",
              maxHeight: "400px",
              minHeight: "200px",
            }}
          />
        </div>
      </div>

      {/* แสดงข้อมูลที่เกี่ยวกับการโต้ตอบ */}
      <div className="flex items-center mt-4 text-gray-500 gap-x-8 justify-between">
        <div className="flex gap-4">
          <div>
            <ChatBubbleIcon /> ความคิดเห็น: {comment}
          </div>
          <div>
            <ThumbUpIcon /> ความชอบ: {likeCount}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="hover:text-red-500 transition-colors" title="รายงานโพสต์" onClick={(e) => {
            e.stopPropagation();
            handleReport();
          }}>
            <ReportIcon /> รายงาน
          </div>
          <ShareIcon />
        </div>
      </div>

      {/* แสดงเอกสารเกี่ยวกับโปรเจกต์ (ถ้าเปิดใช้งาน) */}
      {showDocuments && documents.length > 0 && (
        <div className="mt-4 flex gap-2">
          <p className="text-base font-medium text-black">เอกสารเกี่ยวกับโปรเจกต์:</p>
          <div className="flex flex-col gap-2">
            {documents.map((doc, index) => (
              <a
                key={index}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {doc.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* แสดง GitHub (ถ้าเปิดใช้งานและมี GitHub) */}
      {showGithub && github && (
        <div className="mt-4 flex gap-2">
          <p className="text-base font-medium text-black inline">GitHub:</p>
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {github}
          </a>
        </div>
      )}

      {/* แสดงสมาชิกโปรเจกต์ (ถ้าเปิดใช้งาน) */}
      {showMemberTags && membertag.length > 0 && (
        <div className="mt-4">
          <p className="text-base font-medium text-black">สมาชิกโปรเจกต์:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {membertag.map((member, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-600 text-sm py-1 px-3 rounded-full"
              >
                #{member}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviewsubject;