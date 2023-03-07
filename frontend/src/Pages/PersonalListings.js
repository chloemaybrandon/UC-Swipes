import { Listing } from "../Components/listing"
import { Link } from 'react-router-dom';

export default function PersonalListings(){
    return(
        <div>
            <p>This is the PersonalListings page. This can be navigated to from the navbar.</p>
            <button><Link to='/create-post'>Create Post</Link></button>
            <Listing />
            <Listing />
        </div>
    )
}