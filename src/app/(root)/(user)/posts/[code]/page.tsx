"use client";
import React from "react";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Reviewsubject from "@/app/components/reviewsubject";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const { code } = params;

  const handleGoHome = () => {
    router.push("/home");
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
      comment: 1,
      likeCount: 1,
      views: 12.7,
    },
    {
      username: "นายซีชอบกินปิ้งไก่",
      date: "1 ธ.ค. 2567",
      projectName: "มะม่วงจิ้มกะปิ",
      detail:
        "วิธีทอดไข่เจียวให้กรอบ 1. เทน้ำมันใส่กระทะ ตั้งน้ำมันให้ร้อน ตอกไข่ ปรุงรส แล้วตีให้เข้ากัน 2. พอน้ำมันเดือด นำกระชอนมากรองไข่ใส่กระทะให้ไข่ฟู พอไข่เริ่มมีสีเหลืองทองแล้วพลิกไข่อีกด้าน",
      image: "/img1.png",
      comment: 1,
      likeCount: 1,
      views: 1,
    },
  ];

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="bg-[#FFFFFF] rounded-2xl mx-24">
        <div className="relative pt-4 px-4 w-full">
          {subjects.map((subject, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-base text-black">
                {subject.code} - {subject.title}
              </h2>
              <div className="flex">
                <h2 className="text-base text-[#FFFFFF]">{subject.code} -</h2>
                <h2 className="text-base text-gray-700">{subject.subtitle}</h2>
              </div>
              <div className="flex justify-between mx-4">
                <div className="flex gap-4 ">
                  <p className="text-sm text-gray-500 mt-2">
                    <DescriptionIcon /> จำนวนผลงาน - {subject.workCount}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <GroupsIcon /> จำนวนผู้เข้าชม - {subject.workCount}
                  </p>
                </div>
                <div className="text-sm text-gray-500 mt-2 ">
                  <ThumbUpIcon /> ความชอบ: 1
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-12 flex flex-col gap-y-4 m-2">
          {reviewsubject.map((review, index) => (
            <Reviewsubject key={index} {...review} />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleGoHome}
            className="text-black bg-[#AAD7BF] py-2 px-4 rounded-[15px] m-12"
          >
            ย้อนกลับ
          </button>
          <button className="text-black bg-[#FDE69E] py-2 px-4 rounded-[15px] m-12">
            {" "}
            สร้างรีวิว{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
