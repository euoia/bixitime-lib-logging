var winston = require('winston'),
	MysqlTransport = require('./MysqlTransport.js');

exports.configureWinston = function (mysqlConnection) {
	/**
	 * Add a mysql transport for Winston logs.
	 */
	winston.add(MysqlTransport, {
		table: 'log',
		connection: mysqlConnection,
		level: 'debug'
	});

	winston.remove(winston.transports.Console);
	winston.add(winston.transports.Console, {timestamp: true});
};
