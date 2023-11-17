import { NextFunction, Request, Response } from 'express';
import ApiError from '../infra/config/apiError/ApiError.config';

export default function errorHandlerMiddleware(error: Error | any, req: Request, res: Response, next: NextFunction) {
    let message = error?.message || error;
    let status = 500;
    if (error instanceof ApiError) {
        status = error.status;
        message = error.anyMessage;
    }

    console.log(`ERROR [${new Date().toISOString()}] ${status} -`, message, error?.stack);
    res.status(status).json({
        status,
        message,
    });
}
