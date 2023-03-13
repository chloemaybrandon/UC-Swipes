import '../CSS/SearchListings.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SearchListings(){

    let [listings, setListings] = useState([]);

    const URL = "http://localhost:8080"
    
    // Set up the search by seller's name functionality
    const [search_by_name, setSearch_by_name] = useState("");
    const [searchParam] = useState(["poster_username"]);

    // Set up the search by location functionality
    const [filterParam, setFilterParam] = useState(["All"]);

    const [timefilterParam, setTimefilterParam] = useState(["All"])

    const [PriceSort, setPriceSort] = useState(["Any"])

    //function to get the listings
    const getListings = () => {
      // "/listings" retrieves from mongoDB endpoint in a response object
      //returns a promise, resolve with .then or .asyncawait
      axios.get(URL + "/listings")
        .then(response => {
          setListings(response.data);
          // console.log(response.data)
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

    // Function to sort the listings based off logged in user
    function Sorted(listings){
      const searched_listings = search(listings)
      return searched_listings
    }

    // Function that searches through all of the listings and finds listings from logged-in user
    function search(listings) {

      return listings.filter((listings) => {
        if(listings.purchased_bool == false){ // Checks to see if the swipe has been purchased
            return searchParam.some((newItem) => { // Only output listings that match the search bar
                return (
                  listings[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf("chloe".toLowerCase()) > -1
                );
              });
      }
    });
  }

    return(
        <div>
            <p>This is the PersonalListings page. This can be navigated to from the navbar.</p>
            <button><Link to='/create-post'>Create Post</Link></button>

          <div className="axios_lisitng_container">
              {Sorted(listings).map(listing => // Filters the output that matches the logged-in user then only displays these listings
                  <div className="axios_lisitng">
                      <h3>Seller: {listing.poster_username}</h3>
                      <p>Where to meet: {listing.location}</p>
                      <p>Price: ${listing.price}</p>
                  </div>
              )}
            </div>
        </div>
    )
}