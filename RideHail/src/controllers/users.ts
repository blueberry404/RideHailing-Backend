import { Request, Response } from 'express';

export const getAll = async (request: Request, response: Response) => {
    response.send({ success: 'success' });
};