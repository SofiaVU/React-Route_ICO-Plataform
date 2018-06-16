import React from 'react';
import ReactDOM from 'react-dom';

import {ListGroupItem, Button, FormGroup, FormControl} from 'react-bootstrap';
import { default as contract } from 'truffle-contract';

import { default as Web3} from 'web3'
import contractERC20 from '../build/contracts/createERC20_v2.json'

import {Link} from 'react-router-dom';

var web3 = web3;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  //  Especificamos el provider 
  // empleando chrome con MetaMask el provider es injectado automaticamente
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
} 

var account = web3.eth.accounts[0];

export default class IcoDetail extends React.Component {

	/*
	* CONSTRUCTOR
	*/
	constructor(props){
        super(props);
        this.state =({ 
            name: null,
            openingDate: null,
            closingDate: null,
            price: null,
            token: null,
        });
        this.getName = this.getName.bind(this);
        this.getOpeningDate = this.getOpeningDate.bind(this);
        this.getClosingDate = this.getClosingDate.bind(this);
        //this.getPrice = this.getPrice.bind(this);
        this.transfer = this.transfer.bind(this);
        this.showInfo = this.showInfo.bind(this);
             
    }

    async getName() {
    	
    	var name = await this.props.instancia.getICOnameByID.call(this.props.ico);
    	this.setState({name: name});

    }

    async getOpeningDate(){
    	
    	var date = await this.props.instancia.getOpeningDateNameByID.call(this.props.ico);    	
    	//console.log(date);

    	this.setState({openingDate: date});
    }

    async getClosingDate(){
    	
    	var date = await this.props.instancia.getClosingDateNameByID.call(this.props.ico);    	
    	//console.log(date);

    	this.setState({closingDate: date});
    }

    /*async getPrice() {
    	
    	var tprice = await this.props.instancia.getTokenPriceByID.call(this.props.ico);
    	tprice = tprice.toNumber();
    	this.setState({price: tprice});

    }*/

    async getTokenName() {
    	
    	var token = await this.props.instancia.getTokenAddressByID.call(this.props.ico);   

        var theERC20 = contract(contractERC20);
        theERC20.setProvider(web3.currentProvider);

        var instance = theERC20.at(token);
        var tokName = await instance.tokenName();
        var tokPrice = await instance.buyPrice();
        var tprice = tokPrice.toNumber();
    	this.setState({
            token: tokName,
            price: tprice,
        });

    }

    transfer(){

        // enviamos al componente lista el ID de la ICO sobre la que se ha pulsado
        //Ico list enviará a index el contratoERC20 de esta ico
        //console.log("TRAZA 1");
        //console.log(this.props.ico.toNumber()); 
        var amount= ReactDOM.findDOMNode(this.refs.amount).value;
        console.log(amount);        
        this.props.getID(this.props.ico.toNumber(), amount);

    }

    showInfo(){
        //this.props.navControl(2);
        this.props.clickedICO(this.props.ico.toNumber());
    }
   

    render(){
        let ico = this.props.ico;
        //console.log(this.props.instancia);
        
        if(this.state.name == null && this.state.tokenName == null && this.state.openingDate == null){
            this.getName();
            this.getTokenName();
            this.getOpeningDate();
            this.getClosingDate();
            //this.getPrice();
        }
    	return(
    		<tr>
                <td><a onClick={this.showInfo}><Link to={'/infoICO'}>{this.state.name}</Link></a></td>
                <td>{this.state.openingDate}</td>
                <td>{this.state.closingDate}</td>
                <td>{this.state.token}</td>
                <td>{this.state.price} ethers/toker</td>
                <td>                    
                    <FormGroup id="formControlsText">
                        <FormControl ref="amount" type="number" placeholder="Amount" />
                    </FormGroup>
                    <Button onClick={this.transfer}>Buy tokens</Button>
                </td>
            </tr>
    	);
	}

}