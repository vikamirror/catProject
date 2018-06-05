import redis from 'redis';

const RDS_PORT = process.env.REDIS_PORT;
const RDS_HOST = process.env.REDIS_HOST;
const RDS_OPTS = {};
const RDS_AUTH = process.env.REDIS_AUTH;

const RedisClient = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
RedisClient.auth(RDS_AUTH);
export const mainClient = RedisClient;

const Redis = () => {
    RedisClient.on('ready', () => {
        console.log('Redis ready');
    });
    RedisClient.on('error', (err) => {
        console.log('Redis error:' + err);
    });
};

export default Redis;