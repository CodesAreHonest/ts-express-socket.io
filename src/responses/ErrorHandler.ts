import Unauthorized from './clientErrors/Unauthorized';
import BadRequest from './clientErrors/BadRequest';
import NotFound from './clientErrors/NotFound';
import UnprocessableEntity from './clientErrors/UnprocessableEntity';
import InternalServerError from './serverErrors/InternalServerError';

import { ICustomErrorResponse } from "../common/interfaces/responses";
import { Request, Response, NextFunction } from "express";

export default (err: Error | ICustomErrorResponse, req: Request, res: Response, next: NextFunction) => {

    if (
        err instanceof Unauthorized ||
        err instanceof BadRequest ||
        err instanceof NotFound ||
        err instanceof Unauthorized ||
        err instanceof UnprocessableEntity ||
        err instanceof InternalServerError
    ) {
        return reportCustomError(err, res);
    }

    next(err);
}

const reportCustomError = (err: ICustomErrorResponse, res: Response) => {

    const { statusCode = 500 } = err;
    return res.status(statusCode).json(err);
}