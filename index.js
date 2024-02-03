const app = require('./src/app');
require('dotenv').config();
const colors = require('colors');
const morgan = require('morgan');
const bdConnection = require('./db');

app.use(morgan('dev'));

const port = process.env.PORT || 4400;

app.listen(port, async () => {
	const a = await bdConnection();
	console.log(a.connection.host.red);
	console.log('DB connection established'.red.bgWhite);
	console.log(`Server listening on ${port}`.bgGreen.black);
});
