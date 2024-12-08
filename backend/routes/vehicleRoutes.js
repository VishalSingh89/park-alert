const express = require('express');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

// Add a new vehicle
router.post('/', async (req, res) => {
  const { owner, phone, licensePlate } = req.body;
  try {
    const vehicle = new Vehicle({ owner, phone, licensePlate });
    const savedVehicle = await vehicle.save();
    res.status(201).json({ success: true, data: savedVehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving vehicle data', error: error.message });
  }
});

// Get a vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    res.json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving vehicle', error: error.message });
  }
});

module.exports = router;
