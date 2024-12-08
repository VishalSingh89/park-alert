import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './VehiclePage.css'; // Import the CSS file

const VehiclePage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://park-alert.onrender.com/${id}`)
      .then((response) => setVehicle(response.data.data))
      .catch((err) => setError('Vehicle not found'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!vehicle) return <p>Loading...</p>;

  return (
    <div className="vehicle-container">
      <h1>Vehicle Information</h1>
      <p><strong>Owner:</strong> {vehicle.owner}</p>
      <p><strong>Phone:</strong> {vehicle.phone}</p>
      <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
      <div className="button-container">
        <a href={`tel:${vehicle.phone}`} className="button">Call Owner</a>
        <a href={`sms:${vehicle.phone}`} className="button">SMS</a>
      </div>
    </div>
  );
};

export default VehiclePage;
