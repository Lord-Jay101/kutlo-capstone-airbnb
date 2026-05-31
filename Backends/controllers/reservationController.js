const Reservation = require("../models/Reservation");
const Accommodation = require("../models/Accommodation");

exports.createReservation = async (req, res) => {
  try {
    const { accommodation_id, startDate, endDate, guests } = req.body;

    const accommodation = await Accommodation.findById(accommodation_id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    if (guests > accommodation.guests) {
      return res.status(400).json({
        message: "Too many guests for this accommodation",
      });
    }

    // DOUBLE BOOKING CHECK
    const existingReservation = await Reservation.findOne({
      accommodation_id,
      status: { $ne: "cancelled" },
      startDate: { $lt: end },
      endDate: { $gt: start },
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "This accommodation is already booked for selected dates",
      });
    }

    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    let totalPrice = accommodation.price * nights;

    totalPrice += accommodation.cleaningFee;
    totalPrice += accommodation.serviceFee;
    totalPrice += accommodation.occupancyTaxes;

    if (nights >= 7) {
      totalPrice -= accommodation.weeklyDiscount;
    }

    if (totalPrice < 0) totalPrice = 0;

    const reservation = await Reservation.create({
      user_id: req.user.id,
      host_id: accommodation.host_id,
      accommodation_id,
      startDate,
      endDate,
      guests,
      totalPrice,
      status: "confirmed",
    });

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user_id: req.user.id })
      .populate("accommodation_id", "title location type")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHostReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ host_id: req.user.id })
      .populate("accommodation_id", "title location type")
      .populate("user_id", "username")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (
      reservation.user_id.toString() !== req.user.id &&
      reservation.host_id.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};