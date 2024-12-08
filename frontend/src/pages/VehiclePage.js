import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VehiclePage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/vehicles/${id}`)
      .then((response) => setVehicle(response.data.data))
      .catch((err) => setError('Vehicle not found'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!vehicle) return <p>Loading...</p>;

  return (
    <div>
      <h1>Vehicle Information</h1>
      <p><strong>Owner:</strong> {vehicle.owner}</p>
      <p><strong>Phone:</strong> {vehicle.phone}</p>
      <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
      <a href={`tel:${vehicle.phone}`}>Call Owner</a> | <a href={`sms:${vehicle.phone}`}>Send SMS</a>
    </div>
  );
};

export default VehiclePage;
