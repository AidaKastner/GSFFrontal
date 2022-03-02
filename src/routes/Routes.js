import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from '../pages/Menu';
import Login from '../pages/Login';
import CargarActuaciones from '../pages/CargarActuaciones';
import VerDiccionario from '../pages/VerDiccionario';
import VerImpAfor from '../pages/VerImpAfor';
import VerEditCarTram from '../pages/VerEditCarTram';
import GestioAuscultacio from '../pages/GestioAuscultacio';
import ImportarGrafo from '../pages/ImportarGrafo';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/VerEditCarTram" component={VerEditCarTram}/>
        <Route exact path="/cargaractuaciones" component={CargarActuaciones}/>
        <Route exact path="/VerDiccionario" component={VerDiccionario}/>
        <Route exact path="/VerImpAfor" component={VerImpAfor}/>
        <Route exact path='/GestioAuscultacio' component={GestioAuscultacio} />
        <Route exact path='/ImportarGrafo' component={ImportarGrafo} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
