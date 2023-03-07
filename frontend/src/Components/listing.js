import '../CSS/listing.css';
import {Link} from 'react-router-dom';
import React, { useState } from "react";

export const Listing = () => {
    return(
        <React.Fragment>
        <div className='listing_div'>
        <table>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Date</th>  
            </tr>
        </table>
            <p>This is a listing component</p>
            <br />
            <p>End of listing</p>
        </div>
        </React.Fragment>
        


    )
}