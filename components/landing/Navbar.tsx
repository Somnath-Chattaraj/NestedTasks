"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TreeStructure } from "@phosphor-icons/react";

export function LandingNavbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <TreeStructure size={20} weight="bold" />
                    </div>
                    <span>FlowTodo</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                        How it Works
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button asChild>
                        <Link href="/dashboard">
                            Get Started
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
