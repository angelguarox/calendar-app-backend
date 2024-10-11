const Event = require('../models/Event');

async function getEvents(req, res) {
	const events = await Event.find().populate('user', 'name');

	try {
		if (events.length === 0) {
			return res.status(404).json({
				ok: false,
				msg: 'No events stored',
				data: events,
				length: events.length,
			});
		}

		res.status(200).json({
			ok: true,
			msg: 'Successfully found events',
			data: events,
			length: events.length,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, review the data entered and contact your administrator',
		});
	}
}

async function getEvent(req, res) {
	const eventId = req.params.id;

	try {
		const eventFound = await Event.findById(eventId).populate('user', 'name');

		if (!eventFound) {
			return res.status(404).json({
				ok: false,
				msg: 'There is no event for that id',
				data: eventFound,
			});
		}

		res.status(200).json({
			ok: true,
			msg: 'Event found successfully',
			data: eventFound,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, review the data entered and contact your administrator',
		});
	}
}

async function createEvent(req, res) {
	const event = new Event(req.body);

	try {
		event.user = req.id;

		const savedEvent = await event.save();

		res.status(201).json({
			ok: true,
			msg: 'Event created successfully',
			data: savedEvent,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, review the data entered and contact your administrator',
		});
	}
}

async function updateEvent(req, res) {
	const eventId = req.params.id;
	const id = req.id;

	try {
		const eventFound = await Event.findById(eventId);

		if (!eventFound) {
			return res.status(404).json({
				ok: false,
				msg: 'There is no event for that id',
			});
		}

		if (eventFound.user.toString() !== id) {
			return res.status(401).json({
				ok: false,
				msg: 'Unauthorized',
			});
		}

		const newEvent = { ...req.body, user: id };

		const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
			new: true,
		});

		res.status(201).json({
			ok: true,
			msg: 'Event updated successfully',
			data: updatedEvent,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, review the data entered and contact your administrator',
		});
	}
}

async function deleteEvent(req, res) {
	const eventId = req.params.id;
	const id = req.id;

	try {
		const eventFound = await Event.findById(eventId);

		if (!eventFound) {
			return res.status(404).json({
				ok: false,
				msg: 'There is no event for that id',
			});
		}

		if (eventFound.user.toString() !== id) {
			return res.status(401).json({
				ok: false,
				msg: 'Unauthorized',
			});
		}

		await Event.findByIdAndDelete(eventId);

		res.status(202).json({
			ok: true,
			msg: 'Event deleted successfully',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: 'Please, review the data entered and contact your administrator',
		});
	}
}

module.exports = {
	getEvents,
	getEvent,
	createEvent,
	updateEvent,
	deleteEvent,
};
