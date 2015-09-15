/*
 * Module : controllers/routes.js
 * Author : Huy, Phan Quang
 * Description : This is router table for server
 */

var express = require('express');
var router = express.Router();
var cdcontroller = require('./cdcontroller');
var lessonController = require('./lessonController');
var lessonSectionController = require('./lessonSectionController');

router.all('/', function(req, res, next) {
	res.send('Effortless English Service version 1.0.0 !');
});

router.route('/cds')
	.get(cdcontroller.getCDs)
	.post(cdcontroller.createCD)
	.delete(cdcontroller.deleteCDs);

router.route('/cds/:id')
	.get(cdcontroller.getCDDetail)
	.put(cdcontroller.updateCD);

router.route('/cds/:cdid/lessons')
	.get(lessonController.getLessons)
	.post(lessonController.createLesson);

router.route('/cds/:cdid/lessons/:lessonid/lessonsections')
	.post(lessonSectionController.createLessonSection);

module.exports = router;



