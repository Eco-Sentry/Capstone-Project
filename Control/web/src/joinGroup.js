import './App.css';
import Navbar from './Navbar';
function joinGroup() {
    return (
        <div>
            <div className='body'>
                <div class="dashboard-sidebar">
                    <div class="dashboard-logoCircle"> <img src="logo" alt="logo" /></div>
                    <a></a>
                    <a id="sentries"><Link to="/sentries">Sentries</Link></a>
                    <a id="createSentries"><Link to="/sentries">Create sentries</Link></a>
                    <a id="groups"><Link to="/groupPage">Groups</Link></a>
                </div>
                <div class="dashboard-main" id="dashboard-main">
                    <div class="dashboard-box">
                        <h1>Sentries</h1>
                        <button class="joinButton"><Link to="/joinGroup">Join</Link></button>
                        <button class="createButton"><Link to="/createGroup">Create</Link></button>
                        <h3>Test - must update depending on side bar</h3>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default joinGroup;


