/**
 * Created by GROOT on 5/8 0008.
 */

var mysql = require("mysql"),
    config = require("../config");

var mysql_client = mysql.createConnection({
    host : config.mysql.hostname,
    user : config.mysql.username,
    password : config.mysql.password,
    database : config.mysql.database,
    charset : config.mysql.charset,
    multipleStatements : true
});
mysql_client.connect();

exports.client = mysql_client;