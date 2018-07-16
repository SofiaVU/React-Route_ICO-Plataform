import React from 'react';
import ReactDOM from 'react-dom';
import { default as contract } from 'truffle-contract';
import { default as Web3} from 'web3'

import {Row, Col,Button,form, label, FieldGroup,FormGroup,ControlLabel, FormControl} from 'react-bootstrap';
import contractERC20 from '../build/contracts/createERC20.json'

import BalancesList from '../components/BalancesList'


var web3 = web3;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  //  Especificamos el provider 
  // empleando chrome con MetaMask el provider es injectado automaticamente
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
} 

var account = web3.eth.accounts[0];

export default class InfoDetail extends React.Component {

    constructor(props){
        super(props);
        this.state =({ 
            instance: null, 
            nameICO: null,
            website: null,
            tokenAddr: null,
            tokenName: null,
            tokenSymbol: null,
            tokenDecimals: null,
            openingDate: null,
            closingDate: null,
            price: null,
            token: null,
            totalSupply: null,
            actualSupply: null, 
            arrayEvents: null,
        });
        this.getInfoFromICOBB = this.getInfoFromICOBB.bind(this);
        this.getInfoFromERC20 = this.getInfoFromERC20.bind(this);
        this.getAllPastEvents = this.getAllPastEvents.bind(this);
    }

    async componentWillMount() {
        console.log("CACA 4");
        var theERC20 = contract(contractERC20);
        theERC20.setProvider(web3.currentProvider);

        var tokenAdd = await this.props.contrato.getTokenAddressByID.call(this.props.IcoID);

        var instancia = theERC20.at(tokenAdd);

        var miArray = new Array();

        this.setState({
            instance: instancia,
        });

        var miArray = new Array();

        var events = await instancia.allEvents({fromBlock:0, toBlock: "latest"});
        events.get((err, logs)=>{           
            for (var i=0; i < logs.length; i++){
                
                var miEvent = new Object();
                miEvent.from = logs[i].args.from;
                miEvent.to = logs[i].args.to;
                miEvent.value = logs[i].args.value.toNumber();
                miEvent.aSupply = logs[i].args.aSupply.toNumber();

                //console.log(miEvent.from); console.log(miEvent.to); console.log(miEvent.value);
                miArray.push(miEvent);
            }
        });
        console.log(miArray);
        this.setState({
            arrayEvents: miArray,
            instance: instancia,
        });
    }

    async getInfoFromICOBB() {
        var contrato = this.props.contrato;
        var icoName =  await contrato.getICOnameByID(this.props.IcoID);
        var oDate = await contrato.getOpeningDateByID.call(this.props.IcoID);
        var cDate = await contrato.getClosingDateByID.call(this.props.IcoID);
        var web = await contrato.getwebsiteByID.call(this.props.IcoID);// getICOwebsiteByID
        this.setState({
            nameICO: icoName,
            openingDate: oDate,
            closingDate: cDate,
            website: web,
        });

        var tokenAdd = await contrato.getTokenAddressByID.call(this.props.IcoID);
        this.getInfoFromERC20(tokenAdd);
    }

    async getInfoFromERC20(addr) {
        /*var theERC20 = contract(contractERC20);
        theERC20.setProvider(web3.currentProvider);

        var instance = theERC20.at(addr);*/
        var tokName = await this.state.instance.tokenName();
        var symbol = await this.state.instance.symbol();
        var decimals = await this.state.instance.decimals();
        var dec = decimals.toNumber();
        var tokPrice = await this.state.instance.buyPrice();
        var tprice = tokPrice.toNumber();
        var supp = await this.state.instance.totalSupply();
        var totSupply = supp.toNumber();
        var aSupp = await this.state.instance.actualSupply();
        var actSupply = aSupp.toNumber();

        this.setState({
            tokenAddr: addr,
            tokenName: tokName,
            tokenSymbol: symbol,
            price: tprice,
            totalSupply: totSupply,
            actualSupply: actSupply,
            tokenDecimals: dec, 
        });

    }

    async getAllPastEvents(){
        
        var miArray = new Array();
        var instancia;

        while (this.state.instance == null){}

        var events = await this.state.instance.allEvents({fromBlock:0, toBlock: "latest"});
        events.get((err, logs)=>{
            for (var i=0; i < logs.length; i++){
                
                var miEvent = new Object();
                miEvent.from = logs[i].args.from;
                miEvent.to = logs[i].args.to;
                miEvent.value = logs[i].args.value.toNumber();
                miEvent.aSupply = logs[i].args.aSupply.toNumber();

                //console.log(miEvent.from); console.log(miEvent.to); console.log(miEvent.value);
                miArray.push(miEvent);
            }
        });
        console.log(miArray);
        this.setState({arrayEvents: miArray});      
    }

    render(){
        this.getInfoFromICOBB();
        //this.getAllPastEvents();
        return(
            <div>
                <br/><br/><br/><br/><br/><br/><br/><br/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
                <Col md={2} />
                    <Col xs={12} md={8}>
                        <Row className="show-grid">
                            <Col xs={12} md={6}>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h1><strong>ICO NAME: {this.state.nameICO}</strong></h1> 
                                        <h3><strong>Website:</strong><a href={this.state.website} target="blanck">{this.state.website}</a></h3>            
                                        <h3><strong>Token name:</strong> {this.state.tokenName} </h3>
                                        <h3><strong>Token symbol:</strong> {this.state.tokenSymbol} </h3>
                                        <h3><strong>ICO Opening Date:</strong> {this.state.openingDate} </h3>
                                        <h3><strong>ICO Closing Date:</strong> {this.state.closingDate} </h3>
                                        <h3><strong>{this.state.tokenName} Price:</strong>  {this.state.price} ether's </h3>
                                        <h3><strong>Total Supply of {this.state.tokenName} in contract:</strong> {this.state.totalSupply}</h3>
                                        <h3><strong>Actual Supply of {this.state.tokenName} in contract:</strong> {this.state.actualSupply}</h3>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={12} md={6}>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h1><strong>INFO TO ADD TOKEN TO METAMASK</strong></h1>
                                        <h3><strong>Token Smart Contract Addres:</strong></h3><h4> {this.state.tokenAddr}</h4>
                                        <h3><strong>Token symbol:</strong> {this.state.tokenSymbol}</h3>
                                        <h3><strong>Token Decimals Of precision:</strong> {this.state.tokenDecimals}</h3> 
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <Row>
                            <h1>TOKEN BALANCES</h1>
                            <BalancesList arrayEvents={this.state.arrayEvents} />
                        </Row>
                    </Col>
                
            </div>
        );
    }

}