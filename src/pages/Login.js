import Error from "../components/Error";
import Idioma from "../components/Idioma";
import Spinner from "../components/Spinner";
import '../css/Login.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, Suspense, useEffect } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import Cookies from 'universal-cookie';

function Foo() {
  const baseUrl="https://localhost:44301/api/login";
  const cookies = new Cookies();
  const [error, guardarError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['global']);
  const routerHistory = useHistory();
  
  const [form, setForm]=useState({
    mail:'',
    password:''
  });

  const handleChange=e=>{
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
    guardarError(false);
  }

  var componente;

  useEffect(() => {
    //Se inicializa el token
    sessionStorage.setItem("JWT", null);
  }, []);

  const iniciarSesion=async()=>{
    setLoading(!loading);
    await axios.get(baseUrl+`/${form.mail}/${form.password}`)
      .then(response=>{
        const token = 'Bearer ' + response.data;
        axios.defaults.headers.common["Authorization"] = token;
        sessionStorage.setItem("JWT", token);
        return response.data;            
      }).then(response=>{              
        //Usuario y contraseña correctos -> Se entra al menú principal              
        var respuesta=response[0];            
        cookies.set('id', respuesta.id, {path:'/'});
        routerHistory.push('menu');
      }).catch(()=>{
        //Usuario o contraseña incorrectos           
        //alert('El usuario o la contraseña no son correctos.');
        guardarError(true);            
      })
  }

  if (error) {
    //Mensaje de error
    componente = <Error mensaje='Datos incorrectos.'/>
    var Mensaje = <Translation ns= "global">{(t) => <>{t('LoginKO')}</>}</Translation>;
    componente = <Error mensaje={Mensaje}/>
  }

  return (
    <div className="form-usuario">
      <h1 class="application-name">{ t('applicationName') }</h1>
      <div>
        <Idioma />
      </div>
      <div className="contenedor-form sombra-dark">  
        <h1>{ t('inises') }</h1>
        <div className="form-group">
          <div className="campo-form">
            <label>{ t('user') } </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="mail"
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <label>{ t('pass') } </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
            <br />
          </div>
          <button className="btn btn-primario btn-block" onClick={()=>iniciarSesion()} style={{marginTop: '5%'}}>{ t('log') }</button>
          <br />
        </div>
        {componente}
      </div>
      <Modal isOpen={loading} size="sm" style={{margin: 'auto', marginTop: '25rem', width: 'fit-content'}}>
        <ModalBody>
          <Spinner />
        </ModalBody>
      </Modal>
    </div>
  )
}

function Login(props) {
  return (
    <Suspense fallback="cargando...">
      <Foo />
    </Suspense>
  );
}

export default Login;
