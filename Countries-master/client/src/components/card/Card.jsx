import React from "react";
import { useHistory } from "react-router-dom";
import Style from "./Card.module.css"


export default function Card({imgFlag, name, continent, id}) {

 const history = useHistory()

 const handleclick = () => {
    history.push(`/countries/${id}`)    
 }

    return (
        <div className={Style.card} onClick={handleclick}>
            <div><img className={Style.flag} src={imgFlag} alt="Imagen no disponible" /></div>
            <h3 className={Style.h3}>{name}</h3>
            <h5 className={Style.h5}>{continent}</h5>        
        </div>
    );
}