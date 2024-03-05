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
//import React from 'react';
import DoughnutChart from './components/DoughnutChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import './style.css';
//About page 
import React, { useState, useEffect  } from 'react';
const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
};
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );  
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }  
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);  
    return windowDimensions;
};
//About page - end


function Home() {
  //About page 
  const { height, width } = useWindowDimensions();

  const [isByronShown, setByronIsShown] = useState(false);
  const [isEstebanShown, setEstebanIsShown] = useState(false);
  const [isEddieShown, setEddieIsShown] = useState(false);
  const [isSavannahShown, setSavannahIsShown] = useState(false);
  const [isNickShown, setNickIsShown] = useState(false);
  const [isJenaShown, setJenaIsShown] = useState(false);
  const [isGroupTableIsShown, setGroupTableIsShown] = useState(true);
  //About page - end

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

        
        <div class="About-page">
            <div class="container-about">
                <h2>Founders</h2>
                <div id="aboutPersonElement">
                    <table class="center-table">
                        <tr>
                            <td class="center-tableRows">
                                <div class="containerByron">
                                    <div class="founder-text-box" onMouseEnter={() => setByronIsShown(true) + setGroupTableIsShown(false)} onMouseLeave={() => setByronIsShown(false) + setGroupTableIsShown(true)}>
                                        <div class="about-profileCircle">  </div>
                                        <br></br> 
                                        <h2>Byron</h2> 
                                        <h3>Backend</h3>
                                    </div>
                                </div>
                            </td>
                            <td class="center-tableRows"> 
                                <div class="containerByron">
                                    <div class="founder-text-box" onMouseEnter={() => setEstebanIsShown(true) + setGroupTableIsShown(false)} onMouseLeave={() => setEstebanIsShown(false) + setGroupTableIsShown(true)}> 
                                        <div class="about-profileCircle"></div>
                                        <br></br> 
                                        <h2>Esteban</h2> 
                                        <h3>Hardware</h3>
                                    </div>
                                </div>
                            </td>
                            <td class="center-tableRows">
                                <div class="founder-text-box" onMouseEnter={() => setEddieIsShown(true) + setGroupTableIsShown(false)} onMouseLeave={() => setEddieIsShown(false) + setGroupTableIsShown(true)}> 
                                    <div class="about-profileCircle"> </div> 
                                    <br></br> 
                                    <h2>Eddie</h2>
                                    <h3>Backend & Frontend</h3>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="center-tableRows">
                                <div class="founder-text-box" onMouseEnter={() => setSavannahIsShown(true) + setGroupTableIsShown(false)} onMouseLeave={() => setSavannahIsShown(false) + setGroupTableIsShown(true)}> 
                                    <div class="about-profileCircle">  </div>
                                    <br></br> 
                                    <h2>Savannah</h2>
                                    <h3>Frontend</h3>
                                </div>
                            </td>
                            <td class="center-tableRows">
                                <div class="founder-text-box" onMouseEnter={() => setNickIsShown(true) + setGroupTableIsShown(false)} onMouseLeave={() => setNickIsShown(false) + setGroupTableIsShown(true)}> 
                                    <div class="about-profileCircle"> </div>
                                    <br></br> 
                                    <h2>Nick</h2> 
                                    <h3>Frontend</h3>
                                </div>
                            </td>
                            <td class="center-tableRows">
                                <div class="founder-text-box" onMouseEnter={() => setJenaIsShown(true) + setGroupTableIsShown(false)} onMouseLeave={() => setJenaIsShown(false) + setGroupTableIsShown(true)}> 
                                    <div class="about-profileCircle">  </div>
                                    <br></br> 
                                    <h2>Jena</h2> 
                                    <h3>Frontend</h3>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                {isByronShown && (
                    <div class="aboutUs-text-box">
                        <table class="aboutUs-table">
                            <tr>
                                <td class="center-tableRows2">
                                    <div class="about-profileCircle">  </div> 
                                    <br></br> 
                                    <h2>Byron</h2> 
                                    <h3>Backend</h3>
                                </td>
                                <td>
                                    <h2>Bio:</h2>
                                    <p>......</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                )}
                {isEstebanShown && (
                    <div class="aboutUs-text-box">
                        <table class="aboutUs-table">
                            <tr>
                                <td class="center-tableRows2">
                                    <div class="about-profileCircle">  </div> 
                                    <br></br> 
                                    <h2>Esteban</h2> 
                                    <h3>Hardware</h3>
                                </td>
                                <td>
                                    <h2>Bio:</h2>
                                    <p>......</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                )}
                {isEddieShown && (
                    <div class="aboutUs-text-box">
                        <table class="aboutUs-table">
                            <tr>
                                <td class="center-tableRows2">
                                    <div class="about-profileCircle">  </div> 
                                    <br></br> 
                                    <h2>Eddie</h2> 
                                    <h3>Backend & Frontend</h3>
                                </td>
                                <td>
                                    <h2>Bio:</h2>
                                    <p>......</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                )}
                {isSavannahShown && (
                    <div class="aboutUs-text-box">
                        <table class="aboutUs-table">
                            <tr>
                                <td class="center-tableRows2">
                                    <div class="about-profileCircle">  </div> 
                                    <br></br> 
                                    <h2>Savannah</h2> 
                                    <h3>Frontend</h3>
                                </td>
                                <td>
                                    <h2>Bio:</h2>
                                    <p>......</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                )}
                {isNickShown && (
                    <div class="aboutUs-text-box">
                        <table class="aboutUs-table">
                            <tr>
                                <td class="center-tableRows2">
                                    <div class="about-profileCircle"> </div> 
                                    <br></br> 
                                    <h2>Nick</h2> 
                                    <h3>Frontend</h3>
                                </td>
                                <td>
                                    <h2>Bio:</h2>
                                    <p>......</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                )}
                {isJenaShown && (
                    <div class="aboutUs-text-box">
                        <table class="aboutUs-table">
                            <tr>
                                <td class="center-tableRows2">
                                    <div class="about-profileCircle"> </div> 
                                    <br></br> 
                                    <h2>Jena</h2> 
                                    <h3>Frontend</h3>
                                </td>
                                <td>
                                    <h2>Bio:</h2>
                                    <p>......</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                )}
            </div>
        </div>
    </div>  
    );
}



/*
<table class="about-welcome-table">
                    <tr>
                        <td class="welcome-table-c1">
                          <div class="about-background">
                            <div class="h3-about2">About Us</div>
                            <div class="about-text-box">From a group of friends to a project team, we created this solution to the growing problem of lack of consintrated and free data. Many weather stations and data collectors span a great range but are also congragated to specific locaiotns such that ........  </div>
                          </div>
                        </td>
                        <td class="welcome-table-c2">
                            <iframe title="Welcome Video" height="400px" width="100%" src="https://www.youtube.com/embed/tgbNymZ7vqY?"></iframe>
                        </td>
                    </tr>
                </table>
*/


export default Home;

