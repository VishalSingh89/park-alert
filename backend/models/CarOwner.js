const mongoose = require("mongoose");

const carOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("CarOwner", carOwnerSchema);
