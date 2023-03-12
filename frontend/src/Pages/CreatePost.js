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
    
    
    
    return(
        <div>
            <h2>Create a Listing</h2>
            <p>This is the create post page. This can be navigated to from Personal Listings.</p>
            <form>
                <label htmlFor="price">Price Per Swipe</label>
                    <input
                        value={price}
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                        id="price"
                        placeholder="Price"
                    />
                    <br />
                <label htmlFor="location">Choose a location </label>
                    <select name="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="rieber">Rieber</option>
                        <option value="hedrick">Hedrick</option>
                        <option value="sproul">Sproul</option>
                        <option value="de_neve">De Neve</option>
                    </select>
                    <br />
                    <br />
                <label htmlFor="Meet Time">Choose a time </label>
                    <select name="time" value={meetTime} onChange={(e) => setMeetTime(e.target.value)}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Late Night">Late Night</option>
                    </select>
                    <br />
                    <br />
                
                <button onClick={handleSubmit}>
                    <Link to="/search-listings">Publish Post</Link>
                </button>
            </form>
        </div>
    )
}