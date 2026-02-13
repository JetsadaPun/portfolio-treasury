"use client";
import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Showsubject from "../components/showsubject";
import { Kanit } from "next/font/google";
import { useDebounce } from "@uidotdev/usehooks";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: "300",
});

const Page2 = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isLoading, setIsLoading] = useState(true);

  const buttonData = [
    "วิชาเฉพาะบังคับ",
    "วิชาเฉพาะเลือก",
    "วิชาที่ฉันรีวิวก่อนหน้านี้",
  ];

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/subjects");
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        console.error("Failed to fetch subjects");
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = (button: string) => {
    setSelectedButtons((prev) => {
      if (!prev.includes(button)) {
        return [...prev, button];
      }
      return prev;
    });
  };

  const handleCloseClick = (button: string) => {
    setSelectedButtons((prev) => prev.filter((item) => item !== button));
  };

  const filteredSubjects = subjects.filter((s) => {
    const search = debouncedSearchTerm.toLowerCase();
    return (
      s.subjectNameId.toLowerCase().includes(search) ||
      s.subjectNameTh.toLowerCase().includes(search) ||
      s.subjectNameEn.toLowerCase().includes(search)
    );
  });

  return (
    <div className={`${kanit.className} min-h-screen`}>
      <div className="mx-24 my-16">
        <div>
          <div className="max-w-m w-full">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-4 ps-10 text-sm text-[#1A1818] rounded-2xl opacity-75 bg-gray-50 focus:outline-none placeholder:italic placeholder:text-zinc-600"
                placeholder="ค้นหารหัสวิชา หรือชื่อวิชา เช่น 01418474"
              />
              <div className="absolute end-2.5 bottom-2.5 px-4 py-2 text-gray-400 pointer-events-none">
                🔍
              </div>
            </div>
          </div>
          <div className="mx-8 my-4">
            <div className="bg-[#4A4D4D] text-[#FFF9EF] p-4 text-center rounded-2xl">
              เลือกหมวดหมู่ วิชาที่สนใจค้นหา และเพิ่มข้อมูล
            </div>
          </div>
          <div className="">

          </div>
          <div className="flex flex-col gap-4 mt-8">
            {isLoading ? (
              <div className="text-center py-10 text-white">กำลังโหลดวิชา...</div>
            ) : filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <Showsubject
                  key={subject.subjectId}
                  code={subject.subjectNameId}
                  title={subject.subjectNameTh}
                  subtitle={subject.subjectNameEn}
                  workCount={0} // Default to 0 as work count is not yet in DB
                />
              ))
            ) : (
              <div className="text-center py-10 text-white opacity-60">
                {searchTerm ? `ไม่พบวิชาที่ค้นหา: "${searchTerm}"` : "ไม่พบรายวิชาในระบบ"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
