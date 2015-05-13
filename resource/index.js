/**
 * Created by GROOT on 5/8 0008.
 */

var mysql = require('./mysql'),
    redis = require('./redis'),
    mongo = require('./mongo'),
    beanstalk = require('./beanstalk');

exports = {
    mysql : mysql,
    redis : redis,
    mongo : mongo,
    beanstalk : beanstalk
};