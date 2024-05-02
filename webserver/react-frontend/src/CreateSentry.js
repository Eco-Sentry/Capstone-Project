import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSentry = ({ token, showCopyButton, handleCreateSentry }) => {
  const [name, setName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  const handleCreateClick = () => {
    if (!name.trim() || !longitude.trim() || !latitude.trim()) {
    toast.error('Please fill out all required fields (Sentry Name, Longitude, Latitude).');
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
    

    // If all fields are filled, call the handleCreateSentry function
    handleCreateSentry();
  };

  return (
    <div className="create-sentry">
      <div className="inputs-container">
        <input
          className="createSentryTextBoxes"
          type="text"
          placeholder="Sentry Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        {/* <div className="access-options">
          <p style={{ color: '#103438' }}>Access:</p>
          <div className="radio-buttons">
            <input type="radio" id="public" name="sentryVisibility" value="public" />
            <label htmlFor="public" style={{ color: '#103438' }}>Public</label>

            <input type="radio" id="private" name="sentryVisibility" value="private" />
            <label htmlFor="private" style={{ color: '#103438' }}>Private</label>
          </div>
        </div> */}

        <button className="sentry-details-create" style={{ width: '50%' }} onClick={handleCreateClick}>
          Create
        </button>
      </div>
      <div>
        {token && (
          <div className="tokenDiv">
            <p>
              <b style={{ color: '#103438' }}>Token</b> <br />

              <input className="tokenCode" id="token" type="text" value={token} /> &nbsp;
              <br />
              <button className="copy-button" data-clipboard-text={token}>
                {showCopyButton ? 'Copied!' : 'Click to Copy'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSentry;