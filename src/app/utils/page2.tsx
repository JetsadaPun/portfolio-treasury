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
  // State variables
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const buttonData = [
    "วิชาเฉพาะบังคับ",
    "วิชาเฉพาะเลือก",
    "วิชาที่ฉันรีวิวก่อนหน้านี้",
  ];

  // Initial load
  useEffect(() => {
    fetchSubjects(currentPage, itemsPerPage, debouncedSearchTerm);
  }, []);

  // Fetch when search term changes (reset to page 1)
  useEffect(() => {
    setCurrentPage(1);
    fetchSubjects(1, itemsPerPage, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchSubjects = async (page: number, size: number, search: string) => {
    setIsLoading(true);
    try {
      // Backend expects 0-indexed page
      const pageIndex = page - 1;
      const url = `http://localhost:8080/api/subjects?page=${pageIndex}&size=${size}&search=${encodeURIComponent(search || "")}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.content && Array.isArray(data.content)) {
          setSubjects(data.content);
          setTotalPages(data.totalPages);
        } else {
          // Fallback if API structure is different or no pagination
          setSubjects(Array.isArray(data) ? data : []);
          setTotalPages(1);
        }
      } else {
        console.error("Failed to fetch subjects");
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchSubjects(newPage, itemsPerPage, debouncedSearchTerm);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={`${kanit.className} min-h-screen pb-12`}>
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
            ) : subjects.length > 0 ? (
              <>
                {subjects.map((subject) => (
                  <Showsubject
                    key={subject.subjectId}
                    code={subject.subjectNameId}
                    title={subject.subjectNameTh}
                    subtitle={subject.subjectNameEn}
                    workCount={subject.workCount || 0}
                  />
                ))}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 bg-white/10 backdrop-blur-md p-4 rounded-full w-fit mx-auto border border-white/20 shadow-lg">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-white hover:bg-white/20 active:scale-95"
                        }`}
                    >
                      &lt; ก่อนหน้า
                    </button>

                    <span className="text-white font-medium px-4">
                      หน้าที่ {currentPage} จาก {totalPages}
                    </span>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-white hover:bg-white/20 active:scale-95"
                        }`}
                    >
                      ถัดไป &gt;
                    </button>
                  </div>
                )}
              </>
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
