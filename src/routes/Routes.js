import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import CargarActuaciones from '../pages/CargarActuaciones';
import VerEditTram from '../pages/VerEditTram';
import VerImpAfor from '../pages/VerImpAfor';
import VerEditCarTram from '../pages/VerEditCarTram';
import GestioAuscultacio from '../pages/GestioAuscultacio';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/VerEditCarTram" component={VerEditCarTram}/>
        <Route exact path="/cargaractuaciones" component={CargarActuaciones}/>
        <Route exact path="/VerEditTram" component={VerEditTram}/>
        <Route exact path="/VerImpAfor" component={VerImpAfor}/>
        <Route exact path='/GestioAuscultacio' component={GestioAuscultacio} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
