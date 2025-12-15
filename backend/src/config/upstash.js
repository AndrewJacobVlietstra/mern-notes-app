import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Inject env variables
dotenv.config();

// Create a new ratelimiter, that allows 100 requests per 1 minute
const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(100, "60 s"),
	analytics: true,
	/**
	 * Optional prefix for the keys used in redis. This is useful if you want to share a redis
	 * instance with other applications and want to avoid key collisions. The default prefix is
	 * "@upstash/ratelimit"
	 */
	prefix: "@upstash/ratelimit/thinkboard",
});

export default ratelimit;
