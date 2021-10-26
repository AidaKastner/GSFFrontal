import React, {useState} from 'react';
import axios from 'axios';
import CargarExcel from "../components/CargarExcel";
import VerActuaciones from "../components/VerActuaciones";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Form } from "react-bootstrap";
import '../css/Menu.css';



function CargarActuaciones(props){

    return(
      <div>
                 
            <div>
              <Sidebar />
            </div>
            <div style={{marginLeft:'15%'}}>         
              {/*<div>
                <CargarExcel />
              </div>*/}
             
              <div style={{marginRight:'10%', marginTop: '5%'}}> 
              <h1>Actuaciones</h1>               
                <VerActuaciones />
              </div>          
        </div>
      </div>
          

          
       
    );
}

export default CargarActuaciones;