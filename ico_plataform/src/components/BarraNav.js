import React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class BarraNav extends React.Component {

  render () {
    return (
      <Navbar inverse collapseOnSelect style={{height: "75px"}}>
          <Navbar.Header>
            <Navbar.Brand>
              <ul style={{listStyle: "none"}}>
                <li><a style={{color: "white", fontSize: "3vh",  marginLeft: "25px"}}>ICO FACTORY</a></li>
                <li><a style={{color: "white", fontSize: "1.75vh"}}>Created by SOFÍA VIDAL URRIZA</a></li>
              </ul>
            </Navbar.Brand>                    
          </Navbar.Header>
          <Navbar.Collapse>                    
            <Nav pullRight>
                <NavItem style={{color: "white", fontSize: "3vh",  marginLeft: "25px"}}> 
                    <Link to={'/'}>Home</Link>
                </NavItem>
                <NavItem style={{color: "white", fontSize: "3vh",  marginLeft: "25px"}}>
                    <Link to={'/formulario'}>Create ICO</Link>
                </NavItem>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );        
  }
}