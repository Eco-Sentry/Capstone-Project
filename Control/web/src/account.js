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
                            <p /> Name:
                            <p /> Ph:
                            <p /> Email:
                            <p /> Bio:
                            
                        </td>
                    </tr>
                </table>
        </div>  
    );
}

export default Account;