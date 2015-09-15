/*
* Module : controllers/lessonSectionController.js
* Author : Huy, Phan Quang
* Description : Lesson Section Controller
*/
var LessonSection = require('../models/lessonSection').Model,
	CD = require('../models/cd').Model,
	Lesson = require('../models/lesson').Model;

exports.createLessonSection = function(req, res, next) {
	var cdid = req.params.cdid;
	var lessonid = req.params.lessonid;
	
	if (!cdid || !lessonid) {
		res.status(400).end();
		return;
	}

	if (!req.body) {
		res.status(400).end();
		return;
	}

	CD.findOneAndUpdate({'lessons._id': lessonid}, 
		{ $push: { 'lessons.$.sections' : req.body }},
		function(err, result) {
			if (err)
			{
				res.status(500).end();
				return;
			}

			res.status(200).end();
		});

}
