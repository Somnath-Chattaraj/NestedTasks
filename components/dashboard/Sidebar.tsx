"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    List,
    SquaresFour,
    Gear,
    SignOut,
    User,
    ChartBar,
    TreeStructure
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface SidebarProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
    };
}

const Sidebar = ({ user }: SidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    const navItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: SquaresFour,
        },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 h-full w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                            <TreeStructure size={20} weight="bold" />
                        </div>
                        <span>FlowTodo</span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3">
                    <nav className="space-y-1">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary/10 text-primary shadow-sm"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <item.icon size={20} weight={isActive ? "fill" : "regular"} className={cn(isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile / Footer */}
                <div className="p-4 border-t bg-muted/20">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors mb-2">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border bg-background shadow-sm">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                    <User size={18} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium leading-none">{user.name}</p>
                            <p className="truncate text-xs text-muted-foreground mt-1">{user.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        onClick={handleSignOut}
                    >
                        <SignOut size={16} />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
