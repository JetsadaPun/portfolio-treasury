"use client";  

import React from "react";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import GroupsIcon from "@mui/icons-material/Groups";
import ShareIcon from "@mui/icons-material/Share";
import Comment from "../../../../components/comment"

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const Page = () => {
  const router = useRouter();

  // ประกาศตัวแปรข้อความที่ใช้ในหน้าต่างๆ
  const labels = {
    backButton: "ย้อนกลับ",
    createButton: "สร้างรีวิว",
    projectName: "ชื่อโปรเจกต์",
    projectDetail: "รายละเอียดเกี่ยวกับโปรเจกต์",
    documents: "เอกสารเกี่ยวกับโปรเจกต์",
    github: "GitHub",
    projectMembers: "สมาชิกโปรเจกต์",
    likes: "ความชอบ",
    views: "จำนวนผู้เข้าชม",
  };

  const subjects = [
    {
      code: "01418496 - 65",
      title: "เรื่องเฉพาะทางวิทยาการคอมพิวเตอร์",
      subtitle: "Selected Topic in Computer Science",
      workCount: 0,
    },
  ];

  const reviewsubject = [
    {
      username: "นายบีชอบกินไข่ปิ้ง",
      date: "30 พ.ย. 2567",
      projectName: "มะม่วงจิ้มรสดี",
      detail:
        "วิธีทอดไข่เจียวให้กรอบ 1. เทน้ำมันใส่กระทะ ตั้งน้ำมันให้ร้อน ตอกไข่ ปรุงรส แล้วตีให้เข้ากัน 2. พอน้ำมันเดือด นำกระชอนมากรองไข่ใส่กระทะให้ไข่ฟู พอไข่เริ่มมีสีเหลืองทองแล้วพลิกไข่อีกด้าน",
      image: "/img2.png",
      likeCount: 1,
      views: 12.7,
      documents: [
        { name: "er-diagram.pdf", link: "https://example.com/doc1.pdf" },
      ],
      github: "https://github.com/JetsadaPun/portfolio-treasury",
      membertag: ["นาย K", "นาย B", "นาย F"],
      showDocuments: true,
      showGithub: true,
      showMemberTags: true,
    },
  ];

  const comment = [
    {
      username: "นายเซชอบหมูยอ",
      text: "ทำขึ้นมาทำไมอะครับ",
      date: "2 สัปดาห์ที่ผ่านมา",
      replies: [
        {
          username: "นายบีชอบกินไข่ปิ้ง",
          text: "เสือก",
          date: "7 วันที่ผ่านมา",
        },
      ],
    },
    {
      username: "นายแชวอนลักไก่",
      text: "ขายเท่าไหร่ครับ",
      date: "2 สัปดาห์ที่ผ่านมา",
      replies: [],
    },
  ];

  const handleBack = () => {
    router.back();
  };

  

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-24 my-16 p-8">
        {/* หัวข้อ */}
        <div className="relative">
          {subjects.map((subject, index) => (
            <div key={index}>
              <h2 className="text-lg font-medium text-black">
                {subject.code} {subject.title}
              </h2>
              <h3 className="text-sm text-gray-500">{subject.subtitle}</h3>
            </div>
          ))}
        </div>

        {/* รีวิว */}
        <div className="flex flex-col gap-y-4">
          {reviewsubject.map((review, index) => (
            <div key={index} className="relative w-full p-4">
              <div className="flex items-center mb-2">
                <p className="text-base font-medium text-black mr-2">
                  {review.username}
                </p>
                <p className="text-base text-gray-500">{review.date}</p>
              </div>
              <p className="text-base font-medium text-black inline">
                {labels.projectName}:{" "}
              </p>
              <span className="text-base text-black"> {review.projectName}</span>

              <p className="text-base font-medium text-black mt-2">
                {labels.projectDetail}
              </p>
              <span className="m-10 text-base text-black">{review.detail}</span>

              <div className="flex justify-center items-center mt-4">
                <div className="relative">
                  <img
                    src={review.image || "/placeholder.png"} // Fallback image
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

              {/* เอกสารเกี่ยวกับโปรเจกต์ */}
              {review.showDocuments && review.documents.length > 0 && (
                <div className="mt-4 flex gap-2">
                  <p className="text-base font-medium text-black">
                    {labels.documents}:
                  </p>
                  <div className="flex flex-col gap-2">
                    {review.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black"
                      >
                        {doc.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* GitHub */}
              {review.showGithub && review.github && (
                <div className="mt-4 flex gap-2">
                  <p className="text-base font-medium text-black">{labels.github}:</p>
                  <a
                    href={review.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                  >
                    {review.github}
                  </a>
                </div>
              )}

              {/* สมาชิกโปรเจกต์ */}
              {review.showMemberTags && review.membertag.length > 0 && (
                <div className="mt-4">
                  <p className="text-base font-medium text-black">
                    {labels.projectMembers}:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {review.membertag.map((member, index) => (
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

              <div className="flex items-center mt-4 text-gray-500 gap-x-8 justify-between">
                <div className="flex gap-4">
                  <div>
                    <ThumbUpIcon /> {labels.likes}: {review.likeCount}
                  </div>
                  <div>
                    <GroupsIcon /> {labels.views}: {review.views}
                  </div>
                </div>
                <ShareIcon />
              </div>
            </div>
          ))}
        </div>

        {/* แสดงคอมเมนต์ */}
        <div className="mx-4 flex flex-col gap-y-4">
          {/* ส่ง comment ให้กับ Comment component */}
          <Comment cards={comment} />
        </div>

        {/* ปุ่มย้อนกลับ & สร้างรีวิว */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="text-black bg-[#AAD7BF] py-2 px-4 rounded-[15px] m-6">
            {labels.backButton}
          </button>
          {/* <button
            
            className="text-black bg-[#FDE69E] py-2 px-4 rounded-[15px] m-6">
            {labels.createButton}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
