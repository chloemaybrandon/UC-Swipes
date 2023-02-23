//import logo from './logo.svg';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login'
import SearchListings from './Pages/SearchListings'
import CreateAccount from './Pages/CreateAccount'
import { Navbar } from './Components/navbar';
import PersonalListings from './Pages/PersonalListings';
import EditProfile from './Pages/EditProfile';

function App() {
  return (
    <div className="App">

      <h1>UC Swipes</h1>      

      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/search-listings' element={
        <>
          <Navbar />
          <SearchListings />
          </>
        }/>
        <Route path='/personal-listings' element={
        <>
          <Navbar />
          <PersonalListings />
          </>
        }/>
        <Route path='/create-account' element={
        <>
          <CreateAccount />
          </>
        }/>
        <Route path='/my-profile' element={
        <>
          <Navbar />
          <EditProfile />
          </>
        }/>
        <Route />
      </Routes>

          </div>
  );
}

export default App;
