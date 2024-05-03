import React, { useState, useEffect } from 'react';
import UptimeGraph from './components/UptimeGraph'; 
import ConnectionGraph from './components/ConnectionGraph';
import axios from 'axios';

const SentryInfo = ({ sentry, showCopyButton, handleViewButtonClickSensorInfo, handleAddSensor }) => {
  const [sensorData, setSensorData] = useState([]);
  // console.log('Sentry Info:', sentry);
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.post(
          'http://202.65.64.38:8082/api/get-sentry-sensors',
          {
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcxNDcxMjY5NSwiZXhwIjoxNzE0NzQ4Njk1fQ.E73DPIvd2i9X8M-rZ3kxsdGgPBuTcslgohvQ3WsCOfg',
            sentryId: sentry.id
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        // console.log('Sensor Data:', response.data); // Log the response data
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };    
  
    fetchSensorData();
  }, [sentry.id]);  

  // console.log('Sentry ID:', sentry ? sentry.id : 'No sentry information available');
  // console.log('Sentry Info:', sentry);
  // console.log('Sensor Data:', sensorData);
  
  return (
    <div className="sentry-info-box">
      <div id="revealToken">
        <div style={{ textAlign: 'left', padding: '20px', marginTop: '-85px', marginLeft: '-4px' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Token: </span>
          <input style={{ width: '150px', height: '20px', backgroundColor: '#B0DCC7', color: '#103438', border: '0' }} id="token" type="text" value={sentry.id} /> &nbsp;
          <button className="copy-button" style={{ width: '15%' }} data-clipboard-text={sentry.id}>
            {showCopyButton ? 'Copied!' : 'Click to Copy'}
          </button>
        </div>
      </div>

      <br />
      {/* here */}
      
      <div style={{backgroundColor: '#FFF3E4', padding: '3%'}}>
      <button class= "mySent-view-button" onClick={handleAddSensor} style={{ marginLeft: '90%', width: '10%'}}>Add Sensor</button>
      
      <div style={{ backgroundColor: 'white' }}>
        {/* <h4>Sensor Info</h4> */}
        <table className="sensorTable">
          <thead>
            <tr>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Sensor Name</th>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>description</th>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Status</th>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map(sensor => (
              <tr key={sensor.id}>
                <td>{sensor.sensorType.sensorType}</td>
                <td>{sensor.sensorType.description}</td>
                <td>
                  <span className={`sensorStatus ${sensor.sensorType.activated ? 'connected' : 'error'}`}>
                    {sensor.sensorType.activated ? 'Connected' : 'Error'}
                  </span>
                </td>
                <td>
                  <button className="mySent-view-button" onClick={() => handleViewButtonClickSensorInfo(sensor)}>  
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>



    </div>
  );
};

export default SentryInfo;