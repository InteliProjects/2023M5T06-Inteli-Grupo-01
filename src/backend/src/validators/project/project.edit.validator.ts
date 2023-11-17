import { body } from 'express-validator';

export const projectEditValidator = [
    body('name').optional().isString(),
    body('description').optional().isString(),
    body('observation').optional().isString(),
    body('status').default('PENDING').isString(),
    body('moduleId').optional().isInt(),
    body('companyId').optional().isInt(),
    body('classId').optional().isInt(),
    body('initiativeId').optional().isInt(),
];
