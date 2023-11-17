import { body } from 'express-validator';

export const competenceCreateValidator = [
    body('name').notEmpty().isString(),
    body('description').optional().isString(),
];
