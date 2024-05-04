import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const CreateSentry = ({ showCopyButton }) => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [sentryId, setSentryId] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCreateClick = async () => {
    if (!longitude.trim() || !latitude.trim()) {
      toast.error('Please fill out all required fields (Longitude, Latitude).');
      return;
    }

    // Check if longitude and latitude are numeric
    if (isNaN(parseFloat(longitude))) {
      toast.error('Longitude must be a numeric value).');
      return;
    }

    if (isNaN(parseFloat(latitude))) {
      toast.error('Latitude must be a numeric value');
      return;
    }

    try {
      // Make a POST request to register the sentry
      const response = await axios.post(
        'http://202.65.64.38:8082/api/register-sentry',
        {
          userToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcxNDgwNjI0OCwiZXhwIjoxNzE0ODQyMjQ4fQ.Wd3fMR-Pnfw2SEGYrxNw2NXnEIXH3zkUiNjFlJE44OA",
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude)
        }
      );
  
      console.log('Response from API:', response.data); // Check the structure of response data
  
      // Extract sentry ID from the response
      const sentryId = response.data; // Adjust the extraction based on the response structure
  
      console.log('SENTRY TOKEN', sentryId); // Log the extracted sentry ID
  
      // Update the state with the received sentry ID
      setSentryId(sentryId);
  
      // Open the popup
      setIsPopupOpen(true);
  
      // Handle success
      toast.success('Sentry created successfully!');
      
    } catch (error) {
      // Handle error
      console.error('Error creating sentry:', error);
      toast.error('Failed to create sentry. Please try again.');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="create-sentry">
      <div className="inputs-container">
        <input
          className="createSentryTextBoxes"
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
        <input
          className="createSentryTextBoxes"
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />

        <button className="sentry-details-create" style={{ width: '50%' }} onClick={handleCreateClick}>
          Create
        </button>
      </div>
      {isPopupOpen && (
        <div className="tokenDiv">
          <p>
            <b style={{ color: '#103438' }}>Sentry ID</b> <br />
            <input className="tokenCode" id="token" type="text" value={sentryId} readOnly /> &nbsp;
            <br />
            <button className="copy-button" data-clipboard-text={sentryId}>
              {showCopyButton ? 'Copied!' : 'Click to Copy'}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateSentry;