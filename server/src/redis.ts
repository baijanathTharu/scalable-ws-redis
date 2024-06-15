import Redis from "ioredis";
import { env } from "./config";

const url = env.REDIS_URL;
if (!url) {
  throw new Error("Invalid redis url. Please set the redis url in env file");
}

export const redisClient = new Redis(url);
