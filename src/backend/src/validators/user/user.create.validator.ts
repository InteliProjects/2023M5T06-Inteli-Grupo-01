import { body } from 'express-validator';

export const userCreateValidator = [
    body('name').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
];
