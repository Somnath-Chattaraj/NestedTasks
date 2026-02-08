"use client";

import Link from "next/link";
import { TreeStructure, GithubLogo, TwitterLogo, LinkedinLogo } from "@phosphor-icons/react";

export function LandingFooter() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-lg">
            <div className="container px-4 md:px-6 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                                <TreeStructure size={20} weight="bold" />
                            </div>
                            <span>FlowTodo</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                            Visualize, organize, and conquer your tasks with the power of flow-based management.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="https://github.com/somnath-chattaraj" className="text-muted-foreground hover:text-foreground transition-colors">
                                <GithubLogo size={24} />
                            </Link>
                            <Link href="https://www.linkedin.com/in/somnath-chattaraj/" className="text-muted-foreground hover:text-foreground transition-colors">
                                <LinkedinLogo size={24} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                            <li><Link href="#changelog" className="hover:text-foreground transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                            <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                            <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                            <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link href="/legal" className="hover:text-foreground transition-colors">Legal</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} FlowTodo Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
