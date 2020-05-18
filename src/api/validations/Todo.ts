import { body, ValidationChain, query } from "express-validator";

export const storeValidation: ValidationChain[] = [
    body('task')
        .isString().withMessage('must be string')
        .exists().withMessage('is required'),

    body('isCompleted')
        .isBoolean().withMessage('must be boolean')
        .exists().withMessage('is required')
];