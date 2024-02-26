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
                    <td> <iframe  class="contact-map" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Northfields%20Ave,%20Wollongong%20NSW%202522+(UOW)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" title="map"><a href="https://www.gps.ie/">Main Location</a></iframe></td>
                    <td> 
                        <div class="details-text-box"> 
                            <h5>Details:</h5> 
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
                            <button class="contact-details-submit"> Submit </button>
                        </div> 
                    </td>
                </tr>
            </table> 
            <div class="contact-enquiry-text-box">
                <h5>Contact Us:</h5>
                <div class="h3-contact">Title:</div> <input class="details-info-boxes" type="text"></input>
                <div class="h3-contact">Enquiry:</div> <input class="details-info-boxes-enquiry" type="text"></input>
                <br></br> 
                <button class="contact-details-submit"> Submit </button>
            </div>
        </div>    
    );
}

export default Contact;