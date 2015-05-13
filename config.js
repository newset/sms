/**
 * Created by GROOT on 2015/4/15.
 */

var config = {
    beanstalk : {
        host : "123.57.149.78",
        port : 11300
    },
    mysql : {
        hostname : "localhost",
        database : "forge",
        username : "root",
        password : "",
        charset  : "utf8",
        collation: "utf8_unicode_ci"
    },
    mongodb : {
        hostname : "localhost",
        port     : 27017,
        username : "",
        password : "",
        database : "blue"
    },
    redis : {
        host : "127.0.0.1",
        port : 6379,
        database : 0
    },
    pingxx : {
        appid : "",
        appkey : ""
    },
    sms : {
        app_id : "",
        app_secret : ""
    }
};

module.exports = config;