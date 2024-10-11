const { check } = require('express-validator');

const checkCreateUserFields = [
	check('name', 'The name field is required').not().isEmpty(),
	check('email', 'The email field is required').isEmail(),
	check(
		'password',
		'The password field must contain at least 6 characters',
	).isLength({ min: 6 }),
];

const checkLoginUserFields = [
	check('email', 'The email field is required').isEmail(),
	check(
		'password',
		'The password field must contain at least 6 characters',
	).isLength({ min: 6 }),
];

module.exports = {
	checkCreateUserFields,
	checkLoginUserFields,
};
