"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Kanit } from "next/font/google";

const kanit = Kanit({
    subsets: ["thai"],
    weight: "300",
});

const OAuthSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            // ในอนาคตอาจจะไปดึงข้อมูล User เพิ่มเติมที่นี่
            router.push("/home");
        } else {
            router.push("/login?error=oauth_failed");
        }
    }, [searchParams, router]);

    return (
        <div className={`${kanit.className} min-h-screen flex items-center justify-center`}>
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">กำลังเข้าสู่ระบบด้วย Google...</p>
            </div>
        </div>
    );
};

export default OAuthSuccessPage;
