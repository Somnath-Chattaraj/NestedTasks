interface taskInterface {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

class Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;

    constructor(id: string, title: string, description: string, createdAt: Date, updatedAt: Date, userId: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }

    getDetails() {
        throw new Error("getDetails() must be implemented");
    }

}

class FileTask extends Task {
    constructor(id: string, title: string, description: string, createdAt: Date, updatedAt: Date, userId: string) {
        super(id, title, description, createdAt, updatedAt, userId);
    }
    getDetails(): taskInterface {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId,
        }
    }
}

class FolderTask extends Task {
    subtasks: Task[] = [];
    constructor(id: string, title: string, description: string, createdAt: Date, updatedAt: Date, userId: string) {
        super(id, title, description, createdAt, updatedAt, userId);
    }
    addSubtask(subtask: Task) {
        this.subtasks.push(subtask);
    }
    getDetails() {
        let subtasks = [];
        for (let i = 0; i < this.subtasks.length; i++) {
            subtasks.push(this.subtasks[i].getDetails());
        }
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            userId: this.userId,
            subtasks: subtasks,
        }
    }
}