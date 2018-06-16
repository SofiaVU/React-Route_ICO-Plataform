import React from 'react';
import ReactDOM from 'react-dom';

import {Col,Button,form/*, label, FieldGroup*/,FormGroup,ControlLabel, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Formu extends React.Component {


	constructor(props){
        super(props);
        this.createICO = this.createICO.bind(this);
        this.handleDates = this.handleDates.bind(this);        
    }

    /*
    * Método que coge la info del formulario y crea un objetoJS ICO
    * que envia al componente padre
    */
    createICO () {      
        
        //console.log(ReactDOM.findDOMNode(this.refs.icoName).value);
        //console.log(ReactDOM.findDOMNode(this.refs.shortDescription).value);

        var ICO = new Object();
        ICO.icoName = ReactDOM.findDOMNode(this.refs.icoName).value;        
        
        ICO.tokenName = ReactDOM.findDOMNode(this.refs.tokenName).value;
        ICO.symbol = ReactDOM.findDOMNode(this.refs.symbol).value;   
        ICO.tokenDecimals = ReactDOM.findDOMNode(this.refs.tokenDecimals).value;     
        ICO.tokenPrice = ReactDOM.findDOMNode(this.refs.tokenPrice).value;        
        ICO.tokenTotalSupply = ReactDOM.findDOMNode(this.refs.tokenTotalSupply).value; 

        var inicio = ReactDOM.findDOMNode(this.refs.OpeningDate).value;
        var fin = ReactDOM.findDOMNode(this.refs.ClossingDate).value;
        if (this.handleDates(inicio, fin) ) {
            ICO.OpeningDate = inicio;
            ICO.ClossingDate = fin;
            //console.log ("FECHAS OK")
        } else { console.log("FECHAS NOT OK"); }
        

        //console.log("Form INPUT: ")
        //console.log(ICO);

        // se envia info introducida a componente padre
        this.props.formCliked(ICO);

    }

    /*
    *
    */
    handleDates(inicio, fin) {

        //console.log(inicio);
        var first = inicio.split('-');
        //console.log(first);
        //var inicioDate = new Date (first[0], first[1], first[2]);
        //var inicioDate2 = new Date (2018, 5, 4); // year, month, date
        //console.log(inicioDate.toISOString().split('T')[0]);
        //console.log("-----------------------");
        //console.log(inicioDate2.toISOString().split('T')[0]);//  +1 mes, -1 dia ???

        //console.log(fin);
        var last = fin.split('-');
        //var lastDate = new Date (last[0], last[1], last[2]);
        //console.log(lastDate.toISOString().split('T')[0]);
        //console.log("-----------------------");

        var hoy = new Date();
        //console.log(hoy);
        //console.log(hoy.toISOString().split('T')[0]);
        var aux = hoy.toISOString().split('T')[0];
        //var today = aux.split('-');
        //console.log(today);
        //console.log(aux);

        /*var boolFirst;
        var boolLast;
        console.log(inicioDate.getFullYear() >= hoy.getFullYear());
        console.log(inicioDate.getMonth() >= hoy.getMonth());
        console.log(inicioDate.getDate() >= hoy.getDate());
        console.log("-----------------------");
        console.log(inicioDate.getFullYear() <= lastDate.getFullYear());
        console.log(inicioDate.getMonth() <= lastDate.getMonth());
        console.log(inicioDate.getDate() <= lastDate.getDate());


        if ( (inicioDate.getFullYear() >= hoy.getFullYear()) && (inicioDate.getMonth() >= hoy.getMonth()) && (inicioDate.getDate() >= hoy.getDate()) ) {
            boolFirst = true;
        }
        if ( (inicioDate.getFullYear() <= lastDate.getFullYear()) && (inicioDate.getMonth() <= lastDate.getMonth()) && (inicioDate.getDate() <= lastDate.getDate()) ) {
            boolLast = true;
        }

        return (boolFirst && boolLast);*/

        return true;

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
                            <ControlLabel>ICO / Bussiness Name (*) </ControlLabel>
                            <FormControl ref="icoName" type="text" placeholder="Bussiness Name" />
                        </FormGroup>

                        <FormGroup id="formControlsText">
                            <ControlLabel>Opening Date (*) </ControlLabel>
                            <FormControl ref="OpeningDate" className="Opening Date" type="date"  />
                            <ControlLabel>Clossing Date (*) </ControlLabel>
                            <FormControl ref="ClossingDate" className="ClossingDate" type="date"  />
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