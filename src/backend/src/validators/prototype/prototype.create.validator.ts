import { body } from 'express-validator';

export const prototypeCreateValidator = [
    body('name').notEmpty().isString(),
    body('groupName').optional().isString(),
    body('observation').optional().isString(),
    body('projectId').notEmpty().isInt(),
    body('githubLink').optional().isString(),
    body('deployLink').optional().isString(),
];
