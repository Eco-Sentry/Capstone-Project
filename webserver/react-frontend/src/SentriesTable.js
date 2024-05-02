import React from 'react';
import greenImage from './green.png';
import redImage from './red.png';

const SentriesTable = ({ sentries, onViewButtonClick }) => {
  return (
    <table className="sentriesListTable">
      <thead>
        <tr className="th-sentryTable">
          <th className="th-sentryTable"><div className= "mySentHeader">S/N</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">NAME</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">LOCATION</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">STATUS</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">ACCESS</div></th>
          <th className="th-sentryTable"><div className= "mySentHeader">ACTIONS</div></th>
        </tr>
      </thead>
      <tbody>
        {sentries.map((sentry, index) => (
          <tr key={sentry.id} className="tr-sentryTable">
            <td className="tr-sentryTable"><p>{index + 1}</p></td>
            <td className="tr-sentryTable"><p>{sentry.name}</p></td>
            <td className="tr-sentryTable"><p>{sentry.location}</p></td>
            <td className="tr-sentryTable">
              {sentry.status === 'Green' ? (
                <img src={greenImage} alt="Green" style={{ width: '20px', height: '20px' }} />
                ) : (
                <img src={redImage} alt="Red" style={{ width: '20px', height: '20px' }} />
                )}
            </td>
            <td className="tr-sentryTable">{sentry.access}</td>
            <td className="tr-sentryTable">
              <button className="mySent-view-button" onClick={() => onViewButtonClick(sentry)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SentriesTable;