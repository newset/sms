/**
 * Created by GROOT on 5/8 0008.
 */

var config = require("../config"),
    bs = require('nodestalker'),
    socket = require("../controllers/socketio");

function job_watcher(tube,runner) {
    var client = bs.Client(config.beanstalk.host);
    client.watch(tube).onSuccess(function(data){
        client.reserve().onSuccess(function(job){
            console.log('received job:',job);
            runner(job,client);
            job_watcher(tube,runner);
        });
    });
}

exports.job_watcher = job_watcher;

exports.job_destroyer = function(client,job) {
    client.deleteJob(job.id).onSuccess(function(del_msg){
        console.log('deleted:',job);
        client.disconnect();
        socket.send_message(JSON.stringify(job));
    });
};

exports.job_maker = function(tube,job_data,priority,delay,callback) {
    if(typeof priority == 'undefined') {
        priority = 10;
    }

    if(typeof delay == 'undefined') {
        delay = 7200;
    }

    var client = bs.Client(config.beanstalk.host);
    client.use(tube).onSuccess(function(data){
        client.put(job_data,priority,delay).onSuccess(function(data){
            console.log("PUT "+tube+" JOB:",data);
            try{
                callback(data,client);
                client.disconnect();
            } catch(e) {
                throw e;
            }
        });
    });
};