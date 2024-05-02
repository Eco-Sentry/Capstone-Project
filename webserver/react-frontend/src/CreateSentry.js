import React from 'react';

const CreateSentry = ({ token, showCopyButton, handleCreateSentry }) => {
  return (
    <div className="create-sentry">
      <div className="inputs-container">
        <input className="createSentryTextBoxes" type="text" placeholder="Sentry Name" />
        <input className="createSentryTextBoxes" type="text" placeholder="Longitude" />
        <input className="createSentryTextBoxes" type="text" placeholder="Latitude" />

        <div className="access-options">
          <p style={{ color: '#103438' }}>Access:</p>
          <div className="radio-buttons">
            <input type="radio" id="public" name="sentryVisibility" value="public" />
            <label htmlFor="public" style={{ color: '#103438' }}>Public</label>

            <input type="radio" id="private" name="sentryVisibility" value="private" />
            <label htmlFor="private" style={{ color: '#103438' }}>Private</label>
          </div>
        </div>

        <button className="sentry-details-create" style={{ width: '50%' }} onClick={handleCreateSentry}>Create</button>
      </div>
      <div>
        {token && (
          <div className="tokenDiv">
            <p><b style={{ color: '#103438' }}>Token</b> <br></br>

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