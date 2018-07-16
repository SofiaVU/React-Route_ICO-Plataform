import React, { Component } from 'react';
//import {Col, Navbar, NavItem, Row, Button} from 'react-bootstrap';
import './App.css';
import "./css/normalize.min.css"
import "./css/bootstrap.min.css"
import "./css/jquery.fancybox.css"
import "./css/flexslider.css"
import "./css/styles.css"
import "./css/queries.css"
import "./css/etline-font.css"
import "./bower_components/animate.css/animate.min.css"
//import "http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
import logo from "./img/paperPlane.png"
import devices from "./img/devices.png"
import macbook from "./img/macbook-pro.png"
import img1 from  "./img/blog-img-01.jpg"
import img2 from  "./img/blog-img-02.jpg"
import img3 from  "./img/blog-img-03.jpg"
import sketch from "./img/sketch-logo.png"
import sofia from "./img/sofia.jpg"
import pavon from  "./img/pavon.jpg"
import etsit from "./img/etsit.png"
import banner from "./img/testimonials-bg.jpg"

//import Index from './index2';
//import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Col} from 'react-bootstrap';

import { default as Web3} from 'web3';
import contractArtifact from './build/contracts/IcoDDBB.json'
import contractERC20 from './build/contracts/createERC20.json'
import { default as contract } from 'truffle-contract'

import {Carousel} from 'react-bootstrap';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Formu from './components/Formu'
import BarraNav from './components/BarraNav'
import IcoList from './components/IcoList'
import InfoDetail from './components/InfoDetail'
//import About from './components/About'

import {Link} from 'react-router-dom';


// WEB3 INJECTION 
// eslint-disable-next-line
var web3 = window.web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    //  Especificamos el provider 
    // empleando chrome con MetaMask el provider es injectado automaticamente
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

var account = web3.eth.accounts[0];
//console.log(account);

// eslint-disable-next-line
var arrayERC20 = new Array(); // guarda los contratos de los tokens creados



class App extends React.Component {

   /* 
    * Constructor que define el estado del componente
    */
    constructor(props){
        super(props);

        this.state = ({
            contrato: null,
            lastICO: null,
            event_Register: null,
            event_Transfer: null, 
            id_Array: null,
            icoClicked: null,       
        });
        this.formCliked = this.formCliked.bind(this);
        this.registerNewICO = this.registerNewICO.bind(this);
        this.deployNewERC20 = this.deployNewERC20.bind(this);
        this.updateList = this.updateList.bind(this);
        this.executeTransfer = this.executeTransfer.bind(this);     
        this.clickedICO = this.clickedICO.bind(this);
    }


    /*
    * Métdo invocado 1 vez antes de que el render inicial ocurra 
    */ 
    async componentWillMount() {

        var theContract = contract(contractArtifact);

        theContract.setProvider(web3.currentProvider);


        // CONTRATO     
        var contrato = await theContract.deployed(); // ESTO YA ME GUARDA EL CONTRATO
        //console.log("Contrato =", contrato);
        console.log(contrato);

        // EVENTO 
        var eventReg = contrato.Register();
       //console.log(event);

        // LANZAMOS WATCH
        eventReg.watch((err, event) => {
            //console.log(event);
            if (err){
                console.log(err);
            } else {
                console.log("This is the event!");
                //console.log(event);
                console.log("ICO was created/registered by: " + event.args.icoOwner);

                var icoId = event.args.id;

                console.log("The last ICO was given the following ID: " + icoId);

                // eslint-disable-next-line
                var last = new Object();
                last.id = event.args.id;
                last.name = event.args.name;
                last.opppeningDate = event.args.opppening;
                last.clossingDate = event.args.clossing;
                last.owner = event.args.icoOwner;

                //console.log(last.valueOf());


                this.setState({
                    lastICO: last.valueOf(),
                }); 
                this.updateList();
            }
        });
        console.log("eventReg watch has been started");

        this.setState({
            contrato: contrato,
            event_Register: eventReg,           
        });
        this.updateList();

    }

    /*
    * Metodo que recibe props del componente Form con la info introducida
    */
    async formCliked (formInfo) {

        console.log("formInfo recieved");
        console.log(formInfo);

        // Desplegar ERC20 de la new ICO
        var tokenAddr =  await this.deployNewERC20(formInfo);
        console.log("TRAZA 2: " + tokenAddr);   

        // Guardar nueva ICO en Smart Contract IcoDDBB.sol
        this.registerNewICO(formInfo, tokenAddr);       

        // Actualizar listado de ICos
        this.updateList();

    }

