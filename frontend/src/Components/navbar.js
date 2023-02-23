//import logo from './logo.svg';
import {Link} from 'react-router-dom';

// export default function Navbar() {
//   return (
//     <div className="App">
//       <ul>
//         {/* note: Link underlying type is anchor */}
//         <p>This is the navbar</p>
//         <li><Link to='/'>Log Out (to SearchListings)</Link></li>
//         <li><Link to='/create-account'>Create account</Link></li>
//       </ul>

//       <Routes>
//         <Route path='/' element={<Login />}/>
//         <Route path='/search-listings' element={<SearchListings />}/>
//         <Route path='/create-account' element={<CreateAccount />}/>
//         <Route />
//       </Routes>

//     </div>
//   );
// }

export const Navbar = () => {
    return(
        <nav>
            <ul>
                <li><Link to='/search-listings'>Search Listings</Link></li>
                <li><Link to='/personal-listings'>My Listings</Link></li>
                <li><Link to='/my-profile'>My Profile</Link></li>
                <li><Link to='/'>Log Out (to Login)</Link></li>
            </ul>
        </nav>
    )
}