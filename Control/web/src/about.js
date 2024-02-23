import React, { useState } from 'react';
function About() {
    const [isByronShown, setByronIsShown] = useState(false);
    const [isEstebanShown, setEstebanIsShown] = useState(false);
    const [isEddieShown, setEddieIsShown] = useState(false);
    const [isSavannahShown, setSavannahIsShown] = useState(false);
    const [isNickShown, setNickIsShown] = useState(false);
    const [isJenaShown, setJenaIsShown] = useState(false);

    return (
        <div className='About' style={{ height: "100vh"}}>
            <div class="About-page">
                <div class="container-about">
                    <table class="about-welcome-table">
                        <tr>
                            <td class="welcome-table-c1">
                                <div class="h3-about">Welcome</div>
                                <div class="welcome-text-box">We at EcoSentry strive to provide an open data center that people for all varieties of reasons from weather monitoring to personal interest can access and analiyse data freely. One can join the senrties by creating there own sentry or by following the provided examples. </div>
                            </td>
                            <td class="welcome-table-c2">
                                <iframe title="Welcome Video" height="400px" width="100%" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1"></iframe>
                            </td>
                        </tr>
                    </table>
                    <div class="about-background">
                        <div class="h3-about2">About Us</div>
                        <div class="about-text-box">From a group of friends to a project team, we created this solution to the growing problem of lack of consintrated and free data. Many weather stations and data collectors span a great range but are also congragated to specific locaiotns such that ........  </div>
                    </div>
                    <div class="h3-about">Founders</div>
                    <div id="aboutPersonElement">
                        <table class="center-table">
                            <tr>
                                <td class="center-tableRows">
                                    <div class="founder-text-box" onMouseEnter={() => setByronIsShown(true)} onMouseLeave={() => setByronIsShown(false)}>
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div>
                                        <br></br> 
                                        <h2>Byron</h2> 
                                        <h3>Backend</h3>
                                    </div>
                                </td>
                                <td class="center-tableRows"> 
                                    <div class="founder-text-box" onMouseEnter={() => setEstebanIsShown(true)} onMouseLeave={() => setEstebanIsShown(false)}> 
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div>
                                        <br></br> 
                                        <h2>Esteban</h2> 
                                        <h3>Hardware</h3>
                                    </div>
                                </td>
                                <td class="center-tableRows">
                                    <div class="founder-text-box" onMouseEnter={() => setEddieIsShown(true)} onMouseLeave={() => setEddieIsShown(false)}> 
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div> 
                                        <br></br> 
                                        <h2>Eddie</h2>
                                        <h3>Backend & Frontend</h3>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="center-tableRows">
                                    <div class="founder-text-box" onMouseEnter={() => setSavannahIsShown(true)} onMouseLeave={() => setSavannahIsShown(false)}> 
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div>
                                        <br></br> 
                                        <h2>Savannah</h2>
                                        <h3>Frontend</h3>
                                    </div>
                                </td>
                                <td class="center-tableRows">
                                    <div class="founder-text-box" onMouseEnter={() => setNickIsShown(true)} onMouseLeave={() => setNickIsShown(false)}> 
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div>
                                        <br></br> 
                                        <h2>Nick</h2> 
                                        <h3>Frontend</h3>
                                    </div>
                                </td>
                                <td class="center-tableRows">
                                    <div class="founder-text-box" onMouseEnter={() => setJenaIsShown(true)} onMouseLeave={() => setJenaIsShown(false)}> 
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div>
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
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div> 
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
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div> 
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
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div> 
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
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div> 
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
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div> 
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
                                        <div class="about-profileCircle"> <img src="placeholder.jpg" alt="placeholder" /> </div> 
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

export default About;