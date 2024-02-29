import logo from './EcoSentryLogo.png';

function Dashboard() {
    return (
        <div className='Dashboard'>
            <style>{'body { background-color: #00A3A3; }'}</style> 
            <div class="yourSent-sidebar">
                    {/* <img src={logo} alt="logo" class="profilePicImage" style={{ alignSelf: 'center'}}/>  */}
                    <a id="lineBreak"></a>

                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Line Graph</a>
                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Histogram</a> 
                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Flow Chart</a>
                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Statistic Graph</a>
                    <br /> <br /> <br />

                    
            </div>

            <form className="locationForm">
                <label>
                    <input className="addressInput" type="text" name="address" placeholder="Address"/> <br /> <br />
                    <input className="longlatInput" type="text" name="longitude" placeholder="Longitude"/> &nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="longlatInput" type="text" name="latitude" placeholder="Latitude"/> &nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                    <input className="searchLocationButton" type="submit" value="Search" />
            </form>
            <br /> <br /> <br />

            <table className="dashboardGraphs">
                <tr>
                    <td><iframe  class="contact-map" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Northfields%20Ave,%20Wollongong%20NSW%202522+(UOW)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" title="map"><a href="https://www.gps.ie/">Main Location</a></iframe></td>
                </tr>

                <tr>
                    <td>GRAPHS</td>
                </tr>

            </table>

        </div>    
    );
}

export default Dashboard;