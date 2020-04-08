import Queue from 'bull';
import * as Redis from '../redisClient';

export const FIND_NEARBY_DRIVER_URL = 'FIND_NEARBY_DRIVER_URL';
export const NOTIFY_CONSUMER_RIDE_ACCEPTED = 'NOTIFY_CONSUMER_RIDE_ACCEPTED';

export const queues = {
    [FIND_NEARBY_DRIVER_URL]: new Queue(FIND_NEARBY_DRIVER_URL, { redis: Redis.getRedisConfig() }),
    [NOTIFY_CONSUMER_RIDE_ACCEPTED]: new Queue(NOTIFY_CONSUMER_RIDE_ACCEPTED, { redis: Redis.getRedisConfig() }),
};