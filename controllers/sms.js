/**
 * Created by GROOT on 2015/4/16.
 */

var req = require("request"),
    config = require("../config"),
    redis = require("../resource/redis"),
    moment = require("moment"),
    _ = require("lodash"),
    crypto = require('crypto'),
    sms;

var url = {
    access_token : "https://oauth.api.189.cn/emp/oauth2/v3/access_token",
    templateSms : "http://api.189.cn/v2/emp/templateSms/sendSms"
};

function getAccessToken(cb) {

    redis.get("sms_access_token", function(err, reply){

        if(err) throw err;

        if(reply) {
            cb(reply.toString());
        }else{
            var data = {
                grant_type : "client_credentials",
                app_id : config.sms.app_id,
                app_secret : config.sms.app_secret
            };

            req.post(url.access_token,{form:data},function(err,res,body){
                body = JSON.parse(body);
                console.log(body);
                if(body.res_code != 0) throw body.res_message;

                redis.set("sms_access_token", body.access_token, body.expires_in, function(e, d){
                    console.log(e, d);
                });
                cb(body);
            });
        }
    });

}

//ǩ��
function sign(data) {
    var keys = _.keys(data).sort(),
        str = [];
    _.forEach(keys,function(n,k){
        str.push(n+"="+data[n]);
    });
    return str.join("&");
}

sms = {
    /**
     * 发送模板短信
     * http://api.189.cn/v2/emp/templateSms/sendSms
     * http://open.189.cn/index.php?m=api&c=index&a=show&id=858
     */
    templateSms : function(phone,active_code,template_id,callback) {
        getAccessToken(function(token){
            var form = {
                app_id : config.sms.app_id,
                access_token : token,
                acceptor_tel : phone,
                template_id : template_id,
                template_param : JSON.stringify({
                    param1 : active_code,
                    param2 : 3
                }),
                timestamp : moment().format("YYYY-MM-DD HH:mm:ss")
            };
            var sign_code = crypto.createHmac('sha1', config.sms.app_secret).update(sign(form)).digest().toString("base64");
            form.sign = sign_code;

            console.log(form);

            req.post(url.templateSms,{form:form},function(err,res,body){
                body = JSON.parse(body);
                console.log(body);
                //return pasreInt(body.res_code) === 0;
                callback(body);
            });
        });
    },
    /**
     * 模板短信状态报告查询
     * http://api.189.cn/v2/EMP/nsagSms/appnotify/querysmsstatus
     * http://open.189.cn/index.php?m=api&c=index&a=show&id=873
     */
    nsagSms : function(){},

    /**
     * 获取信任码
     * http://api.189.cn/v2/dm/randcode/token
     * http://open.189.cn/index.php?m=api&c=index&a=show&id=498
     */
    randcode : function(){},
    /**
     * 验证短信下发
     * http://api.189.cn/v2/dm/randcode/send
     * http://open.189.cn/index.php?m=api&c=index&a=show&id=667
     */
    send : function(){},
    /**
     * 自定义短信验证码下发
     * http://api.189.cn/v2/dm/randcode/sendSms
     * http://open.189.cn/index.php?m=api&c=index&a=show&id=850
     */
    sendSms : function(){}
};

module.exports = sms;