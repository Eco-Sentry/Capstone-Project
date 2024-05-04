import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const AddSensorPopup = ({ isOpen, onRequestClose, onAddSensor, sensorTypes, selectedSensorType, setSelectedSensorType }) => {
  const defaultDescription = 'temperature in c'; // Default description
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (sensorTypes.length > 0) {
      setDescription(sensorTypes[0].description); // Initialize description with the description of the first sensor type
    }
  }, [sensorTypes]);

  const handleAddSensor = () => {
    // Check if the selected sensor type is still the default option
    if (selectedSensorType === '') {
      // Display toastify error message
      toast.error('You must choose a sensor type.');
      return;
    }

    // Call the parent component's callback function with the selected sensor type and description
    onAddSensor(selectedSensorType, description);
    // Close the modal
    onRequestClose();
  };

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setSelectedSensorType(selectedType); // Update selected sensor type
    if (selectedType === '') {
      setDescription(defaultDescription); // Set description to default if default option is selected
    } else {
      const selectedSensor = sensorTypes.find(sensor => sensor.id === selectedType);
      setDescription(selectedSensor.description); // Update description based on selected sensor type
    }
  };

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="add-sensor-modal"
      overlayClassName="add-sensor-modal-overlay"
    >
      <div className="add-sensor-popup">
        <h2>Add Sensor</h2>
        <select value={selectedSensorType} onChange={handleSelectChange}>
          <option value="">Select a Sensor Type</option>
          {sensorTypes.map(sensor => (
            <option key={sensor.id} value={sensor.id}>{sensor.sensorType}</option>
          ))}
        </select>
        <textarea
          placeholder="Enter description"
          value={description === '' ? defaultDescription : description}
          onChange={(e) => setDescription(e.target.value)}
          disabled
        ></textarea>
        <button onClick={handleAddSensor}>Add Sensor</button>
      </div>
    </Modal>
  );
};

export default AddSensorPopup;