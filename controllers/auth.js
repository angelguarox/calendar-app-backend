const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

async function loginUser(req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Incorrect username and password',
			});
		}

		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Incorrect username and password',
			});
		}

		const token = await generateJWT(user._id, user.name);

		res.status(200).json({
			ok: true,
			msg: 'User logged successfully',
			data: {
				id: user._id,
				name: user.name,
			},
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, review the data entered and contact your administrator',
		});
	}
}

async function createUser(req, res) {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'This email already exists',
			});
		}

		user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		const token = await generateJWT(user._id, user.name);

		res.status(201).json({
			ok: true,
			msg: 'User created successfully',
			data: {
				id: user._id,
				name: user.name,
			},
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, review the data entered and contact your administrator',
		});
	}
}

async function renewToken(req, res) {
	const { id, name } = req;

	const token = await generateJWT(id, name);

	res.json({
		ok: true,
		msg: 'Token was renewed',
		token,
	});
}

module.exports = {
	loginUser,
	createUser,
	renewToken,
};
