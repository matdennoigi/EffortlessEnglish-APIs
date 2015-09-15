/*
* Module : controllers/lessoncontroller.js
* Author : Huy, Phan Quang
* Description : Lesson Controller
*/

var Lesson = require('../models/lesson').Model;
var CD = require('../models/cd').Model;

exports.createLesson = function(req, res, next) {
	var cdid = req.params.cdid;
	if (!cdid)
	{
		res.status(400).end();
		return;
	}

	if (!req.body)
	{
		res.status(400).end();
		return;
	}

	CD.findOneAndUpdate({ _id: cdid }, { $push:  { lessons: req.body }} , function(err) {
		if (err) {
			res.status(500).end();
			return;
		}

		res.status(200).end();
	});
}

exports.getLessons = function(req, res, next) {
	var cdid = req.params.cdid;

	if (!cdid) {
		res.status(400).end();
		return;
	}

	CD.findOne({ _id: cdid }, { lessons: 1 }, function(err, result) {
		if (err) {
			res.status(404).end();
			return;
		}

		res.json(result.lessons);
	});

}