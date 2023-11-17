import { body } from 'express-validator';

export const companyEditValidator = [
    body('name').optional().isString(),
    body('type').optional().isString(),
    body('sector').optional().isString(),
    body('email').optional().isString(),
    body('password').optional().isString(),
    body('avatarFileId').optional().isInt(),
];
