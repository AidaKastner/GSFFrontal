import React, { Fragment, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Sidebar from "../components/MenuLateral/Sidebar";
import SidebarBack from "../components/MenuLateral/SidebarBack";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

function Menu(props) {
  const { t, i18n } = useTranslation(['global']);
  //Cookies de inicio de sesión
  const cookies = new Cookies;

  let authToken = sessionStorage.getItem("JWT");
  const routerHistory = useHistory();

  useEffect(() => {
    let isMounted = true;   
    console.log('AuthToken:', authToken);
    if (isMounted){
      //Si la sesión no está iniciada, se redirige a la pantalla de Login
      if(authToken == null || authToken == "null"){
        console.log("Sesión no iniciada");
        //routerHistory.push('');
      }
    }
    return () => { isMounted = false };
  }, []);

  return (
    <div>
      <div>
        {/*Cargamos el menú lateral*/}
        <SidebarBack routerHistory={routerHistory}
          prevLocation={props.location.state != null ? props.location.state.prevLocation : routerHistory.location.pathname} />
        <Sidebar routerHistory={routerHistory}
          showSidebar={props.location.state != null ? props.location.state.showSidebar : null}
          prevLocation={props.location.state != null ? props.location.state.prevLocation : null}
          t={t} />
      </div>
      <div clasname = 'continer' style={{marginLeft: '15%'}}>
        <div clasname = 'img' style={{marginRight: '4%', marginTop: '8%'}}>
          {/* <h1 style={{textAlign: 'left', marginLeft: '1%'}}>{ t('gestAusc') }</h1>*/}
          <img src="/AuscultationManagement.png" width="1150px" height="300px"/>
        </div>
      </div>
    </div>
  );
}

export default Menu;