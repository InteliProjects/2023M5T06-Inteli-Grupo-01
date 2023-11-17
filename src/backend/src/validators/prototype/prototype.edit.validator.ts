import { body } from 'express-validator';

export const prototypeEditValidator = [
    body('name').optional().isString(),
    body('groupName').optional().isString(),
    body('observation').optional().isString(),
    body('projectId').optional().isInt(),
    body('githubLink').optional().isString(),
    body('deployLink').optional().isString(),
];
