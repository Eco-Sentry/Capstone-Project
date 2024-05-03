import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import SentriesTable from './SentriesTable';
import SentryInfo from './SentryInfo';
import CreateSentry from './CreateSentry';
import SensorInfo from './SensorInfo';
import axios from 'axios'; // Import axios for making HTTP requests

// Your Sentry Component
const YourSentry = () => {
  const [currentSection, setCurrentSection] = useState('sentries');
  const [sentries, setSentries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSentry, setSelectedSentry] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [token, setToken] = useState('');
  const [showCopyButton, setShowCopyButton] = useState(false); // State to track if copy button should be shown
  const [userInfo, setUserInfo] = useState(null); // State to store user information

  useEffect(() => {
    // Function to fetch user sentries
    const fetchUserSentries = async () => {
      try {
        // Define the JWT token
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTcxNDcxMjY5NSwiZXhwIjoxNzE0NzQ4Njk1fQ.E73DPIvd2i9X8M-rZ3kxsdGgPBuTcslgohvQ3WsCOfg";
  
        // Make a POST request to the backend API to get user sentries
        const response = await axios.post(
          'http://202.65.64.38:8082/api/get-user-sentries',
          token, // Send token directly as the request body
          {
            headers: {
              'Content-Type': 'text/plain', // Set content type as text/plain
            },
          }
        );
  
        console.log('Response from API:', response.data); // Log the response data
        console.log('First sentry object:', response.data[0]);
        
        // Transform the data received from the API into the format expected by the component
        const transformedSentries = response.data.map((sentry, index) => ({
          id: sentry.id,
          name: `Sentry ${index + 1}`,
          location: sentry.latitude !== null && sentry.longitude !== null ? `${sentry.latitude}, ${sentry.longitude}` : 'Unknown',
          status: sentry.trust === 0 ? 'Red' : 'Green'
        }));
              
  
        // Update user sentries in state with the transformed data
        setSentries(transformedSentries);

        // Set user info if available
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user sentries:', error);
      }
    };
  
    // Call the fetchUserSentries function when the component mounts
    fetchUserSentries();
  }, []); // The empty dependency array ensures this effect runs only once after the component mounts

  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-button');

    clipboard.on('success', () => {
      setShowCopyButton(true);
      setTimeout(() => setShowCopyButton(false), 1000);
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const filteredSentries = sentries.filter(sentry =>
    sentry.name && sentry.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleCreateSentry = () => {
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

  const handleViewButtonClickSensorInfo = sensor => {
    // Pass both the sentry and the selected sensor to SensorInfo component
    // setSelectedSentry(sentry);
    setSelectedSensor(sensor);
    setCurrentSection('SENSOR INFO');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'sentries':
        return <SentriesTable sentries={filteredSentries} onViewButtonClick={handleViewButtonClick} />;
        
      case 'SENTRY INFO':
        return (
          <div className="your-sentry-container">
            <SentryInfo
              sentry={selectedSentry}
              token={token}
              showCopyButton={showCopyButton}
              handleViewButtonClickSensorInfo={handleViewButtonClickSensorInfo}
            />
          </div>
        );

        case 'SENSOR INFO':
          return (
            <div className="your-sentry-container">
              <SensorInfo
                sentry={selectedSentry}
                selectedSensor={selectedSensor}
                token={token} // Pass token to SensorInfo component
                showCopyButton={showCopyButton}
                // handleViewButtonClickSensorInfo={handleViewButtonClickSensorInfo}
                // sensorId={selectedSensor?.id} // Pass sensorId from selectedSentry to SensorInfo component
              />
            </div>
          );
        
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
        
      default:
        return null; // Return null for unknown sections
    }
  };

  return (
    <div className='your-Sent'>
      <div className='yourSent-sidebar'>
        <a id="lineBreak"></a>
        <a onClick={() => setCurrentSection('sentries')} id="sentriesButton"> Sentries</a>
        <a onClick={() => setCurrentSection('CREATE A SENTRY')} id="createSentry">Create sentry</a>
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