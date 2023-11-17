import { body } from 'express-validator';

export const courseCreateValidator = [
    body('name', 'Name is Required').notEmpty().isString(),
    body('observation').optional().isString(),
    body('order').notEmpty().isInt(),
];
