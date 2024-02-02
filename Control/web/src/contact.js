function Contact() {
    return (
        <div className='body'>
            <table class="center-table">
                <tr class="center-tableRows">
                    <td> <img src="location.jpg" width="500" height="350"></img> </td>
                    <td> 
                        <div class="details-text-box"> 
                            <div class="h4-contact">Details:</div> 
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
                            <button class="contact-details-submit">Submit</button>
                        </div> 
                    </td>
                </tr>
            </table> 
            <div class="contact-enquiry-text-box">
                <div class="h3-contact">Contact Us:</div>
                <div class="h3-contact">Title:</div> <div class="details-info-boxes">XXXXX</div>
                <div class="h3-contact">Enquiry:</div> <div class="details-info-boxes-enquiry">XXXXX</div>
                <button class="contact-details-submit">Submit</button>
            </div>
        </div>    
    );
}

export default Contact;