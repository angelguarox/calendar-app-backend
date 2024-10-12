require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const eventsRouter = require('./routes/events');
const { dbConection } = require('./database/config');

const app = express();
dbConection();

const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
	console.log(`Server is running at port: ${port}`);
});
