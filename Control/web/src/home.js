// function Home() {
//     return (
//         <div className='body'>
//             <div>
//             <h2>WELCOME TO ECO SENTRY</h2>
//             </div>
//         </div>    
//     );
// }

// export default Home;
import React from 'react';

import DoughnutChart from './components/DoughnutChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './style.css';

function Home() {
  
  return (
      <div className='body'>
          <div className='section'>
            <div className='image'>
              <div class='row'>
                <div class='column'>
                  <div class='title'>
                    <h1>ECO</h1>
                    <h1>SENTRY</h1>
                  </div>
                </div>
                <div class='column'>
                  <div className='intro'>
                    <p>Our mission is to create designs and code for the "EcoSentry" - a customizable weather and pollution station that empowers users to gather vital environmental data easily. The EcoSentry will be equipped with a modular design, allowing users to select and integrate their preferred sensors based on their specific needs and interests.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='section'>
            <div class='row'>
              <div class='column'>
                <div className='boxOne'>
                  <h5>Welcome to EcoSentry</h5>
                </div>
              </div>
              <div class='column'>
                <div className='boxOne'>
                  <h5>Our Mission</h5>
                  <div className='mission'>
                    <p>Our software will facilitate seamless integration into the mesh network. Users can conveniently add their station to the network and gain access to a wealth of aggregated data presented through maps, raw data, and other informative visualizations. This collaborative effort will foster the generation of detailed, localized, and frequent environmental data in various regions across the globe.

                    To achieve the utmost utility, we intend to design modules to accommodate a diverse range of sensors. These sensors will encompass crucial environmental parameters such as wind speed, wind direction, rainfall, CO2, CO, PM2.5, PM10, temperature, humidity, UV, pesticide levels, methane, NO2, nitric oxide, nitrogen dioxide, carbon monoxide, sulfur dioxide, ozone, radon gas, ammonia, air radiation levels, visibility, ambient temperature, humidity, and more. By collecting data from this wide array of sensors, we can gain comprehensive insights into the state of the environment and identify potential environmental issues early on.

                    Ultimately, the EcoSentry project aims to empower individuals and communities with a powerful tool to monitor and protect their environment actively. By sharing and analyzing data on a global scale, we can contribute to a more sustainable and environmentally aware future for our planet. Together, we can create a world where localized and precise environmental information is readily available, driving informed decisions and positive actions for a greener and healthier Earth.
                    </p>
                  </div>
                </div> 
              </div>
            </div>
          </div>
          <div className='section'>
            <div className='boxTwo'>
              <h5>Charts and Graph</h5>
              <div className='row'>
                <div className='column'>
                  <BarChart />
                </div>
                <div className='column'>
                  <DoughnutChart />
                </div>
                <div className='column'>
                  <PieChart />
                </div>
              </div>
            </div>
          </div>

          <div className='section'> 
          <div>
            <h2>Partners</h2>
          </div>
            <div className='row'>
              <div className='column'>
                <div className='boxOne'>
                  <h5>TOP LEFT</h5>
                </div>
                <div className='boxOne'>
                  <h5>BOT LEFT</h5>
                </div>
              </div>
              <div className='column'>
                <div className='boxOne'>
                  <h5>TOP RIGHT</h5>
                </div>
                <div className='boxOne'>
                  <h5>BOT RIGHT</h5>
                </div>
              </div>
            </div>
          </div>

      </div>    
    );
}

export default Home;

