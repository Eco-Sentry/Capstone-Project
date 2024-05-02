import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ClipboardJS from 'clipboard';

const SensorInfo = ({ token, showCopyButton }) => {

  const handleDownloadPDF = () => {
    const element = document.getElementById('sensorInfoContent');

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('sensor_info.pdf');
    });
  };

  return (
    <div>
      <div id="revealToken">
        <div style={{ textAlign: 'left', padding: '20px', marginTop: '-85px', marginLeft: '-4px' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Reveal Token: </span>
          <input style={{ width: '150px', height: '20px', backgroundColor: '#B0DCC7', color: '#103438', border: '0' }} id="token" type="text" value={token} /> &nbsp;
          <button className="copy-button" style={{ width: '15%' }} data-clipboard-text={token}>
            {showCopyButton ? 'Copied!' : 'Click to Copy'}
          </button>
        </div>
      </div>

      <div id="sensorInfoContent">
        <h2>Sensor Information</h2>
        <p>Sample sensor information.</p>
        <p>More info and lines for testing...</p>
      </div>

      <button className="sentry-details-create" style={{ display: 'initial', width: '15%' }} onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
  );
};

export default SensorInfo;
