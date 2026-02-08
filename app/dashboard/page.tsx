import DashboardTable from "@/components/dashboard/dashboardTable";
import { fetchTask } from "../actions/fetchTask";
import { fetchStats } from "../actions/fetchStats";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
    CheckCircle,
    SquaresFour,
    Folders,
    ListChecks
} from "@phosphor-icons/react/dist/ssr"; // Import from ssr for server components if needed, or just standard import. Phosphor icons are client components mostly but can be used in server components if they render SVG. Using standard import usually works in Next.js app dir.

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/sign-in");
    }

    const tasks: any[] = await fetchTask({ userId: session.user.id });
    const stats = await fetchStats({ userId: session.user.id });

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Welcome back, <span className="font-medium text-foreground">{session.user.name}</span>! Here's an overview of your projects.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                            <ListChecks size={24} className="text-primary opacity-75" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{stats.totalTasks}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Across all projects
                            </p>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                            <Folders size={24} className="text-blue-500 opacity-75" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{stats.folderCount}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Organized folders
                            </p>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <p className="text-sm font-medium text-muted-foreground">Root Items</p>
                            <SquaresFour size={24} className="text-orange-500 opacity-75" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{stats.rootTasks}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Top-level tasks
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="rounded-xl border bg-card text-card-foreground shadow w-full overflow-hidden">
                    <div className="p-6 border-b bg-muted/20">
                        <h2 className="text-xl font-semibold">Your Tasks</h2>
                        <p className="text-sm text-muted-foreground">Manage your tasks in list or flow view</p>
                    </div>
                    <div className="p-6">
                        <DashboardTable level={0} tasks={tasks} userId={session.user.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}