
import DashboardTable from "@/components/dashboard/dashboardTable";
import { fetchTask } from "../actions/fetchTask";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) {
        redirect("/sign-up");
    }
    const tasks: any[] = await fetchTask({ userId: session.user.id });
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between pointer-events-none">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Tasks</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your tasks and projects.</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <DashboardTable level={0} tasks={tasks} userId={session.user.id} />
                </div>
            </div>
        </div>
    )
}