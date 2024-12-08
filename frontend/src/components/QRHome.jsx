import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QRHome.css';

const QRHome = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vehicle data when the component mounts or when the id changes
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`https://park-alert.onrender.com/api/vehicles/${id}`);
        setVehicle(response.data.data); // Store the vehicle data
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch vehicle data');
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const handleCall = () => {
    window.location.href = `tel:${vehicle.phone}`; // Opens the call app with the phone number
  };

  const handleSMS = () => {
    window.location.href = `sms:${vehicle.phone}?body=Hello, I need assistance regarding the vehicle.`; // Opens the SMS app with pre-filled text
  };

  return (
    <div className="vehicle-container">
      <h1>Vehicle Details</h1>
      {vehicle ? (
        <div className="vehicle-details">
          <p><strong>Owner:</strong> {vehicle.owner}</p>
          <p><strong>Phone:</strong> {vehicle.phone}</p>
          <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>

          <div className="contact-buttons">
            <button onClick={handleCall} className="call-btn">Call</button>
            <button onClick={handleSMS} className="sms-btn"> SMS</button>
          </div>
        </div>
      ) : (
        <p>No vehicle data found.</p>
      )}
    </div>
  );
};

export default QRHome;
