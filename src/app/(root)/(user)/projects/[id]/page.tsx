"use client";

import React from "react";
import { Kanit } from "next/font/google";
import { useRouter, useParams } from "next/navigation";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import Comment from "../../../../components/comment"

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const postId = Number(id);

  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const API_BASE = "http://localhost:8080";

  React.useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      // We need an endpoint to get a single post by ID. 
      // Checking if one exists or if we need to create it.
      // Based on previous knowledge, maybe /api/posts/{id}? 
      // Let's assume it exists or I'll add it if not.
      const res = await fetch(`${API_BASE}/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      }
    } catch (err) {
      console.error("Error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

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

        {/* รีวิว (Dynamic) */}
        {!loading && project && (
          <div className="flex flex-col gap-y-4">
            <div className="relative w-full p-4">
              <div className="flex items-center mb-2">
                <p
                  className="text-base font-medium text-black mr-2 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => router.push(`/people/${project.studentId || project.userId}`)}
                >
                  {project.userName || "ไม่ระบุชื่อ"}
                </p>
                <p className="text-base text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString("th-TH")}
                </p>
              </div>
            </div>

            <p className="text-base font-medium text-black inline pl-4">
              {labels.projectName}:{" "}
              <span className="font-normal"> {project.projectName}</span>
            </p>

            <div className="px-4">
              <p className="text-base font-medium text-black mt-2">
                {labels.projectDetail}
              </p>
              <div className="mt-2 text-base text-black bg-gray-50 p-6 rounded-2xl border border-gray-100 italic shadow-inner">
                "{project.projectDetail}"
              </div>
            </div>

            {/* แสดงรูปภาพทั้งหมด */}
            <div className="mt-8 space-y-6 px-4">
              {project.projectImages && project.projectImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.projectImages.map((imgUrl: string, idx: number) => (
                    <div key={idx} className="relative group overflow-hidden rounded-3xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl hover:border-blue-200">
                      <img
                        src={imgUrl}
                        alt={`Project Image ${idx + 1}`}
                        className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <img
                      src={project.projectImage || "/placeholder.png"}
                      alt="Project"
                      className="relative rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "500px",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* เอกสารเกี่ยวกับโปรเจกต์ */}
            {project.projectDocs && (
              <div className="mt-8 mx-4 p-4 bg-blue-50/30 rounded-2xl border border-blue-50 flex items-center gap-4">
                <p className="text-base font-medium text-black">
                  {labels.documents}:
                </p>
                <a
                  href={project.projectDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  🖇️ ดูเอกสารแนบ
                </a>
              </div>
            )}

            {/* ลิงก์งาน */}
            {project.projectLink && (
              <div className="mt-4 mx-4 p-4 bg-purple-50/30 rounded-2xl border border-purple-50 flex items-center gap-4">
                <p className="text-base font-medium text-black inline">ลิงก์ผลงาน:</p>
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  🔗 {project.projectLink}
                </a>
              </div>
            )}

            <div className="flex items-center mt-8 mx-4 text-gray-500 gap-x-8 justify-between border-b pb-6 mb-2">
              <div className="flex gap-8">
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                <ShareIcon />
              </button>
            </div>
          </div>
        )}

        {/* แสดงคอมเมนต์ */}
        <div className="mx-4 mt-8 flex flex-col gap-y-4">
          <Comment postId={postId} />
        </div>

        {/* ปุ่มย้อนกลับ */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="text-black bg-[#AAD7BF] py-2 px-4 rounded-[15px] ml-4 mb-4 hover:bg-[#8ec4a7] transition-colors"
          >
            {labels.backButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
