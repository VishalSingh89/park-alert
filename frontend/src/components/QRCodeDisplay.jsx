import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import './QRCodeDisplay.css'; // Import CSS file for styling

const QRCodeDisplay = () => {
  const qrRef = useRef(null); // Create a ref to access the QR code element
  const qrData = localStorage.getItem('qrData');

  // Function to download the QR code as PNG with a theme
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

        // Set canvas dimensions larger than the image to accommodate the theme
        const canvasSize = 300; // Set a fixed size for the canvas
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // Add a background theme
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1e3c72'); // Background gradient start color
        gradient.addColorStop(1, '#2a5298'); // Background gradient end color
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Add "ParkAlert" text at the top of the canvas
        context.font = '20px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.fillText('ParkAlert', canvas.width / 2, 30);

        // Draw the QR code image on the canvas
        const imgX = (canvas.width - img.width) / 2; // Center the QR code horizontally
        const imgY = (canvas.height - img.height) / 2 + 20; // Center the QR code vertically with offset
        context.drawImage(img, imgX, imgY, img.width, img.height);

        // Convert the canvas to a PNG data URL
        const pngUrl = canvas.toDataURL('image/png');

        // Create a link to trigger the download
        const link = document.createElement('a');
        link.href = pngUrl; // Set the PNG URL as the link's href
        link.download = 'qr-code-themed.png'; // Set the download filename
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
