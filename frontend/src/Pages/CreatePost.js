//creating a post will need to route to main page
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';




// function createPost1() {



//     const URL = "http://localhost:8080"

//     //
//     const getListing = () => {
//         axios.get(URL + "/listings") //returns a promise
//             .then(response => {
//                 console.log(response.data); //lets us access data from response
    
//             })
//             .catch(console.error)
//     }
// }

// getListing();


export default function CreatePost(){
    // const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [meetTime, setMeetTime] = useState("")
    const [meetDate, setMeetDate] = useState("")
    const [quantity, setQuantity] = useState("")
    // const [password, setPass] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Created an Listing");
        
        //write egverything in here
        // axios.post('')
        // get all data here
        // create new endpoint on API (edit server .js file)
        //send axios request to API
        //

    };
    
    
    const createListing = (username, price, quantity, location, meetTime, meetDate) => {
        axios.post(URL + "/listing")
    }


    return(
        <div>
            <h2>Create a Listing</h2>
            <p>This is the create post page. This can be navigated to from Personal Listings.</p>
            <form>
    
                <label htmlFor="price">Price Per Swipe:   </label>
                    <input
                        value={price}
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                        id="price"
                        placeholder="Price"
                    />
                    <br />
                    <br />

                <label htmlFor="quantity">Number of Swipes to Sell:   </label>
                    <input
                        value={quantity}
                        name="quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        id="quantity"
                        placeholder="Quantity"
                    />

                    <br />
                    <br />

                <label htmlFor="location">Choose a location:   </label>
                    <select name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="rieber">Epicuria</option>
                        <option value="hedrick">De Neve</option>
                        <option value="sproul">Feast</option>
                        <option value="de_neve">Bruin Plate</option>
                        <option value="de_neve">Bruin Cafe</option>
                        <option value="de_neve">Rendezvous</option>
                        <option value="de_neve">The Study</option>
                        <option value="de_neve">The Drey</option>
                        <option value="de_neve">Epic at Ackerman</option>
                        <option value="de_neve">Rieber Court Food Trucks</option>
                        <option value="de_neve">Sproul Court Food Trucks</option>
                        <option value="de_neve">De Neve Plaza Food Trucks</option>
                    </select>

                    <br />
                    <br />



                <label htmlFor="Meet Time">Choose a Time:   </label>
                    <input
                        type="time"
                        value={meetTime}
                        name="Meet time"
                        onChange={(e) => setMeetTime(e.target.value)}
                        id="Meet Time"
                        placeholder="Meet Time"
                    />

                    <br />
                    <br />

                <label htmlFor="Meet Date">Choose a Date:   </label>
                    <input
                        type="date"
                        value={meetDate}
                        name="Meet date"
                        onChange={(e) => setMeetDate(e.target.value)}
                        id="Meet Date"
                        placeholder="Meet Date"
                    />

                    <br />
                    <br />
                
                <button onClick={handleSubmit}>
                    <Link to="/search-listings">Publish Post</Link>
                </button>
            </form>
        </div>
    )
}