"use client";

import { LandingNavbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LandingFeatures } from "@/components/landing/Features";
import { LandingFooter } from "@/components/landing/Footer";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingNavbar />
            <Hero />
            <LandingFeatures />
            <LandingFooter />
        </div>
    );
}