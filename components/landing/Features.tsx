"use client";

import {
    TreeStructure,
    Graph,
    Lightning,
    ChartBar,
    LockKey,
    Devices
} from "@phosphor-icons/react";

const features = [
    {
        name: "Visual Workflows",
        description: "Map out your tasks in an intuitive node-based interface. See the big picture and the details simultaneously.",
        icon: Graph,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        name: "Infinite Nesting",
        description: "Break down massive projects into manageable subtasks, recursively. No limit to how deep your organization goes.",
        icon: TreeStructure,
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        name: "Instant Analytics",
        description: "Get real-time insights into your productivity. Track completion rates, active projects, and more at a glance.",
        icon: ChartBar,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        name: "Secure & Private",
        description: "Your data is encrypted and secure. We prioritize your privacy so you can focus on getting things done.",
        icon: LockKey,
        color: "text-red-500",
        bg: "bg-red-500/10",
    },
    {
        name: "Lightning Fast",
        description: "Built for speed. Navigate through complex task hierarchies instantly with our optimized engine.",
        icon: Lightning,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
    },
    {
        name: "Cross-Device Sync",
        description: "Access your workflows from anywhere. Seamlessly synced across all your devices in real-time.",
        icon: Devices,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
];

export function LandingFeatures() {
    return (
        <section id="features" className="py-24 bg-muted/50 dark:bg-muted/10">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Everything you need to <br className="hidden sm:block" />
                        <span className="text-primary">stay organized</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Powerful features designed to help you manage complex projects without the overwhelm.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border bg-background p-8 transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}>
                                <feature.icon size={24} weight="duotone" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold">{feature.name}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/5 rounded-2xl transition-colors pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
