import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSensorPopup from './AddSensorPopup'; 
import { toast } from 'react-toastify';
import trashIcon from './trash.png';
import Modal from 'react-modal';

const SentryInfo = ({ sentry, showCopyButton, handleViewButtonClickSensorInfo }) => {
  const [sensorData, setSensorData] = useState([]);
  const [isAddSensorPopupOpen, setIsAddSensorPopupOpen] = useState(false);
  const [sensorTypes, setSensorTypes] = useState([]); // State to store sensor types from the API response
  const [selectedSensorType, setSelectedSensorType] = useState(''); // State to store the selected sensor type
  const [description, setDescription] = useState(''); // State to store the description of the sensor
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchSensorTypes = async () => {
      try {
        const response = await axios.get('http://202.65.64.38:8082/api/get-sensor-types');
        setSensorTypes(response.data);
      } catch (error) {
        console.error('Error fetching sensor types:', error);
      }
    };

    fetchSensorTypes();
  }, []);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.post(
          'http://202.65.64.38:8082/api/get-sentry-sensors',
          {
            token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNrLnRvb2xlQGdtYWlsLmNvbSIsImlhdCI6MTcxNDkwOTc2NiwiZXhwIjoxNzE0OTQ1NzY2fQ.KNMpCN7_Ck02lC_hI3_6jJb0v_dj1wZTKnkLTsEC2gk',
            sentryId: sentry.id
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData();
  }, [sentry.id]);

  const toggleAddSensorPopup = () => {
    setIsAddSensorPopupOpen(!isAddSensorPopupOpen);
  };

  const handleAddSensor = async () => {
    try {
      // console.log('Selected Sensor Type:', selectedSensorType);
      const response = await axios.post('http://202.65.64.38:8082/api/register-sensor', {
        userToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNrLnRvb2xlQGdtYWlsLmNvbSIsImlhdCI6MTcxNDkwOTc2NiwiZXhwIjoxNzE0OTQ1NzY2fQ.KNMpCN7_Ck02lC_hI3_6jJb0v_dj1wZTKnkLTsEC2gk',
        sensorTypeId: selectedSensorType,
        sentryId: sentry.id
      });

      // Update sensor data after adding a new sensor
      setSensorData([...sensorData, response.data]);
      // Close the add sensor popup
      setIsAddSensorPopupOpen(false);
      toast.success('Sensor added successfully! Please refresh the page.');
    } catch (error) {
      console.error('Error adding sensor:', error);
      toast.error('Failed to add sensor. Please try again.');
    }
  };

  const handleDeleteConfirmation = (sensor) => {
    setSelectedSensor(sensor);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteSensor = async () => {
    try {
      // Define the JWT token
      const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNrLnRvb2xlQGdtYWlsLmNvbSIsImlhdCI6MTcxNDkwOTc2NiwiZXhwIjoxNzE0OTQ1NzY2fQ.KNMpCN7_Ck02lC_hI3_6jJb0v_dj1wZTKnkLTsEC2gk";
      
      // Make a POST request to delete the sensor
      const response = await axios.post(
        'http://202.65.64.38:8082/api/delete-sensor',
        {
          token: token,
          objId: selectedSensor.id // Assuming sensor id is used as objId
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set content type as application/json
          },
        }
      );
  
      console.log('Response from delete sensor API:', response.data); // Log the response data
      // If the delete operation is successful, you can update the UI accordingly
  
      // Remove the deleted sensor from the sensorData state
      setSensorData(sensorData.filter(sensor => sensor.id !== selectedSensor.id));
  
      // Close the confirmation modal
      setIsDeleteConfirmationOpen(false);
      
      // Show success message
      toast.success('Sensor deleted successfully!');
    } catch (error) {
      console.error('Error deleting sensor:', error);
      // Handle error, display a message to the user, etc.
      toast.error('Failed to delete sensor. Please try again.');
    }
  };  



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

      <div style={{ backgroundColor: '#FFF3E4', padding: '3%' }}>
        <button className="mySent-view-button" onClick={toggleAddSensorPopup} style={{ marginLeft: '90%', width: '10%' }}>Add Sensor</button>

        <div style={{ backgroundColor: 'white' }}>
          <table className="sensorTable">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>Sensor Name</th>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>Description</th>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>Status</th>
                <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.length === 0 ? (
                <tr>
                  <td colSpan="4">No Sensors</td>
                </tr>
              ) : (
                sensorData.map(sensor => (
                  <tr key={sensor.id}>
                    <td>{sensor.sensorType?.sensorType || 'N/A'}</td>
                    <td>{sensor.sensorType?.description || 'N/A'}</td>
                    <td>
                      <span className={`sensorStatus ${sensor.sensorType?.activated ? 'connected' : 'error'}`}>
                        {sensor.sensorType?.activated ? 'Connected' : 'Error'}
                      </span>
                    </td>
                    <td style={{ display: 'inline-flex' }}>
                      <button className="mySent-view-button" style={{ width: '100%' }} onClick={() => handleViewButtonClickSensorInfo(sensor)}>
                        View
                      </button>
                      <button className="mySent-delete-button" onClick={() => handleDeleteConfirmation(sensor)}>
                        <img src={trashIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                    </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            
              <Modal
                isOpen={isDeleteConfirmationOpen}
                onRequestClose={() => setIsDeleteConfirmationOpen(false)}
                className="add-sensor-modal"
                overlayClassName="add-sensor-modal-overlay"
              >
                <div className="add-sensor-popup">
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to delete this sensor?</p>
                      <button onClick={handleDeleteSensor}>Yes</button>
                      <button onClick={() => setIsDeleteConfirmationOpen(false)}>No</button>
              </div>
            </Modal>
          </table>
        </div>
      </div>

      {/* Render the AddSensorPopup component conditionally */}
      {isAddSensorPopupOpen && (
        <AddSensorPopup
        isOpen={isAddSensorPopupOpen}
        sensorTypes={sensorTypes}
        selectedSensorType={selectedSensorType}
        setSelectedSensorType={setSelectedSensorType}
        description={description}
        setDescription={setDescription}
        onAddSensor={handleAddSensor}
        onRequestClose={toggleAddSensorPopup}  // or a different close function
      />      
      )}

    </div>
  );
};

export default SentryInfo;