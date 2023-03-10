//import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import SearchListings from "./Pages/SearchListings";
import CreateAccount from "./Pages/CreateAccount";
import { Navbar } from "./Components/navbar";
import PersonalListings from "./Pages/PersonalListings";
import EditProfile from "./Pages/EditProfile";
import CreatePost from "./Pages/CreatePost";

function App() {
    const isLoggedIn = window.localStorage.getItem("loggedIn");

    return (
        <div className="App">
            <h1>UC Swipes</h1>

            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn === "true" ? (
                            <>
                                <Navbar />
                                <SearchListings />
                            </>
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/search-listings"
                    element={
                        isLoggedIn === "true" ? (
                            <>
                                <Navbar />
                                <SearchListings />
                            </>
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/personal-listings"
                    element={
                        isLoggedIn === "true" ? (
                            <>
                                <Navbar />
                                <PersonalListings />
                            </>
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/create-post"
                    element={
                        isLoggedIn === "true" ? (
                            <>
                                <Navbar />
                                <CreatePost />
                            </>
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/create-account"
                    element={
                        isLoggedIn === "true" ? (
                            <>
                                <Navbar />
                                <CreateAccount />
                            </>
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/my-profile"
                    element={
                        isLoggedIn === "true" ? (
                            <>
                                <Navbar />
                                <EditProfile />
                            </>
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route />
            </Routes>
        </div>
    );
}

export default App;
