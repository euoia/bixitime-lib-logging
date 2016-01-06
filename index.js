var winston = require('winston'),
	MysqlTransport = require('./MysqlTransport.js');

exports.configureWinston = function (mysqlConnection, level) {
	if (level === undefined) {
		level = 'debug';
	}

	/**
	 * Add a mysql transport for Winston logs.
	 */
	winston.add(MysqlTransport, {
		table: 'log',
		connection: mysqlConnection,
		level: level
	});

	winston.remove(winston.transports.Console);
	winston.add(winston.transports.Console, {timestamp: true});
};
