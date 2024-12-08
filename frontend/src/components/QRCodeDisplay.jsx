import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import './QRCodeDisplay.css'; // Import CSS file for styling

const QRCodeDisplay = () => {
  const qrRef = useRef(null); // Create a ref to access the QR code element
  const qrData = localStorage.getItem('qrData');

  // Function to download the QR code as PNG
  const downloadQRCode = () => {
    if (qrRef.current) {
      const svg = qrRef.current.querySelector('svg'); // Get the SVG element
      const xml = new XMLSerializer().serializeToString(svg); // Serialize the SVG to a string

      // Create a new image element to hold the SVG
      const img = new Image();
      const svgBlob = new Blob([xml], { type: 'image/svg+xml' }); // Create a Blob object
      const url = URL.createObjectURL(svgBlob); // Create a URL for the Blob
      img.src = url; // Set the image source to the Blob URL

      img.onload = () => {
        // Create a canvas and draw the SVG image onto the canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions equal to image dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image (SVG) on the canvas
        context.drawImage(img, 0, 0);
        
        // Convert the canvas to a PNG data URL
        const pngUrl = canvas.toDataURL('image/png');
        
        // Create a link to trigger the download
        const link = document.createElement('a');
        link.href = pngUrl; // Set the PNG URL as the link's href
        link.download = 'qr-code.png'; // Set the download filename
        link.click(); // Trigger the download
        
        // Clean up the object URL
        URL.revokeObjectURL(url);
      };
    }
  };

  return (
    <div className="qr-container">
      <h1 className="qr-title">Your QR Code</h1>
      {qrData ? (
        <div ref={qrRef}>
          <QRCode value={qrData} size={200} />
        </div>
      ) : (
        <p className="qr-error">Error: No QR data found. Please generate the QR code again.</p>
      )}
      <button onClick={downloadQRCode} className="download-btn">
        Download QR Code as PNG
      </button>
    </div>
  );
};

export default QRCodeDisplay;
