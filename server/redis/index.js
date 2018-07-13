import redis from 'redis';

const RDS_PORT = process.env.REDIS_PORT;
const RDS_HOST = process.env.REDIS_HOST; 
const RDS_AUTH = process.env.REDIS_AUTH;
const RDS_OPTS = {auth_pass: RDS_AUTH};

const RedisClient = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
// RedisClient.auth(RDS_AUTH);
export const mainClient = RedisClient;

const Redis = () => {
    RedisClient.on("ready", (error) => {
        if (error) {
            console.log('Redis error:' + error);
        } else {
            console.log('Redis ready');
        }
    });
};

export default Redis;