import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SidebarBack from "../components/MenuLateral/SidebarBack";
import Sidebar from "../components/MenuLateral/Sidebar";
import { useHistory } from 'react-router-dom';
import AnalisisAuscultaciones from "../components/GestionAuscultaciones/CargarAuscultaciones/AnalizAusc";

function GestioAuscultacio(props) {
  const { t } = useTranslation(['global']);

  let authToken = sessionStorage.getItem("JWT");
  const routerHistory = useHistory();

  useEffect(() => {
    let isMounted = true;   
    if (isMounted) {
      //Si la sesión no está iniciada, se redirige a la pantalla de Login
      if (authToken == null || authToken == "null") {
        console.log("Sesión no iniciada");
        //routerHistory.push('');
      }
    }
    return () => { isMounted = false };
  }, []);

  return (
    <div>
      <div>
        <SidebarBack routerHistory={routerHistory}
          prevLocation={props.location.state != null ? props.location.state.prevLocation : routerHistory.location.pathname} />
        <Sidebar routerHistory={routerHistory}
          showSidebar={props.location.state != null ? props.location.state.showSidebar : null}
          prevLocation={props.location.state != null ? props.location.state.prevLocation : null}
          t={t} />
      </div>
      <div style={{marginLeft: '15%'}}>
        <div style={{marginRight: '10%', marginTop: '1%'}}>
          <h1 style={{textAlign: 'left', marginLeft: '1%'}}>{ t('gestAusc') }</h1>
          
          <AnalisisAuscultaciones />
        </div>
      </div>
    </div>
  );
}

export default GestioAuscultacio;