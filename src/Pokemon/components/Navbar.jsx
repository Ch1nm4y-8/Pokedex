import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../style.css'

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className='navMain'>
        <img src="/logo.svg" onClick={() => { navigate("/") }} />
        <h1 onClick={() => setShowMenu(!showMenu)} className='hamburgerIcon'>☰</h1>
      </div>
      <div className={`nav-links ${showMenu ? "active" : ""}`}>
        <ul>
          <li><NavLink className="link" to={"/"}>Home </NavLink></li>
          <li><NavLink className="link" to={"/pokemons"}>Pokemons </NavLink></li>
          <li><NavLink className="link" to={"/favorites"}>Favorites</NavLink></li>
          <li><NavLink className="link" to={"/guess"}>Let's Guess</NavLink></li>
        </ul>
        {/* <span className="material-symbols-outlined MenuIcon">menu</span> */}
      </div>
    </nav>
  )
}

export default Navbar
