const mongoose = require('mongoose');

// Define the schema
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

// Define the model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Function to add a new vehicle
async function addVehicle(owner, phone, licensePlate) {
  try {
    const newVehicle = new Vehicle({
      owner,
      phone,
      licensePlate
    });

    // Save the vehicle to the database
    const savedVehicle = await newVehicle.save();
    console.log('Vehicle saved:', savedVehicle);
  } catch (error) {
    console.error('Error saving vehicle:', error);
    if (error.name === 'ValidationError') {
      // Handle validation errors here
      console.error('Validation errors:', error.errors);
    }
  }
}

// Usage
addVehicle('John Doe', '1234567890', 'ABC123');
