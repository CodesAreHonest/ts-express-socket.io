import Todo from '../models/Todo';
import TodoList from '../models/TodoList';

class TodoService {

    storeTodoToModel = (task: string, isCompleted: boolean): Todo => {
        let newTodo: Todo = new Todo(task, isCompleted);
        return newTodo;
    }

    getSampleList = (): Todo[] => {
        let todoList: TodoList = new TodoList();
        return todoList.seeds();
    }
}

export default TodoService;