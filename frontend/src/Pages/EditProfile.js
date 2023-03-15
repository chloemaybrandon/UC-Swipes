import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfile() {
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const URL = "http://localhost:8080";
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //check field validity
        if (username.indexOf(' ') >= 0)
        {
            alert("Enter Valid username: (no whitespace)");
            console.log(err);
            //window.location.reload();
        }
        else if (!(email.endsWith("@g.ucla.edu")) && !(email.endsWith("@ucla.edu")))
        {
            alert("Enter Valid school email address: (...@g.ucla.edu)");
            console.log(err);
            //window.location.reload();
        }
        editAccount(username, password, name, email, phoneNumber);
    };

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

                setId(res.data.data._id);
                setUsername(res.data.data.username);
                setPassword("********");
                setName(res.data.data.name);
                setEmail(res.data.data.email);
                setPhoneNumber(res.data.data.phoneNumber);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editAccount = (username, password, name, email, phoneNumber) => {
        axios
            .patch(URL + "/accounts/" + id, {
                username: username,
                password: password,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
            })
            .then((res) => {
                alert("Successfully changed profile");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCurrentAccount();
    }, []);

    return (
        <div>
            <h2>Manage Your Profile</h2>
            <div className="axios_lisitng_container">
            <h3>After editing your personal information, click "Save Changes" to update your profile</h3>
            </div>
            <form>
                <label htmlFor="name">Name </label>
                <input
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                />
                <br />
                <label htmlFor="username">Username </label>
                {/* Doesn't allow username to be changed but still displays it to the user. */}
                <input
                    value={username}
                    name="username"
                    id="username"
                />
                <br />
                <label htmlFor="Email ">Email </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
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
                    id="password"
                    name="password"
                />
                <br />
                <button onClick={handleSubmit}>Save Changes</button>
            </form>
        </div>
    );
}
