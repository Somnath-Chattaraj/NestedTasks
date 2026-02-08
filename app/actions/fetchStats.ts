import prisma from "@/lib/db";

export const fetchStats = async ({ userId }: { userId: string }) => {
    const totalTasks = await prisma.task.count({
        where: { userId },
    });

    const folderCount = await prisma.task.count({
        where: { userId, type: "FOLDER" }, // Assuming enum is used as string or we import it. Prisma usually handles string if it matches enum.
    });

    // If you had a status field, you would count completed here. 
    // Since we don't, maybe we count "root" tasks?
    const rootTasks = await prisma.task.count({
        where: { userId, parentId: null },
    });

    return {
        totalTasks,
        folderCount,
        rootTasks,
    };
};
