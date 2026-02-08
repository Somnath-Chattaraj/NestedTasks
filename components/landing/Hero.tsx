"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TreeStructure, CheckCircle, Lightning } from "@phosphor-icons/react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 bg-background min-h-screen flex items-center">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="container px-4 md:px-6 relative z-10 mx-auto text-center space-y-8 animate__animated animate__fadeInUp">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm hover:bg-primary/20 transition-colors cursor-default mb-4">
                    <Lightning className="mr-2 h-3.5 w-3.5" />
                    <span className="text-xs uppercase tracking-wide">FlowTodo v1.0.0 Now Live</span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 pb-2 leading-tight">
                    Master Your Tasks <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Visualize with Flow
                    </span>
                </h1>

                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                    Break down complex projects into achievable steps. Visualize dependencies,
                    organize efficiently, and conquer your to-do list with our powerful node-based interface.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="h-12 w-full sm:w-auto px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300" asChild>
                        <Link href="/dashboard">
                            Get Started for Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto px-8 text-base backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all duration-300" asChild>
                        <Link href="#features">
                            Explore Features
                        </Link>
                    </Button>
                </div>

                {/* Visual Mockup - CSS Based simple representation */}
                <div className="mt-16 relative mx-auto max-w-5xl rounded-xl border bg-muted/30 p-2 shadow-2xl backdrop-blur-sm overflow-hidden hidden md:block animate__animated animate__fadeInUp animate__delay-1s">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
                    <div className="grid grid-cols-12 gap-4 h-[400px] bg-background/50 rounded-lg p-6 relative overflow-hidden">
                        {/* Simulated Nodes/Flow */}
                        <div className="absolute top-[20%] left-[10%] p-4 bg-card border rounded-xl shadow-sm w-48 animate-bounce delay-75 [animation-duration:3s]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <TreeStructure size={16} className="text-primary" />
                                </div>
                                <div className="h-3 w-20 bg-muted rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-muted/50 rounded-full" />
                                <div className="h-2 w-2/3 bg-muted/50 rounded-full" />
                            </div>
                        </div>

                        <div className="absolute top-[50%] left-[40%] p-4 bg-card border rounded-xl shadow-sm w-48 animate-bounce delay-150 [animation-duration:4s]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <CheckCircle size={16} className="text-blue-500" />
                                </div>
                                <div className="h-3 w-16 bg-muted rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-muted/50 rounded-full" />
                                <div className="h-2 w-1/2 bg-muted/50 rounded-full" />
                            </div>
                        </div>

                        {/* Connecting Lines (Simulated with simple divs for aesthetic) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <path d="M 250 120 C 350 120, 350 220, 450 220" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                        </svg>

                        <div className="absolute bottom-[20%] right-[10%] p-4 bg-card border rounded-xl shadow-sm w-48 animate-bounce delay-300 [animation-duration:3.5s]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle size={16} className="text-green-500" />
                                </div>
                                <div className="h-3 w-24 bg-muted rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-3/4 bg-muted/50 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
