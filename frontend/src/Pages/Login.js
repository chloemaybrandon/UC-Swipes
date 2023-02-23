//login will need to route to main page OR create account page
import { Link } from "react-router-dom";
import React, { useState } from "react";

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
            <p>
                This is the login page. This should be the first page displayed
                when loading the site.
            </p>

            <h2>Log In</h2>
            <form>
                <label htmlFor="name">Full name</label>
                <input
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="full Name"
                />
                <label htmlFor="email">email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">password</label>
                <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button onClick={handleSubmit}>
                    <Link to="/search-listings">Login</Link>
                </button>
            </form>
            {/* successfully logging in will take you to search page */}
            <br />
            <button>
                <Link to="/create-account">Create an Account</Link>
            </button>
        </div>
    );
}
