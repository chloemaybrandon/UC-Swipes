//login will need to route to main page OR create account page
import { Link } from "react-router-dom";
import React, { useState } from "react";
import '../CSS/Login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logged in");
    };

    return (
        <div>
            <div className="loginContainer">
            <h2>Log In</h2>
            <p>
                This is the login page. This should be the first page displayed
                when loading the site.
            </p>
            <form>
                <label htmlFor="name">Full name </label>
                <input
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="John Smith"
                />
                <br />
                <label htmlFor="email">Email </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@g.ucla.edu"
                    id="email"
                    name="email"
                />
                <br />
                <label htmlFor="password">Password </label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="***************"
                    id="password"
                    name="password"
                />
                <br />
                <button onClick={handleSubmit}>
                    <Link to="/search-listings">Login</Link>
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
