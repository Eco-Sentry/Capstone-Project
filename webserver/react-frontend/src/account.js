import React, { useState, useEffect } from 'react';
import defaultAvatar from './pfp.png';
import axios from 'axios'; // Import axios for making HTTP requests

function Account() {
  const [userInfo, setUserInfo] = useState(null); // State to store user information

  useEffect(() => {
    // Function to fetch user information
    const fetchUserInfo = async () => {
      try {
        // Define the JWT token
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNrLnRvb2xlQGdtYWlsLmNvbSIsImlhdCI6MTcxNDkwOTc2NiwiZXhwIjoxNzE0OTQ1NzY2fQ.KNMpCN7_Ck02lC_hI3_6jJb0v_dj1wZTKnkLTsEC2gk";

        // Make a POST request to the backend API to get user information
        // Send token as plain text in the request body
        const response = await axios.post(
          'http://202.65.64.38:8082/api/get-user-info',
          token, // Send token directly as the request body
          {
            headers: {
              'Content-Type': 'text/plain', // Set content type as text/plain
            },
          }
        );

        console.log('Response from API:', response.data); // Log the response data
        // Update user information in state
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    // Call the fetchUserInfo function when the component mounts
    fetchUserInfo();
  }, []); // The empty dependency array ensures this effect runs only once after the component mounts

  return (
    <div className="account-container">
      <div className="account-header">
        <img src={defaultAvatar} alt="Profile" className="profile-image" />
        <h2>Your Account</h2>
      </div>
      {/* <div className="account-info">
        {userInfo ? (
          <div>
            <p>First Name: {userInfo.fname}</p>
            <p>Last Name: {userInfo.lname}</p>
            <p>Email: {userInfo.email}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div> */}
      <div className="account-form">
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input className="account-input" type="text" name="firstName" value={userInfo ? userInfo.fname : ''} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input className="account-input" type="text" name="lastName" value={userInfo ? userInfo.lname : ''} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="account-input" type="email" name="email" value={userInfo ? userInfo.email : ''} disabled />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;