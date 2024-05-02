import React from 'react';
import UptimeGraph from './components/UptimeGraph'; 
import ConnectionGraph from './components/ConnectionGraph';

const SentryInfo = ({ token, showCopyButton, handleViewButtonClickSensorInfo, handleAddSensor }) => {
  return (
    <div className="sentry-info-box">
      <div id="revealToken">
        <div style={{ textAlign: 'left', padding: '20px', marginTop: '-85px', marginLeft: '-4px' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Reveal Token: </span>
          <input style={{ width: '150px', height: '20px', backgroundColor: '#B0DCC7', color: '#103438', border: '0' }} id="token" type="text" value={token} /> &nbsp;
          <button className="copy-button" style={{ width: '15%' }} data-clipboard-text={token}>
            {showCopyButton ? 'Copied!' : 'Click to Copy'}
          </button>
        </div>
      </div>

      <br />
      {/* here */}
      <div style={{backgroundColor: '#FFF3E4', padding: '3%'}}>
            
      <button class= "mySent-view-button" onClick={handleAddSensor} style={{ marginLeft: '90%', width: '10%'}}>Add Sensor</button>
      <div style={{ backgroundColor: 'white' }}>
        {/* Sensor table */}
        <table className="sensorTable">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Sensor Name</th>
                    {/* <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Channel</th> */}
                    <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Status</th>
                    <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Temperature</td>
                    {/* <td>Channel 1</td> */}
                    <td><span className="sensorStatus connected">Connected</span></td>
                    <td><button className="mySent-view-button" onClick={handleViewButtonClickSensorInfo}>View</button></td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    {/* <td>Channel 2</td> */}
                    <td><span className="sensorStatus error">Error</span></td>
                    <td><button className="mySent-view-button" onClick={handleViewButtonClickSensorInfo}>View</button></td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    {/* <td>Channel 3</td> */}
                    <td><span className="sensorStatus connected">Connected</span></td>
                    <td><button className="mySent-view-button" onClick={handleViewButtonClickSensorInfo}>View</button></td>
                  </tr>
                  <tr>
                    <td>Chemical</td>
                    {/* <td>Channel 4</td> */}
                    <td><span className="sensorStatus error">Error</span></td>
                    <td><button className="mySent-view-button" onClick={handleViewButtonClickSensorInfo}>View</button></td>
                  </tr>
                </tbody>
              </table>
      </div>
    </div>

            {/* <h4>Sentry Info</h4>
            <p>Name: {selectedSentry.name}</p>
            <p>Location: {selectedSentry.location}</p> */}
    </div>
  );
};

export default SentryInfo;