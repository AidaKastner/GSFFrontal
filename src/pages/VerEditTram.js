import React, {useState, useEffect} from 'react';
import VerEditTrams from "../components/VerEditTrams";
import Sidebar from "../components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';
import SidebarBack from "../components/SidebarBack";
import { useHistory } from 'react-router-dom';

function VerEditTram(props){
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
          <SidebarBack routerHistory={routerHistory}
            prevLocation={props.location.state != null ? props.location.state.prevLocation : routerHistory.location.pathname} />
          <Sidebar routerHistory={routerHistory}
            showSidebar={props.location.state != null ? props.location.state.showSidebar : null}
            prevLocation={props.location.state != null ? props.location.state.prevLocation : null}
            t={t} />
        </div>
        <div style={{marginLeft:'15%'}}>         
          <div style={{marginRight:'10%', marginTop: '1%'}}> 
            <h1 style={{textAlign: 'left', marginLeft: '1%'}}>{ t('VerDicTram') }</h1>                            
              <VerEditTrams />
            </div>          
        </div>
      </div>       
    );
}

export default VerEditTram;