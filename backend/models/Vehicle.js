const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  owner: { type: String, required: true, trim: true },
  phone: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v); // Ensure phone number is 10 digits
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  licensePlate: { type: String, required: true, trim: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
