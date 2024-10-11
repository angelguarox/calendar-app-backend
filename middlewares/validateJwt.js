const jwt = require('jsonwebtoken');

function validateJwt(req, res, next) {
	const token = req.header('x-token');

	if (!token) {
		return res.stattus(401).json({
			ok: false,
			msg: 'Token is required',
		});
	}

	try {
		const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

		req.id = id;
		req.name = name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid token',
		});
	}

	next();
}

module.exports = { validateJwt };
