import Todo from '../models/Todo';
import TodoList from '../models/TodoList';

import RedisServer from '../../loaders/RedisServer';

class TodoService {

    constructor(private socket: SocketIO.Server, private redisServer: RedisServer) { }

    storeTodoToModel = async (task: string, isCompleted: boolean): Promise<Todo> => {
        let newTodo: Todo = new Todo(task, isCompleted);
        const socketId: string | null = await this.redisServer.getValueWithKey("SAMPLE_PLATFORM@2");

        if (socketId !== null) {
            this.socket.to(socketId).emit('new_todo', newTodo);
        }

        return newTodo;
    }

    getSampleList = (): Todo[] => {
        let todoList: TodoList = new TodoList();
        return todoList.seeds();
    }
}

export default TodoService;