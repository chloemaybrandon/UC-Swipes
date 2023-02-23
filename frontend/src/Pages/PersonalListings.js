import { Listing } from "../Components/listing"

export default function PersonalListings(){
    return(
        <div>
            <p>This is the PersonalListings page. This can be navigated to from the navbar.</p>
            <Listing />
            <Listing />
        </div>
    )
}