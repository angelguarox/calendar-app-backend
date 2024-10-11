const { Router } = require('express');
const { checkCreateEventFields } = require('../middlewares/events');
const { fieldsValidation } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');
const {
	getEvents,
	getEvent,
	createEvent,
	updateEvent,
	deleteEvent,
} = require('../controllers/events');

const router = Router();

router.use(validateJwt);

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', checkCreateEventFields, fieldsValidation, createEvent);
router.put('/:id', checkCreateEventFields, fieldsValidation, updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
