
const connection = require('mongoose').connection;
const state = require('mongoose/lib/connectionstate');

const onOpen = fn => {
	if ( connection.readyState === state.connected ) return fn();
	else {
		return new Promise((resolve, reject) => {
			connection.once('open', () => fn().then(resolve, reject));
		});
	}
};

module.exports = {
	drop() {
		return () => {
			onOpen(() => connection.dropDatabase());
		};
	}
};