import React from 'react'

function Navbar() {

  let loginStatus = Boolean(window.localStorage.getItem("loginStatus"))
  return (
    <div className={`nav ${loginStatus ? `nav-flex` : null}`}>
            <div className="logo">
                <img src='/assets/instaPlay.svg'/>
            </div>
            <div className="search">
              <div className="s-div">
              <input type="text" className='search-box' placeholder='Search movies'/>
              <div className="search-icon-div">
                <img src="/assets/searchIcon.svg" className='search-icon' />
              </div>
              </div>
              <div className="logout">Logout</div>
            </div>
           
            
    </div>
  )
}

export default Navbar