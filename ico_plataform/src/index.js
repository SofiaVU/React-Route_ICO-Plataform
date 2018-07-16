import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Index from './index2';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Formu from './components/Formu'
import BarraNav from './components/BarraNav'
import IcoList from './components/IcoList'
import InfoDetail from './components/InfoDetail'

/*class Main extends React.Component {
	render() {
        return(
            <Router>
                <div>                 
                    <Switch>
	                    <Route exact={true} path="/" render={() => {
	                        return(
	                            <App/>
	                        );                      
	                    }}/>

	                    <Route exact={true} path="/formulario" render={() =>{
	                        return(
	                        	<div>
		                        	<BarraNav />
		                            <Formu formCliked={this.formCliked} />
		                        </div>
	                        );                      
	                    }} />

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
}*/

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
