import React from 'react';
import { Link } from 'react-router-dom';
import './Nbar.css';

function Nbar() {
  return (
  
    <nav className="navbar">
      <Link to={"/"} style={{textDecoration:'none', color: 'inherit'}}>
      <div className="logo" >TaskMaster</div>
      </Link>  
      <ul className="nav-list">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Kuch To</li>
      </ul>
    </nav>
  );
}

export default Nbar;
