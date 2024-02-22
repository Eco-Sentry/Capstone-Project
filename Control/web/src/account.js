import logo from './EcoSentryLogo.png';

function Account() {
    return (
        <div className='Account'>
                <style>{'body { background-color: #45B667; }'}</style>  
                <h2>YOUR ACCOUNT</h2>

                <table class="accountTable">
                    <tr>
                        <td className='profilePictureCell'> 
                            <img src={logo} alt="logo" class="profilePicImage" style={{ alignSelf: 'center'}}/> 
                        </td>

                        <td className="accountInfoCell">
                            <form>
                                <input className="accountDetails" type="text" name="address" placeholder="First Name"/> <br /> <br />
                                <input className="accountDetails" type="text" name="address" placeholder="Last name"/> <br /> <br />
                                <input className="accountDetails" type="text" name="address" placeholder="Ph Number"/> <br /> <br />
                                <input className="bioDetails" type="text" name="address" placeholder="About me"/> <br /> <br />
                                <input className="updateAccount" type="submit" value="Submit Changes" />
                            </form>
                            
                        </td>
                    </tr>
                </table>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>  
    );
}

export default Account;