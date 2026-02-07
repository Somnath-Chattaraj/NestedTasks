import prisma from "@/lib/db";
import { TaskType } from "@/lib/generated/prisma/client";


async function main() {
    const userId = "TRGtqTLhH3fpdKIlAM1rkYvwVjSe1epD";

    // clean existing tasks for this user (optional but recommended)
    await prisma.task.deleteMany({
        where: { userId },
    });

    // root folder
    const project = await prisma.task.create({
        data: {
            title: "project alpha",
            description: "main project folder",
            type: TaskType.FOLDER,
            userId,
        },
    });

    // level 1 tasks
    const backend = await prisma.task.create({
        data: {
            title: "backend",
            description: "backend work",
            type: TaskType.FOLDER,
            userId,
            parentId: project.id,
        },
    });

    const frontend = await prisma.task.create({
        data: {
            title: "frontend",
            description: "frontend work",
            type: TaskType.FOLDER,
            userId,
            parentId: project.id,
        },
    });

    // level 2 backend tasks
    const auth = await prisma.task.create({
        data: {
            title: "authentication",
            description: "jwt, sessions, oauth",
            type: TaskType.FOLDER,
            userId,
            parentId: backend.id,
        },
    });

    await prisma.task.createMany({
        data: [
            {
                title: "design db schema",
                description: "user, task, session models",
                type: TaskType.FILE,
                userId,
                parentId: backend.id,
            },
            {
                title: "setup prisma",
                description: "migrations and client",
                type: TaskType.FILE,
                userId,
                parentId: backend.id,
            },
        ],
    });

    // level 3 auth tasks
    await prisma.task.createMany({
        data: [
            {
                title: "jwt login",
                description: "access & refresh tokens",
                type: TaskType.FILE,
                userId,
                parentId: auth.id,
            },
            {
                title: "google oauth",
                description: "google provider setup",
                type: TaskType.FILE,
                userId,
                parentId: auth.id,
            },
        ],
    });

    // level 2 frontend tasks
    const ui = await prisma.task.create({
        data: {
            title: "ui components",
            description: "reusable components",
            type: TaskType.FOLDER,
            userId,
            parentId: frontend.id,
        },
    });

    await prisma.task.createMany({
        data: [
            {
                title: "task tree view",
                description: "recursive task rendering",
                type: TaskType.FILE,
                userId,
                parentId: ui.id,
            },
            {
                title: "drag and drop",
                description: "reorder tasks",
                type: TaskType.FILE,
                userId,
                parentId: ui.id,
            },
        ],
    });

    console.log("✅ seed completed successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
