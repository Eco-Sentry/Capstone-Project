import React from 'react';
function Dashboard() {
    return (
        <div>
            <div className='body'>
                <div class="dashboard-sidebar">
                    <div class="dashboard-logoCircle"> <img src="logo" alt="logo" /></div>
                    <a></a>
                    <a onClick={sentriesClick} id="sentriesButton"> Sentries</a>
                    <a onClick={createSentryClick} id="createSentries">Create sentries</a>
                    <a onClick={groupsClick} id="groups">Groups</a>
                </div>
                <div class="dashboard-main">
                    <div class="dashboard-box">
                        <div id="dashboardDivTitle">
                            <h3>Dashboard</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}
function sentriesClick() {
    const divTitle = document.getElementById('dashboardDivTitle');
    divTitle.innerHTML = '<h3>Sentries</h3>';
}
function createSentryClick() {
    const divTitle = document.getElementById('dashboardDivTitle');
    divTitle.innerHTML = '<h3>Create Sentry</h3>';
}
function groupsClick() {
    const divTitle = document.getElementById('dashboardDivTitle');
    divTitle.innerHTML = '<h3>Groups</h3>';
}
export default Dashboard;