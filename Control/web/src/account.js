import pfp from './profileImage.png';

function Account() {
    return (
        <div className='Account'>
                <style>{'body { background-color: #00A3A3; }'}</style>  
                <h2>YOUR ACCOUNT</h2>

                <table class="accountTable">
                    <tr>
                        {/* <td className='profilePictureCell'> 
                            <img src={pfp} alt="logo" class="profilePicImage" style={{ textAlign: 'top', height: '70%', width: '70%'}}/>  
                        </td> */}

                        <td className="accountInfoCell">
                            <form>
                                <input className="accountDetails" type="text" name="address" placeholder=" First Name"/> <br /> <br />
                                <input className="accountDetails" type="text" name="address" placeholder=" Last name"/> <br /> <br />
                                <input className="accountDetails" type="text" name="address" placeholder=" Email"/> <br /> <br />
                                {/* <input className="bioDetails" type="text" name="address" placeholder="About me"/> <br /> <br /> */}
                                <input className="yourSent-view-button" type="submit" value="Submit Changes" style={{height: '100%', width: 'auto', fontSize: '100%'}}/>
                            </form>
                            
                        </td>
                    </tr>
                </table>
                <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div>  
    );
}

export default Account;