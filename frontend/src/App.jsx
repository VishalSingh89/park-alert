import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRCodeGenerator from './components/QRCodeGenerator';
import QRCodeDisplay from './components/QRCodeDisplay';
import QRHome from './components/QRHome';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator />} />
        <Route path="/qrcode" element={<QRCodeDisplay />} />
        <Route path='/vehicle/:id' element={<QRHome />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
