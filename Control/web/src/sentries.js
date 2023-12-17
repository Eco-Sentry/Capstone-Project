function sentries() {
    return (
        <div>
            <div className='body'>
                <div class="dashboard-sidebar">
                    <div class="dashboard-logoCircle"> <img src={logo} alt="logo" /></div>
                    <a></a>
                    <a id="sentries"><Link to="/sentries">Sentries</Link></a>
                    <a id="createSentries"><Link to="/sentries">Create sentries</Link></a>
                    <a id="groups"><Link to="/groupPage">Groups</Link>Groups</a>
                </div>
                <div class="dashboard-main" id="dashboard-main">
                    <div class="dashboard-box">
                        <h3>Test - must update depending on side bar</h3>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default sentries;