import { body } from 'express-validator';

export const moduleEditValidator = [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('order').optional().isInt(),
    body('courseId').optional().isInt(),
];
