import { body } from 'express-validator';

export const projectCreateValidator = [
    body('name').notEmpty().isString(),
    body('description').optional().isString(),
    body('observation').optional().isString(),
    body('status').default('PENDING').isString(),
    body('moduleId').notEmpty().isInt(),
    body('companyId').notEmpty().isInt(),
    body('classId').notEmpty().isInt(),
    body('initiativeId').optional().isInt(),
];
