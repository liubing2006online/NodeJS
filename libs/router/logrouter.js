var express = require('express');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var UserLog = require(libs + 'model/log');

router.get('/', function(req, res) {
	
	UserLog.find(function (err, logItems) {
		if (!err) {
			return res.json(logItems);
		} else {
			res.statusCode = 500;
			
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

router.post('/', function(req, res) {
	
	var logItem = new UserLog({
		UserID: req.body.UserID,
		LogType: req.body.LogType,
		logDetails: req.body.logDetails,
		AddTime: req.body.AddTime
	});

	logItem.save(function (err) {
		if (!err) {
			log.info("New LogItem created with user id: %s", logItem.UserID);
			return res.json({ 
				status: 'OK', 
				article:logItem 
			});
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.json({ 
					error: 'Validation error' 
				});
			} else {
				res.statusCode = 500;
				
				log.error('Internal error(%d): %s', res.statusCode, err.message);
				
				res.json({ 
					error: 'Server error' 
				});
			}
		}
	});
});

router.get('/:id', function(req, res) {
	
	UserLog.findById(req.params.id, function (err, article) {
		
		if(!article) {
			res.statusCode = 404;
			
			return res.json({ 
				error: 'Not found' 
			});
		}
		
		if (!err) {
			return res.json({ 
				status: 'OK', 
				article:article 
			});
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

module.exports = router;
