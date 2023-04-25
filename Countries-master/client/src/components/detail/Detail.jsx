import {React, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesDetail } from "../../redux/actions";
import Style from "./Detail.module.css"
import logo from "../Img/logo.png"

export default function CountryDetail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id
    const country = useSelector((state) => state.detail)
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getCountriesDetail(id))
    },[dispatch, id])

    function handleClick(e){
        e.preventDefault();
        history.push("/home")
    }

    return (
        
        <div className={Style.firstdiv}>

            <div className={Style.nav}>
            <Link to= "/home"><img className={Style.bothome} onClick={(e) => handleClick(e)} src={logo} alt="logo"></img></Link>
            </div>

            <div className={Style.card}>

                <div className={Style.conpais}>
                <h2 className={Style.titulo}>Country Details</h2>
            {
                country ?
                <div >
                    <img className={Style.flag} src={country.imgFlag} alt="Imagen no disponible" />
                    <h2 className={Style.nombre}>{country.name}</h2>
                    <h4 className={Style.continente}>{country.continent}</h4>
                    <h4 className={Style.codigo}>{country.id}</h4>
                    <h4 className={Style.detail}>Capital: {country.capital}</h4>
                    <h4 className={Style.detail}>Región: {country.subregion}</h4>
                    <h4 className={Style.detail}>Área: {country.area} km²</h4>
                    <h4 className={Style.detail}>Población: {country.population} Hab.</h4>
                </div> : <p>Loading ...</p>
            }
                </div>

            <div className={Style.conact}>
            <h3 className={Style.titulo}>Country Activities</h3>
            {
                country.Activities&&country.Activities.length ? 
            country.Activities.map(e => {
                return (
                        <div>
                            <h4 className={Style.h4}>{e.name}</h4>
                            <br/>
                            <p className={Style.detail}>Dificultad: {e.difficulty}</p>
                            <p className={Style.detail}>Duración: {e.duration} horas</p>
                            <p className={Style.detail}>Temporada: {e.season}</p>
                            <p className={Style.detail}>Rating: {e.rating}</p>
                        </div>
                        
                    ) 
                 }) 
                 : <p className={Style.p}>There are no activities in this country</p> 
            }
             <Link to="/activities"><button className={Style.botactd}>Create Activity</button></Link>               
            </div>
            </div>
        </div>
    )
};