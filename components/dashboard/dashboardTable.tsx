"use client";

import { useState } from "react";
import TaskRow from "./taskRow";
import TaskFlow from "./TaskFlow";
import { Plus, List, TreeStructure } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type NestedTask = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    parentId: string | null;
    userId: string;
    children: NestedTask[];
};

type Props = {
    tasks: NestedTask[];
    level?: number;
    userId?: string;
};

export default function DashboardTable({ tasks, level = 0, userId }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState("");
    const router = useRouter();
    const [view, setView] = useState<"list" | "flow">("list");

    const addRootTask = async () => {
        if (!title.trim() || !userId) return;

        try {
            await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify({
                    parentId: null,
                    title,
                    description: "",
                    userId: userId,
                }),
            });
            setTitle("");
            setIsAdding(false);
            router.refresh();
        } catch (error) {
            console.error("Failed to add task", error);
        }
    };

    const handleUpdateTask = async (task: NestedTask, newTitle: string, newDesc: string) => {
        try {
            await fetch("/api/tasks", {
                method: "PATCH",
                body: JSON.stringify({
                    taskId: task.id, // Use task.id, ensuring backend handles it
                    title: newTitle,
                    description: newDesc,
                }),
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            await fetch("/api/tasks", {
                method: "DELETE",
                body: JSON.stringify({ taskId }),
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    // Wrapper for adding child task from Flow view
    const handleAddChildTask = async (parentId: string, newTitle: string = "New Task", newDesc: string = "") => {
        if (!userId) return;
        try {
            await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify({
                    parentId,
                    title: newTitle,
                    description: newDesc,
                    userId,
                }),
            });
            router.refresh();
        } catch (error) {
            console.error("Failed to add child task", error);
        }
    };

    if (level === 0) {
        return (
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                        <button
                            onClick={() => setView("list")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                view === "list"
                                    ? "bg-background shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <List className="h-4 w-4" />
                            List
                        </button>
                        <button
                            onClick={() => setView("flow")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                view === "flow"
                                    ? "bg-background shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <TreeStructure className="h-4 w-4" />
                            Flow
                        </button>
                    </div>

                    <Button onClick={() => setIsAdding(!isAdding)} size="sm" variant="default">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Task
                    </Button>
                </div>

                {isAdding && (
                    <div className="flex gap-2 items-center mb-4 p-4 border rounded-lg bg-muted/50 animate-in fade-in slide-in-from-top-2">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task title..."
                            className="flex-1 bg-background"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === "Enter") addRootTask();
                            }}
                        />
                        <Button onClick={addRootTask} size="sm">Save</Button>
                        <Button onClick={() => setIsAdding(false)} variant="ghost" size="sm">Cancel</Button>
                    </div>
                )}

                {view === "list" ? (
                    <div className="space-y-2">
                        {tasks.map((task) => (
                            <TaskRow key={task.id} task={task} level={level} />
                        ))}
                        {tasks.length === 0 && !isAdding && (
                            <div className="text-center py-12 text-muted-foreground border-dashed border-2 rounded-xl">
                                <p>No tasks yet.</p>
                                <p className="text-sm">Click "Add Task" to create your first task.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <TaskFlow
                        tasks={tasks}
                        onTaskUpdate={handleUpdateTask}
                        onTaskDelete={handleDeleteTask}
                        onTaskAdd={handleAddChildTask}
                    />
                )}
            </div>
        );
    }

    // Recursive render for list view (handled by TaskRow internally calling DashboardTable)
    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <TaskRow key={task.id} task={task} level={level} />
            ))}
        </div>
    );
}

// Add these exports so other files can import normally
export { TaskRow };