    /*
    * Se conecta con la blockchain para interactuar con el smart contract IcoDDBB.sol
    */
    registerNewICO(info, tokenAdd) {
        //console.log(">>>>REGISTER<<<<<<");
        //console.log(info);
        
        var add = tokenAdd;
        console.log(info.icoWebsite);

        //this.state.contrato.register(info.icoName, info.icoWebsite, add, info.OpeningDate, info.ClossingDate, {from: account, gas:2000000})
        this.state.contrato.register(info.icoName, info.icoWebsite, add, info.OpeningDate, info.ClosingDate, {from: account, gas:2000000})
        .then(res => {
            console.log("SUCCES ICO Registered");
        })
        .catch(err => {
            console.log("ERROR", err);
        });

    }


    /*
    * Método que despliega sobre la Blockhain el nuevo ERC20 creado
    */
    async deployNewERC20(info) {
        //console.log(">>>>DEPLOY ERC20<<<<<<");
        //console.log(info);
        
        var theERC20 = contract(contractERC20);

        theERC20.setProvider(web3.currentProvider);
        

        // CONTRATO 
        // New instance of the Smart Contract -> NEW TOKEN
        var tokenInstance = await theERC20.new({from: account, gas:2000000}).then(function(instanciaERC20){
            // print addr of the new token 
            console.log(">>>>>>>>> NEW TOKEN <<<<<<<<<<<");
            console.log(instanciaERC20.address);
            return (instanciaERC20);
        });       

        tokenInstance.setERC2Params(info.tokenName, info.symbol, info.tokenDecimals, info.tokenTotalSupply, info.tokenPrice, account,
            {from: account, gas:200000}).then((res, err) => {
                if(!err){
                    console.log(">>>>> PARAMs SET <<<<<<");
                }else{
                    console.log(err);
                }
        });

        // Actualizamos array
        arrayERC20.push(tokenInstance);
        //console.log("array lenght" + arrayERC20.length);        

        // EVENTO
        var eventTransfer = tokenInstance.Transfer();
        //console.log(eventTransfer);

        // LANZAMOS WATCH
        eventTransfer.watch((err, event) => {
            //console.log(event);
            if (err){
                console.log(err);
            } else {
                console.log("This is the Transfer event!");
                //console.log(event);
                console.log(">>>>> TANSFER MADE <<<<<");
                console.log("Anamount of " + event.args.value + " tokens have been transfered to " + event.args.to);    
            }
        });
        console.log("eventTransfer watch has been started"); 

        this.setState({
            event_Transfer: eventTransfer,          
        });

        // RETURN THE ADDRESS OF THE CONTRACT CREATED ABOVE
        //console.log("TRAZA 1: " + tokenInstance.address);
        return tokenInstance.address;
    }


    /*
    * Metodo que pide a la Blockchain el array de id's de las ICOs
    */
    async updateList(){
        console.log("UPDATE ICO LIST ");
        var idArray = [] 
        idArray = await this.state.contrato.getIdIcos.call();
        //console.log(idArray);
        this.setState({ id_Array: idArray});
    }


    /*
    * Método que jecuta la tranferencia para la compra de tokens
    */
    async executeTransfer(contractID, finalAmount, amount){

        //console.log("TRAZA 4");
        //console.log(contractID);
        console.log("amount " + amount);

        var theContract = await this.state.contrato.getTokenAddressByID.call(contractID);

        var theERC20 = contract(contractERC20);
        theERC20.setProvider(web3.currentProvider);
        console.log(theContract);

        var instance = theERC20.at(theContract);
        //instance.transfer(account, 100, {from: account, gas:200000});
        instance.transfer(account, amount, {from: account, gas:200000, value: web3.toWei(finalAmount, "ether")});
        //web3.eth.sendTransaction()
    }

    /*navControl(updatedState){
        this.setState({nav: updatedState});

    }*/
    clickedICO(id) {
      console.log("CACA3");
        this.setState({icoClicked: id});
    }


    /*
    * Invocado inmediatamente antes de que un componente se desmonte del DOM
    */
    componentWillUnmount(){
        // TEAR DOWN WATCH
        //this.state.event_Register.stopWatching();
        //this.state.event_CreateToken.stopWatching();
        if (this.state.event_Register != null){
            this.state.event_Register.stopWatching();
        } 
        if (this.state.event_Transfer != null){
            this.state.event_Transfer.stopWatching();
        }        
        console.log("watch's have been tore down");
    }

