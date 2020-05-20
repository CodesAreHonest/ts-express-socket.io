import TodoService from '../services/TodoService';
import Success from '../../responses/successful/Success';
import Todo from '../models/Todo';
import RedisServer from '../../loaders/RedisServer';

import { validator } from '../../utils/validator';
import { Request, Response } from "express";

export const store = async (req: Request, res: Response) => {
    validator(req);

    const { task, isCompleted } = req.body;

    const socket: SocketIO.Server = req.app.get('socket');
    const redis: RedisServer = req.app.get('redis');
    const todoService = new TodoService(socket, redis);
    const newTodo: Todo = await todoService.storeTodoToModel(task, isCompleted);

    const successResponse = new Success(newTodo).toJson;
    return res.status(200).json(successResponse);

}

export const list = (req: Request, res: Response) => {

    const socket: SocketIO.Server = req.app.get('socket');
    const redis: RedisServer = req.app.get('redis');
    const todoService = new TodoService(socket, redis);
    const todoLists: Todo[] = todoService.getSampleList();

    const successResponse = new Success(todoLists).toJson;
    return res.status(200).json(successResponse);
}

