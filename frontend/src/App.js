//import logo from './logo.svg';
import {Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login'
import SearchListings from './Pages/SearchListings'
import CreateAccount from './Pages/CreateAccount'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <ul>
        {/* note: Link underlying type is anchor */}
        <li><Link to='/search-listings'>Login (to SearchListings)</Link></li>
        <li><Link to='/create-account'>Create account</Link></li>
      </ul>

      {/* successfully logging in will take you to search page */}
      <button><Link to='/search-listings'>Login</Link></button>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/search-listings' element={<SearchListings />}/>
        <Route path='/create-account' element={<CreateAccount />}/>
        <Route />
      </Routes>

      
      {/* <Login/> */}
    </div>
  );
}

export default App;
