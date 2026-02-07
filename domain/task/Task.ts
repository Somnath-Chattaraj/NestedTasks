// domain/task/Task.ts
export abstract class Task {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public createdAt: Date,
        public updatedAt: Date,
        public userId: string
    ) { }

    abstract getDetails(): TaskDetails;
}
