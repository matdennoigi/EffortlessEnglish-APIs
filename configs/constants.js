/*
 * Module : configs/Contants.js
 * Author : Huy, Phan Quang
 * Description : Contants/Configuration for application
 */

var Constants =  {
    ipaddress :  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
    port :  process.env.OPENSHIFT_NODEJS_PORT || 8080,
    mongoConnectionString : 'mongodb://localhost:27017/effortlessenglish'
};


module.exports = Constants;
