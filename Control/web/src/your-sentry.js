import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import greenImage from './green.png';
import redImage from './red.png';
// import uptime from './temp-uptime.png';
// import connection from './temp-connection.png';
import UptimeGraph from './UptimeGraph'; 
import ConnectionGraph from './ConnectionGraph';


// SentriesTable Component
const SentriesTable = ({ sentries, onViewButtonClick}) => {
  return (
    <table className="sentriesListTable">
      <thead>
        <tr className="th-sentryTable">
          <th className="th-sentryTable">S/N</th>
          <th className="th-sentryTable">NAME</th>
          <th className="th-sentryTable">LOCATION</th>
          <th className="th-sentryTable">STATUS</th>
          <th className="th-sentryTable">ACCESS</th>
          <th className="th-sentryTable">ACTIONS</th>
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
            <td>{sentry.access}</td>
            <td className="tr-sentryTable">
              <p>
                <button className="yourSent-view-button" onClick={() => onViewButtonClick(sentry)}>
                  View
                </button>
              </p>
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
              <div style={{textAlign: 'left', padding: '20px', marginTop: '-85px', marginLeft: '25px'}}>
              <span style={{fontSize: '16px', fontWeight: 'bold'}}>Reveal Token:</span>
              <input style={{width: '150px', height: '20px'}} id= "token" type="text" value= {token}/> &nbsp;
                  
                    <button className="copy-button" data-clipboard-text={token}>
                      {showCopyButton ? 'Copied!' : 'Click to Copy'}
                    </button>
              </div>
              </div>

              <br/>

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
                    <th style={{ backgroundColor: '#F7F9FC', fontSize: "22px"}}>Sensor Type</th>
                    <th style={{ backgroundColor: '#F7F9FC', fontSize: "22px"}}>Channel</th>
                    <th style={{ backgroundColor: '#F7F9FC', fontSize: "22px"}}>Status</th>
                    <th style={{ backgroundColor: '#F7F9FC', fontSize: "22px"}}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Temperature</td>
                    <td>Channel 1</td>
                    <td className="sensorStatus connected">Connected</td>
                    <td><button className="yourSent-view-button">View</button></td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>Channel 2</td>
                    <td className="sensorStatus error">Error</td>
                    <td><button className="yourSent-view-button">View</button></td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    <td>Channel 3</td>
                    <td className="sensorStatus connected">Connected</td>
                    <td><button className="yourSent-view-button">View</button></td>
                  </tr>
                  <tr>
                    <td>Chemical</td>
                    <td>Channel 4</td>
                    <td className="sensorStatus error">Error</td>
                    <td><button className="yourSent-view-button">View</button></td>
                  </tr>
                </tbody>
              </table>

            </div>



            {/* <h4>Sentry Info</h4>
            <p>Name: {selectedSentry.name}</p>
            <p>Location: {selectedSentry.location}</p> */}
          </div>
        );
        
      case 'CREATE A SENTRY':
        return (
          <div className="create-sentry">
            <div className="inputs-container">
              <input className="createSentryTextBoxes" type="text" placeholder="Sentry Name" />
              <input className="createSentryTextBoxes" type="text" placeholder="Longitude" />
              <input className="createSentryTextBoxes" type="text" placeholder="Latitude" />
               
              <div className="access-options">
                  <p>Access:</p>
                  <div className="radio-buttons">
                    <input type="radio" id="public" name="sentryVisibility" value="public" />
                    <label htmlFor="public">Public</label>
                    
                    <input type="radio" id="private" name="sentryVisibility" value="private" />
                    <label htmlFor="private">Private</label>
                  </div>
              </div>

              <button className="sentry-details-create" onClick={handleCreateSentry}>Create</button>
            </div>
            <div>
            {token && (
              <div className="tokenDiv">
                <p><b>Token</b> <br></br>

                    <input className="tokenCode" id= "token" type="text" value= {token}/> &nbsp;
                  
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
            <h3>{currentSection === 'sentries' ? 'SENTRIES' : currentSection}</h3>
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