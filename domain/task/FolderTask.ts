import { Task } from "./Task";
import { FolderTaskDetails } from "./types";

export class FolderTask extends Task {
    subtasks: Task[] = [];

    addSubtask(task: Task) {
        this.subtasks.push(task);
    }

    getDetails(): FolderTaskDetails {
        return {
            type: "folder",
            id: this.id,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId,
            subtasks: this.subtasks.map(t => t.getDetails()),
        };
    }
}
