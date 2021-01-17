import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {
    Fade
  } from "shards-react";

function Header(props) {

    return(
        <div className={props.currentPage=="workout" ? "header small-header" : "header"}>
            <div className={props.currentPage=="workout" ? "background reduced-background" : "background"}></div>
            <h1 className={props.currentPage=="workout" ? "small-name" : ""}>Asany</h1>
        </div>
    );
}

export default Header;