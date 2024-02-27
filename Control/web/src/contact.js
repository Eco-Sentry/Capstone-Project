import React, { useEffect, useState } from "react";
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
            <table class="contact-center-table">
                <tr class="center-tableRows">
                    <td class="contact-center-table-col1"> <iframe  class="contact-map" width="90%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Northfields%20Ave,%20Wollongong%20NSW%202522+(UOW)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" title="map"><a href="https://www.gps.ie/">Main Location</a></iframe></td>
                    <td class="contact-center-table-col2"> 
                        <div class="details-text-box"> 
                            <div class="contact-h1">Details:</div> 
                            <table class="contact-details-table">
                                <tr>
                                    <td class="contact-details-table-col1">
                                        <div class="h3-contact">
                                            Name:
                                        </div> 
                                    </td>
                                    <td class="contact-details-table-col2">
                                        <input class="details-info-boxes-input" type="text">  
                                        </input>  
                                    </td>
                                </tr>
                                <tr>
                                    <td class="contact-details-table-col1">
                                        <div class="h3-contact">
                                            Phone:
                                        </div> 
                                    </td>
                                    <td class="contact-details-table-col2">
                                        <input class="details-info-boxes-input" type="text" >  
                                        </input>   
                                    </td>
                                </tr>
                                <tr>
                                    <td class="contact-details-table-col1">
                                        <div class="h3-contact">
                                            Email:
                                        </div> 
                                    </td>
                                    <td class="contact-details-table-col2">
                                        <input class="details-info-boxes-input" type="text" >  
                                        </input>   
                                    </td>
                                </tr>
                                <tr>
                                    <td class="contact-details-table-col1">
                                        <div class="h3-contact">
                                            Address:
                                        </div>
                                    </td>
                                    <td class="contact-details-table-col2">
                                        <input class="details-info-boxes-input" type="text" >  
                                        </input>          
                                    </td>
                                </tr>
                            </table>  
                            <br></br>
                            <button class="contact-details-submit"> Submit </button>
                            <br></br>
                        </div> 
                    </td>
                </tr>
            </table> 
            <div class="contact-enquiry-text-box">
                <div class="contact-h1">Contact Us:</div>
                <div class="contact-h1">Title:</div> <input class="details-info-boxes" type="text"></input>
                <div class="contact-h1">Enquiry:</div> <input class="details-info-boxes-enquiry" type="text"></input>
                <br></br> 
                <button class="contact-details-submit"> Submit </button>
            </div>
        </div>    
    );
}

export default Contact;