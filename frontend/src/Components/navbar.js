import { Link, useNavigate } from "react-router-dom";
import "../CSS/navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.reload(true);
        navigate("/");
    };

    return (
        <nav>
            <ul>
                <li>
                    <button className="nav-button">
                        <Link to="/search-listings">Search Listings</Link>
                    </button>
                </li>
                <li>
                    <button className="nav-button">
                        <Link to="/personal-listings">My Listings</Link>
                    </button>
                </li>
                <li>
                    <button className="nav-button">
                        <Link to="/my-profile">My Profile</Link>
                    </button>
                </li>
                <li>
                    <button className="nav-button" onClick={logOut}>
                        Log Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};
