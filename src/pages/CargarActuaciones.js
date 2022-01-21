import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CargarExcel from "../components/CargarExcel";
import VerActuaciones from "../components/VerActuaciones";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form } from "react-bootstrap";
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';
import SidebarBack from "../components/SidebarBack";
import { useHistory } from 'react-router-dom';


function CargarActuaciones(props){
  const { t, i18n } = useTranslation(['global']);

  let authToken = sessionStorage.getItem("JWT");
  const routerHistory = useHistory();


  useEffect(() => {
    let isMounted = true;   
    console.log('AuthToken:', authToken);
    if (isMounted){
      //Si la sesión no está iniciada, se redirige a la pantalla de Login
      if(authToken == null || authToken == "null"){
        console.log("Sesión no iniciada");
        routerHistory.push('');
      }
     }
    return () => { isMounted = false };
    }, []);


    return(
      <div>               
            <div>
              <SidebarBack />
              <Sidebar />
            </div>
            <div style={{marginLeft:'15%'}}>                     
              <div style={{marginRight:'10%', marginTop: '5%'}}> 
              <h1>{ t('Act') }</h1>               
                <VerActuaciones />
              </div>          
        </div>
      </div>
       
    );
}

export default CargarActuaciones;