import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getCountries, filterByContinents, orderByName, orderByPop, filterByAct, getActivities } from "../../redux/actions"; 
import Card from "../card/Card";
import Paginado from "../paginado/Paginado";
import Nav from "../nav/Nav";
import Style from "./Home.module.css"


export default function Home (){

    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)
    const activities = useSelector ((state) => state.allActivities)

    const [, setOrden]= useState("")

    const [currentPage, setCurrentPage] = useState(1)
    let [countriesPerPage, ] = useState(12)
    


    const indexOfLastCountrie = currentPage * countriesPerPage
    const indexOfFirstCountrie = indexOfLastCountrie - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountrie,indexOfLastCountrie)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getCountries());
        dispatch(getActivities());
    },[dispatch])

    function handleFilteredCountrie(e){
        dispatch(filterByContinents(e.target.value))
    };

    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleSortPop(e){
        e.preventDefault()
        dispatch(orderByPop(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleFilterByAct(e){
        e.preventDefault()
        e.target.value === "none" ? dispatch(getCountries()):
        dispatch(filterByAct(e.target.value))
        setCurrentPage(1)
    }

    

    return (
        <div className={Style.firstdiv}>
            
            <div><Nav
            setCurrentPage={setCurrentPage}
            /></div>
            
            <div className={Style.filter}>
            <div>
               <p className={Style.p}>Alphabetical</p>   
            <select className={Style.select} onChange={e => handleSort(e)}>
                <option></option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            </div>
            <div>
               <p className={Style.p}>People</p>
            <select className={Style.select} onChange={e => handleSortPop(e)}>
                <option value={"All"}> </option>
                <option value="mayp">Menor a Mayor</option>
                <option value="menp">Mayor a Menor</option>
            </select>
            </div>
            <div>
               <p className={Style.p}> Continent </p> 
            <select className={Style.select} onChange={e => handleFilteredCountrie(e)}>
                <option value={"All"}> </option>
                <option value={"South America"}>Sudamérica</option>
                <option value={"North America"}>Norteamérica</option>
                <option value={"Africa"}>África</option>
                <option value={"Asia"}>Asia</option>
                <option value={"Europe"}>Europa</option>
                <option value={"Oceania"}>Oceanía</option>
                <option value={"Antarctica"}>Antárctica</option>
            </select>
            </div>
            <div>
                <p className={Style.p}>Activities</p>
                {(activities.length === 0)? <p className={Style.p} >No Activities Found</p> :
                <select className={Style.select} onChange={e => handleFilterByAct(e)}>
                <option value="none"></option>
                {activities.map(e => (
                <option value={e.name} key={e.id}>{e.name}</option>
                ))}
                </select>
                }
            </div>
            </div>

            <div className={Style.containerCards}>    
           {currentCountries.length?currentCountries.map( (e) => {
               return (
                <div className={Style.Card}>
                <Card imgFlag={e.imgFlag} name={e.name} continent={e.continent} key={e.id} id={e.id} />
                </div>
                )
                }):<h1>no hay paises</h1>}
            </div>


            <div className={Style.pag}>
            <Paginado
            countriesPerPage = {countriesPerPage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            /> 
            </div>
        
        </div>
    )
}