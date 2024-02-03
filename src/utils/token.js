const jwt = require('jsonwebtoken');
require('dotenv').config();
//JWT secret key
const secret = process.env.ACCESS_TOKEN_SECRET;

//create token
const jwtToken = (payload) => {
	const token = jwt.sign(payload, secret, {
		expiresIn: '1h',
		algorithm: 'HS256',
	});
	return token;
};

//verify token
const decoded = (token) => {
	const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });	
	return decoded;
};


module.exports = {
	jwtToken,
	decoded,
};
