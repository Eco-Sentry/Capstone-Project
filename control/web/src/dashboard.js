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
import Heatmap from './components/heatmap';
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

    // Function to render the  component based on the selected result type
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
    const graphComponents = {
      'heat-map': (id, heatmapData) => <Heatmap id={id} heatmapData={heatmapData} />,
      'line-graph': (id, data) => <LineGraph id={id} data={data} />,
      'histogram': (id, data) => <Histogram id={id} data={data} />,
    };
    // Function to render HeatMap component based on checked conditions
    const renderHeatMap = () => {
      if (resultType === 'heat-map' && selectedConditions.length === 0) {
        return (
          <div>
            <div className='graph-title' style={{whiteSpace: 'nowrap'}}>Heat Map</div>
            <div className='heatmap'><Heatmap /></div>
          </div>
        );
      }
      return selectedConditions.map((condition, index) => {
        let heatmapData = [];

        switch (condition) {
          case 'precipitation':
            heatmapData = [
              [-34.4278, 150.8931, 10], // Wollongong
              [-34.5619, 150.8275, 15], // Shellharbour
              [-34.6440, 150.8673, 20], // Kiama
              [-34.4263, 150.8986, 12], // Fairy Meadow
              [-34.4356, 150.8983, 18], // North Wollongong
              [-34.5105, 150.8406, 22], // Warilla
              [-34.5124, 150.7710, 25], // Windang
              [-34.4578, 150.8143, 17], // Albion Park
              [-34.3836, 150.8920, 19], // Figtree
              [-34.5600, 150.8100, 23], // Shell Cove
              [-34.6778, 150.8470, 16], // Gerringong
              [-34.7144, 150.8268, 13], // Gerroa
              [-34.5489, 150.7833, 21], // Minnamurra
              [-34.5342, 150.8776, 14], // Port Kembla
              [-34.6328, 150.8445, 18], // Jamberoo
              [-34.7235, 150.8488, 20], // Kiama Downs
              [-34.5701, 150.8481, 15], // Barrack Heights
              [-34.5230, 150.7703, 12], // Lake Illawarra
              [-34.4066, 150.8842, 16], // Mount Keira
              [-34.5293, 150.9053, 19], // Cordeaux Heights
              [-34.6756, 150.8495, 22], // Werri Beach
              [-34.7029, 150.8606, 25], // Gerroa Beach
              [-34.5950, 150.8556, 18], // Oak Flats
              [-34.5781, 150.7969, 14], // Minnamurra Rainforest
              [-34.6144, 150.8181, 21] // Kiama Blowhole
            ];
            break;
          case 'temperature':
            heatmapData = [
              [-34.4278, 150.8931, 5], // Wollongong
              [-34.5619, 150.8275, 8], // Shellharbour
              [-34.6440, 150.8673, 15], // Kiama
              [-34.4263, 150.8986, 6], // Fairy Meadow
              [-34.4356, 150.8983, 10], // North Wollongong
              [-34.5105, 150.8406, 12], // Warilla
              [-34.5124, 150.7710, 14], // Windang
              [-34.4578, 150.8143, 9], // Albion Park
              [-34.3836, 150.8920, 11], // Figtree
              [-34.5600, 150.8100, 16], // Shell Cove
              [-34.6778, 150.8470, 7], // Gerringong
              [-34.7144, 150.8268, 4], // Gerroa
              [-34.5489, 150.7833, 13], // Minnamurra
              [-34.5342, 150.8776, 6], // Port Kembla
              [-34.6328, 150.8445, 10], // Jamberoo
              [-34.7235, 150.8488, 12], // Kiama Downs
              [-34.5701, 150.8481, 8], // Barrack Heights
              [-34.5230, 150.7703, 5], // Lake Illawarra
              [-34.4066, 150.8842, 7], // Mount Keira
              [-34.5293, 150.9053, 11], // Cordeaux Heights
              [-34.6756, 150.8495, 14], // Werri Beach
              [-34.7029, 150.8606, 16], // Gerroa Beach
              [-34.5950, 150.8556, 10], // Oak Flats
              [-34.5781, 150.7969, 6], // Minnamurra Rainforest
              [-34.6144, 150.8181, 13] // Kiama Blowhole
            ];
            break;
          case 'air-quality':
            heatmapData = [
              [-34.4278, 150.8931, 20], // Wollongong
              [-34.5619, 150.8275, 25], // Shellharbour
              [-34.6440, 150.8673, 30], // Kiama
              [-34.4263, 150.8986, 22], // Fairy Meadow
              [-34.4356, 150.8983, 28], // North Wollongong
              [-34.5105, 150.8406, 32], // Warilla
              [-34.5124, 150.7710, 35], // Windang
              [-34.4578, 150.8143, 27], // Albion Park
              [-34.3836, 150.8920, 29], // Figtree
              [-34.5600, 150.8100, 33], // Shell Cove
              [-34.6778, 150.8470, 26], // Gerringong
              [-34.7144, 150.8268, 21], // Gerroa
              [-34.5489, 150.7833, 13], // Minnamurra
              [-34.5342, 150.8776, 6], // Port Kembla
              [-34.6328, 150.8445, 10], // Jamberoo
              [-34.7235, 150.8488, 12], // Kiama Downs
              [-34.5701, 150.8481, 8], // Barrack Heights
              [-34.5230, 150.7703, 5], // Lake Illawarra
              [-34.4066, 150.8842, 7], // Mount Keira
              [-34.5293, 150.9053, 11], // Cordeaux Heights
              [-34.6756, 150.8495, 14], // Werri Beach
              [-34.7029, 150.8606, 16], // Gerroa Beach
              [-34.5950, 150.8556, 10], // Oak Flats
              [-34.5781, 150.7969, 6], // Minnamurra Rainforest
              [-34.6144, 150.8181, 13] // Kiama Blowhole
            ];
            break;
          case 'wind-speed':
            heatmapData = [
              [-34.4278, 150.8931, 20], // Wollongong
              [-34.5619, 150.8275, 25], // Shellharbour
              [-34.6440, 150.8673, 30], // Kiama
              [-34.4263, 150.8986, 22], // Fairy Meadow
              [-34.4356, 150.8983, 28], // North Wollongong
              [-34.5105, 150.8406, 32], // Warilla
              [-34.5124, 150.7710, 35], // Windang
              [-34.4578, 150.8143, 27], // Albion Park
              [-34.3836, 150.8920, 29], // Figtree
              [-34.5600, 150.8100, 33], // Shell Cove
              [-34.6778, 150.8470, 26], // Gerringong
              [-34.7144, 150.8268, 21], // Gerroa
              [-34.5489, 150.7833, 13], // Minnamurra
              [-34.5342, 150.8776, 6], // Port Kembla
              [-34.6328, 150.8445, 10], // Jamberoo
              [-34.7235, 150.8488, 12], // Kiama Downs
              [-34.5701, 150.8481, 8], // Barrack Heights
              [-34.5230, 150.7703, 5], // Lake Illawarra
              [-34.4066, 150.8842, 7], // Mount Keira
              [-34.5293, 150.9053, 11], // Cordeaux Heights
              [-34.6756, 150.8495, 14], // Werri Beach
              [-34.7029, 150.8606, 16], // Gerroa Beach
              [-34.5950, 150.8556, 10], // Oak Flats
              [-34.5781, 150.7969, 6], // Minnamurra Rainforest
              [-34.6144, 150.8181, 13] // Kiama Blowhole
            ];
            break;
          case 'humidity':
            heatmapData = [
              [-34.4278, 150.8931, 20], // Wollongong
              [-34.5619, 150.8275, 25], // Shellharbour
              [-34.6440, 150.8673, 30], // Kiama
              [-34.4263, 150.8986, 22], // Fairy Meadow
              [-34.4356, 150.8983, 28], // North Wollongong
              [-34.5105, 150.8406, 32], // Warilla
              [-34.5124, 150.7710, 35], // Windang
              [-34.4578, 150.8143, 27], // Albion Park
              [-34.3836, 150.8920, 29], // Figtree
              [-34.5600, 150.8100, 33], // Shell Cove
              [-34.6778, 150.8470, 26], // Gerringong
              [-34.7144, 150.8268, 21], // Gerroa
              [-34.5489, 150.7833, 13], // Minnamurra
              [-34.5342, 150.8776, 6], // Port Kembla
              [-34.6328, 150.8445, 10], // Jamberoo
              [-34.7235, 150.8488, 12], // Kiama Downs
              [-34.5701, 150.8481, 8], // Barrack Heights
              [-34.5230, 150.7703, 5], // Lake Illawarra
              [-34.4066, 150.8842, 7], // Mount Keira
              [-34.5293, 150.9053, 11], // Cordeaux Heights
              [-34.6756, 150.8495, 14], // Werri Beach
              [-34.7029, 150.8606, 16], // Gerroa Beach
              [-34.5950, 150.8556, 10], // Oak Flats
              [-34.5781, 150.7969, 6], // Minnamurra Rainforest
              [-34.6144, 150.8181, 13] // Kiama Blowhole
            ];
            break;
          default:
            break;
        }
          const title = condition.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Capitalize each word
          return (
            <div key={index}>
              <div className='graph-title'>{title}</div> 
              <div className='heaatmap'><Heatmap key={index} heatmapData={heatmapData} /></div>
            </div>
          );
      });
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
            <div className='graph-title'>{title}</div> {/* Title above the graph */}
            {graphComponents[resultType](condition, data)} 
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
        <div key={index}>
          <div className='graph-title'>{title}</div> {/* Title above the graph */}
          {graphComponents[resultType](condition, data)}
        </div>
      );
    });
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
              <div className="result-title">Result Types</div>
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

            <div className="conditions-title"> Conditions</div>
              <div className="resultconditions-options">
                <div className="conditions-option">
                  <input type="checkbox" id="precipitation" name="precipitation" value="precipitation" onChange={handleConditionChange} />
                  <label htmlFor="precipitation">Precipitaion</label>
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
              </div>
            </div>
            
            <div className="Dashboard-content">
              <div className="Dashboard-title">
                <h1>Dashboard</h1>
              </div>
              <div className="address-search-container">
                <input class="address-input" type="text" name="address" placeholder="Address"></input>
                <button class="address-search-button">Search</button>
              </div>
              <div className='display-conditions-graph' >
                {renderResultComponent()}
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

            <table className="dashboardGraphs" id="content-to-download">

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

            </table>
            {/* <button onClick={handleDownloadAllCharts}>Download all</button> */}
            <input style={{margin: "5%", width: "15%"}} className="searchLocationButton" type="submit" value="Download All Charts" onClick={handleDownloadAllCharts}/>

        </div>    
    );
}
export default Dashboard;