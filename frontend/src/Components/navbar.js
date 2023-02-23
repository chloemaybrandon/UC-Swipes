import {Link} from 'react-router-dom';
import '../CSS/navbar.css';

export const Navbar = () => {
    return(
        <nav>
            <ul>
                <li><button className='nav-button'><Link to='/search-listings'>Search Listings</Link></button></li>
                <li><button className='nav-button'><Link to='/personal-listings'>My Listings</Link></button></li>
                <li><button className='nav-button'><Link to='/my-profile'>My Profile</Link></button></li>
                <li><button className='nav-button'><Link to='/'>Log Out (to Login)</Link></button></li>
            </ul>
        </nav>
    )
}