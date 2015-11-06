'use strict';

/* Settings file for Application */

module.exports = {
	environment : 'local',
	db : {
		hostname : '127.0.0.1',
		name : 'ircexpenses',
		username : '',
		password : '',
		replicaSet: '',
		connectionTimeout : 4000
	},
	port: 3000
};