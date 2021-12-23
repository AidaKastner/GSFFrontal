import React, {useState, Suspense } from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';
import Error from "../components/Error";
import { ClassNames } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import Idioma from "../components/Idioma";
import { useHistory } from 'react-router-dom';
import { Translation } from 'react-i18next';


function Foo(props) {
    const baseUrl="https://localhost:44301/api/login";
    const cookies = new Cookies();
    const [error, guardarError] = useState(false);
    //const { t, i18n } = useTranslation();
    const { t, i18n } = useTranslation(['global']);
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
        console.log(form);
    }

    var componente;

    const iniciarSesion=async()=>{
           
        await axios.get(baseUrl+`/${form.mail}/${form.password}`)
        .then(response=>{                
            const token = 'Bearer ' + response.data;
            axios.defaults.headers.common["Authorization"] = token ;
            sessionStorage.setItem("JWT", token);
            console.log(token);                          
            return response.data;            
        }).then(response=>{              
            //Usuario y contraseña correctos -> Se entra al menú principal              
            var respuesta=response[0];            
            cookies.set('id', respuesta.id, {path:'/'});
            routerHistory.push('menu');
        }).catch(error=>{
            //Usuario o contraseña incorrectos           
            console.log(error);
            //alert('El usuario o la contraseña no son correctos.');
            guardarError(true);            
        })
    }

    if(error){
        //Mensaje de error
        componente = <Error mensaje='Datos incorrectos.'/>
        var Mensaje = <Translation ns= "global">{(t) => <>{t('LoginKO')}</>}</Translation>;
        componente = <Error mensaje={Mensaje}/>
        console.log(componente);
    }

    return(
 
        <div className="form-usuario">
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
                      
        </div>      

    )
  }

function Login(props){

    return (
        <Suspense fallback="cargando...">
          <Foo />
        </Suspense>
      );

}

export default Login;