import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QRCodeGenerator.css'; // Import the CSS file

const QRCodeGenerator = () => {
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/vehicles', { owner, phone, licensePlate });
      const qrData = `${window.location.origin}/vehicle/${data.data._id}`;
      // Save QR data to localStorage or pass via route
      localStorage.setItem('qrData', qrData);
      navigate('/qrcode');
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Generate QR Code</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
        <input
          type="text"
          className="input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          className="input"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
        />
        <button type="submit" className="button">Generate QR Code</button>
      </form>
    </div>
  );
};

export default QRCodeGenerator;
