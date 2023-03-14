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
    const [username, setUsername] = useState(null)

    // Set up the search by location functionality
    const [filterParam, setFilterParam] = useState(["All"]);

    const [timefilterParam, setTimefilterParam] = useState(["All"])

    const [PriceSort, setPriceSort] = useState(["Any"])

    const locationMap = {
      "epicuria": "Epicuria",
      "de_neve": "De Neve",
      "feast": "Feast",
      "bplate": "Bruin Plate",
      "bcafe": "Bruin Cafe",
      "render": "Rendezvous",
      "study": "The Study",
      "drey": "The Drey",
      "epic_ackerman": "Epic at Ackerman",
      "rieber_truck": "Rieber Court Food Trucks",
      "sproul_truck": "Sproul Court Food Trucks",
      "de_neve_truck": "De Neve Plaza Food Trucks",
    };

    //function to get the listings
    const getListings = () => {
      // "/listings" retrieves from mongoDB endpoint in a response object
      //returns a promise, resolve with .then or .asyncawait
      axios.get(URL + "/listings")
        .then(response => {
          // console.log(response.data);
          setListings(response.data);
          // console.log(response.data)
        })
        .catch(console.error)
        axios.post(URL + "/accountData", {
            token: window.localStorage.getItem("token")}).then((res)=> {
              setUsername(res.data.data.username)
            })
      //use axios.post to do a post request
      //use axios.put to do a put request
      
    }
  
    //note: mapping creates a copy of array
    //array.map(function) -> applies funciton to elements of array, get copy of array w/ that funciton applied
    //for react, funciton should return JSX to be useful
    
    useEffect(() => {
      getListings();
    }, []);
    const buyListing = async (id) => {
      if(!confirm("Are you sure you would like to purchase this listing?")) {
        return
      }
      const res = await axios
        .post(URL + "/accountData", {
            token: window.localStorage.getItem("token"),
        })
        console.log(res);
        if (res.data.data === "token expired") {
            alert("Token expired. Please log in again");
            window.localStorage.clear();
            window.location.reload(true);
            navigate("/");
        } else {
            const username = res.data.data.username
            const phone = res.data.data.phoneNumber
            const email = res.data.data.email
            axios.post(URL+'/buyListing', {
              current_username:username,
              phone: phone,
              email: email,
              id: id
            })
            window.location.reload(true);
        }
    }
    // Function to sort the listings based off of critera
    function Sorted(listings){
      const searched_listings = search(listings)
      if(PriceSort == "Any"){
        return searched_listings
      }else if (PriceSort == "Low to High"){
        const Sorted_listings = [...searched_listings].sort((a, b) => a.price - b.price);
        return Sorted_listings 
      }else if (PriceSort == "High to Low"){
        const Sorted_listings = [...searched_listings].sort((a, b) => b.price - a.price);
        return Sorted_listings 
      }

    }

    // Function that searches through all of the listings and finds matching listings
    function search(listings) {
      return listings.filter((listing) => {
        if(listing.purchased_bool || listing.poster_username == username) {
          return false
        }
        if(listing.purchased_bool == false){ // Checks to see if the swipe has been purchased
          // If listing's location matches the selected location, return the listings which seller's name matches what was entered in the search bar.
          if (listing.location === filterParam){
            if (listing.meet_time === timefilterParam){ // Check to make sure that the time selected matches
              return searchParam.some((newItem) => { // Only output listings that match the search bar
                return (
                  listing[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search_by_name.toLowerCase()) > -1
                );
              });
            } else if (timefilterParam == "All"){ // If it matches the location filter but the time filter is any, proceed this way
              return searchParam.some((newItem) => {
                return (
                  listing[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search_by_name.toLowerCase()) > -1
                );
              });
            }
          } 
          // If no location options are sleected, check the location search and return the listings which seller's name matches what was entered in the search bar.
          else if (filterParam == "All") { 
            if (listing.meet_time === timefilterParam){
              return searchParam.some((newItem) => {
                
                return (
                  listing[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search_by_name.toLowerCase()) > -1
                );
              });
            } else if (timefilterParam == "All"){
              return searchParam.some((newItem) => {
                // if (listings[newItem] != undefined){
                return (
                  listing[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(search_by_name.toLowerCase()) > -1
                );
                // } else {
                //   return null;
                // }
              });
            }
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
                  <option value="epicuria">Epicuria</option>
                        <option value="de_neve">De Neve</option>
                        <option value="feast">Feast</option>
                        <option value="bplate">Bruin Plate</option>
                        <option value="bcafe">Bruin Cafe</option>
                        <option value="render">Rendezvous</option>
                        <option value="study">The Study</option>
                        <option value="drey">The Drey</option>
                        <option value="epic_ackerman">Epic at Ackerman</option>
                        <option value="rieber_truck">Rieber Court Food Trucks</option>
                        <option value="sproul_truck">Sproul Court Food Trucks</option>
                        <option value="de_neve_truck">De Neve Plaza Food Trucks</option>
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
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
                {/* <span className='focus'></span> */}
              </div>

              <div className='select'>
                {/* Implementation to sort by the price (Low to High or High to Low) */}
                <span className="sr-only">Sort By Price </span>
                <select 
                  onChange={(e) => {
                    setPriceSort(e.target.value);
                  }}
                  className="custom-select"
                  aria-label="Sort Listings By price"
                >
                  <option value="Any">Sort By Price</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
                {/* <span className='focus'></span> */}
              </div>
            </div>
            {/* If listings is null, don't load sorted. If listings is filled, then can load sorted */}
            {listings.length == 0 || username == null ? <div></div> : 
              Sorted(listings).map(listing => // Filters the output that matches the search critera then only displays these listings
                  <div className="axios_lisitng">
                      <h3>Seller: {listing.poster_username}</h3>
                      <p>List Date: {listing.post_date.slice(5,10)}-{listing.post_date.slice(0,4)}</p>
                      <p>Meet Location: {locationMap[listing.location]}</p>
                      <p>Meet Date: {listing.meet_date.slice(5,)}-{listing.meet_date.slice(0,4)}</p>
                      <p>Meet Time: {listing.meet_time}</p>
                      <p>Price: ${listing.price}</p>
                      <p>Quantity: {listing.quantity}</p>
                      <button onClick={()=>buyListing(listing._id)}>Buy Listing</button>
                      <br></br>
                  </div>
              )
            }
            </div>
            {/* <Listing />
            <Listing />
            <Listing /> */}
        </div>
    )
}