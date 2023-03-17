//route back to login page after successfully creating account
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const URL = "http://localhost:8080";
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount(username, password, name, email, phoneNumber);
    };

    const createAccount = (username, password, name, email, phoneNumber) => {
        axios
            .post(URL + "/register", {
                username: username,
                password: password,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
            })
            .then((res) => {
                navigate("/");
                alert("Account created with email " + email);
            })
            .catch((err) => {
                console.log(err);
                alert("Account failed to create");
            });
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        setPhoneNumber("");
    };

    return (
        <div>
            <h2>Create an Account</h2>
            <form>
                <label htmlFor="name">Full Name </label>
                <input
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Full Name"
                />
                <br />
                <label htmlFor="username">Username </label>
                <input
                    value={username}
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    placeholder="Username"
                />
                <br />
                <label htmlFor="Email ">Email </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@g.ucla.edu"
                    id="email"
                    name="email"
                />
                <br />
                <label htmlFor="phoneNumber">Phone Number </label>
                <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="phoneNumber"
                    name="phoneNumber"
                />
                <br />
                <label htmlFor="password">Password </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <br />
                <button onClick={handleSubmit}>Create Account</button>
            </form>
            <button>
                <Link to="/">Already have an account? Login here.</Link>
            </button>
        </div>
    );
}
