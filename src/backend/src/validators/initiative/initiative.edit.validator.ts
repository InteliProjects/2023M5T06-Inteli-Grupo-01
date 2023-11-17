import { body } from 'express-validator';

export const initiativeEditValidator = [
    body('name').optional().isString(),
    body('status').optional().isString(),
    body('description').optional().isString(),
    body('observation').optional().isString(),
    body('companyId').optional().isInt(),
    body('moduleId').optional().isInt(),
];
