import React from 'react';
import ReactDOM from 'react-dom';

import {Col,Button,form/*, label, FieldGroup*/,FormGroup,ControlLabel, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Formu extends React.Component {


    constructor(props){
        super(props);
        this.createICO = this.createICO.bind(this);       
    }

    /*
    * Método que coge la info del formulario y crea un objetoJS ICO
    * que envia al componente padre
    */
    createICO () {      
        
        var ICO = new Object();
        ICO.icoName = ReactDOM.findDOMNode(this.refs.icoName).value;
        ICO.icoWebsite = ReactDOM.findDOMNode(this.refs.icoWebsite).value;           
        
        ICO.tokenName = ReactDOM.findDOMNode(this.refs.tokenName).value;
        ICO.symbol = ReactDOM.findDOMNode(this.refs.symbol).value;   
        ICO.tokenDecimals = ReactDOM.findDOMNode(this.refs.tokenDecimals).value;     
        ICO.tokenPrice = ReactDOM.findDOMNode(this.refs.tokenPrice).value;        
        ICO.tokenTotalSupply = ReactDOM.findDOMNode(this.refs.tokenTotalSupply).value; 

        ICO.OpeningDate = ReactDOM.findDOMNode(this.refs.OpeningDate).value;
        ICO.ClosingDate = ReactDOM.findDOMNode(this.refs.ClosingDate).value;       
        
        // se envia info introducida a componente padre
        this.props.formCliked(ICO);

    }


    render() {
        return(

            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
                <Col md={2} />
                <Col xs={12} md={7}>
                    <h1> FORMULARIO </h1>

                    <form className="formu" id="formu">
                        <FormGroup id="formControlsText">
                            <ControlLabel>ICO / Business Name (*) </ControlLabel>
                            <FormControl ref="icoName" type="text" placeholder="Business Name" />
                        </FormGroup>

                        <FormGroup id="formControlsText">
                            <ControlLabel>ICO / Business Website (*) </ControlLabel>
                            <FormControl ref="icoWebsite" type="url" placeholder="url" />
                        </FormGroup>

                        <FormGroup id="formControlsText">
                            <ControlLabel>Opening Date (*) </ControlLabel>
                            <FormControl ref="OpeningDate" className="Opening Date" type="date"  />
                            <ControlLabel>Closing Date (*) </ControlLabel>
                            <FormControl ref="ClosingDate" className="ClosingDate" type="date"  />
                        </FormGroup>

                        <FormGroup id="formControlsText">
                            <ControlLabel>Token / Coin Name(*) </ControlLabel>
                            <FormControl ref="tokenName" type="text" placeholder="Enter Token Name" />
                        </FormGroup>

                        <FormGroup id="formControlsText">
                            <ControlLabel>Token symbol(*) </ControlLabel>
                            <FormControl ref="symbol" type="text" placeholder="Enter Symbol" />
                        </FormGroup>

                        <FormGroup id="formControlsText">
                            <ControlLabel>Token decimals (*) </ControlLabel>
                            <FormControl ref="tokenDecimals" type="number" placeholder="Insert decimals between 0 to 18" />
                        </FormGroup>

                        <FormGroup id="formControlsText">
                            <ControlLabel>Total Supply of new Token (*) </ControlLabel>
                            <FormControl ref="tokenTotalSupply" type="number" placeholder="Insert amount of ether" />
                        </FormGroup>
                        <FormGroup id="formControlsText">
                            <ControlLabel>Token price in Ether (*) </ControlLabel>
                            <FormControl ref="tokenPrice" type="number" placeholder="Insert amount of ether" />
                        </FormGroup>


                        <FormGroup>
                          <ControlLabel>Required Fields</ControlLabel>
                          <FormControl.Static>You must complete the boxes marked by (*) </FormControl.Static>
                        </FormGroup>

                    </form>

                    <Button className="myButton" onClick={this.createICO}><Link to={'/'}>CREATE ICO</Link></Button>
                    <Button className="myButton"><Link to={'/'}>CANCEL</Link></Button>
                </Col>
            </div>

        );
    }

}