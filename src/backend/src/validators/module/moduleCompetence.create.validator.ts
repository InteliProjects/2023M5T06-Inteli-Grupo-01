import { body } from 'express-validator';

export const moduleCompetenceCreateValidator = [
    body().notEmpty().isArray(),
    body('*').isObject(),
    body('*.id').notEmpty().isInt(),
];
