import { React } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCountries, getCountriesByName } from "../../redux/actions";
import Style from "./Nav.module.css";
import logo from "../Img/logo.png";

export default function NavBar({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	useEffect(() => {
		dispatch(getCountries());
	}, [dispatch]);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getCountries());
	}

	function handleInputChange(e) {
		dispatch(getCountriesByName(e));
		setCurrentPage(1);
	}

	return (
		<div className={Style.nav}>
			<div className={Style.logo}>
				<Link to="/home">
					<img
						className={Style.bothome}
						onClick={(e) => handleClick(e)}
						src={logo}
						alt="logo"></img>
				</Link>
			</div>
			<div className={Style.contsearch}>
				<div className={Style.search}>
					<div className={Style.searchTitle}>Find Your Destiny</div>
					<input
						className={Style.searchcountri}
						value={name}
						type="search"
						id="site-search"
						placeholder="Search Your Country..."
						onChange={(e) => {
							setName(e.target.value);
							handleInputChange(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className={Style.contAct}>
				<Link to="/activities">
					<button className={Style.botact}>Create Activity</button>
				</Link>
			</div>
		</div>
	);
}
