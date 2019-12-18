import { NextFunction, Request, Response } from 'express';
import HTTPException from '../exceptions/HttpException';

function errorMiddleware(error: HTTPException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
            status,
            message,
        });
    //since last in middleware, no need of calling next
}

export default errorMiddleware;