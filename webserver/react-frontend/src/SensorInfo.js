import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SensorInfo = () => {
// const SensorInfo = ({ sensorName }) => {
  const handleDownloadPDF = () => {
    const element = document.getElementById('sensorInfoContent');

    // Usingg html2canvas to get the content of the div
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Adding the image to the  PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add a new  page if it exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      pdf.save('sensor_info.pdf');
    //   pdf.save(`${sensorName}_info.pdf`);
    });
  };

  return (
    <div>
      <div id="sensorInfoContent">
        <h2>Sensor Information</h2>
        <p>Sample sensor information.</p>
        <p>More info and lines for testing...</p>
      </div>

      <button className="sentry-details-create" style={{display: 'initial', width: '15%'}} onClick={handleDownloadPDF}>Download as PDF</button>
    </div>
  );
};

export default SensorInfo;
