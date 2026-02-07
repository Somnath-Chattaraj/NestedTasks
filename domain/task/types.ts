export interface BaseTaskDetails {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface FileTaskDetails extends BaseTaskDetails {
    type: "file";
}

export interface FolderTaskDetails extends BaseTaskDetails {
    type: "folder";
    subtasks: TaskDetails[];
}

export type TaskDetails = FileTaskDetails | FolderTaskDetails;
