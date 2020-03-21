import Queue from 'bull';
import * as Redis from '../redisClient';

export const FIND_NEARBY_DRIVER_URL = 'FIND_NEARBY_DRIVER_URL';

export const queues = {
    [FIND_NEARBY_DRIVER_URL]: new Queue(FIND_NEARBY_DRIVER_URL, { redis: Redis.getRedisConfig() })
};