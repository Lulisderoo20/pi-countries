import React from "react";
import {Link} from "react-router-dom";
import style from "./Landing.module.css"


export default function LandingPage(){
    return(
        <div className={style.conPrin}>
            <div className={style.homepage}>
                <h1> Welcome to my proyect</h1>
                <br/>
            <Link to ="/home">
                <button className={style.boton}>Enter</button>
            </Link>
            </div>
            </div>
    )
}