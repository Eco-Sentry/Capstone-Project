import React from 'react';
function Dashboard() {
    return (
        <div>
            <div className='Dashboard'>
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
    divMainElement.innerHTML = '<form id="form"> <input class="dashboardSentiesSearchBar" type="search" id="query" name="q" placeholder="Search..."> </form> <table class="sentiesListTable"> <tr class="tr-sentryTable"><td><h3 class="h3-sentriesTable">S/N</h3></td> <td class="tr-sentryTable"><h3 class="h3-sentriesTable">NAME</h3></td> <td class="tr-sentryTable"><h3 class="h3-sentriesTable">LOCATION</h3></td> <td class="tr-sentryTable"><h3 class="h3-sentriesTable">STATUS</h3></td> <td class="tr-sentryTable"><h3 class="h3-sentriesTable">ACTIONS</h3></td> </tr>  <tr class="tr-sentryTable"><td><p>1</p></td> <td class="tr-sentryTable"><p>test</p></td> <td class="tr-sentryTable"><p>test</p></td> <td class="tr-sentryTable"><p>test- image</p></td> <td class="tr-sentryTable"><p><button>test</button><p></td> </tr> </table>';
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