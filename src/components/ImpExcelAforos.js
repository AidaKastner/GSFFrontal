import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';


function ImpExcelAforos(){
  
  const { t, i18n } = useTranslation();
  const url = "https://localhost:44301/api/importaraforos";

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
      console.log(response.data); 
      
    switch(response.data){
      
      case 1:
        var msg = "El archivo se ha guardado correctamente.";
          setMsgOutBoolOK(true);
          setMsgOutBoolKO(false);
          break;
      case 2:
        var msg = "El archivo debe ser de tipo .xls o .xlsx.";
        setMsgOutBoolKO(true);
        setMsgOutBoolOK(false);
        break;
      default:
      var msg = "Error al subir el fichero.";
        setMsgOutBoolKO(true);
        setMsgOutBoolOK(false);
        break;


    } 
  
    guardarMsgOut(msg);
      
      
    }).catch(error=>{
      console.log(error);
      guardarMsgOut(error.data);
      var msg = "Error al subir el fichero.";
      setMsgOutBoolKO(true);
      setMsgOutBoolOK(false);
      
    })
    
  }

  

  return (
    <div>
      <br/> 
        <h1><Translation ns= "global">{(t) => <>{t('ImpAfr')}</>}</Translation></h1>
        <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} /> 
        
        <button className="btn btn-primario" style={{float: 'right'}} onClick={()=>insertarArchivos()}><Translation ns= "global">{(t) => <>{t('Cargar')}</>}</Translation></button>
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

export default ImpExcelAforos;