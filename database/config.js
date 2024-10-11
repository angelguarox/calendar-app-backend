const mongoose = require('mongoose');

async function dbConection() {
	try {
		await mongoose.connect(process.env.DB_CNN);
		console.log('Database is running, too');
	} catch (error) {
		console.error(error);
		throw new Error('Error initializing database');
	}
}

module.exports = { dbConection };
