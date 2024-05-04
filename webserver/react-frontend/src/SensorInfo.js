import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';

const SensorInfo = ({ sentry, selectedSensor, showCopyButton }) => {
  
  const [sensorData, setSensorInfo] = useState([]);
  
  const getCurrentDateAndTime = () => {
    const today = new Date();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Ensure two digits for month
    const year = today.getFullYear();
    const date = ('0' + today.getDate()).slice(-2); // Ensure two digits for day
    const hours = ('0' + today.getHours()).slice(-2); // Ensure two digits for hours
    const minutes = ('0' + today.getMinutes()).slice(-2); // Ensure two digits for minutes
    return `${year}-${month}-${date}T${hours}:${minutes}`;
  };

  const [selectedDateTime, setSelectedDateTime] = useState(getCurrentDateAndTime());
  // console.log("DATE aND TIME", getCurrentDateAndTime())

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

    fetchSensorInfo();
  
  }, [sentry.id, selectedSensor]); 

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
      Date Time: &nbsp;
      <input
        type="datetime-local"
        id="date-time"
        name="sensor-dateTime-graph"
        value={selectedDateTime}
        min="2024-04-05T00:00"
        max={getCurrentDateAndTime()} 
        onChange={(e) => setSelectedDateTime(e.target.value)} />
      <br/>
        Graph goes here
        <iframe src="http://202.65.64.38:5000/generate-interactive-graph" style= {{width: '100%', height: '600px', border: 'none'}}></iframe>
      </div>
      <button className="sentry-details-create" style={{ display: 'initial', width: '15%' }} onClick={handleDownloadPDF}>
        Download as PDF
      </button>
    </div>
  );
};

export default SensorInfo; 