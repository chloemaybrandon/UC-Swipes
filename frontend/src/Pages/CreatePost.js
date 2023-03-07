//creating a post will need to route to main page
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function CreateAccount() {
//     const [email, setEmail] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [password, setPass] = useState("");
//     const [name, setName] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Created an account");
//     };

//     return (
//         <div>
//             <h2>Create an Account</h2>
//             <form>
//                 <label htmlFor="name">Full Name </label>
//                 <input
//                     value={name}
//                     name="name"
//                     onChange={(e) => setName(e.target.value)}
//                     id="name"
//                     placeholder="full Name"
//                 />
//                 <br />
//                 <label htmlFor="Email ">Email </label>
//                 <input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     placeholder="youremail@g.ucla.edu"
//                     id="email"
//                     name="email"
//                 />
//                 <br />
//                 <label htmlFor="phoneNumber">Phone Number </label>
//                 <input
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     id="phoneNumber"
//                     name="phoneNumber"
//                 />
//                 <br />
//                 <label htmlFor="password">Password </label>
//                 <input
//                     value={password}
//                     onChange={(e) => setPass(e.target.value)}
//                     type="password"
//                     placeholder="********"
//                     id="password"
//                     name="password"
//                 />
//                 <br />
//                 <button onClick={handleSubmit}>
//                     <Link to="/">Create Account</Link>
//                 </button>
//             </form>
//             <button>
//                 <Link to="/">Already have an account? Login here.</Link>
//             </button>
//         </div>
//     );
// }



export default function CreatePost(){
    return(
        <div>
            <p>This is the create post page. This can be navigated to from PersonalListings.</p>
        </div>
    )
}