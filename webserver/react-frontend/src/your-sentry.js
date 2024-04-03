import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import greenImage from './green.png';
import redImage from './red.png';
// import uptime from './temp-uptime.png';
// import connection from './temp-connection.png';
import UptimeGraph from './components/UptimeGraph'; 
import ConnectionGraph from './components/ConnectionGraph';
import SensorInfo from './SensorInfo';


// SentriesTable Component
const SentriesTable = ({ sentries, onViewButtonClick}) => {
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

// Your Sentry Component
const YourSentry = () => {
  const [currentSection, setCurrentSection] = useState('sentries');
  // const [sentries, setSentries] = useState([
  const [sentries] = useState([
    { name: 'Tom', location: 'Sydney', status: 'Green', access: 'Public' },
    { id: 2, name: 'Alice', location: 'Melbourne', status: 'Red', access: 'Private' },
    { id: 3, name: 'John', location: 'Brisbane', status: 'Green', access: 'Public' },
    { id: 4, name: 'Emily', location: 'Perth', status: 'Green', access: 'Public' },
    { id: 5, name: 'Michael', location: 'Adelaide', status: 'Red', access: 'Private' },
    { id: 6, name: 'Tommy', location: 'Gold Coast', status: 'Green', access: 'Public' },
    { id: 7, name: 'Daniel', location: 'Newcastle', status: 'Red', access: 'Public' },
    { id: 8, name: 'Olivia', location: 'Canberra', status: 'Green', access: 'Private' },
    { name: 'James', location: 'Sunshine Coast', status: 'Green', access: 'Public' },
    { id: 10, name: 'Johnny', location: 'Wollongong', status: 'Red', access: 'Public' },
    
    // Add more hereee
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  // const [showSentryInfo, setShowSentryInfo] = useState(false);
  const [selectedSentry, setSelectedSentry] = useState(null);

  const filteredSentries = sentries.filter(sentry =>
    sentry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const [token, setToken] = useState('');

  const [showCopyButton, setShowCopyButton] = useState(false); // State to track if copy button should be shown

  useEffect(() => {
    // Initialize Clipboard.js
    const clipboard = new ClipboardJS('.copy-button');

    // Event listener to handle the copying
    clipboard.on('success', () => {
      // Show that the copy worked briefly 
      setShowCopyButton(true);
      setTimeout(() => setShowCopyButton(false), 1000);
    });

    // Clean up event listeners
    return () => {
      clipboard.destroy();
    };
  }, []);


  const handleCreateSentry = () => {
    // Logic for creating sentry
    const generatedToken = generateToken();
    setToken(generatedToken);
  };


  const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 30;
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  };

  const handleViewButtonClick = sentry => {
    setSelectedSentry(sentry);
    setCurrentSection('SENTRY INFO');
  };

  const handleViewButtonClickSensorInfo = sentry => {
    setSelectedSentry(sentry);
    setCurrentSection('SENSOR INFO');

    // const sensorName = sentry.sensorName;
    // handleDownloadPDF(sensorName);
  };

  useEffect(() => {
    return () => {
      // Reset
      setToken(false);
    };
  }, [currentSection]);
  
  const renderSection = () => {
    switch (currentSection) {
      case 'sentries':
        return <SentriesTable sentries={filteredSentries} onViewButtonClick={handleViewButtonClick} />;
        
      case 'SENTRY INFO':
        return (
          <div className="sentry-info-box">
            <div id="revealToken">
              <div style={{textAlign: 'left', padding: '20px', marginTop: '-85px', marginLeft: '-4px'}}>
              <span style={{fontSize: '16px', fontWeight: 'bold'}}>Reveal Token: </span>
              <input style={{width: '150px', height: '20px', backgroundColor: '#B0DCC7', color: '#103438', border: '0'}} id= "token" type="text" value= {token}/> &nbsp;
                  
                    <button className="copy-button" style={{width: '15%'}} data-clipboard-text={token}>
                      {showCopyButton ? 'Copied!' : 'Click to Copy'}
                    </button>
              </div>
              </div>

              <br/>
            {/* here */}
            <div style={{backgroundColor: '#FFF3E4', padding: '3%'}}>
            <div  className= "sentry-graphs">
                <div id="uptime">
                  <p style={{textAlign: 'left', borderBottom: '1px solid', borderColor: '#232E3A',padding: '10px'}}>
                    Uptime 
                    <br/>
                    <span style={{fontSize: '17px'}}>xxxxx</span>
                  
                  </p>

                  {/* <img src={uptime} alt='uptime' width={500} height={500}></img> */}
                  <UptimeGraph />

                </div>
                <div id="connection">
                <p style={{textAlign: 'left', borderBottom: '1px solid', borderColor: '#232E3A', padding: '10px'}}>
                    Connection 
                    <br/>
                    <span style={{fontSize: '17px'}}>xxx</span>
                  
                  </p>

                  {/* <img src={connection} alt='uptime' width={500} height={500}></img> */}
                  <ConnectionGraph />

                </div>
            </div>
            <br/><br/>
            <div style={{backgroundColor: 'white'}}>
              
            <table className="sensorTable">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Sensor Name</th>
                    <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Channel</th>
                    <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Status</th>
                    <th style={{ backgroundColor: '#FFFFFF', fontSize: "22px", boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Temperature</td>
                    <td>Channel 1</td>
                    <td><span className="sensorStatus connected">Connected</span></td>
                    <td><button className="mySent-view-button" onClick={handleViewButtonClickSensorInfo}>View</button></td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>Channel 2</td>
                    <td><span className="sensorStatus error">Error</span></td>
                    <td><button className="mySent-view-button" onClick={handleViewButtonClickSensorInfo}>View</button></td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    <td>Channel 3</td>
                    <td><span className="sensorStatus connected">Connected</span></td>
                    <td><button className="mySent-view-button" onClick={handleViewButtonClickSensorInfo}>View</button></td>
                  </tr>
                  <tr>
                    <td>Chemical</td>
                    <td>Channel 4</td>
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

      case 'SENSOR INFO':
        return <SensorInfo />;

        
      case 'CREATE A SENTRY':
        return (
          <div className="create-sentry">
            <div className="inputs-container">
              <input className="createSentryTextBoxes" type="text" placeholder="Sentry Name" />
              <input className="createSentryTextBoxes" type="text" placeholder="Longitude" />
              <input className="createSentryTextBoxes" type="text" placeholder="Latitude" />
               
              <div className="access-options">
                  <p style={{color: '#103438'}}>Access:</p>
                  <div className="radio-buttons">
                    <input type="radio" id="public" name="sentryVisibility" value="public" />
                    <label htmlFor="public" style={{color: '#103438'}}>Public</label>
                    
                    <input type="radio" id="private" name="sentryVisibility" value="private" />
                    <label htmlFor="private" style={{color: '#103438'}}>Private</label>
                  </div>
              </div>

              <button className="sentry-details-create" style={{width: '50%'}} onClick={handleCreateSentry}>Create</button>
            </div>
            <div>
            {token && (
              <div className="tokenDiv">
                <p><b style={{color: '#103438'}}>Token</b> <br></br>

                    <input className="tokenCode" id= "token" type="text" value= {token}/> &nbsp;
                  <br/>
                    <button className="copy-button" data-clipboard-text={token}>
                      {showCopyButton ? 'Copied!' : 'Click to Copy'}
                    </button>
                </p>
              </div>
            )}
            </div>
          </div>
        );
      case 'GROUPS':
        return <div>Grouping Sentries</div>;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className='your-Sent'>
      <div className='yourSent-sidebar'>
        <a id="lineBreak"></a>
        <a onClick={() => setCurrentSection('sentries')} id="sentriesButton"> Sentries</a>
        <a onClick={() => setCurrentSection('CREATE A SENTRY')} id="createSentry">Create sentry</a>
        <a onClick={() => setCurrentSection('GROUPS')} id="groups">Groups</a>
      </div>
      <div className="yourSent-main">
        <div className="yourSent-box">
          <div id="yourSentDivTitle">
            <h3>{currentSection === 'sentries' ? 'My Sentries' : currentSection}</h3>
            {currentSection === 'sentries' && (
                <div className= "yourSentSearchDiv">
                    <input
                  className="yourSentriesSearchBar"
                  type="search"
                  id="query"
                  name="q"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            )}
          </div>
          <div id="yourSentMainElement">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default YourSentry;