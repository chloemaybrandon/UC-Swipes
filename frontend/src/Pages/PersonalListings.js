import '../CSS/SearchListings.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchListings(){

    // const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [purchasedSwipes, setPurchasedSwipes] = useState(null);
    // const [email, setEmail] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [password, setPassword] = useState("");
    // const [name, setName] = useState("");

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


    const URL = "http://localhost:8080";
    const navigate = useNavigate();

    //find the username of the logged-in user

    const getCurrentAccount = () => {
        // get the information of the current account to fill in fields
        axios
            .post(URL + "/accountData", {
                token: window.localStorage.getItem("token"),
            })
            .then((res) => {
                // log out if token expired
                if (res.data.data === "token expired") {
                    alert("Token expired. Please log in again");
                    window.localStorage.clear();
                    window.location.reload(true);
                    navigate("/");
                }

                // setId(res.data.data._id);
                setUsername(res.data.data.username);
                // setPassword("********");
                // setName(res.data.data.name);
                // setEmail(res.data.data.email);
                // setPhoneNumber(res.data.data.phoneNumber);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCurrentAccount();
    }, []);

    

    //Only display the posts from the logged-in username found above

    let [listings, setListings] = useState([]);

    // Set up the search by seller's name functionality
    const [searchParam] = useState(["poster_username"]);

    // Set up the search by location functionality

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
        if(true){ // Checks to see if the swipe has been purchased
            return searchParam.some((newItem) => { // Only output listings that match the search bar
                return (
                  listings[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(username.toLowerCase()) > -1
                );
              });
      }
    });
  }
  useEffect(()=> {
    getPurchases();
  }, [username, listings])
  const getPurchases = () => {
    const purchased = listings.filter((listing) => {
      return listing.purchaser_name == username
    }) 
    setPurchasedSwipes(purchased)
  }
    return(
        <div>
            <div className="axios_lisitng_container">
            <h3>Welcome to the "My Listings" page. All of your currently active as well as sold swipe listings will be shown below. Scroll down to view listings that you have purchased from other users and see their contact info. Click "Create Post" to create a new swipe listing.</h3>
            </div>
            <button><Link to='/create-post'>Create Post</Link></button>

          <div className="axios_lisitng_container">
            <h2>Listed Swipes</h2>
            <div className="axios_flex_container">
              {Sorted(listings).map(listing => // Filters the output that matches the logged-in user then only displays these listings
                  <div className="axios_lisitng" style={listing.purchased_bool ? {"backgroundColor": "palegreen"} :{}}>

                      {listing.purchased_bool ?<div>
                        <h3>Sold To: {listing.purchaser_name}</h3>
                        <h4>Purchaser Email: {listing.purchaser_email} </h4>
                        <h4>Purchaser Phone Number: {listing.purchaser_phone}</h4>
                      </div> :<div></div> }
                      
                      <p>List Date: {listing.post_date.slice(5,10)}-{listing.post_date.slice(0,4)}</p>
                      <p>Meet Location: {locationMap[listing.location]}</p>
                      {/* {console.log(typeof listing.meet_date)} */}
                      <p>Meet Date: {listing.meet_date.slice(5,)}-{listing.meet_date.slice(0,4)}</p>
                      <p>Meet Time: {listing.meet_time}</p>
                      <p>Price: ${listing.price}</p>
                      <p>Quantity: {listing.quantity}</p>
                      
                  </div>
              )}
            </div>
            </div>

            <div className="axios_lisitng_container">
            <h2>Purchased Swipes</h2>
            {purchasedSwipes == null ? <div></div> : <div>
            <div className="axios_flex_container">
              {purchasedSwipes.map(listing => (
              <div className="axios_lisitng">
                <h3>Seller: {listing.poster_username}</h3>
                <h4>Seller Email: {listing.poster_email} </h4>
                <h4>Seller Phone Number: {listing.poster_phone} </h4>
                {/* {console.log(locationMap.listing.location)} */}
                <p>Meet Location: {locationMap[listing.location]}</p>
                {/* {console.log(typeof listing.meet_date)} */}
                <p>Meet Date: {listing.meet_date.slice(5,)}-{listing.meet_date.slice(0,4)}</p>
                <p>Meet Time: {listing.meet_time}</p>
                <p>Price per Swipe: ${listing.price}</p>
                <p>Quantity: {listing.quantity}</p>
              </div>))}
              </div>
              </div>}
          </div>
        </div>
    )
}