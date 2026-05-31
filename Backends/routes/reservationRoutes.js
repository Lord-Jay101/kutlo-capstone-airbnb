const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');
const protect = require('../middleware/auth');

router.post('/', protect, controller.createReservation);
router.get('/user', protect, controller.getUserReservations);
router.get('/host', protect, controller.getHostReservations);
router.delete('/:id', protect, controller.deleteReservation);

module.exports = router;