//login will need to route to main page OR create account page
import {Link} from 'react-router-dom';

export default function Login(){
    return(
        
        <div>
            <p>This is the login page. This should be the first page displayed when loading the site.</p>
                  {/* successfully logging in will take you to search page */}
            <button><Link to='/search-listings'>Login</Link></button>
            <br/>
            <button><Link to='/create-account'>Create an Account</Link></button>
        </div>
    )
}