const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');

dotenv.config(); // Ensure this is at the top

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/vehicles', vehicleRoutes);

mongoose
  .connect(process.env.MONGO_URI,)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error('MongoDB connection error:', err));
