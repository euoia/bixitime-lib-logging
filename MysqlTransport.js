var winston = require('winston'),
	util = require('util'),
	check = require('check-types');

var Mysql = module.exports = function(options) {
	check.assert.object(options);
	check.assert.object(options.connection);
	check.assert.string(options.table);

	this.connection = options.connection;
	this.table = options.table;
	this.level = options.level;
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Mysql, winston.Transport);

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//
Mysql.prototype.log = function(level, msg, meta, callback) {
	var log = {
		message : msg,
		level : level
	};

	this.connection.query(
		'INSERT INTO '+ this.table + ' SET ?',
		log,
		function(err, rows, fields) {
			/* jshint unused: false */
			if(err) {
				console.log('Got an error: ' + err);
				return callback(err);
			}

			callback(null, true);
		}
	);
};

