import { body } from 'express-validator';

export const initiativeCompetenceCreateValidator = [
    body().notEmpty().isArray(),
    body('*').isObject(),
    body('*.id').notEmpty().isInt(),
    body('*.value').notEmpty().isInt({ min: 0, max: 5 }),
];
