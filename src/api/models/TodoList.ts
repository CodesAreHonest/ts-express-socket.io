import Todo from './Todo';

class TodoList {
    private todos: Todo[];

    constructor() { }

    seeds(): Todo[] {
        const firstItem = new Todo('first item', false, 1);
        const secondItem = new Todo('second item', false, 1);
        const thirdItem = new Todo('third item', false, 1);

        this.todos = [firstItem, secondItem, thirdItem];

        return this.todos;
    }

}

export default TodoList; 