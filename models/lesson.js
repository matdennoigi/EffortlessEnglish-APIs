/*
* Module : models/lesson.js
* Author : Huy, Phan Quang
* Description : Lession Model
*/

var mongoose = require('mongoose');
var LessonSectionSchema = require('./lessonSection').Schema;

var LessonSchema = mongoose.Schema({
	title : String,
	sections : [LessonSectionSchema]
});

var LessonModel = mongoose.model("Lesson", LessonSchema);

module.exports = { Model : LessonModel, Schema : LessonSchema };