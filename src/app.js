const express = require('express');
const applyMiddleware = require('./middlewares/index');
const router = require('../src/routes/index');
const app = express();

applyMiddleware(app);

app.use('/api/v1', router);

app.get('/health', (req, res) => {
	res.status(200).json({
		health: 'ok',
		message: 'Application running well!',
	});
});

//Global Error Handler
app.use((err, _req, res, _next) => {
	// format error
	res.status(err.code || 500).json({
		message: err.message,
		code: err.code || 500,
	});
});
module.exports = app;
