import { body } from 'express-validator';

export const courseEditValidator = [
    body('name').optional().isString(),
    body('observation').optional().isString(),
    body('order').optional().isInt(),
];
