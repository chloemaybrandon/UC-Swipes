//login will need to route to main page OR create account page
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "../CSS/Login.css";

export default function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const URL = "http://localhost:8080";
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        checkLogin();
    };

    const checkLogin = () => {
        axios
            .post(URL + "/login", {
                username: username,
                password: password,
            })
            .then((res) => {
                window.localStorage.setItem("token", res.data.data);
                window.localStorage.setItem("loggedIn", true);
                navigate("/search-listings");
                alert("Successfully logged in");
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err);
                alert("Failed to log in");
            });
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <div className="axios_lisitng_container">
                <h2>What is UC Swipes?</h2>
                <h3>UC Swipes is a site built with the intention of allowing the UCLA and UC community to buy and sell meal plan vouchers, or "swipes" in an online open market. The UCLA meal plan meal balance expires at the end of every week or quarter depending on the plan, leaving many students with an excess of swipes they couldn't use before this deadline. Additionally, many students and members of the UCLA community use up too many swipes and are in need of purchasing extra swipes, or have not purchased a UCLA meal plan for the quarter but would like to eat at a UCLA residential restaurant. This site enables community members to buy and sell swipes in an open market with sellers setting prices, and buyers selecting who they would like to purchase from. Login below to get started!</h3>
            </div>
            <div className="loginContainer">
                <h2>Log In</h2>
                <form>
                    <label htmlFor="username">Username </label>
                    <input
                        value={username}
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        placeholder="John Smith"
                    />
                    <br />
                    <label htmlFor="password">Password </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="***************"
                        id="password"
                        name="password"
                    />
                    <br />
                    <button onClick={handleSubmit}>
                        Login
                        {/* <Link to="/search-listings">Login</Link> */}
                    </button>
                </form>
                {/* successfully logging in will take you to search page */}
                <button>
                    <Link to="/create-account">Create an Account</Link>
                </button>
            </div>
        </div>
    );
}
