import { Request, Response } from 'express';

export const getAll = async (request: Request, response: Response) => {
    response.send('Abey saaley');
};

export const bookRide = async (request: Request, response: Response) => {
    response.json({ success: 'success' });
};

export const cancelRide = async (request: Request, response: Response) => {
    response.json({ success: 'success' });
};

export const acceptRide = async (request: Request, response: Response) => {
    response.json({ success: 'success' });
};

export const startRide = async (request: Request, response: Response) => {
    response.json({ success: 'success' });
};

/*
Push notifications:
- find and notify Nearby Drivers
- cancel ride to other entity
- notify consumer that ride has been accepted

HOW NOTIFY USERS FOR CHANGING STATE AND LOCATION?
*/