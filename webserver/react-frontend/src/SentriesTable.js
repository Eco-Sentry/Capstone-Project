import React, { useState } from 'react';
import greenImage from './green.png';
import redImage from './red.png';
import trashIcon from './trash.png';
import Modal from 'react-modal';

const SentriesTable = ({ sentries, onViewButtonClick, onDeleteButtonSentry }) => {
  const [selectedSentry, setSelectedSentry] = useState(null);

  const handleDeleteConfirmation = (sentry) => {
    setSelectedSentry(sentry);
    // Open modal for confirmation
  };

  const handleConfirmDelete = () => {
    onDeleteButtonSentry(selectedSentry);
    // Close modal
    setSelectedSentry(null);
  };

  return (
    <table className="sentriesListTable">
      <thead>
        <tr className="th-sentryTable">
          <th className="th-sentryTable"><div className= "mySentHeader">S/N</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">NAME</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">LOCATION</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">STATUS</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">ACTIONS</div></th>
        </tr>
      </thead>
      <tbody>
        {sentries.map((sentry, index) => (
          <tr key={index} className="tr-sentryTable">
            <td className="tr-sentryTable"><p>{index + 1}</p></td>
            <td className="tr-sentryTable"><p>{sentry.name || 'null'}</p></td>
            <td className="tr-sentryTable"><p>{sentry.location}</p></td>
            <td className="tr-sentryTable">
              {sentry.status === 'Green' ? (
                <img src={greenImage} alt="Green" style={{ width: '20px', height: '20px' }} />
              ) : (
                <img src={redImage} alt="Red" style={{ width: '20px', height: '20px' }} />
              )}
            </td>
            <td className="tr-sentryTable" style={{ display: 'inline-flex' }}>
              <button className="mySent-view-button" style={{ width: '100%' }} onClick={() => onViewButtonClick(sentry)}>
                View
              </button>&nbsp;
              <button className="mySent-delete-button" onClick={() => handleDeleteConfirmation(sentry)}>
                <img src={trashIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <Modal 
        isOpen={selectedSentry !== null}
        onRequestClose={() => setSelectedSentry(null)}
        className="add-sensor-modal"
        overlayClassName="add-sensor-modal-overlay"
      >
        {selectedSentry && (
          <div className="add-sensor-popup">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this sentry?</p>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={() => setSelectedSentry(null)}>No</button>
          </div>
        )}
      </Modal>
    </table>
  );
};

export default SentriesTable;