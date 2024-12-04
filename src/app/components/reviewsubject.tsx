import React from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import GroupsIcon from "@mui/icons-material/Groups";
import ShareIcon from "@mui/icons-material/Share";
interface ReviewProps {
  username: string;
  date: string;
  projectName: string;
  detail: string;
  image: string;
  comment: number;
  likeCount: number;
  views: number;
}

interface ReviewsubjectProps {
  cards: ReviewProps[];
}
const Reviewsubject: React.FC<ReviewProps> = ({
  username,
  date,
  projectName,
  detail,
  image,
  comment,
  likeCount,
  views,
}) => {
  return (
    <div className="relative rounded-2xl w-full border-[1px] border-black p-4 ">
      <div className="flex items-center mb-2">
        <p className="text-base font-medium text-black mr-2">{username}</p>
        <p className="text-base text-gray-500">{date}</p>
      </div>
      <p className="text-base font-medium text-black inline">ชื่อโปรเจกต์: </p>
      <span className="text-base text-black"> {projectName}</span>

      <p className="text-base font-medium text-black mt-2">
        รายละเอียดเกี่ยวกับโปรเจกต์
      </p>
      <span className="m-10 text-base text-black">{detail}</span>

      <div className="flex justify-center items-center mt-4">
        <div className="relative">
          <img
            src={image}
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
      <div className="flex items-center mt-4 text-gray-500 gap-x-8 justify-between">
        <div className="flex gap-4">
          <div>
            <ChatBubbleIcon /> ความคิดเห็น: {comment}
          </div>
          <div>
            <ThumbUpIcon /> ความชอบ: {likeCount}
          </div>
          <div>
            <GroupsIcon /> จำนวนผู้เข้าชม: {views}
          </div>
        </div>
        <div>
          <div>
            <ShareIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviewsubject;
