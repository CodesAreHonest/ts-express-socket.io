import { validator } from '../../utils/validator';
import { Request, Response } from "express";
import TodoService from '../services/TodoService';
import Success from '../../responses/successful/Success';
import Todo from '../models/Todo';

export const store = (req: Request, res: Response) => {
    validator(req);

    const { task, isCompleted } = req.body;
    const todoService = new TodoService();
    const newTodo: Todo = todoService.storeTodoToModel(task, isCompleted);

    const successResponse = new Success(newTodo).toJson;
    return res.status(200).json(successResponse);

}

export const list = (req: Request, res: Response) => {

    const todoService = new TodoService();
    const todoLists: Todo[] = todoService.getSampleList();

    const successResponse = new Success(todoLists).toJson;
    return res.status(200).json(successResponse);
}

