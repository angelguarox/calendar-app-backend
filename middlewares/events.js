const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const checkCreateEventFields = [
	check('title', 'The title field is required').not().isEmpty(),
	check('start', 'The start field is required').custom(isDate),
	check('end', 'The end field is required').custom(isDate),
];

module.exports = {
	checkCreateEventFields,
};
