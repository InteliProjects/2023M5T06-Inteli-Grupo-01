import { body } from 'express-validator';

export const classCreateValidator = [
    body('name', 'Name is Required').notEmpty().isString(),
    body('courseId').notEmpty().isInt(),
    body('status').optional().isString(),
    body('studentQuantity').optional().isInt(),
    body('currentModuleId').optional().isInt(),
];
