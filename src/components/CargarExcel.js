import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Error from "../components/Error";
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';


function CargarExcel(){
  
  const { t, i18n } = useTranslation();
  const url = "https://localhost:44301/api/cargaractuaciones";

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  const [archivo, setArchivo]=useState(null);
  const [msgOut, guardarMsgOut] = useState();
  const [msgOutBoolOK, setMsgOutBoolOK] = useState(false);
  const [msgOutBoolKO, setMsgOutBoolKO] = useState(false);
 

  const subirArchivos=e=>{
    setArchivo(e);
  }

  const insertarArchivos=async()=>{
    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(f);
    
   
    await axios.post(url, f, config)
    .then(response =>{
      console.log(response?.data); 
      console.log("OK");
      var FilasCargadas = response?.data[1] - 1;
      console.log(FilasCargadas);

      var msg= <Translation ns= "global">{(t) => <>{t('ExcelOK')}</>}</Translation>
      /*var msg = <Translation ns= "global">
        {(t) => <>{t('FilasCargadas')}</>}
        {FilasCargadas}
      </Translation>; */
      
      guardarMsgOut(msg);
      

      
      setMsgOutBoolOK(true);
      setMsgOutBoolKO(false);
      
    
      
      
    }).catch(error=>{
      console.log("prueba2");
      console.log(error.response?.data);

      setMsgOutBoolOK(false);
      setMsgOutBoolKO(true);

      switch(error.response?.data[0]){
      
        case 1:
          var msg= <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>           
            break;
        case 2:
          var msg= <Translation ns= "global">{(t) => <>{t('FormatoKO')}</>}</Translation>
          break;
        case 3:
          var msg= <Translation ns= "global">{(t) => <>{t('CarreteraKO')}</>}</Translation>
          break;
        case 4:
          var msg= <Translation ns= "global">{(t) => <>{t('ActuacionKO')}</>}</Translation>
          break;
        default:
          var msg= <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>
          break;
      } 

      guardarMsgOut(msg);
      
    })
    
  }

  

  return (
    <div>
      <br/>
        <h1><Translation ns= "global">{(t) => <>{t('ImpActs')}</>}</Translation>   </h1>
        {/*<p>Idioma : { i18n.language }</p>*/}
        <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
        
        <button className="btn btn-primario" onClick={()=>insertarArchivos()}>{ t('Cargar') }</button>
       <br/><br/>
       { msgOutBoolOK ? 
       <div className="alert alert-success">
          {/*Mostramos mensaje*/}
          {msgOut}
      </div>
      : ""}

      { msgOutBoolKO ? 
       <div class="alert alert-danger">
          {/*Mostramos mensaje*/}
          {msgOut}
      </div>
      : ""}
   
      </div>
  )

}

export default CargarExcel;