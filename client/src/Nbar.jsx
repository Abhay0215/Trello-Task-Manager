import React from 'react';
import { Link } from 'react-router-dom';
import './Nbar.css';

function Nbar() {
  return (
    <nav className="navbar">
      <div className="logo">TaskManager</div>
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
