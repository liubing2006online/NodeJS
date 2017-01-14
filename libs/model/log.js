var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserLog = new Schema({
	UserID: { type: Number, required: true },
	LogType: { type: String, required: true },
	logDetails: { type: String, required: true },
	AddTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserLog', UserLog);