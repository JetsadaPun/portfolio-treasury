"use client";
import React from "react";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation";
import ProjectDetail from "../components/projectdetail";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const Page4 = () => {
  const router = useRouter();

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
      comment: 1,
      likeCount: 1,
      views: 12.7,
    },
  ];

  const projectdetail = {
    documents: [
      { name: "er-diagram.pdf", link: "https://example.com/doc1.pdf" },
    ],
    github: "https://github.com/JetsadaPun/portfolio-treasury",
    membertag: ["นาย K", "นาย B", "นาย F"],
    comments: [
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
    ],
  };

  const handleBack = () => {
    router.back();
  };

  const handleCreateReview = () => {
    router.push("/create-review");
  };

  const buttonStyles = "py-2 px-4 rounded-[15px] m-12 text-black";

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-24 my-16">
        {/* หัวข้อ */}
        <div className="relative p-4 w-full">
          {subjects.map((subject, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-base text-black">
                {subject.code} - {subject.title}
              </h2>
              <div className="flex">
                <h2 className="text-base text-[#FFFFFF]">
                  {subject.code} - 
                </h2>
                <h2 className="text-base text-gray-700">
                  {subject.subtitle}
                </h2>
              </div>            </div>
          ))}
        </div>

        {/* รีวิว */}
        <div className="flex flex-col gap-y-4">
          {reviewsubject.map((review, index) => (
            <div key={index} className="relative w-full p-4">
              <div className="flex items-center mb-2">
                <p className="text-base font-medium text-black mr-2">{review.username}</p>
                <p className="text-base text-gray-500">{review.date}</p>
              </div>
              <p className="text-base font-medium text-black inline">ชื่อโปรเจกต์: </p>
              <span className="text-base text-black"> {review.projectName}</span>

              <p className="text-base font-medium text-black mt-2">รายละเอียดเกี่ยวกับโปรเจกต์</p>
              <span className="m-10 text-base text-black">{review.detail}</span>

              <div className="flex justify-center items-center mt-4">
                <div className="relative">
                  <img
                    src={review.image || "/placeholder.png"} // Fallback image
                    alt="Project"
                    className="rounded-lg"
                    style={{
                      maxWidth: "400px",
                      minWidth: "200px",
                      maxHeight: "400px",
                      minHeight: "200px",
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 text-gray-500 gap-x-8 m-3">
                <div>ความชอบ: {review.likeCount}</div>
                <div>จำนวนผู้เข้าชม: {review.views}</div>
              </div>
            </div>
          ))}
        </div>

        {/* รายละเอียดโปรเจกต์ */}
        <div className="flex flex-col gap-y-4">
          <ProjectDetail
            documents={projectdetail.documents}
            github={projectdetail.github}
            membertag={projectdetail.membertag}
            comments={projectdetail.comments}
          />
        </div>

        {/* ปุ่มย้อนกลับ & สร้างรีวิว */}
        <div className="flex justify-between">
          <button onClick={handleBack} className={`${buttonStyles} bg-[#AAD7BF]`}>
            ย้อนกลับ
          </button>
          <button onClick={handleCreateReview} className={`${buttonStyles} bg-[#FDE69E]`}>
            สร้างรีวิว
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page4;
