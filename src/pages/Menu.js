import React, { Fragment } from 'react';
import Cookies from 'universal-cookie';
import Sidebar from "../components/Sidebar";
import SidebarBack from "../components/SidebarBack";
import { useTranslation } from 'react-i18next';
import Idioma from "../components/Idioma";

function Menu(props){

    const { t, i18n } = useTranslation();
    //Cookies de inicio de sesión
    const cookies = new Cookies;

    return(
        <div>
            <div>
                <Idioma />
            </div>
            <div>
                {/*Cargamos el menú lateral*/}
                <SidebarBack />
                <Sidebar /> 
            </div>
 
        </div>
    );
}

export default Menu;