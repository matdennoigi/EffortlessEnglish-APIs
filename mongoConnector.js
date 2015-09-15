/*
* Module : mongoConnector.js
* Author : Huy, Phan Quang
* Description : Mongo connector helper
*/

var mongoose = require('mongoose'),
	constants = require('./configs/constants');

var isReconnect = false;

exports.connect = function() {
	var connectionOptions = {
		server : {
			socketOptions : {
				keepAlive : 1
			}
		}
	};

	mongoose.connect(constants.mongoConnectionString, connectionOptions);

	if (!isReconnect) {
		mongoose.connection.on('error', console.log);
		mongoose.connection.on('disconnect', function() 
			{
				exports.connect();
			});
		isReconnect = true;
	}
}

