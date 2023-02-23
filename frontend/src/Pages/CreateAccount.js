//route back to login page after successfully creating account
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateAccount() {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPass] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Created an account");
    };

    return (
        <div>
            <h2>Create an Account</h2>
            <form>
                <label htmlFor="name">Full Name</label>
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
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    id="phoneNumber"
                    name="phoneNumber"
                />
                <label htmlFor="password">password</label>
                <input
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="********"
                    id="password"
                    name="password"
                />
                <button onClick={handleSubmit}>
                    <Link to="/">Create an Account</Link>
                </button>
            </form>
            <button>
                <Link to="/">Already have an account? Login here.</Link>
            </button>
        </div>
    );
}
