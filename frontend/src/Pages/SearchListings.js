// import { Listing } from "../Components/listing"
import '../CSS/SearchListings.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SearchListings(){

    let [listings, setListings] = useState([]);

    const URL = "http://localhost:8080"
    
    // This  
    const [search_by_name, setSearch_by_name] = useState("");
    const [searchParam] = useState(["poster_name"]);

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

    function search(listings) {
      return listings.filter((listings) => {
          return searchParam.some((newItem) => {
              return (
                listings[newItem]
                      .toString()
                      .toLowerCase()
                      .indexOf(search_by_name.toLowerCase()) > -1
              );
          });
      });
  }

    return(
        <div>
            <p>This is the SearchListings page. This can be navigated to from the navbar and is the first thing that should appear after logging in.</p>
            
            <div className="axios_lisitng_container">
            <div className="search-wrapper">
              <label htmlFor="search-form">
                <span className="sr-only">Search by Seller's Name </span>
                <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for Sellers"
                    value={search_by_name}
                    /*
                    // set the value of our useState q
                    //  anytime the user types in the search box
                    */
                    onChange={(search_by_name) => setSearch_by_name(search_by_name.target.value)}
                />
              </label>
            </div>
            {search(listings).map(listing =>
                    <div className="axios_lisitng">
                        <h3>Seller: {listing.poster_name}</h3>
                        <p>Where to meet: {listing.location}</p>
                        <p>Price: ${listing.price}</p>
                    </div>
                )}
            </div>
            {/* <Listing />
            <Listing />
            <Listing /> */}
        </div>
    )
}