/*
 * Module : controllers/CDController.js
 * Author : Huy, Phan Quang
 * Description : Controller for CD Object operations
 */

var CD = require('../models/cd').Model,
	_ = require('underscore'),
	mongoose = require('mongoose');

exports.getCDs = function(req, res, next) {
	CD.find({}, 
		{
			'title': 1,
			'_id': 1, 
			'lessons.title': 1,
			'lessons._id': 1,
			'lessons.sections._id': 1,
			'lessons.sections.type': 1
		})
	.exec(function(err, result) 
	{
		if (err)
		{
			res.status(500).send('Query DB error!');
			return;
		}

		res.json(result);
	});
}

exports.createCD = function(req, res, next) {
	var cd = new CD(req.body);
	cd.save(function(err, result) {
		if (err)
		{
			res.status(400).end();
			return;
		}

		res.status(200).end();
	});
}

exports.deleteCDs = function(req, res, next) {
	if (req.query.ids)
	{
		var ids = req.query.ids.split(',');
		if (_.contains(ids, 'all'))
		{
			CD.remove({}, function(err) 
				{
					if (err)
					{
						res.status(500).end();
						return;
					}

					res.status(200).end();
				});
			return;
		}

		CD.remove({ '_id' : { $in : ids }}, function(err) {
			if (err) {
				res.status(400).end();
			}
			res.status(200).end();
		});

		return;
	}

	res.status(400).end();
}

exports.getCDDetail = function(req, res, next) {
	var id = req.params.id;
	if (id) {
		CD.find({'_id' : id }, { 'title' : 1, 'lessons._id' : 1, 'lessons.title' :  1}, 
			function(err, result) {
				if (err)
				{
					res.status(404).end();
					return;
				}

				res.json(result);
			});

		return;
	}

	res.status(400).end();
}

exports.updateCD = function(req, res, next) {
	var id = req.params.id;
	if (id) {
		var body = req.body;
		if (body)
		{
			CD.findOneAndUpdate({ '_id' : id }, { $set : body },
			function(err, result) {
				if (err)
				{
					res.status(404).end();
					return;
				}

				res.status(200).end();
			});

			return;
		}

		res.status(400).end();
		return;
	}
	res.status(400).end();
}