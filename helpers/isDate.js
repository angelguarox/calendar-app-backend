const moment = require('moment');

function isDate(value, { req, location, path }) {
	if (!value) return false;

	const date = moment(value);

	if (date.isValid()) return true;
}

module.exports = { isDate };
