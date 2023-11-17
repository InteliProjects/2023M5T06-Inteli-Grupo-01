import { body } from 'express-validator';

export const companyAdminCreateValidator = [
    body('name').notEmpty().isString(),
    body('sector').optional().isString(),
    body('branch').optional().isString(),
    body('activity').optional().isString(),
    body('size').optional().isString(),
    body('email').optional().isString(),
    body('description').optional().isString(),
    body('password').optional().isString(),
    body('avatarFileId').optional().isInt(),
];

export const companyCompanyCreateValidator = [
    body('name', 'Name is Required').notEmpty().isString(),
    body('sector').optional().isString(),
    body('description').optional().isString(),
    body('branch').optional().isString(),
    body('activity').optional().isString(),
    body('size').optional().isString(),
    body('email').optional().isString(),
    body('password').optional().isString(),
    body('avatarFileId').optional().isInt(),
];
