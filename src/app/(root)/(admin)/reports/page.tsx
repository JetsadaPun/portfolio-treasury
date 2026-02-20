"use client";
import React, { useEffect, useState } from "react";
import { Kanit } from "next/font/google";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import GavelIcon from "@mui/icons-material/Gavel";
import EmailIcon from "@mui/icons-material/Email";

const kanit = Kanit({
    subsets: ["thai"],
    weight: "300",
});

interface Report {
    id: number;
    postId: number;
    projectName: string;
    reporterName: string;
    reporterEmail: string;
    ownerName: string;
    ownerEmail: string;
    reason: string;
    status: string;
    actionTaken: string;
    createdAt: string;
}

const ReportsPage = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:8080/api/reports", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setReports(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (reportId: number, action: string) => {
        const actionLabel =
            action === "CLOSE" ? "ระงับโพสต์" :
                action === "VERIFY" ? "ยืนยันว่าปกติ" :
                    "แจ้งให้แก้ไข";

        const { value: comment } = await Swal.fire({
            title: `ดำเนินการ: ${actionLabel}`,
            input: "textarea",
            inputLabel: "ข้อความถึงผู้ใช้ (จะส่งไปทางอีเมล)",
            inputPlaceholder: "ระบุเหตุผลหรือรายละเอียดเพิ่มเติม...",
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
            inputValidator: (value) => {
                if (!value && action !== "VERIFY") {
                    return "กรุณาระบุรายละเอียดเพิ่มเติม";
                }
            }
        });

        if (comment !== undefined) {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`http://localhost:8080/api/reports/${reportId}/respond`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ action, comment: comment || "" })
                });

                if (res.ok) {
                    Swal.fire("สำเร็จ", "ดำเนินการเรียบร้อยและส่งอีเมลแจ้งเตือนแล้ว", "success");
                    fetchReports();
                } else {
                    Swal.fire("ผิดพลาด", "ไม่สามารถดำเนินการได้", "error");
                }
            } catch (error) {
                Swal.fire("ผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อ", "error");
            }
        }
    };

    if (loading) return <div className="p-10 text-center">กำลังโหลดรายการรายงาน...</div>;

    return (
        <div className={`${kanit.className} min-h-screen bg-gray-50 p-8 pt-24`}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                    <GavelIcon fontSize="large" className="text-red-500" />
                    จัดการรายงานโพสต์
                </h1>

                <div className="grid gap-6">
                    {reports.length === 0 ? (
                        <div className="bg-white p-20 rounded-2xl text-center shadow-sm text-gray-400">
                            ไม่มีรายการรายงานในขณะนี้
                        </div>
                    ) : (
                        reports.map((report) => (
                            <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Section: Post & Reporter Info */}
                                    <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                {report.status === 'PENDING' ? 'รอดำเนินการ' : 'ตรวจสอบแล้ว'}
                                            </span>
                                            <span className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleString('th-TH')}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">
                                            โปรเจกต์: <span className="text-blue-600">{report.projectName}</span>
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-50">
                                                <p className="font-bold text-gray-400 text-xs mb-1 uppercase tracking-wider">ผู้รายงาน</p>
                                                <p className="font-semibold text-gray-700">{report.reporterName}</p>
                                                <p className="text-gray-400 text-xs">{report.reporterEmail}</p>
                                            </div>
                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-50">
                                                <p className="font-bold text-gray-400 text-xs mb-1 uppercase tracking-wider">เจ้าของโพสต์</p>
                                                <p className="font-semibold text-gray-700">{report.ownerName}</p>
                                                <p className="text-gray-400 text-xs">{report.ownerEmail}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
                                            <p className="font-bold text-red-500 text-xs mb-1 uppercase tracking-wider">สาเหตุที่รายงาน</p>
                                            <p className="text-gray-700 italic">"{report.reason}"</p>
                                        </div>

                                        {report.actionTaken !== 'NONE' && (
                                            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-green-600">
                                                <CheckCircleIcon fontSize="small" />
                                                การดำเนินการล่าสุด: {
                                                    report.actionTaken === 'CLOSED' ? 'ระงับโพสต์แล้ว' :
                                                        report.actionTaken === 'VERIFIED' ? 'ยืนยันความถูกต้องแล้ว' :
                                                            'แจ้งแก้ไขแล้ว'
                                                }
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Section: Actions */}
                                    <div className="p-6 md:w-1/3 bg-gray-50/50 flex flex-col justify-center gap-3">
                                        {report.status === 'PENDING' ? (
                                            <>
                                                <button
                                                    onClick={() => handleAction(report.id, "CLOSE")}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <ErrorIcon fontSize="small" /> ระงับโพสต์นี้
                                                </button>
                                                <button
                                                    onClick={() => handleAction(report.id, "NEED_FIX")}
                                                    className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <EmailIcon fontSize="small" /> แจ้งเตือนแก้ไข
                                                </button>
                                                <button
                                                    onClick={() => handleAction(report.id, "VERIFY")}
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircleIcon fontSize="small" /> ตรวจสอบแล้ว (ปกติ)
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center p-8">
                                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <CheckCircleIcon fontSize="large" />
                                                </div>
                                                <p className="text-green-700 font-bold">ดำเนินการแล้ว</p>
                                                <p className="text-xs text-gray-400 mt-1">ขอบคุณที่ใส่ใจดูแลชุมชน</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
