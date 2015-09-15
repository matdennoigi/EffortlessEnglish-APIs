
/*
* Module : models/cd.js
* Author : Huy, Phan Quang
* Description : CD Model
*/
var mongoose = require("mongoose"),
	lessonSchema = require('./lesson').Schema;

var CDSchema = mongoose.Schema({
	title : String,
	lessons : [lessonSchema]
});

var CD = mongoose.model("CD", CDSchema);

module.exports = { Model : CD, Schema : CDSchema };