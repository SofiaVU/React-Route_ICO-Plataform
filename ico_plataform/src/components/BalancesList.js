import React from 'react';
import {ListGroup, Table, thead, tbody} from 'react-bootstrap';


export default class BalancesList extends React.Component {

	/*
    * Renderizado del componente: maneja la lista de icos
    */
    render(){

    	if(this.props.arrayEvents === null){
    		return(
    			<p> Cargando... </p>
    		);
    	}

    	//lista procedente de componente padre
        let lista = [];

    	lista = this.props.arrayEvents.map((event,index) => {
    		return(
    			<tr key={index}>
	    			<td>{event.from}</td>
	    			<td>{event.to}</td>
	    			<td>{event.value}</td>
	    			<td>{event.aSupply}</td>
	    		</tr>
	    		
    		);
            //return(<IcoDetail key={index} ico={icoAddr} instancia={this.props.instancia} />);

    	});

        var instanciaContrato = this.props.instancia;

    	// devolvemos la lista
    	return(
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                            <th>Actual Supply</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista}                        
                    </tbody>            
                </Table>
            </div>
    	);
    }

}

