import logo from './EcoSentryLogo.png';

import DoughnutChart from './components/DoughnutChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

function Dashboard() {
    return (
        <div className='Dashboard'>
            <style>{'body { background-color: #00A3A3; }'}</style> 
            <div class="yourSent-sidebar">
                    {/* <img src={logo} alt="logo" class="profilePicImage" style={{ alignSelf: 'center'}}/> 
                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Line Graph</a>

                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Histogram</a> 
                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Flow Chart</a>
                    <a id="sentriesButton" style={{cursor: 'pointer'}}> Statistic Graph</a>
                    <br /> <br /> <br /> */}

                    {/* <t> Graph Types </t> <br /> <br />

                    <label className="graphType"> Line Graph
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>
                    <label className="graphType"> Histogram
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>
                    <label className="graphType"> Flow Chart
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>
                    <label className="graphType"> Statistic Graph
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>
                    <br /> <br /> <br /> */}

                    <t> Result Types </t> <br /> <br />

                    <label className="graphType"> Precipitation
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>
                    <label className="graphType"> Temperature
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>
                    <label className="graphType"> Air Quality
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>
                    <label className="graphType"> Humidity
                        <input type="checkbox"  />
                        <span className="checkmark" />
                    </label>

                    
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

            <div style={{width: "69%", marginLeft: "22%"}}>
                <iframe  style={{}} class="contact-map" width="100" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Northfields%20Ave,%20Wollongong%20NSW%202522+(UOW)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" title="map"></iframe>
            </div>

            <table className="dashboardGraphs">

                <tr>
                    <td> <div style={{backgroundColor: "white", padding: "5%", borderRadius: "10px"}}> Bar Chart <BarChart /> 
                    <a style={{color: "black", cursor: "pointer"}}> <u> Download </u> </a> </div></td>

                    <td> <div style={{backgroundColor: "white", padding: "5%", borderRadius: "10px"}}> Pie Chart<PieChart /> 
                    <a style={{color: "black", cursor: "pointer"}}> <u> Download </u> </a> </div></td>
                </tr>
                <tr>
                    <td> <div style={{backgroundColor: "white", padding: "5%", borderRadius: "10px"}}> Doughnut Chart<DoughnutChart /> 
                    <a style={{color: "black", cursor: "pointer"}}> <u> Download </u> </a> </div></td>
                </tr>

            </table>
            <input style={{margin: "5%", width: "15%"}} className="searchLocationButton" type="submit" value="Download All Charts" />

        </div>    
    );
}

export default Dashboard;