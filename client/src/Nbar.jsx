import React from 'react';
import { Link } from 'react-router-dom';
import './Nbar.css';

function Nbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
  
    <nav className="navbar">
      <Link to={"/"} style={{textDecoration:'none', color: 'inherit'}}>
      <div className="logo" >TaskMaster</div>
      </Link>  
      <ul className="nav-list">
        <li><Link to = {"/"}>Home</Link></li>
        <li><Link to = {"about"}>About</Link></li>
        <li>Contact</li>
        
        {user ? (
          <li className='profile'>
            
            <Link to = {"about"}>{user.name} </Link>
          </li>
        ) : (
          <li>Login</li>
        )}

      </ul>
    </nav>
  );
}

export default Nbar;
