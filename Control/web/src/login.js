import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement login logic here
        console.log(`Logging in with username: ${username} and password: ${password}`);
    };

    return (
        <div className='login'>
        <style>{'body { background-color: #00A3A3; }'}</style>
        <h2>Login Page</h2>

        <table class="accountTable">
                    <tr>
                        <td className="accountInfoCell">
                            <form>
                                <input
                                    placeholder=" Email"
                                    className="accountDetails"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                /> <br /> <br />
                                <input
                                    placeholder=" Password"
                                    className="accountDetails"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /> <br /> <br />

                                <input onClick={handleLogin} className="yourSent-view-button" type="submit" value="Login" style={{height: '100%', width: 'auto', fontSize: '100%'}}/>
                            </form>
                            
                        </td>
                    </tr>
                </table>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /><br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>
    );
}

export default Login;
