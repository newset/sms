/**
 * Created by GROOT on 5/8 0008.
 */

var redis = require("redis"),
    config = require("../config");

var redis_client = redis.createClient(config.redis.port,config.redis.host,{
    socket_keepalive : true
});
redis_client.select(config.redis.database);

module.exports = redis_client;