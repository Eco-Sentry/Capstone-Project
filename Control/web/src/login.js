import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement login logic here
        console.log(`Logging in with username: ${username} and password: ${password}`);
    };

    return (
        <div>
        <h2>Login Page</h2>
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="button" class="button" onClick={handleLogin}>
                Login
            </button>
        </form>
        </div>
    );
}

export default Login;
