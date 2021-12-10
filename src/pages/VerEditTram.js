import React, {useState} from 'react';
import VerEditTrams from "../components/VerEditTrams";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';
import SidebarBack from "../components/SidebarBack";

function VerEditTram(props){
  const { t, i18n } = useTranslation(['global']);

    return(
      <div>   
        <div>
          <SidebarBack />
          <Sidebar />
        </div>
        <div style={{marginLeft:'15%'}}>         
          <div style={{marginRight:'10%', marginTop: '5%'}}> 
            <h1>{ t('VerDicTram') }</h1>                            
              <VerEditTrams />
            </div>          
        </div>
      </div>       
    );
}

export default VerEditTram;