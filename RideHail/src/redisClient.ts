import * as Redis from 'redis';
import { promisify } from 'util';
import { RedisConfigSignature } from './interfaces/RedisConfigSignature';
import {PubsubManager} from 'redis-messaging-manager';

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
  console.log(`Redis err: ${err}`);
});

export const messenger = new PubsubManager(getRedisConfig());

export const EVENT_RIDE_REQUEST = "EVENT_RIDE_REQUEST";
export const EVENT_NO_DRIVER_FOUND = "EVENT_NO_DRIVER_FOUND";
export const EVENT_DRIVER_ACCEPTED_RIDE = "EVENT_DRIVER_ACCEPTED_RIDE"


export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
export const keysAsync = promisify(client.keys).bind(client);
