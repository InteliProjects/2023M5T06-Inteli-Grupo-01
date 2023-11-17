import { body } from 'express-validator';

export const userEditValidator = [
    body('name').optional().isString(),
    body('email').optional().isEmail(),
    body('password').optional().isString(),
];
