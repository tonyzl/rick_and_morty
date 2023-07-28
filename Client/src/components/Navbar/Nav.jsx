import React from "react";
import SearchBar from "./SearchBar/SearchBar.jsx";
import style from "./Nav.module.css";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <div className={style.container}>
      <Link to="/home">HOME</Link>
      <Link to="/favorites">FAVORITES</Link>
      {/* <Link to="/create">ADD CHARACTER!</Link> */}
      <SearchBar onSearch={props.onSearch} />
      <Link to="/about">ABOUT</Link>
      <Link to="/dashboard/2">PROFILE</Link>
      <button className={style.btn} onClick={props.out}>
        LOGOUT
      </button>
    </div>
  );
}
