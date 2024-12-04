import React, { useState } from "react";

interface Comment {
  username: string;
  text: string;
  date: string;
  replies?: Comment[];
}

interface Document {
  name: string;
  link: string;
}

interface ProjectDetailProps {
  documents: Document[];
  github: string;
  membertag: string[];
  comments?: Comment[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  documents,
  github,
  membertag,
  comments = [],
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const [commentsData, setCommentsData] = useState<Comment[]>(comments);

  // ฟังก์ชันจัดการการส่งความคิดเห็น
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData = {
        username: "ผู้ใช้ตัวอย่าง",
        text: newComment,
        date: new Date().toLocaleDateString(),
      };
      setCommentsData([...commentsData, newCommentData]);
      setNewComment(""); // ล้างช่องกรอกความคิดเห็นหลังส่ง
    }
  };

  // ใช้ state แยกสำหรับเก็บค่าการตอบกลับของแต่ละความคิดเห็น
  const [replyInput, setReplyInput] = useState<string[]>([]);

  // ฟังก์ชันจัดการการตอบกลับความคิดเห็น
  const handleReplySubmit = (index: number) => {
    if (replyInput[index]?.trim()) {
      const updatedComments = [...commentsData];
      const replyData = {
        username: "ผู้ใช้ตัวอย่าง",
        text: replyInput[index],
        date: new Date().toLocaleDateString(),
      };
      if (!updatedComments[index].replies) {
        updatedComments[index].replies = [];
      }
      updatedComments[index].replies.push(replyData);
      setCommentsData(updatedComments);
      setReplyInput((prev) => {
        const newReplyInput = [...prev];
        newReplyInput[index] = ""; // ล้างช่องกรอกการตอบกลับหลังส่ง
        return newReplyInput;
      });
    }
  };

  // Enter ส่งความคิดเห็น
  const handleCommentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommentSubmit();
    }
  };

  // Enter ส่งการตอบกลับ
  const handleReplyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      handleReplySubmit(index);
    }
  };

  // ฟังก์ชันเพื่อจัดการการพิมพ์การตอบกลับ
  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newReplyInput = [...replyInput];
    newReplyInput[index] = e.target.value;
    setReplyInput(newReplyInput);
  };

  return (
    <div className="relative w-full p-6">
      {/* เอกสารเกี่ยวกับโปรเจกต์ */}
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

      {/* GitHub */}
      <div className="mt-4 flex gap-2">
        <p className="text-base font-medium text-black">GitHub:</p>
        <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          {github}
        </a>
      </div>

      {/* สมาชิกโปรเจกต์ */}
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

      {/* ความคิดเห็น */}
      <div className="mt-6">
        <p className="text-base font-medium text-black">ความคิดเห็น:</p>
        <div className="mt-4 flex items-center gap-2">
          {/* รูปโปรไฟล์ตรงหน้าช่องเพิ่มความคิดเห็น */}
          <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
            <span className="text-sm font-bold">A</span>
          </div>
          {/* ช่องกรอกความคิดเห็น */}
          <input
            type="text"
            placeholder="เพิ่มความคิดเห็น..."
            className="w-full border rounded-2xl px-4 py-2 text-sm text-black"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleCommentKeyDown} // เพิ่มการฟังการกด Enter
          />
        </div>

        {commentsData && commentsData.length > 0 ? (
          commentsData.map((comment, index) => (
            <div key={index} className="mt-4">
              <div className="flex items-center gap-2">
                {/* รูปโปรไฟล์ */}
                <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
                  <span className="text-sm font-bold">{comment.username[0]}</span>
                </div>
                {/* ชื่อผู้ใช้และวันที่ */}
                <p className="text-sm font-medium text-black">{comment.username}</p>
                <p className="text-xs text-gray-500">{comment.date}</p>
              </div>
              {/* เนื้อหาความคิดเห็น */}
              <p className="ml-10 text-sm text-black">{comment.text}</p>

              {/* แสดงการตอบกลับ */}
              {comment.replies &&
                comment.replies.map((reply, replyIndex) => (
                  <div key={replyIndex} className="ml-16 mt-4">
                    <div className="flex items-center gap-2">
                      {/* รูปโปรไฟล์ของการตอบกลับ */}
                      <div className="bg-gray-300 rounded-full h-6 w-6 flex items-center justify-center">
                        <span className="text-xs font-bold">{reply.username[0]}</span>
                      </div>
                      {/* ชื่อผู้ใช้และวันที่ของการตอบกลับ */}
                      <p className="text-xs font-medium text-black">{reply.username}</p>
                      <p className="text-xs text-gray-500">{reply.date}</p>
                    </div>
                    {/* เนื้อหาของการตอบกลับ */}
                    <p className="ml-8 text-xs text-black">{reply.text}</p>
                  </div>
                ))}

              {/* ช่องตอบกลับความคิดเห็น */}
              <div className="ml-10 mt-4 flex items-center gap-2">
                <div className="bg-gray-300 rounded-full h-6 w-6 flex items-center justify-center">
                  <span className="text-xs font-bold">A</span>
                </div>
                <input
                  type="text"
                  placeholder="ตอบกลับความคิดเห็น..."
                  className="w-full border rounded-2xl px-4 py-2 text-sm text-black"
                  value={replyInput[index] || ""}
                  onChange={(e) => handleReplyChange(e, index)} // อัปเดตการพิมพ์ในช่องนี้
                  onKeyDown={(e) => handleReplyKeyDown(e, index)} // เพิ่มการฟังการกด Enter
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-4">ยังไม่มีความคิดเห็น</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
