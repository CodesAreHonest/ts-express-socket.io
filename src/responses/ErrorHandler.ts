import { ICustomErrorResponse } from "../common/interfaces/responses";
import { Request, Response, NextFunction } from "express";

export default (err: Error | ICustomErrorResponse, req: Request, res: Response, next: NextFunction) => {

    if (!(err instanceof Error)) {
        return responseCustomError(err, res);
    }

    throw err;
}

const responseCustomError = (err: ICustomErrorResponse, res: Response) => {

    const { statusCode = 500 } = err;
    return res.status(statusCode).json(err);
}