  ///////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <Router>
        <div>                 
          <Switch>
            <Route exact={true} path="/" render={() => {
              return(
                <div>
                  <meta charSet="utf-8" />
                  {/*<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">*/}
                  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                  <title>ICO-LAuncher by Sofía Vidal</title>
                  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
                  {/* script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script */}
                  <section className="hero">
                    <section className="navigation fixed">
                      <header>
                        <div className="header-content">
                          {/*div class="logo"><a href="#"><img src="img/sedna-logo.png" alt="Sedna logo"></a></div*/}
                          <div className="header-nav">
                            <nav>
                              <ul className="primary-nav">                                
                                <li><a href="#">Home</a></li>
                                <li><a href="#Blockchain">Blockchain</a></li>
                                <li><a href="#icos">ICOs</a></li>
                                <li><a href="#icoList">ICO List</a></li>
                                <li><Link to={'/formulario'}>Create ICO</Link></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                              </ul>
                              <ul className="member-actions">
                                <li><a className="myTitle"><h4><img width={35} height={35} src={logo}/>    ICO-Launcher</h4></a></li>   
                              </ul>
                            </nav>
                          </div>
                          {/*div class="navicon">
                                  <a class="nav-toggle" href="#"><span></span></a>
                              </div*/}
                        </div>
                      </header>
                    </section>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <div className="hero-content text-center">
                            <h1>INNOVATE!</h1>
                            <p className="intro">Deploy&nbsp;your startup and be an&nbsp;entrepreneur.</p>
                            <Link to={'/formulario'} className="btn btn-fill btn-large btn-margin-right"><strong>Create ICO</strong></Link>
                            <a href="#Blockchain" className="btn btn-accent btn-large"><strong>Learn more</strong></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="down-arrow floating-arrow"><a href="#"><i className="fa fa-angle-down" /></a></div>
                    {/* FIN DE SECCION*/}
                  </section>
                  <section className="intro section-padding">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 intro-feature">
                          <div className="intro-icon">
                            <span data-icon="" className="icon" />
                          </div>
                          <div className="intro-content">
                            <h5>INNOVATE</h5>
                            <p>Make your dreams come true finding the help and the funds you need to make your idea become a business                            
                            </p>
                          </div>
                        </div>
                        <div className="col-md-4 intro-feature">
                          <div className="intro-icon">
                            <span data-icon="" className="icon" />
                          </div>
                          <div className="intro-content">
                            <h5>CHOOSE SAFETY</h5>
                            <p>ICO-Launcher is based on Blockchain Technologies what ensures all transactions and gives investors an easy way to  finance new projects </p>
                          </div>
                        </div>
                        <div className="col-md-4 intro-feature">
                          <div className="intro-icon">
                            <span data-icon="" className="icon" />
                          </div>
                          <div className="intro-content last">
                            <h5>JUST FEW MINUTES</h5>
                            <p>ICO-Launcher provides a platform where the Startups can create an Initial Coin offering to find founds just in a few minutes, only completing a form in this webpage</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="features section-padding" id="Blockchain">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-5 col-md-offset-7">
                          <div className="feature-list">
                            <h3></h3>
                            <h3>Blockchain will provide a safe environment to deploy your ICO</h3>
                            <p>Some of its most powerful characteristics are</p>
                            <ul className="features-stack">
                              <li className="feature-item">
                                <div className="feature-icon">
                                  <span data-icon="" className="icon" />
                                </div>
                                <div className="feature-content">
                                  <h5>No need of intermediaries</h5>
                                  <p>Customer experience disintermediation by removing the middle man (such as a bank or a broker)</p>
                                </div>
                              </li>
                              <li className="feature-item">
                                <div className="feature-icon">
                                  <span data-icon="" className="icon" />
                                </div>
                                <div className="feature-content">
                                  <h5>Save</h5>
                                  <p>There are not Single Points Of Failure (SPOF), every node keeps a copy of the chain, and prevents malicuos situations</p>
                                </div>
                              </li>
                              <li className="feature-item">
                                <div className="feature-icon">
                                  <span data-icon="" className="icon" />
                                </div>
                                <div className="feature-content">
                                  <h5>Transparent</h5>
                                  <p>Because all information is kept in all nodes, every personson in the chain has access to the data.</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="device-showcase">
                      <div className="devices">
                        <div className="ipad-wrap wp1" />
                        <div className="iphone-wrap wp2" />
                      </div>
                    </div>
                    <div className="responsive-feature-img"><img src={devices} alt="responsive devices" /></div>
                  </section>
                  <section className="features-extra section-padding" id="icos">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-5">              
                          <div className="feature-list">
                          <br/><br/>
                            <h3>Initial Coin Offering</h3>
                            <p>An Initial Coins Offer (ICO) is a financing model for a company that, based on blockchain technology, creates its own new tokens and then puts them up for sale. </p>
                            <p>If you have a Startup, using ICO-Louncher your company can find funds, you only need to fill a short form. Trust Us and let us deploy your own company tokens!</p>
                            <p>If you want to help society encouraging innovation and entrepreneurship, you've came to the right place! Invest in one of the ICO listed in this page!</p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="macbook-wrap wp3" />
                    <div className="responsive-feature-img"><img src={macbook} alt="responsive devices" style={{marginLeft: '790px', marginTop: '60px'}}  /></div>
                  </section>
                  <section className="hero-strip section-padding">
                    <div className="container">
                      <div className="col-md-12 text-center">
                        <h2>
                          Find the correct place to Deploy you ICO
                        </h2>
                        <p>So Easy, So Fast, So Simple</p>
                        <a href="#icoList" className="btn btn-ghost btn-accent btn-large">Check our ICOs</a>
                        <div className="logo-placeholder floating-logo"><img src={sketch} alt="Sketch Logo" /></div>
                      </div>
                    </div>
                  </section>
                  <section className="blog-intro section-padding" id="icoList">
                    <div className="container">
                      <h1>Initial Coin Offerings</h1><br/>
                      <IcoList ICOarray={this.state.id_Array}  
                        instancia={this.state.contrato} 
                        arrayERC20={arrayERC20} 
                        getERC20contract={this.executeTransfer}
                        clickedICO={this.clickedICO}
                      />          
                    </div>
                  </section>      
                  <section className="testimonial-slider section-padding text-center" id="about">
                    <Carousel>
                      <Carousel.Item>
                        <img width={1600} height={500} alt="900x500" src={banner} />
                        <Carousel.Caption>
                          <div className="avatar"><img src={sofia} alt="Sedna Testimonial Avatar" /></div>
                          <h2>Sofía Vidal Urriza</h2>
                          <p className="author">Estudiante de Ingeniería de telecomunicaciones</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img width={1600} height={500} alt="900x500" src={banner} />
                        <Carousel.Caption>
                          <div className="avatar"><img src={pavon} alt="Sedna Testimonial Avatar" /></div>
                          <h2 className="slides">Tutor: Santiago Pavón Gómez</h2>
                          <p className="author">Departamento de Ingeniería de Sistemas Telemáticos</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img width={1600} height={500} alt="900x500" src={banner} />
                        <Carousel.Caption>
                          <div className="avatar"><img src={etsit} alt="Sedna Testimonial Avatar" /></div>
                          <h2>Escuela Técnica Superior de Ingenieros de Telecomunicación</h2>
                          <p className="author">Universidad Politécnica de Madrid</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                  </section>
                  <footer>
                    <div className="container" id="contact">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="footer-links">
                            <ul className="footer-group">
                              <li><a href="#Blockchain">Blockchain</a></li>
                              <li><a href="#icos">ICOs</a></li>
                              <li><a href="https://www.ethereum.org/" target="blanck">Ethereum</a></li>
                              <li><a href="#about">About us</a></li>
                              <li><a href="https://es.linkedin.com/in/sof%C3%ADa-vidal-urriza-b39246150" target="blanck">LinkedIn</a></li>
                              <li><a href="https://es-es.facebook.com/sofia.vidalurriza" target="blanck">Facebook</a></li>                              
                            </ul>
                            <h2>Contact Info</h2>
                            <p>Av. Complutense, 30, 28040 Madrid, SPAIN<br />+34 608 103 083<br /> sofia.vidal.urriza@alumnos.upm.es</p>
                          </div>
                        </div> 
                        {/*div class="social-share">
                              <p>Share Sedna with your friends</p>
                              <a href="https://twitter.com/peterfinlan" class="twitter-share"><i class="fa fa-twitter"></i></a> <a href="#" class="facebook-share"><i class="fa fa-facebook"></i></a>
                          </div*/}
                      </div>
                    </div>
                  </footer>    
                </div>
              );
            }}/>
            <Route exact={true} path="/formulario" render={() =>{
              return(
                <div>
                  <BarraNav />
                  <Formu formCliked={this.formCliked} />
                </div>
              );                      
            }}/>
            <Route exact={true} path="/infoICO" render={() =>{
              return(
                <div>
                  <BarraNav />
                  <InfoDetail IcoID={this.state.icoClicked}
                    contrato={this.state.contrato}
                    transferMade={this.state.transferMade}
                  />
                </div>
              );                      
            }} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
