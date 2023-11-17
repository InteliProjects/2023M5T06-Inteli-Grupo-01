import { body } from 'express-validator';

export const moduleCreateValidator = [
    body('name').notEmpty().isString(),
    body('description').optional().isString(),
    body('order').notEmpty().isInt(),
    body('courseId').notEmpty().isInt(),
];
