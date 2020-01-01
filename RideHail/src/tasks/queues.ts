import Queue from 'bull';

export const FIND_NEARBY_DRIVER_URL = 'FIND_NEARBY_DRIVER_URL';

export const queues = {
    [FIND_NEARBY_DRIVER_URL]: new Queue(FIND_NEARBY_DRIVER_URL, process.env.REDIS_URL as string)
};