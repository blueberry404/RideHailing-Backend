import * as Redis from 'redis';
import { promisify } from 'util';
import { RedisConfigSignature } from './interfaces/RedisConfigSignature';

export function getRedisConfig() : RedisConfigSignature {
    return {
      host: process.env.REDIS_HOST as string,
      port: Number(process.env.REDIS_PORT)
    };
}

export const client = Redis.createClient(getRedisConfig());

client.on('connect', function (err) {
  console.log('Redis Connected');
});

client.on('error', function (err) {
  console.log(err);
});

export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
export const keysAsync = promisify(client.keys).bind(client);
