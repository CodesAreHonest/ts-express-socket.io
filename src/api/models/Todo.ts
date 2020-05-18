class Todo {
    constructor(
        private task: string,
        private isCompleted: boolean,
        private id?: number
    ) { }

    get toJson(): object {
        return {
            task: this.task,
            isCompleted: this.isCompleted,
            id: this.id
        }
    }
}

export default Todo; 