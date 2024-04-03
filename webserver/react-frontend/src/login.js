import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    // authenticate with backend later
  };

  const handleSignUp = () => {
    
      // Check for empty fields
      const emptyFields = [];
      if (!formData.firstName.trim()) {
        emptyFields.push('First name');
      }
      if (!formData.lastName.trim()) {
        emptyFields.push('Last name');
      }
      if (!formData.email.trim()) {
        emptyFields.push('Email');
      }
      if (!formData.password.trim()) {
        emptyFields.push('Password');
      }
    
      // Display error message for empty fields
      if (emptyFields.length > 0) {
        const errorMessage = `${emptyFields.join(', ')} ${emptyFields.length > 1 ? 'are' : 'is'} empty`;
        toast.error(errorMessage);
        return;
      }
    
      // Implement password policy checks
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
      const capitalLetterValid = /[A-Z]/.test(formData.password);
      const specialCharValid = /[!@#$%^&*]/.test(formData.password);
      const minLengthValid = formData.password.length >= 8;
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          <div>
            <p>Password must:</p>
            <ul>
              <li style={{ color: capitalLetterValid ? 'green' : 'red' }}>Contain at least one capital letter</li><br/>
              <li style={{ color: specialCharValid ? 'green' : 'red' }}>Contain at least one special character</li><br/>
              <li style={{ color: minLengthValid ? 'green' : 'red' }}>Be at least 8 characters long</li>
            </ul>
          </div>
        );
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        return;
      }

    // send to backend later
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'login') {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="loginPage">
        {/* <style>{'body { background-color: #00A3A3; }'}</style> */}
        <div className="loginDiv">
        {showSignUp ? (
          <div>
            <h2>Create an Account</h2>
            <input style={{marginBottom: '2%', width: '100%'}} className="loginText"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange(e, 'signup')}
            /><br/>
            <input style={{marginBottom: '2%', width: '100%'}} className="loginText"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange(e, 'signup')}
            /><br/>
            <input style={{marginBottom: '2%', width: '100%'}} className="loginText"
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'signup')}
            /><br/>
            <input style={{marginBottom: '2%', width: '100%'}} className="loginText"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, 'signup')}
            /><br/>
            <input style={{marginBottom: '2%', width: '100%'}} className="loginText"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e, 'signup')}
            /><br/>
            {/* Display password error message */}
            {passwordError && <p>{passwordError}</p>}
            <button className="yourSent-view-button" style={{height: '100%', width: '30%', fontSize: '70%', padding: '2%', borderRadius: '5px'}} onClick={handleSignUp}>Sign Up</button>
          <p><hr/><button className="create-account-button" style={{height: '100%', width: 'auto', fontSize: '70%', padding: '2%', borderRadius: '5px', marginTop: '2%'}} onClick={toggleSignUp}>Back to Login</button></p>
            {/* <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={toggleSignUp}>Back to Login</button> */}
        </div>
      ) : (
        <div>
          <h2>Login to your Account</h2>
          <input style={{marginBottom: '2%'}} className="loginText" type="text" name="email" placeholder="Email" value={loginData.email} onChange={(e) => handleInputChange(e, 'login')} />
          <input className="loginText" type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e) => handleInputChange(e, 'login')} /><br/><br/>
          <button className="yourSent-view-button" style={{height: '100%', width: '30%', fontSize: '70%', padding: '2%', borderRadius: '5px'}} onClick={handleLogin}>Login</button>
          <p><hr/><button className="create-account-button" style={{height: '100%', width: 'auto', fontSize: '70%', padding: '2%', borderRadius: '5px', marginTop: '2%'}} onClick={toggleSignUp}>Create an Account</button></p>
        </div>
      )}
        </div>
    </div>
  );
};

export default Login;