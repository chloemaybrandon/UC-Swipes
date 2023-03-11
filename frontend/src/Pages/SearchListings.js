// import { Listing } from "../Components/listing"
import '../CSS/SearchListings.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SearchListings(){

    let [listings, setListings] = useState([]);

    const URL = "http://localhost:8080"
    
    // Set up the search by seller's name functionality
    const [search_by_name, setSearch_by_name] = useState("");
    const [searchParam] = useState(["poster_name"]);

    // Set up the search by location functionality
    const [filterParam, setFilterParam] = useState("All");

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
        // If listing's location matches the selected location, return the listings which seller's name matches what was entered in the search bar.
        if (listings.location === filterParam){
          return searchParam.some((newItem) => {
            return (
              listings[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(search_by_name.toLowerCase()) > -1
            );
          });
        } 
        // If no location options are sleected, return the listings which seller's name matches what was entered in the search bar.
        // else { 
        else if (filterParam === "All") { 
          return searchParam.some((newItem) => {
            return (
              listings[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(search_by_name.toLowerCase()) > -1
            );
          });
        }
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
                    // set the value of our useState search_by_name
                    //  anytime the user types in the search box
                    */
                    onChange={(search_by_name) => setSearch_by_name(search_by_name.target.value)}
                />
              </label>
              <div className='select'>
                <span className="sr-only">Filter by Pickup Location </span>
                <select 
                  onChange={(e) => {
                    setFilterParam(e.target.value);
                  }}
                  className="custom-select"
                  aria-label="Filter Listings By Location"
                >
                  <option value="All">Filter By Location</option>
                  <option value="rieber">Rieber</option>
                  <option value="hedrick">Hedrick</option>
                  <option value="sproul">Sproul</option>
                  <option value="de_neve">De Neve</option>
                  <option value="Epicuria">Epicuria</option>
                </select>
                <span className='focus'></span>
              </div>




            </div>
              {search(listings).map(listing => // Filters the output to match the search critera
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