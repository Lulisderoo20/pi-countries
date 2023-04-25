import {React, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../redux/actions";

import Style from "./Create.module.css"
import logo from "../Img/logo.png"

function validate(input){
    let errors = {}
    let dif = Number(input.difficulty)
    let dur = Number(input.duration)

    if(!input.name) errors.name = "Campo Necesario"
    else if (/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = 'Nombre no puede tener caracteres especiales o tildes'

    if(!input.difficulty) errors.difficulty = "Campo Necesario"
    else if (dif <= 0 || dif > 5) errors.difficulty = "Debe ser entre 1 y 5"
    
    if(!input.duration) errors.duration = "Campo Necesario"    
    else if (dur <= 0 || dur > 24) errors.duration = "Debe ser entre 1 y 24"
        
    if(!input.season || input.season === "vacio") errors.season = "Campo Necesario"
    
    if(!input.countries || input.countries.length === 0) errors.countries = "Campo Necesario"

    return errors;
}

export default function CreateActivity(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
       name:"",
       difficulty:"",
       duration:"",
       season:"",
       countries:[]
    })

    useEffect (() => {
        dispatch(getCountries());
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    const handleSelect = (e) => {
        setInput((estado) => {
            if(e.target.name === "countries") {
                return {
                    ...estado,
                    countries: [...estado.countries, e.target.value]
                }
            } else {
                return {
                    ...estado,
                    [e.target.name]: e.target.value
                }
            }
    })}

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
            return alert ('Complete correctamente el formulario antes de enviarlo')
        }

        dispatch(postActivity(input))
        alert("Actividad Creada Exitosamente")
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countries:[]
        })
        history.push("/home")
    }

    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter( con => con !== e)
        })
    }

    function handleClick(e){
        e.preventDefault();
        history.push("/home")
        
    }

    useEffect(() => {
        dispatch(getCountries())
    },)


    return(
        <div className={Style.prindiv}>
            <div className={Style.bar}>
            <Link to= "/home"><img className={Style.bothome} onClick={(e) => handleClick(e)} src={logo} alt="logo"></img></Link>
            </div>
            <div className={Style.contenedorform}>
            <h2 className={Style.titulof}>Crea tu Actividad Turística</h2>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label className={Style.campos}>Nombre: </label>
                    <br/>
                    <input className={Style.inputs} type="text" value= {input.name} name= "name" onChange={(e)=> handleChange(e)}/>
                    {errors.name && (<p className={Style.errors}>{errors.name}</p>)}
                </div>
                <div>
                    <label className={Style.campos}>Escoja el país para su actividad: </label>
                    <br/>
                    <select className={Style.inputs} name="countries" id="countries" onChange={(e) => handleSelect(e)}>
                            <option> </option>                      
                        {countries.map((con) => (
                            <option value={con.id}>{con.name}</option>
                        ))}
                    </select>
                    {errors.countries && (<p className={Style.errors}>{errors.countries}</p>)}
                
                </div>
                <div>
                    <label className={Style.campos}>Temporada: </label>
                    <br/>
                    <select className={Style.inputs} name="season" id="season" onChange={(e) => handleSelect(e)}>
                    <option value="vacio"> </option>
                            <option value={"Verano"}>Verano </option>
                            <option value={"Invierno"}>Invierno </option>
                            <option value={"Primavera"}>Primavera </option>
                            <option value={"Otoño"}>Otoño </option>
                    </select>
                    {errors.season && (<p className={Style.errors}>{errors.season}</p>)}
                </div>
                <div>
                    <label className={Style.campos}>Dificultad: </label>
                    <br/>
                    <input className={Style.inputs} type="number" value= {input.difficulty} name= "difficulty" onChange={(e)=> handleChange(e)}/>
                    {errors.difficulty && (<p className={Style.errors}>{errors.difficulty}</p>)}
                </div>
                <div>
                    <label className={Style.campos}>Duración Hs: </label>
                    <br/>
                    <input className={Style.inputs} type="number" value= {input.duration} name= "duration" onChange={(e)=> handleChange(e)}/>
                    {errors.duration && (<p className={Style.errors}>{errors.duration}</p>)}
                </div>
                <div>
                    <button className={Style.botsub} type="submit" disabled={Object.keys(errors).length === 0 ? false : true}>Añadir Actividad</button>
                </div>
                
            </form>
                
                {input.countries.map(e =>
                    <div className={Style.conpais}>
                        <p className={Style.mpais}> {e} </p>
                        <button className={Style.botelim} onClick={()=> handleDelete(e)}>X</button>
                    </div>    
                    )}
                </div>    
        </div>
    )
}