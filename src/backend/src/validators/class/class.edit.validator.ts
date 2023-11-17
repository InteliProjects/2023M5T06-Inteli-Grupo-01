import { body } from 'express-validator';

export const classEditValidator = [
    body('name', 'Name is Required').optional().isString(),
    body('courseId').optional().isInt(),
    body('status').optional().isString(),
    body('studentQuantity').optional().isInt(),
    body('currentModuleId').optional().isInt(),
];
