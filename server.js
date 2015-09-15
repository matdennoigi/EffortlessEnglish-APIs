/*
 * Module: server.js
 * Author: Huy, Phan Quang
 * Description: This is API & CMS server side
 */
var express = require('express'),
    constants = require('./configs/constants'),
    apiRoutes = require('./controllers/apiRoutes'),
    mongoConnector = require('./mongoConnector'),
    bodyParser = require('body-parser');

//MongoDB Connection Initialize
mongoConnector.connect();

//Express Server Initalize
app = express();

//Register static file
app.use(express.static('./views'));

//Middleware
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

//Register router
app.use('/api', apiRoutes);
app.use('*', function(res, req, next) {
	req.sendfile('./views/index.html');
});

//Listen
app.listen(constants.port, function() {
	console.log("Listening at %s:%s", constants.ipaddress, constants.port);
});

