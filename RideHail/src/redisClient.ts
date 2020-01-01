import * as Redis from 'redis';
import { promisify } from 'util';

const host: string = process.env.REDIS_URL as string;
const client = Redis.createClient(host);

module.exports = {
    ...client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    keysAsync: promisify(client.keys).bind(client)
};