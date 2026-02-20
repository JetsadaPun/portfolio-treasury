import AdminNav from "@/app/components/adminnav";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen relative flex flex-col">
            <header className="fixed top-0 left-0 w-full z-50">
                <AdminNav />
            </header>
            <main className="flex-1 mt-16">
                {children}
            </main>
        </div>
    );
}
