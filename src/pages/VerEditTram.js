import React, {useState} from 'react';
import axios from 'axios';
import CargarExcel from "../components/CargarExcel";
import VerEditTrams from "../components/VerEditTrams";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form } from "react-bootstrap";
import '../css/Menu.css';
import Idioma from "../components/Idioma";
import { useTranslation } from 'react-i18next';


function VerEditTram(props){
  const { t, i18n } = useTranslation(['global']);
    return(
      <div>
                 
            <div>
              <Sidebar />
            </div>
            <div>
                <Idioma />
            </div>
            <div style={{marginLeft:'15%'}}>         
              {/*<div>
                <CargarExcel />
              </div>*/}
             
              <div style={{marginRight:'10%', marginTop: '5%'}}> 
              <h1>{ t('VerDicTram') }</h1>               
                <VerEditTrams />
              </div>          
        </div>
      </div>
       
    );
}

export default VerEditTram;