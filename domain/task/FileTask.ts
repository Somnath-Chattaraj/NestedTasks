import { Task } from "./Task";
import { FileTaskDetails } from "./types";

export class FileTask extends Task {
    getDetails(): FileTaskDetails {
        return {
            type: "file",
            id: this.id,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId,
        };
    }
}
