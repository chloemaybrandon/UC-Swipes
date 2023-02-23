import { Listing } from "../Components/listing"

export default function SearchListings(){
    return(
        <div>
            <p>This is the SearchListings page. This can be navigated to from the navbar and is the first thing that should appear after logging in.</p>
            <Listing />
            <Listing />
            <Listing />
        </div>
    )
}