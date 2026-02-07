import prisma from "@/lib/db";
import { Task } from "@/lib/generated/prisma/client";

type NestedTask = Task & {
    children: NestedTask[];
};

export const fetchTask = async ({ userId }: { userId: string }) => {
    const tasks = await prisma.task.findMany({
        where: { userId },
    });

    const taskMap = new Map<string, NestedTask>();
    const roots: NestedTask[] = [];

    tasks.forEach((task) => {
        taskMap.set(task.id, { ...task, children: [] });
    });

    tasks.forEach((task) => {
        const currentTask = taskMap.get(task.id)!;

        if (task.parentId) {
            const parent = taskMap.get(task.parentId);
            if (parent) {
                parent.children.push(currentTask);
            }
        } else {
            roots.push(currentTask);
        }
    });

    return roots;
};
