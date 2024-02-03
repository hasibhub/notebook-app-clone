const router = require('express').Router();
//Authentication Controller
const { register, login } = require('../apis/v1/auth/controllers/index');
//Import Middlewares
const { authentication } = require('./../middlewares/authentication');
const { authorization } = require('./../middlewares/authorization');

//Notes Controllers
const {
	create,
	allNoteByOwner,
	getSingleNote,
	update,
	deleteByOwner,
} = require('./../apis/v1/note/index');

//User controllers
const {
	create: createUser,
	getAllUser,
	getSingle,
	updateByAdmin,
	deleteUser,
} = require('./../apis/v1/user/index');

//Authentication routes
router.route('/auth/register').post(register);
router.route('/auth/login').post(login);

//Notes routes
router
	.route('/notebook')
	.post(authentication, create)
	.get(authentication, allNoteByOwner);
router
	.route('/notebook/:id')
	.get(authentication, getSingleNote)
	.put(authentication, update)
	.delete(authentication, deleteByOwner);

//Users routes
router
	.route('/users')
	.post(authentication, authorization(['admin']), createUser)
	.get(authentication, authorization(['admin']), getAllUser);
router
	.route('/users/:id')
	.get(authentication, authorization(['admin']), getSingle)
	.put(authentication, authorization(['admin']), updateByAdmin)
	.delete(authentication, authorization(['admin']), deleteUser);

module.exports = router;
