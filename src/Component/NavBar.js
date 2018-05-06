import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Physician extends Component {
	render() {
		return (
		<div>
			<NavLink exact to="/" activeStyle={this.active}>
			Login
			</NavLink>
			<NavLink exact to="/physician" activeStyle={this.active}>
			Physician
			</NavLink>
			<NavLink exact to="/patients" activeStyle={this.active}>
			Patients
			</NavLink>
		</div>);
	}
}

export default Physician