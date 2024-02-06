import React from 'react';
function Dashboard() {
    return (
        <div>
            <div className='body'>
                <div class="dashboard-sidebar">
                    <div class="dashboard-logoCircle"> <img src="logo" alt="logo" /></div>
                    <a id="lineBreak"></a>
                    <a onClick={sentriesClick} id="sentriesButton"> Sentries</a>
                    <a onClick={createSentryClick} id="createSentry">Create sentry</a>
                    <a onClick={groupsClick} id="groups">Groups</a>
                </div>
                <div class="dashboard-main">
                    <div class="dashboard-box">
                        <div id="dashboardDivTitle">
                            <h3>Dashboard</h3>
                            <table>

                            </table>
                        </div>
                        <div id="dashboardMainElement">

                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}
function sentriesClick() {
    const divTitle = document.getElementById('dashboardDivTitle');
    const divMainElement = document.getElementById('dashboardMainElement');
    divTitle.innerHTML = '<h3>Sentries</h3>';
    divMainElement.innerHTML = '<form id="form"> <input type="search" id="query" name="q" placeholder="Search..."> <button> Search </button> </form> <table class="sentiesListTable"> <tr><td><h3>S/N</h3></td> <td><h3>NAME</h3></td> <td><h3>LOCATION</h3></td> <td><h3>STATUS</h3></td> <td><h3>ACTIONS</h3></td> </tr>  <tr><td><p>1</p></td> <td><p>test</p></td> <td><p>test</p></td> <td><p>test- image</p></td> <td><p><button>test</button><p></td> </tr> </table>';
}
function createSentryClick() {
    const divTitle = document.getElementById('dashboardDivTitle');
    const divMainElement = document.getElementById('dashboardMainElement');
    divTitle.innerHTML = '<h3>Create Sentry</h3>';
    divMainElement.innerHTML = '<input class="createSentryTextBoxes type="text" alt="Sentry Name"></input><input class="createSentryTextBoxes type="text" alt="Longitude"></input><input class="createSentryTextBoxes type="text" alt="Latitude"></input><button class="sentry-details-create">Create</button>';
}
function groupsClick() {
    const divTitle = document.getElementById('dashboardDivTitle');
    const divMainElement = document.getElementById('dashboardMainElement');
    divTitle.innerHTML = '<h3>Groups</h3>';
    divMainElement.innerHTML = '';
}
export default Dashboard;