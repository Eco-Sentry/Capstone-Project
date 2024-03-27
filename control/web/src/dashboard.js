// import logo from './EcoSentryLogo.png';

//Eddie
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// import DoughnutChart from './components/DoughnutChart';
// import BarChart from './components/BarChart';
// import PieChart from './components/PieChart';

/* Added by (Jena) Heat Map*/
import { useState } from 'react';
import Heatmap from './components/HeatMap';
import LineGraph from './components/LineGraph';
import Histogram from './components/Histogram';

function Dashboard() {

    //EDDIE for one chart
    const handleDownloadPDF = chartId => {
    const element = document.getElementById(chartId);

    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${chartId}_chart.pdf`);
      });
    };

    //For all the charts
    const handleDownloadAllCharts = () => {
        const pdf = new jsPDF();
        const contentDiv = document.getElementById('content-to-download'); // Add an id to the div containing all content
    
        html2canvas(contentDiv).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('all_charts.pdf');
        });
    };

    // Added by Jena - Result Types to display the HeatMap/LineGraph/Histogram
    const [resultType, setResultType] = useState('heat-map'); // State to track the selected result type - default to be heat
    const [selectedConditions, setSelectedConditions] = useState([]);

    // Function to handle radio button change
    const handleResultTypeChange = (event) => {
      setResultType(event.target.value); // Update the selected result type when radio button changes
      // Clear selected conditions when result type changes
      setSelectedConditions([]);
      // Uncheck all checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false;
      });
      document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });
    };
    
    // Function to handle checkbox change
    const handleConditionChange = (event) => {
      const { id, checked } = event.target;
      if (checked) {
        setSelectedConditions(prevConditions => [id, ...prevConditions]); // Add condition to the list if checked
      } else {
        setSelectedConditions(prevConditions => prevConditions.filter(condition => condition !== id)); // Remove condition from the list if unchecked
      }
    };
    
    // Function to render the component based on the selected result type
    const renderResultComponent = () => {
      switch (resultType) {
        case 'heat-map':
          return renderHeatMap();
        case 'line-graph':
          return renderLineGraphs();
        case 'histogram':
          return renderHistograms();
        default:
          return null;
      }
    };
    // Function to render Heatmap component based on selected conditions
    const renderHeatMap = () => {
      // Find the selected condition
      const selectedCondition = selectedConditions[0];

      // If no condition is selected or the result type is not 'heat-map', render a placeholder message
      if (!selectedCondition || resultType !== 'heat-map') {
        const defaultData = [
          [-25.2744, 133.7751],
          [-24.25, 130.8],
          [-27.1, 132.5],
          [-33.8688, 151.2093],
          [-37.8136, 144.9631],
          [-34.9285, 138.6007],
          [-31.9505, 115.8605],
          [-42.8821, 147.3272],
          [-35.2820, 149.1286],
          [-20.3000, 148.9000],
        ];
        return (
          <div>
            <div className='graph-title'>Heat Map</div> 
            <Heatmap data={defaultData} />
          </div>
        );
      }

      // Initialize an empty array to hold the data for the selected condition
      let data = [];

      // Set data based on the selected condition
      switch (selectedCondition) {
        case 'precipitation':
          data = [
            [-33.8698, 151.2093], // Sydney
            [-37.8136, 144.9631], // Melbourne
            [-27.4698, 153.0251], // Brisbane
            [-31.9505, 115.8605], // Perth
            [-35.2809, 149.1300], // Canberra
            [-33.8688, 151.2093], // Bondi Beach
            [-42.8821, 147.3272], // Hobart
            [-12.4634, 130.8456], // Darwin
            [-35.3075, 149.1244], // Parliament House Canberra
            [-33.8688, 151.2093] // Sydney Opera House
          ];
          break;
        case 'temperature':
          data = [
            [-33.9255, 151.0244], // Cronulla Beach
            [-37.9712, 144.4929], // Great Ocean Road
            [-25.3444, 131.0369], // Uluru
            [-25.2744, 133.7751], // Alice Springs
            [-31.9406, 115.8265], // Fremantle
            [-16.9186, 145.7781], // Cairns
            [-25.3444, 131.0369], // Ayers Rock
            [-17.9644, 122.2129], // Broome
            [-27.4631, 153.0286], // South Bank Brisbane
            [-37.8136, 144.9631], // Melbourne CBD
          ];
          break;
          case 'air-quality':
            data = [
              [-37.7134, 145.1482], // Healesville Sanctuary
              [-33.8688, 151.2093], // Bondi Beach Sydney
              [-35.0478, 150.7022], // Jervis Bay
              [-35.4645, 148.8116], // Canberra CBD
              [-33.6906, 115.1607], // Margaret River
              [-38.3567, 144.9071], // Torquay
              [-31.6562, 116.6544], // Swan Valley
              [-37.6690, 144.8410], // Macedon Ranges
              [-35.3630, 149.1659], // National Arboretum Canberra
              [-27.9887, 153.4282] // Surfers Paradise
            ];
          break;
          case 'wind-speed':
            data = [
              [-16.9186, 145.7781], // Cairns Esplanade
              [-33.7490, 151.2869], // Manly Beach
              [-12.4634, 130.8456], // Darwin Waterfront
              [-33.9249, 151.1878], // Taronga Zoo
              [-34.4409, 150.8376], // Royal National Park
              [-37.0184, 144.4759], // Lake Eildon
              [-37.9315, 145.0505], // Dandenong Ranges
              [-33.8572, 151.2150], // Darling Harbour
              [-38.0363, 145.3563], // Mornington Peninsula
              [-33.7866, 150.9931] // Katoomba
            ];
          break;
          case 'humidity':
            data = [
              [-27.6450, 153.4111], // Moreton Island
              [-34.4229, 150.9035], // Illawarra Fly Treetop Adventures
              [-33.8615, 151.2081], // The Rocks Sydney
              [-42.6566, 147.3625], // MONA
              [-27.4698, 153.0251], // Brisbane CBD
              [-31.9754, 115.8708], // Kings Park Perth
              [-37.6889, 145.0443], // Yarra Valley
              [-35.0441, 138.5074], // Coorong National Park
              [-28.0173, 153.4257], // Burleigh Heads
              [-33.4246, 151.3420] // Terrigal Beach
            ];
          break;
        default:
          break;
      }

      const title = selectedCondition.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize each word

      return (
        <div>
          <div className='graph-title'>{title}</div> {/* Title above the heatmap */}
          <Heatmap data={data} /> {/* Render Heatmap component with specific data */}
        </div>
      );
    };
    // Function to render LineGraph components based on checked conditions
    const renderLineGraphs = () => {
      if (resultType === 'line-graph' && selectedConditions.length === 0) {
        return (
          <div>
            <div className='graph-title'>Line Graph</div>
            <LineGraph data = {[1,1,1,1,1,1,1,1,1,1,1,1]} />
          </div>
        );
      }
      return selectedConditions.map((condition, index) => {
        let data = [];

        // Set data based on condition
        switch (condition) {
          case 'precipitation':
            data = [50, 40, 60, 45, 55, 70, 60, 45, 55, 70, 60, 45];
            break;
          case 'temperature':
            data = [20, 22, 25, 26, 28, 30, 32, 31, 28, 25, 22, 20];
            break;
          case 'air-quality':
            data = [80, 75, 70, 65, 60, 55, 50, 55, 60, 65, 70, 75];
            break;
          case 'wind-speed':
            data = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
            break;
          case 'humidity':
            data = [56, 23, 43, 36, 13, 60, 62, 34, 28, 38, 31, 35];
            break;
          default:
            break;
        }
        const title = condition.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize each word
        
        return (
          <div key={index}>
            <div className='graph-title'>{title}</div> 
            <div id={`${condition}_chart`}>
              {graphComponents[resultType](condition, data)}
            </div>
            <button onClick={() => handleDownloadPDF(`${condition}_chart`)}>Download</button>
          </div>
        );
      });
    };

  const renderHistograms = () => {
      if (resultType === 'histogram' && selectedConditions.length === 0) {
        return (
          <div>
            <div className='graph-title'>Histogram</div>
            <Histogram data = {[0,0,0,0,0,0,0,0,0,0,0,0]} />
          </div>
        );
    }
    return selectedConditions.map((condition, index) => {
      let data = [];

      // Set data based on condition
      switch (condition) {
        case 'precipitation':
          data = [50, 40, 60, 45, 55, 70, 60, 45, 55, 70, 60, 45]; 
          break;
        case 'temperature':
          data = [20, 22, 25, 26, 28, 30, 32, 31, 28, 25, 22, 20]; 
          break;
        case 'air-quality':
          data = [80, 75, 70, 65, 60, 55, 50, 55, 60, 65, 70, 75]; 
          break;
        case 'wind-speed':
          data = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]; 
          break;
        case 'humidity':
          data = [56, 23, 43, 36, 13, 60, 62, 34, 28, 38, 31, 35]; 
          break;
        default:
          break;
      }
      const title = condition.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize each word
      
      return (
        <div>
          <div key={index}>
            <div className='graph-title'>{title}</div> 
            <div id={`${condition}_chart`}>
                {graphComponents[resultType](condition, data)}
              </div>
              <button onClick={() => handleDownloadPDF(`${condition}_chart`)}>Download</button>
          </div>
        </div>
      );
    });
  };
  const graphComponents = {
    'heat-map': <Heatmap />,
    'line-graph': (id, data) => <LineGraph id={id} data={data} />,
    'histogram': (id, data) => <Histogram id={id} data={data} />,
  };
  



    // const handleDownloadAllCharts = () => {
    //     const pdf = new jsPDF();
    //     const charts = document.querySelectorAll('.chart-container canvas');

    //     const promises = [];

    //     charts.forEach(chart => {
    //         promises.push(
    //             html2canvas(chart)
    //                 .then(canvas => {
    //                     const imgData = canvas.toDataURL('image/png');
    //                     const imgWidth = 210;
    //                     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //                     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //                     pdf.addPage();
    //                 })
    //         );
    //     });

    //     Promise.all(promises).then(() => {
    //         pdf.save('all_charts.pdf');
    //     });
    // };

    return (
        <div className='Dashboard'>
            {/* <style>{'body { background-color: #FFFFFF; }'}</style>  */}
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
                  
                    {/* <t> Result Types </t> <br /> <br />
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
                    </label> */}

            {/* Inserted by Jena - Result Types and Conditions*/}
              <div className="resultconditions-title">Result Types</div>
                <div className="resultconditions-options">
                <div className="result-option">
                  <input type="radio" id="heat-map" name="resultType" value="heat-map" checked={resultType === 'heat-map'} onChange={handleResultTypeChange} />
                  <label htmlFor="heat-map">Heat Map</label>
                </div>
                <div className="result-option">
                  <input type="radio" id="line-graph" name="resultType" value="line-graph" checked={resultType === 'line-graph'} onChange={handleResultTypeChange} />
                  <label htmlFor="line-graph">Line Graph</label>
                </div>
                <div className="result-option">
                  <input type="radio" id="histogram" name="resultType" value="histogram" checked={resultType === 'histogram'} onChange={handleResultTypeChange}/>
                  <label htmlFor="histogram">Histogram</label>
                </div>
              </div>

              <div className="resultconditions-title"> Conditions</div>
                <div className="resultconditions-options">
                  {resultType === 'heat-map' ? (
                    <>
                      <div className="conditions-option">
                        <input type="radio" id="precipitation" name="conditions" value="precipitation" onChange={handleConditionChange} />
                        <label htmlFor="precipitation">Precipitation</label>
                      </div>
                      <div className="conditions-option">
                        <input type="radio" id="temperature" name="conditions" value="temperature" onChange={handleConditionChange} />
                        <label htmlFor="temperature">Temperature</label>
                      </div>
                      <div className="conditions-option">
                        <input type="radio" id="air-quality" name="conditions" value="air-quality" onChange={handleConditionChange} />
                        <label htmlFor="air-quality">Air Quality</label>
                      </div>
                      <div className="conditions-option">
                        <input type="radio" id="wind-speed" name="conditions" value="wind-speed" onChange={handleConditionChange} />
                        <label htmlFor="wind-speed">Wind Speed</label>
                      </div>
                      <div className="conditions-option">
                        <input type="radio" id="humidity" name="conditions" value="humidity" onChange={handleConditionChange} />
                        <label htmlFor="humidity">Humidity</label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="conditions-option">
                        <input type="checkbox" id="precipitation" name="precipitation" value="precipitation" onChange={handleConditionChange} />
                        <label htmlFor="precipitation">Precipitation</label>
                      </div>
                      <div className="conditions-option">
                        <input type="checkbox" id="temperature" name="temperature" value="temperature" onChange={handleConditionChange} />
                        <label htmlFor="temperature">Temperature</label>
                      </div>
                      <div className="conditions-option">
                        <input type="checkbox" id="air-quality" name="air-quality" value="air-quality" onChange={handleConditionChange} />
                        <label htmlFor="air-quality">Air Quality</label>
                      </div>
                      <div className="conditions-option">
                        <input type="checkbox" id="wind-speed" name="wind-speed" value="wind-speed" onChange={handleConditionChange} />
                        <label htmlFor="wind-speed">Wind Speed</label>
                      </div>
                      <div className="conditions-option">
                        <input type="checkbox" id="humidity" name="humidity" value="humidity" onChange={handleConditionChange} />
                        <label htmlFor="humidity">Humidity</label>
                      </div>
                    </>
                  )}
                </div>
            </div>
            
            <div className="Dashboard-content">
              <div className="Dashboard-title">
                <h1>Dashboard</h1>
              </div>
              <div className="address-search-container">
                <input 
                  className="address-input" 
                  type="text" 
                  name="address"
                  placeholder="Enter address or coordinates"
                />
                <button className="address-search-button" >Search</button>
              </div>
              <div className='display-conditions-graph' id='content-to-download' >
                {renderResultComponent()}
              </div>
              <div>
                {(resultType === 'line-graph' || resultType === 'histogram') && (
                  <div >
                    <button className="download-all-button" onClick={handleDownloadAllCharts}>Download All Charts</button>
                  </div>
                )}
              </div>
            </div>
            
            {/* <form className="locationForm">
                <label>
                    <input className="addressInput" type="text" name="address" placeholder="Address"/> <br /> <br />
                    {/* <input className="longlatInput" type="text" name="longitude" placeholder="Longitude"/> &nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="longlatInput" type="text" name="latitude" placeholder="Latitude"/> &nbsp;&nbsp;&nbsp;&nbsp; */}
                    {/* <input className="searchLocationButton" type="submit" value="Search" /> */}
                {/* </label> */}
            {/* </form> */}
             {/* <br /> <br /> <br /> */} 

            {/* <div style={{width: "69%", marginLeft: "22%"}}>
                <iframe  style={{}} class="contact-map" width="100" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Northfields%20Ave,%20Wollongong%20NSW%202522+(UOW)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" title="map"></iframe>
            </div> */}

            {/* <table className="dashboardGraphs" id="content-to-download">

                <tr>
                    <td> <div style={{backgroundColor: "white", padding: "5%", borderRadius: "10px"}} id="barChart"> Bar Chart <BarChart/> 
                    <a style={{color: "black", cursor: "pointer"}} onClick={() => handleDownloadPDF('barChart')}> <u> Download </u> </a> </div></td>

                    <td> <div style={{backgroundColor: "white", padding: "5%", borderRadius: "10px"}} id="pieChart"> Pie Chart<PieChart/> 
                    <a style={{color: "black", cursor: "pointer"}} onClick={() => handleDownloadPDF('pieChart')}> <u> Download </u> </a> </div></td>
                </tr>
                <tr>
                    <td> <div style={{backgroundColor: "white", padding: "5%", borderRadius: "10px"}} id="doughnutChart"> Doughnut Chart<DoughnutChart/> 
                    <a style={{color: "black", cursor: "pointer"}} onClick={() => handleDownloadPDF('doughnutChart')}> <u> Download </u> </a> </div></td>
                </tr>

            </table> */}
            {/* <button onClick={handleDownloadAllCharts}>Download all</button> */}
            {/* <input style={{margin: "5%", width: "15%"}} className="searchLocationButton" type="submit" value="Download All Charts" onClick={handleDownloadAllCharts}/> */}

        </div>    
    );
}
export default Dashboard;