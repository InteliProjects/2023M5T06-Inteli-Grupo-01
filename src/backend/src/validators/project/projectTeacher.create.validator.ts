import { body } from 'express-validator';

export const projectTeacherCreateValidator = [
    body().notEmpty().isArray(),
    body('*').isObject(),
    body('*.id').notEmpty().isInt(),
    body('*.role').notEmpty().isString(),
];
