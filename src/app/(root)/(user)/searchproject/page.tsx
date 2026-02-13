"use client";
import Showsubject from '@/app/components/showsubject2';
import React, { useState, useEffect } from 'react';
import { useDebounce } from "@uidotdev/usehooks";

const API_BASE = "http://localhost:8080";

const SearchProjectPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    } else {
      setProjects([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/posts/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error searching projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className={` min-h-screen`}>
      <div className="mx-6 md:mx-24 py-10 md:py-20">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={onSearchSubmit} className="w-full mb-10">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full p-4 ps-11 text-sm text-[#1A1818] rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:outline-none placeholder:italic placeholder:text-gray-400 bg-white"
                placeholder="ค้นหาชื่อโปรเจกต์ เช่น มะม่วง..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#6189C2] hover:bg-[#4a75ac] focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium rounded-xl text-sm px-6 py-2 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="text-gray-500 animate-pulse">กำลังค้นหา...</div>
              </div>
            ) : projects.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h3 className="text-gray-500 text-sm mb-2 px-2">พบ {projects.length} รายการ</h3>
                {projects.map((project) => (
                  <Showsubject
                    key={project.postId}
                    code={project.subjectNameId || "N/A"}
                    title={project.subjectNameTh || "ไม่ระบุรายวิชา"}
                    projectname={project.projectName}
                    Name={project.userName || "ไม่ระบุชื่อผู้สร้าง"}
                  />
                ))}
              </div>
            ) : searchTerm && !isLoading ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="text-gray-400">ไม่พบโปรเจกต์ที่ตรงกับการค้นหา</div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-300 italic">พิมพ์เพื่อเริ่มต้นการค้นหาผลงานโปรเจกต์</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProjectPage;