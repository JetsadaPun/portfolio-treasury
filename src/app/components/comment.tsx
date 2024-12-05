import React, { useState } from "react";

interface CommentProps {
  username: string;
  text: string;
  date: string;
  replies?: CommentProps[];
}

interface CommentpostProps {
  cards: CommentProps[];
}

const Comment: React.FC<CommentpostProps> = ({ cards }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [commentsData, setCommentsData] = useState<CommentProps[]>(cards);

  // ฟังก์ชันจัดการการส่งความคิดเห็น
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentData: CommentProps = {
        username: "เกรียนคีย์บอร์ด ใจกากปากเก่ง",
        text: newComment,
        date: new Date().toLocaleDateString(),
        replies: [],
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
      const replyData: CommentProps = {
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
      <div className="relative">
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
            onKeyDown={handleCommentKeyDown} 
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
                  onChange={(e) => handleReplyChange(e, index)} // อัปเดตการพิมพ์
                  onKeyDown={(e) => handleReplyKeyDown(e, index)} 
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-4">ยังไม่มีความคิดเห็น</p>
        )}
      </div>
  );
};

export default Comment;
