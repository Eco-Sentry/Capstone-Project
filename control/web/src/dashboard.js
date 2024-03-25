// import logo from './EcoSentryLogo.png';

//Eddie
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import DoughnutChart from './components/DoughnutChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

/* Added by (Jena) Heat Map*/
import { useState } from 'react';
import Heatmap from './components/heatmapgoogle';
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
    // const [searchTerm, setSearchTerm] = useState('');
    // const [location, setLocation] = useState({ lat: 0, lng: 0 });

    // // SEARCH GOOGLE MAPS
    // const handleChange = (event) => {
    //   setSearchTerm(event.target.value);
    // };
    // const handleSearch = async () => {
    //   try {
    //       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchTerm)}&key=AIzaSyASzqm2ZhLYvaPbm7eiojXN3ov9VcbmLgs`);
    //       const data = await response.json();
    //       if (data.results.length > 0) {
    //           const location = data.results[0].geometry.location;
    //           setLocation({ lat: location.lat, lng: location.lng });
    //       } else {
    //           console.log('No results found');
    //       }
    //   } catch (error) {
    //       console.error('Error:', error);
    //   }
    // };
    // const handleKeyPress = (event) => {
    //   if (event.key === 'Enter') {
    //       handleSearch();
    //   }
    // };
  
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
          { lat: -34.397, lng: 150.644, intensity: 0.5 },
          { lat: -33.867, lng: 151.206, intensity: 0.8 },
          { lat: -37.814, lng: 144.963, intensity: 0.3 },
          // Add more default data points as needed
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
            { lat: -33.333, lng: 121.854, intensity: 0.7 },
            { lat: -37.505, lng: 143.065, intensity: 0.6 },
            { lat: -31.768, lng: 128.906, intensity: 0.4 },
            { lat: -27.469, lng: 153.025, intensity: 0.9 },
            { lat: -34.429, lng: 116.234, intensity: 0.2 }
          ];
          break;
        case 'temperature':
          data = [
            { lat: -33.8679, lng: 151.2074, value: 22 },
            { lat: -37.8136, lng: 144.9631, value: 25 },
            { lat: -27.4698, lng: 153.0251, value: 28 },
            { lat: -35.282, lng: 149.128, value: 21 },
            { lat: -31.9505, lng: 115.8605, value: 30 }
          ];
          break;
        case 'air-quality':
          data = [
            { lat: -42.882, lng: 147.329, index: 80 },
            { lat: -33.8688, lng: 151.2093, index: 75 },
            { lat: -35.2809, lng: 149.130, index: 70 },
            { lat: -31.9505, lng: 115.8605, index: 65 },
            { lat: -27.4705, lng: 153.026, index: 72 }
          ];
          break;
        case 'wind-speed':
          data = [
            { lat: -37.562, lng: 144.937, speed: 10 },
            { lat: -33.8688, lng: 151.2093, speed: 12 },
            { lat: -32.425, lng: 137.646, speed: 14 },
            { lat: -34.429, lng: 116.234, speed: 8 },
            { lat: -27.4705, lng: 153.026, speed: 16 }
          ];
          break;
        case 'humidity':
          data = [
            { lat: -20.301, lng: 148.932, value: 56 },
            { lat: -33.8679, lng: 151.2074, value: 60 },
            { lat: -34.5775, lng: 150.8717, value: 58 },
            { lat: -34.429, lng: 116.234, value: 62 },
            { lat: -37.505, lng: 143.065, value: 54 }
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
    'heat-map': () =>  <Heatmap />,
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
                <input className="address-input" type="text" name="address" placeholder="Address or Coordinates" ></input>
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