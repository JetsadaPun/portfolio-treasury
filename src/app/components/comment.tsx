import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface CommentProps {
  id?: number;
  username: string;
  text: string;
  date: string;
  replies?: CommentProps[];
}

interface CommentpostProps {
  postId: number;
}

const Comment: React.FC<CommentpostProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState<string>("");
  const [commentsData, setCommentsData] = useState<CommentProps[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserName, setCurrentUserName] = useState<string>("");

  const API_BASE = "http://localhost:8080";

  useEffect(() => {
    if (postId) {
      fetchData();
    }
  }, [postId]);

  const fetchData = async () => {
    if (!postId || isNaN(postId)) {
      console.warn("Comment Component: Missing or invalid postId:", postId);
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log(`[Comment] Fetching data for post ID: ${postId}`);

    try {
      // 1. Fetch Comments
      const commentsRes = await fetch(`${API_BASE}/api/actions/comments/${postId}`);
      if (commentsRes.ok) {
        const data = await commentsRes.json();
        console.log("[Comment] Data received from API:", data);

        if (Array.isArray(data)) {
          // 1. Map all items to a flat array first
          const allItems = data.map((c: any) => ({
            id: c.commentId,
            parentId: c.parentId,
            username: c.userName || c.username || c.user_name || "ไม่ระบุชื่อ",
            text: c.content || c.text || "",
            date: formatDisplayDate(c.actionDate || c.action_date || c.actiondate),
            replies: []
          }));

          // 2. Build the hierarchy (Parent -> Children)
          const roots = allItems.filter((i: any) => !i.parentId);
          roots.forEach((root: any) => {
            root.replies = allItems.filter((child: any) => child.parentId === root.id);
          });

          setCommentsData(roots);
        } else {
          console.error("[Comment] API response is not an array:", data);
          setCommentsData([]);
        }
      }

      // 2. Fetch Like Count
      const likeCountRes = await fetch(`${API_BASE}/api/actions/like/count/${postId}`);
      if (likeCountRes.ok) {
        const count = await likeCountRes.json();
        setLikeCount(count);
      }

      // 3. Like Status check
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeJwt(token);
        setCurrentUserName(decoded?.name || "");
        const userId = decoded?.userId;
        if (userId) {
          const statusRes = await fetch(`${API_BASE}/api/actions/like/status/${postId}?userId=${userId}`);
          if (statusRes.ok) {
            const status = await statusRes.json();
            setIsLiked(status);
          }
        }
      }
    } catch (err) {
      console.error("[Comment] Critical error during fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDisplayDate = (rawDate: any) => {
    if (!rawDate) return "ไม่ระบุวันที่";
    try {
      // If it's an array from Jackson [YYYY, M, D, H, m, s]
      if (Array.isArray(rawDate)) {
        const d = new Date(rawDate[0], rawDate[1] - 1, rawDate[2]);
        return d.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });
      }
      return new Date(rawDate).toLocaleDateString("th-TH");
    } catch (e) {
      return "รูปแบบวันที่ไม่ถูกต้อง";
    }
  };

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("กรุณาเข้าสู่ระบบ", "คุณต้องเข้าสู่ระบบเพื่อแสดงความคิดเห็น", "warning");
      return;
    }

    const decoded = decodeJwt(token);
    const userId = decoded?.userId;
    const userName = decoded?.name || decoded?.sub;

    try {
      const res = await fetch(`${API_BASE}/api/actions/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          postId,
          content: newComment,
          userId,
          userName
        })
      });

      if (res.ok) {
        setNewComment("");
        Swal.fire({
          title: "สำเร็จ!",
          text: "เพิ่มความคิดเห็นเรียบร้อยแล้ว",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        fetchData(); // Trigger immediate refresh
      } else {
        Swal.fire("ผิดพลาด", "ไม่สามารถเพิ่มความคิดเห็นได้", "error");
      }
    } catch (err) {
      Swal.fire("ผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("กรุณาเข้าสู่ระบบ", "คุณต้องเข้าสู่ระบบเพื่อกดถูกใจ", "warning");
      return;
    }

    const decoded = decodeJwt(token);
    const userId = decoded?.userId;
    const userName = decoded?.name || decoded?.sub;

    try {
      const res = await fetch(`${API_BASE}/api/actions/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          postId,
          userId,
          userName
        })
      });

      if (res.ok) {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // ใช้ state แยกสำหรับเก็บค่าการตอบกลับของแต่ละความคิดเห็น
  const [replyInput, setReplyInput] = useState<string[]>([]);

  // ฟังก์ชันจัดการการตอบกลับความคิดเห็น (บันทึกลงฐานข้อมูล)
  const handleReplySubmit = async (index: number) => {
    const parentComment = commentsData[index];
    const content = replyInput[index];

    if (!parentComment || !parentComment.id || !content?.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("กรุณาเข้าสู่ระบบ", "คุณต้องเข้าสู่ระบบก่อนตอบกลับ", "warning");
      return;
    }

    const decoded = decodeJwt(token);
    try {
      const res = await fetch(`${API_BASE}/api/actions/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          postId,
          content: content,
          userId: decoded?.userId,
          userName: decoded?.name || decoded?.sub,
          parentId: parentComment.id
        })
      });

      if (res.ok) {
        setReplyInput((prev) => {
          const newReplyInput = [...prev];
          newReplyInput[index] = "";
          return newReplyInput;
        });
        fetchData(); // โหลดใหม่เพื่อแสดงคอมเมนต์ที่ตอบกลับ
      } else {
        Swal.fire("ผิดพลาด", "ไม่สามารถส่งการตอบกลับได้", "error");
      }
    } catch (err) {
      console.error("Error submitting reply:", err);
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

  if (loading) return <div className="p-10 text-center text-gray-400 animate-pulse">กำลังโหลดความคิดเห็น...</div>;

  return (
    <div className="relative mt-12 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 shadow-inner">
      {/* Header: Likes and Comment Count */}
      <div className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white">
        <div className="flex items-center gap-8">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-2xl transition-all shadow-sm active:scale-95 ${isLiked ? "bg-red-100 text-red-600 font-bold border border-red-200" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
              }`}
          >
            <span className={`text-2xl transition-transform ${isLiked ? "scale-110" : "grayscale opacity-70"}`}>
              {isLiked ? "❤️" : "🤍"}
            </span>
            <span className="text-sm font-bold">{likeCount} ถูกใจ</span>
          </button>
          <div className="flex items-center gap-2.5 text-gray-600 font-bold bg-white px-6 py-2.5 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-xl">💬</span>
            <span className="text-sm">{commentsData.length} ความคิดเห็น</span>
          </div>
        </div>

        <button
          onClick={fetchData}
          className="bg-white p-3 rounded-2xl border border-gray-100 text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-all shadow-sm active:rotate-180 duration-500"
          title="โหลดข้อมูลใหม่"
        >
          🔄
        </button>
      </div>

      {/* Input Section: Add Comment */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-10 transition-all hover:shadow-md">
        <p className="text-sm font-bold text-gray-700 mb-4 ml-1 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
          ร่วมเขียนความคิดเห็น:
        </p>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl h-11 w-11 min-w-[44px] flex items-center justify-center shadow-lg transform -rotate-6 border-2 border-white">
            <span className="text-lg font-black">{currentUserName ? currentUserName[0].toUpperCase() : "?"}</span>
          </div>

          <div className="relative flex-grow group">
            <input
              type="text"
              placeholder="ร่วมแบ่งปันเทคนิคหรือถามคำถามเกี่ยวกับงานชิ้นนี้..."
              className="w-full border-2 border-gray-50 bg-gray-50/30 rounded-2xl px-6 py-3.5 text-sm text-black focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-gray-400"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleCommentKeyDown}
            />
          </div>

          <button
            onClick={handleCommentSubmit}
            disabled={!newComment.trim()}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 ${newComment.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200"
              : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
              }`}
          >
            ส่งข้อความ
          </button>
        </div>
      </div>

      {/* List Section: All Comments */}
      <div className="space-y-6">
        {commentsData && commentsData.length > 0 ? (
          commentsData.map((comment, index) => (
            <div key={index} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 transition-all hover:border-blue-200 group">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 rounded-2xl h-12 w-12 flex items-center justify-center border border-gray-100 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <span className="text-base font-bold">{comment.username ? comment.username[0].toUpperCase() : "?"}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-sm font-bold text-gray-800">{comment.username}</span>
                    <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full font-medium">{comment.date}</span>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed mb-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                    {comment.text}
                  </div>

                  {/* Reply Action */}
                  <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">
                    <button className="hover:text-blue-500 transition-colors flex items-center gap-1.5">
                      <span>↩</span> ตอบกลับ
                    </button>
                    <button className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                      <span>🚩</span> รายงาน
                    </button>
                  </div>

                  {/* Replies Nesting */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-5 pl-4 border-l-4 border-blue-50 space-y-4">
                      {comment.replies.map((reply, rIdx) => (
                        <div key={rIdx} className="bg-blue-50/30 p-4 rounded-2xl border border-blue-100 shadow-sm">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="h-5 w-5 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-[10px] font-bold text-blue-500">{reply.username[0]}</span>
                            </div>
                            <span className="text-xs font-bold text-gray-800">{reply.username}</span>
                            <span className="text-[9px] text-gray-400 ml-auto">{reply.date}</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="bg-indigo-50 text-indigo-400 rounded-xl h-9 w-9 flex items-center justify-center border border-indigo-100 shrink-0 shadow-sm">
                      <span className="text-xs font-black">{currentUserName ? currentUserName[0].toUpperCase() : "?"}</span>
                    </div>
                    <div className="flex-grow relative flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="เขียนข้อความโต้ตอบ..."
                        className="flex-grow bg-gray-50/80 border border-gray-100 rounded-2xl px-5 py-2.5 text-xs text-black focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all placeholder:text-gray-400"
                        value={replyInput[index] || ""}
                        onChange={(e) => handleReplyChange(e, index)}
                        onKeyDown={(e) => handleReplyKeyDown(e, index)}
                      />
                      <button
                        onClick={() => handleReplySubmit(index)}
                        disabled={!replyInput[index]?.trim()}
                        className={`px-4 py-2.5 rounded-xl font-bold text-[10px] transition-all active:scale-95 shadow-sm ${replyInput[index]?.trim()
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-100"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        ส่ง
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white/50 rounded-[3rem] border-4 border-dashed border-gray-50 flex flex-col items-center">
            <div className="text-7xl mb-6 grayscale opacity-20 filter drop-shadow-lg">✨</div>
            <p className="text-gray-400 font-bold text-lg mb-2">ยังไม่มีความคิดเห็นในขณะนี้</p>
            <p className="text-gray-300 text-xs">มาร่วมแบ่งปันสิ่งดีๆ ด้วยการคอมเมนต์เป็นคนแรกกันเถอะ!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
