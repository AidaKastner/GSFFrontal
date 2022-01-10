import React, {useState} from 'react';
import axios from 'axios';
import CargarExcel from "../components/CargarExcel";
import VerActuaciones from "../components/VerActuaciones";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form } from "react-bootstrap";
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';
import SidebarBack from "../components/SidebarBack";


function CargarActuaciones(props){
  const { t, i18n } = useTranslation(['global']);
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