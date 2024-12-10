import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this._set = promisify(this.client.set).bind(this.client);
    this._get = promisify(this.client.get).bind(this.client);
    this._del = promisify(this.client.del).bind(this.client);

    // Handle connection errors
    this.client.on('error', (err) => {
      console.log(`Redis error: ${err.message}`);
    });
  }

  isAlive() {
    // Connect to the Redis server
    return this.client.connected;
  }

  async get(key) {
    return this._get(key);
  }

  async set(key, value, duration) {
    await this._set(key, value, 'EX', duration);
  }

  async del(key) {
    await this._del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
