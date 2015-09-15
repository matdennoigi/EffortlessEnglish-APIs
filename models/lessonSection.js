/*
* Module : models/lessonSection.js
* Author : Huy, Phan Quang
* Description : Section of lesson (content/ministory)
*/

var mongoose = require('mongoose');

var LessonSectionSchema = mongoose.Schema({
	type : String,
	textContent : String,
	mp3Link : String
});

var LessonSectionModel = mongoose.model('LessonSection', LessonSectionSchema);

module.exports = { Model : LessonSectionModel, Schema : LessonSectionSchema };