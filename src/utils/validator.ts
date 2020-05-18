import UnprocessableEntity from "../responses/clientErrors/UnprocessableEntity";

import { validationResult } from 'express-validator';
import { Request } from "express";
import { ErrorCode, ErrorDescription } from "../common/constants";
import { IErrorFormat } from '../common/interfaces/responses';

export const validator = (req: Request) => {

    const errorFormatter = ({ msg, param }: IErrorFormat) => {
        return `${ param } ${ msg }`;
    };

    const result = validationResult(req).formatWith(errorFormatter);

    if (!result.isEmpty()) {
        throw new UnprocessableEntity(
            ErrorCode.INVALID_INPUT,
            ErrorDescription.INVALID_INPUT,
            result.array()
        );
    }
};