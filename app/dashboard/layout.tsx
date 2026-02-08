"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    // We would normally pass session/user from server component, but here we can try fetching client side too if necessary
    // But better to wrap on server layout if possible. However, the user provided layout.tsx is just passing children.
    // I can read the session here if I make this async, but layouts are tricky with async/server components in layouts sometimes if used directly as client components.
    // Let's assume layout is client component for simplicity to use the Sidebar logic. Wait, layout.tsx is default export function DashboardLayout.
    // The previous content was simple. I will make this a client layout if I need to use hooks.
    // However, layouts in Next.js 13+ can be server components.
    // Let's pass the user to the sidebar if possible. But `authClient` is client-side.
    // I need to fetch user.

    // Actually, let's keep the layout simple and just include the sidebar. The user data can be fetched inside the sidebar or passed down.
    // Since Sidebar uses client hooks, it must be client component.

    const [user, setUser] = useState<{ id: string; email: string; name: string; image?: string | null } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch session
        const fetchSession = async () => {
            const { data } = await authClient.getSession();
            if (data?.user) {
                setUser(data.user);
            } else {
                router.push("/sign-in");
            }
        };
        fetchSession();
    }, [router]);

    if (!user) return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;

    return (
        <div className="flex min-h-screen w-full bg-background">
            <Sidebar user={user} />
            <main className="flex-1 pl-64 transition-all duration-300 ease-in-out">
                {children}
            </main>
        </div>
    );
}