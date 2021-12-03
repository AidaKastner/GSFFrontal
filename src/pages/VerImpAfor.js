import React, {useState} from 'react';
import VerImpAforos from "../components/VerImpAforos";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Menu.css';
import Idioma from "../components/Idioma";
import { useTranslation } from 'react-i18next';


function VerImpAfor(props){
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
              <h1>{ t('VerImpAfor') }</h1>               
                <VerImpAforos />
              </div>          
        </div>
      </div>
       
    );
}

export default VerImpAfor;