const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

const redisCreateClient = () => (

redis.createClient(process.env.reddisPort , process.env.reddisHost)

)

export = redisCreateClient ;