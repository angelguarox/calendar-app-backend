const { Router } = require('express');
const {
	checkCreateUserFields,
	checkLoginUserFields,
} = require('../middlewares/auth');
const { fieldsValidation } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');
const { loginUser, createUser, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/', checkLoginUserFields, fieldsValidation, loginUser);
router.post('/new', checkCreateUserFields, fieldsValidation, createUser);
router.get('/renew', validateJwt, renewToken);

module.exports = router;
