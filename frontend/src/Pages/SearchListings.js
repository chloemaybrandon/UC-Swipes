// import { Listing } from "../Components/listing"
import '../CSS/SearchListings.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SearchListings(){

    let [listings, setListings] = useState([]);

    const URL = "http://localhost:8080"
    
    // Set up the search by seller's name functionality
    const [search_by_name, setSearch_by_name] = useState("");
    const [searchParam] = useState(["poster_username"]);

    // Set up the search by location functionality
    const [filterParam, setFilterParam] = useState(["All"]);

    const [timefilterParam, setTimefilterParam] = useState(["All"])


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
          if (listings.meet_time === timefilterParam){ // Check to make sure that the time selected matches
            return searchParam.some((newItem) => { // Only output listings that match the search bar
              return (
                listings[newItem]
                      .toString()
                      .toLowerCase()
                      .indexOf(search_by_name.toLowerCase()) > -1
              );
            });
          }else if (timefilterParam == "All"){ // If it matches the location filter but the time filter is any, proceed this way
            return searchParam.some((newItem) => {
              return (
                listings[newItem]
                      .toString()
                      .toLowerCase()
                      .indexOf(search_by_name.toLowerCase()) > -1
              );
            });
          }
        } 
        // If no location options are sleected, check the location search and return the listings which seller's name matches what was entered in the search bar.
        else if (filterParam == "All") { 
          if (listings.meet_time === timefilterParam){
            return searchParam.some((newItem) => {
              return (
                listings[newItem]
                      .toString()
                      .toLowerCase()
                      .indexOf(search_by_name.toLowerCase()) > -1
              );
            });
          }else if (timefilterParam == "All"){
            return searchParam.some((newItem) => {
              return (
                listings[newItem]
                      .toString()
                      .toLowerCase()
                      .indexOf(search_by_name.toLowerCase()) > -1
              );
            });
          }
        }
    });
  }

    return(
        <div>
          <p>This is the SearchListings page. This can be navigated to from the navbar and is the first thing that should appear after logging in.</p>
          
          <div className="axios_lisitng_container">
            <div className="search-wrapper">
              <div className='select'>
                <label htmlFor="search-form">
                  {/* Implementation for the search bar */}
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
              </div>
              <div className='select'>
                {/* Implementation for the pick up filter */}
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
                {/* <span className='focus'></span> */}
              </div>

              <div className='select'>
                {/* Implementation for the time of pick up filter */}
                <span className="sr-only">Filter by Pickup Time </span>
                <select 
                  onChange={(e) => {
                    setTimefilterParam(e.target.value);
                  }}
                  className="custom-select"
                  aria-label="Filter Listings By Time of Pickup"
                >
                  <option value="All">Filter By Time</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
                {/* <span className='focus'></span> */}
              </div>
              



            </div>
              {search(listings).map(listing => // Filters the output that matches the search critera then only displays these listings
                  <div className="axios_lisitng">
                      <h3>Seller: {listing.poster_username}</h3>
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