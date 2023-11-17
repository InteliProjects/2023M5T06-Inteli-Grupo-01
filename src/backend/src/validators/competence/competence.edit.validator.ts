import { body } from 'express-validator';

export const competenceEditValidator = [body('name').optional().isString(), body('description').optional().isString()];
