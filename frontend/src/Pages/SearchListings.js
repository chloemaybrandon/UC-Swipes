import { Listing } from "../Components/listing"
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SearchListings(){

    let [listings, setListings] = useState([]);

    const URL = "http://localhost:8080"
  
    //function to get the listings
    const getListings = () => {
      // "/listings" retrieves from mongoDB endpoint in a response object
      //returns a promise, resolve with .then or .asyncawait
      axios.get(URL + "/listings")
        .then(response => {
          setListings(response.data);
          //console.log(response.data)
        })
        .catch(console.error)
  
      //use axios.post to do a post request
      //use axios.put to do a put request
    }
  
    //note: mapping creates a copy of array
    //array.map(function) -> applies funciton to elements of array, get copy of array w/ that funciton applied
    //for react, funciton should return JSX to be useful
  
    useEffect(() => {
      getListings();
    }, []);

    return(
        <div>
            <p>This is the SearchListings page. This can be navigated to from the navbar and is the first thing that should appear after logging in.</p>
            
            <div>
            {listings.map(listing =>
                    <div>
                        <h3>{listing.poster_name}</h3>
                        <h3>{listing.location}</h3>
                    </div>
                )}
            </div>
            <Listing />
            <Listing />
            <Listing />
        </div>
    )
}