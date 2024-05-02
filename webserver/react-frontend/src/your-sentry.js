import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import SentriesTable from './SentriesTable';
import SentryInfo from './SentryInfo';
import CreateSentry from './CreateSentry';
import SensorInfo from './SensorInfo';



// Your Sentry Component
const YourSentry = () => {
  const [currentSection, setCurrentSection] = useState('sentries');
  // const [sentries, setSentries] = useState([
  const [sentries] = useState([
    { name: 'Tom', location: 'Sydney', status: 'Green' },
    { id: 2, name: 'Alice', location: 'Melbourne', status: 'Red' },
    { id: 3, name: 'John', location: 'Brisbane', status: 'Green' },
    { id: 4, name: 'Emily', location: 'Perth', status: 'Green' },
    { id: 5, name: 'Michael', location: 'Adelaide', status: 'Red' },
    { id: 6, name: 'Tommy', location: 'Gold Coast', status: 'Green' },
    { id: 7, name: 'Daniel', location: 'Newcastle', status: 'Red' },
    { id: 8, name: 'Olivia', location: 'Canberra', status: 'Green' },
    { name: 'James', location: 'Sunshine Coast', status: 'Green' },
    { id: 10, name: 'Johnny', location: 'Wollongong', status: 'Red' },
    
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

  // <SentriesTable sentries={filteredSentries} onViewButtonClick={handleViewButtonClick} />

  useEffect(() => {
    return () => {
      // Reset
      setToken(false);
    };
  }, [currentSection]);

  const handleAddSensor = () => {
    // Logic for adding a sensor
    // console.log('Adding sensor');
    alert("Adding sensor");
  };
  
  const renderSection = () => {
    switch (currentSection) {
      case 'sentries':
        return <SentriesTable sentries={filteredSentries} onViewButtonClick={handleViewButtonClick} />;
        
      case 'SENTRY INFO':
        return (
          
          <div className="your-sentry-container">
            <SentryInfo
              token={token}
              showCopyButton={showCopyButton}
              handleViewButtonClickSensorInfo={handleViewButtonClickSensorInfo}
              handleAddSensor={handleAddSensor}
            />
          </div>
        );

      case 'SENSOR INFO':
        return <SensorInfo />;

        
      case 'CREATE A SENTRY':
        return (
          
          <div className="your-sentry-container">
            <CreateSentry
              token={token}
              showCopyButton={showCopyButton}
              handleCreateSentry={handleCreateSentry}
            />
          </div>
        );
      // case 'GROUPS':
      //   return <div>Grouping Sentries</div>;
      // default:
      //   return <div>Not Found</div>;
    }
  };

  return (
    <div className='your-Sent'>
      <div className='yourSent-sidebar'>
        <a id="lineBreak"></a>
        <a onClick={() => setCurrentSection('sentries')} id="sentriesButton"> Sentries</a>
        <a onClick={() => setCurrentSection('CREATE A SENTRY')} id="createSentry">Create sentry</a>
        {/* <a onClick={() => setCurrentSection('GROUPS')} id="groups">Groups</a> */}
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