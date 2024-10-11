const jwt = require('jsonwebtoken');

function generateJWT(id, name) {
	return new Promise((resolve, reject) => {
		const payload = { id, name };
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: '2h',
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject('Token could not be generated');
				}
				resolve(token);
			},
		);
	});
}

module.exports = { generateJWT };
