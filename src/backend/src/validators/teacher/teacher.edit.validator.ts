import { body } from 'express-validator';

export const teacherEditValidator = [
    body('name').optional().isString(),
    body('email').optional().isEmail(),
    body('observation').optional().isString(),
];
