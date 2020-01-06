import * as Redis from 'redis';
import { promisify } from 'util';
import { RedisConfigSignature } from './interfaces/RedisConfigSignature';

export function getRedisConfig() : RedisConfigSignature {
    return {
      host: process.env.REDIS_URL as string,
      port: Number(process.env.REDIS_PORT)
    };
}

export const client = Redis.createClient(getRedisConfig());
export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
export const keysAsync = promisify(client.keys).bind(client);
