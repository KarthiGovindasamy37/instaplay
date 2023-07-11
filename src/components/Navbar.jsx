import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar({ setSearch, setSearchCurrentPage, search }) {
  const loginStatus = localStorage.getItem("token");
  const navigate = useNavigate();

  const setValue = (e) => {
    setSearch(e.target.value);
    setSearchCurrentPage(1);
    sessionStorage.setItem("searchValue", e.target.value);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("User logged out successfully", { toastId: "loggedOut" });
    navigate("/");
  };

  return (
    <div className={`nav ${loginStatus ? `nav-flex` : ``}`}>
      <div className="logo">
        <img
          src="/assets/instaPlay.svg"
          onClick={() => navigate("/movies")}
          className="logoImg"
        />
      </div>
      {loginStatus ? (
        <div className="search">
          <div className="s-div">
            <input
              type="text"
              onChange={(e) => {
                setValue(e);
              }}
              value={search}
              className="search-box"
              placeholder="Search movies"
            />
            <div className="search-icon-div">
              <img src="/assets/searchIcon.svg" className="search-icon" />
            </div>
          </div>
          <div className="logout" onClick={logout}>
            Logout
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;
