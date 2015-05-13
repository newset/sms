/**
 * Created by GROOT on 5/8 0008.
 */

var mongoose = require('mongoose'),
    config = require("../config"),
    Schema   = mongoose.Schema;

mongoose.connect( 'mongodb://'+config.mongodb.hostname+":"+config.mongodb.port+'/'+config.mongodb.database );

exports = {
    client : mongoose,
    Schema : Schema
};