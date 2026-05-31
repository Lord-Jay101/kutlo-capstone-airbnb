const express = require('express');
const {
  createAccommodation,
  getAccommodations,
  getAccommodationById,
  getHostAccommodations,
  updateAccommodation,
  deleteAccommodation,
} = require('../../Backends/controllers/accommodationController');

const protect = require('../../Backends/middleware/auth');

const router = express.Router();

// PUBLIC ROUTES
router.get('/', getAccommodations);

// PROTECTED ROUTES (specific paths before /:id)
router.get('/host', protect, getHostAccommodations);
router.post('/', protect, createAccommodation);
router.get('/:id', getAccommodationById);
router.put('/:id', protect, updateAccommodation);
router.delete('/:id', protect, deleteAccommodation);

module.exports = router;