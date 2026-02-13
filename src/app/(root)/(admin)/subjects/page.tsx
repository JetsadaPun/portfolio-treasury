"use client";
import React, { useState, useRef, useEffect } from "react";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: "400",
});

const API_BASE = "http://localhost:8080";

const AdminSubjectsPage = () => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loadingSubjects, setLoadingSubjects] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const decoded = decodeJwt(token);
        if (decoded?.role !== "ADMIN") {
            Swal.fire({
                title: "Access Denied",
                text: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
                icon: "error",
                confirmButtonColor: "#FDA49E"
            }).then(() => {
                router.push("/home");
            });
        } else {
            setIsAdmin(true);
            fetchSubjects();
        }
    }, [router]);

    const fetchSubjects = async () => {
        setLoadingSubjects(true);
        try {
            const response = await fetch(`${API_BASE}/api/subjects`);
            if (response.ok) {
                const data = await response.json();
                setSubjects(data);
            }
        } catch (error) {
            console.error("Failed to fetch subjects:", error);
        } finally {
            setLoadingSubjects(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.name.endsWith(".csv")) {
                setFile(selectedFile);
            } else {
                Swal.fire("ไฟล์ไม่ถูกต้อง", "กรุณาเลือกไฟล์ .csv เท่านั้น", "warning");
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            Swal.fire("กรุณาเลือกไฟล์", "คุณยังไม่ได้เลือกไฟล์ CSV สำหรับอัปโหลด", "info");
            return;
        }

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);

        setIsUploading(true);
        Swal.fire({
            title: "กำลังนำเข้าข้อมูล...",
            text: "กรุณารอสักครู่ ระบบกำลังประมวลผลไฟล์ CSV",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await fetch(`${API_BASE}/api/subjects/import-csv`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "เกิดข้อผิดพลาดในการอัปโหลด");
            }

            await Swal.fire({
                title: "นำเข้าข้อมูลสำเร็จ!",
                text: "ข้อมูลวิชาทั้งหมดถูกเพิ่มเข้าสู่ระบบเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonColor: "#AAD7BF"
            });

            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchSubjects();

        } catch (error: any) {
            Swal.fire({
                title: "ล้มเหลว",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#FDA49E"
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: number, name: string) => {
        const result = await Swal.fire({
            title: "ยืนยันการลบ?",
            text: `คุณแน่ใจหรือไม่ว่าต้องการลบวิชา "${name}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FDA49E",
            cancelButtonColor: "#B2BEC3",
            confirmButtonText: "ลบข้อมูล",
            cancelButtonText: "ยกเลิก"
        });

        if (result.isConfirmed) {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${API_BASE}/api/subjects/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    Swal.fire("สำเร็จ", "ลบข้อมูลวิชาเรียบร้อยแล้ว", "success");
                    fetchSubjects();
                } else {
                    const error = await response.json();
                    throw new Error(error.message || "ลบไม่สำเร็จ");
                }
            } catch (error: any) {
                Swal.fire("ผิดพลาด", error.message, "error");
            }
        }
    };

    const filteredSubjects = subjects.filter(s =>
        s.subjectNameId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.subjectNameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.subjectNameEn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAdmin) return null;

    return (
        <div className={`${kanit.className} min-h-screen bg-[#F0F2F5] flex flex-col items-center py-16 px-4`}>
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 transform transition-all hover:scale-[1.01]">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#2D3436] mb-4">Admin Dashboard</h1>
                    <p className="text-[#636E72] text-lg">จัดการรายวิชาด้วยการนำเข้าไฟล์ CSV</p>
                </div>

                <div className="bg-[#F9FAFB] border-2 border-dashed border-[#DFE6E9] rounded-2xl p-12 flex flex-col items-center">
                    <div className="bg-[#E3F2FD] p-6 rounded-full mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#0984E3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                        id="csv-upload"
                    />

                    <label
                        htmlFor="csv-upload"
                        className="cursor-pointer bg-[#00B894] hover:bg-[#00A383] text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg mb-4"
                    >
                        {file ? "เปลี่ยนไฟล์" : "เลือกไฟล์ CSV"}
                    </label>

                    {file && (
                        <div className="flex items-center space-x-2 text-[#2D3436] font-medium animate-pulse">
                            <span className="text-[#00B894]">●</span>
                            <span>{file.name}</span>
                        </div>
                    )}

                    <p className="mt-4 text-[#B2BEC3] text-sm text-center">
                        รองรับไฟล์ .csv ที่มีหัวตาราง: รหัสวิชา, ชื่อไทย, ชื่ออังกฤษ, คำอธิบาย<br />
                        (UTF-8 Encoding)
                    </p>
                </div>

                <div className="mt-10 flex flex-col space-y-4">
                    <button
                        onClick={handleUpload}
                        disabled={!file || isUploading}
                        className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-xl
              ${!file || isUploading
                                ? "bg-[#DFE6E9] cursor-not-allowed"
                                : "bg-gradient-to-r from-[#0984E3] to-[#6C5CE7] hover:from-[#0873C4] hover:to-[#5B4DB3] active:scale-[0.98]"
                            }`}
                    >
                        {isUploading ? "กำลังประมวลผล..." : "เริ่มนำเข้าข้อมูลเดี๋ยวนี้"}
                    </button>

                    <button
                        onClick={() => router.push("/home")}
                        className="text-[#636E72] hover:text-[#2D3436] font-semibold transition-colors"
                    >
                        กลับสู่หน้าหลัก
                    </button>
                </div>
            </div>

            {/* ส่วนแสดงรายชื่อวิชา */}
            <div className="mt-16 w-full max-w-5xl">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-[#2D3436]">รายชื่อวิชาทั้งหมด ({subjects.length})</h2>
                            {searchTerm && (
                                <p className="text-sm text-[#00B894]">ค้นพบ {filteredSubjects.length} รายการ</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
                                    🔍
                                </span>
                                <input
                                    type="text"
                                    placeholder="ค้นหารหัส หรือชื่อวิชา..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0984E3] transition-all text-sm text-[#2D3436] font-medium"
                                />
                            </div>
                            <button
                                onClick={fetchSubjects}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="รีเฟรชข้อมูล"
                            >
                                🔄
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F9FAFB] text-[#636E72] text-sm uppercase">
                                <tr>
                                    <th className="px-8 py-4 text-left font-semibold">รหัสวิชา</th>
                                    <th className="px-8 py-4 text-left font-semibold">ชื่อวิชา (TH)</th>
                                    <th className="px-8 py-4 text-left font-semibold">ชื่อวิชา (EN)</th>
                                    <th className="px-8 py-4 text-center font-semibold">การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loadingSubjects ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-10 text-center text-[#B2BEC3]">
                                            กำลังโหลดข้อมูล...
                                        </td>
                                    </tr>
                                ) : filteredSubjects.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-10 text-center text-[#B2BEC3]">
                                            ไม่พบวิชาที่ค้นหา: "{searchTerm}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSubjects.map((s) => (
                                        <tr key={s.subjectId} className="hover:bg-[#F9FAFB] transition-colors">
                                            <td className="px-8 py-5 font-medium text-[#0984E3]">{s.subjectNameId}</td>
                                            <td className="px-8 py-5 text-[#2D3436] font-medium">{s.subjectNameTh}</td>
                                            <td className="px-8 py-5 text-[#636E72]">{s.subjectNameEn}</td>
                                            <td className="px-8 py-5 text-center">
                                                <button
                                                    onClick={() => handleDelete(s.subjectId, s.subjectNameTh)}
                                                    className="bg-[#FFEBEB] text-[#FF4757] px-4 py-2 rounded-xl hover:bg-[#FF4757] hover:text-white transition-all font-medium text-sm"
                                                >
                                                    ลบ
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSubjectsPage;
