import React, { useEffect, useState } from "react";
import logo from './EcoSentryLogo.png'; 
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
function Contact() {
    const { height, width } = useWindowDimensions();

    return (
        <div className='Contact'>
            <div class='container-contact'>
                <table class="contact-center-table">
                    <tr>
                        <td>
                            <img src={logo} alt="logo" class="center" height={200} width={200} style={{ alignSelf: 'center'}}/>   
                            <h1>EcoSentry</h1>
                            <h2>Contact</h2>
                            <p>enquire@ecosentry.com.au</p>
                            <h2>Address</h2>
                            <p>12 Northfields ave</p>
                            <p>Wollongong, NSW 2500</p>
                        </td>
                        <td>
                            <table class="contact-get-in-touch-table">
                                <tr>
                                    <h1>Get in touch</h1>
                                </tr>
                                <tr height="15px">
                                    <input class="details-info-boxes" type="text" placeholder="Name"></input>
                                </tr>
                                <tr height="15px">
                                    <input class="details-info-boxes" type="text" placeholder="Phone"></input> 
                                </tr>
                                <tr height="15px">
                                    <input class="details-info-boxes" type="text" placeholder="Email"></input>  
                                </tr>
                                <tr height="15px">
                                    <input class="details-info-boxes" type="text" placeholder="Address"></input>   
                                </tr>
                                <tr height="15px">
                                    <input class="details-info-boxes" type="text" placeholder="Title"></input>  
                                </tr>
                                <tr height="150px">
                                    <input class="details-info-boxes" type="text" placeholder="Enquiry"></input>   
                                </tr>
                                <tr>
                                    <br></br>
                                    <button class="contact-details-submit"> Submit </button>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr><h1>Find Us Here</h1></tr>
                </table>
                <iframe  class="contact-map" position="center" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Northfields%20Ave,%20Wollongong%20NSW%202522+(UOW)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" title="map"><a href="https://www.gps.ie/">Main Location</a></iframe>
                <br></br>
            </div>
        </div>
            
    );
}

export default Contact;