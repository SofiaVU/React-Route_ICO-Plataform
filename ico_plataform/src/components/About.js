import React from "react";
import BarraNav from './BarraNav'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import {Col, label, Button, ListGroup, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


export default class About extends React.Component {

	constructor(props){
        super(props);
    }

    render() {
    	return(
    		<div>
		        <BarraNav />
    			<h1> ABOUT US </h1>
		    </div>
    	);
    }

}