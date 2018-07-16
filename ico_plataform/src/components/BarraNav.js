import React from "react";
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import './../App.css';
import "./../css/normalize.min.css"
import "./../css/bootstrap.min.css"
import "./../css/jquery.fancybox.css"
import "./../css/flexslider.css"
import "./../css/styles.css"
import "./../css/queries.css"
import "./../css/etline-font.css"
import "./../bower_components/animate.css/animate.min.css"

import logo from "./../img/paperPlane.png"

export default class BarraNav extends React.Component {

  render () {
    return (
          <section className="navigation fixed">          
            <header>
              <div className="header-content">
                {/*div class="logo"><a href="#"><img src="img/sedna-logo.png" alt="Sedna logo"></a></div*/}
                <div className="header-nav">
                  <nav>
                    <ul className="primary-nav">                                
                      <li><Link to={'/'}>Home</Link></li>
                      <li><a href="#Blockchain">Blockchain</a></li>
                      <li><a href="#icos">ICOs</a></li>
                      <li><a href="#icoList">ICO List</a></li>
                      <li><Link to={'/formulario'}>Create ICO</Link></li>
                      <li><a href="#about">About</a></li>
                      <li><a href="#download">Contact</a></li>
                    </ul>
                    <ul className="member-actions">
                      <li><a className="myTitle"><h4><img width={35} height={35} src={logo}/>    ICO-Launcher</h4></a></li>   
                    </ul>
                  </nav>
                </div>
              </div>
            </header>
          </section>
        
    );        
  }
}