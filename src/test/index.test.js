const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const app = require('../app');

const mongoConnectionString = process.env.MONGO_TEST_CONNECTION_STRING;
const db_password = process.env.DB_USER_PASSWORD;

const ConnectionString = mongoConnectionString.replace(
	'<password>',
	db_password
);

/* Connecting to the database before each test. */
beforeEach(async () => {
	await mongoose.connect(ConnectionString);
});

/* Closing database connection after each test. */
afterEach(async () => {
	await mongoose.connection.close();
});

describe('GET /health', () => {
	test('should return json obj', () => {
		return request(app)
			.get('/health')
			.set('Content-Type', 'application/json')
			.expect(200)
			.then((res) => {
				expect(res.body).toEqual({
					health: 'ok',
					message: 'Application running well!',
				});
			});
	});
});

test('should return bearer token', async () => {
	await request(app)
		.post('/api/v1/auth/register')
		.send({
			name: 'hasib',
			email: 'hasib@gmail.com',
			password: '123456',
		})
		.expect(201)
		.then((res) => {
			console.log('res', res.body);
		});
}, 15000);

test('should return bearer token for login', async () => {
	await request(app)
		.post('/api/v1/auth/login')
		.type('application/json')
		.send({
			email: 'hasib@gmail.com',
			password: '123456',
		})
		.expect(200)
		.then((res) => {
			expect(res.body).toBeTruthy();
			console.log('response: ', res.body);
		});
}, 15000);

test('should create and return a note for a logged in user', async () => {
	await request(app)
		.post('/api/v1/notebook')
		.auth('', {
			type: 'bearer',
		})
		.send({
			title: 'first Note title by hasib',
			body: 'first note body by hasib',
			label: 'important',
		})
		.expect(201)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(201);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should return a note for a logged in user', async () => {
	await request(app)
		.get('/api/v1/notebook')
		.auth('', {
			type: 'bearer',
		})
		.expect(200)
		.then((res) => {
			console.log('response:'.bgGreen.black, res.body);
			expect(res.status).toBe(200);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should return a single note based on the provided ID', async () => {
	await request(app)
		.get('/api/v1/notebook/65bdd09524a58322c4e4a0f2')
		.auth('', {
			type: 'bearer',
		})
		.expect(200)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(200);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should return a single updated note based on the provided ID', async () => {
	await request(app)
		.put('/api/v1/notebook/65bdd09524a58322c4e4a0f2')
		.auth('', {
			type: 'bearer',
		})
		.send({ title: 'updated title', label: 'normal' })
		.expect(200)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(200);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should delete a single note based on the provided ID', async () => {
	await request(app)
		.delete('/api/v1/notebook/65bdd09524a58322c4e4a0f2')
		.auth('', {
			type: 'bearer',
		})
		.expect(204)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(204);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

/**
 * @description All Note related end-points are working properly and all testing are passed properly.
 * @description The user related end-points will test below
 */

test('should create a new user by Admin', async () => {
	await request(app)
		.post('/api/v1/users')
		.auth('', {
			type: 'bearer',
		})
		.set('Content-Type', 'application/json')
		.send({
			name: 'mamaun',
			email: 'mamaun@gmail.com',
			password: '123456',
			role: 'user',
		})
		.expect(201)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(201);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should return all users list by Admin', async () => {
	await request(app)
		.get('/api/v1/users')
		.auth('', {
			type: 'bearer',
		})
		.set('Content-Type', 'application/json')
		.expect(200)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(200);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should create a new user by Admin', async () => {
	await request(app)
		.get('/api/v1/users/65be3a8cbffe9e1b8e03c187')
		.auth('', {
			type: 'bearer',
		})
		.set('Content-Type', 'application/json')
		.expect(200)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(200);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should update user role by Admin', async () => {
	await request(app)
		.put('/api/v1/users/65be3a8cbffe9e1b8e03c187')
		.auth('', {
			type: 'bearer',
		})
		.set('Content-Type', 'application/json')
		.expect(200)
		.send({
			role: 'admin',
		})
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(200);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);

test('should create a new user by Admin', async () => {
	await request(app)
		.delete('/api/v1/users/65be3a8cbffe9e1b8e03c187')
		.auth('', {
			type: 'bearer',
		})
		.expect(204)
		.then((res) => {
			console.log('response:', res.body);
			expect(res.status).toBe(204);
		})
		.catch((err) => {
			console.log('error: ' + err);
		});
}, 15000);
