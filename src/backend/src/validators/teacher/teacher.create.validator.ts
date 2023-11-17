import { body } from 'express-validator';

export const teacherCreateValidator = [
    body('name').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('observation').optional().isString(),
];
