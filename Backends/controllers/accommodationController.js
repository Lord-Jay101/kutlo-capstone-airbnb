const Accommodation = require("../models/Accommodation");

// CREATE
exports.createAccommodation = async (req, res) => {
  try {
    const newAcc = await Accommodation.create({
      ...req.body,
      host_id: req.user.id,
    });

    res.status(201).json(newAcc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAccommodations = async (req, res) => {
  try {
    const listings = await Accommodation.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
exports.getAccommodationById = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json(accommodation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET HOST LISTINGS
exports.getHostAccommodations = async (req, res) => {
  try {
    const listings = await Accommodation.find({
      host_id: req.user.id,
    });

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (FIXED WITH AUTH CHECK)
exports.updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Not found" });
    }

    // ownership check
    if (accommodation.host_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE (FIXED WITH AUTH CHECK)
exports.deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Not found" });
    }

    // ownership check
    if (accommodation.host_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Accommodation.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};