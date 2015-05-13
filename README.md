# sms
中国电信短信平台模板短信调用

在config.js 中配置对应的app_id 和 app_secret

    {
      'app_id' : '', 
      'app_secret' : '',
    }
    
实例主程序依托于队列服务，同时发送日志保存在redis中
