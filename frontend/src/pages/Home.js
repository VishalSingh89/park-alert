import React from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';

const Home = () => {
  return (
    <div>
      <h1>Welcome to ParkAlert</h1>
      <QRCodeGenerator />
    </div>
  );
};

export default Home;
