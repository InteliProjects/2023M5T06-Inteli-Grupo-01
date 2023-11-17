import { body } from 'express-validator';

export const initiativeCreateValidator = [
    body('name').notEmpty().isString(),
    body('status').default('PENDING').isString(),
    body('description').optional().isString(),
    body('observation').optional().isString(),
    body('companyId').notEmpty().isInt(),
    body('moduleId').notEmpty().isInt(),
];
