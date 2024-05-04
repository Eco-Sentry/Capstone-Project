import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const SensorInfo = ({ sentry, selectedSensor, showCopyButton }) => {
  
  const [sensorData, setSensorInfo] = useState([]);
  // console.log("Props received by SensorInfo:", { sentry, showCopyButton, sensorId });
  useEffect(() => {
    const fetchSensorInfo = async () => {
      try {
        const response = await axios.post(
          'http://202.65.64.38:8082/api/get-sentry-sensors',
          {
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcxNDgwNjI0OCwiZXhwIjoxNzE0ODQyMjQ4fQ.Wd3fMR-Pnfw2SEGYrxNw2NXnEIXH3zkUiNjFlJE44OA',
            sentryId: sentry.id
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
  
        console.log('Sensor information:', response.data);
        setSensorInfo(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };
      // console.log('SENSOR =============', sensorData);
      fetchSensorInfo();
  
  }, [sentry.id, selectedSensor]); // Include sensorId in the dependency array  

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
      <div className="sentry-info-box">
        <div id="revealToken">
          <div style={{ textAlign: 'left', padding: '20px', marginTop: '-85px', marginLeft: '-4px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Token: </span>

              <input
                style={{ width: '150px', height: '20px', backgroundColor: '#B0DCC7', color: '#103438', border: '0' }}
                type="text"
                value={selectedSensor ? selectedSensor.id : 'No Sensor Selected'}
                readOnly
              />&nbsp;
              <button className="copy-button" style={{ width: '15%' }} data-clipboard-text={selectedSensor ? selectedSensor.id : ''}>
                {showCopyButton ? 'Copied!' : 'Click to Copy'}
              </button>
          </div>
        </div>
      </div>

      <div id="sensorInfoContent">
        Graph goes here
      </div>
      <button className="sentry-details-create" style={{ display: 'initial', width: '15%' }} onClick={handleDownloadPDF}>
        Download as PDF
      </button>
    </div>
  );
};

export default SensorInfo;