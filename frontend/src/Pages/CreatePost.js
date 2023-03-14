//creating a post will need to route to main page
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const URL = "http://localhost:8080"
    // const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [meetTime, setMeetTime] = useState("")
    const [meetDate, setMeetDate] = useState("")
    const [quantity, setQuantity] = useState("")
    // const [password, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(price)
        console.log(location)
        console.log(meetTime)
        console.log(meetDate)
        console.log(quantity)
        console.log("Created an Listing");
        if(location=="") {
            alert("please enter a location")
            return
        }
        if(meetTime=="") {
            alert("please enter a meet time")
            return
        }
        //write egverything in here
        // axios.post('')
        // get all data here
        // create new endpoint on API (edit server .js file)
        //send axios request to API
        //
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
            const email = res.data.data.email
            const phone = res.data.data.phoneNumber
            axios.post(URL+'/listings', {
                poster_name: username,
                email: email,
                phone: phone,
                price: price,
                location: location,
                meet_time: meetTime,
                meet_date: meetDate,
                quantity: quantity
            }).then((result)=> {
                navigate("/personal-listings")
                alert("Listing created!")
            }).catch((err)=> {
                console.log(err)
                alert("Failure to create listing")
            })
        }
        setPrice(null);
        setLocation(null);
        setMeetTime(null);
        setMeetDate(null);
        setQuantity(null);
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
                        <option value="">--Please choose an option--</option>
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

                    <br />
                    <br />



                <label htmlFor="Meet Time">Choose a Time:   </label>
                <select name="meetTime" value={meetTime} onChange={(e) => setMeetTime(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>

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