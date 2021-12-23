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
  const [msgOutErr, guardarMsgOutErr] = useState();
  const [msgOutErr1, guardarMsgOutErr1] = useState([]);
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

      //Se inicializan mensajes salida
      guardarMsgOut("");
      guardarMsgOutErr(""); 
      guardarMsgOutErr1([]);
      setMsgOutBoolOK(false);
      setMsgOutBoolKO(false);
      var Id=0;

      console.log(response?.data); 
      console.log("OK");

      var FilasCargadas = 0; var FilasConError = 0;
      var NumFilas = response?.data.length;
     
      if(NumFilas == 0){
        var msg= <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>
        guardarMsgOutErr(msg); 
        setMsgOutBoolKO(true);
      }

      console.log("NumFilas: ", response?.data.length)

      for(var i=0; i<NumFilas; i++){

        if(response?.data[i].item2 == 0){
            
          FilasCargadas += 1; 
          console.log("FilasCargadas: ", FilasCargadas)
          var msgOK = <Translation ns= "global">{(t) => <>{t('FilasCargadasAf', { NFilas: FilasCargadas})}</>}</Translation>
          guardarMsgOut(msgOK);
          setMsgOutBoolOK(true);

        }else{

          FilasConError += 1; 
          console.log("FilasConError: ", FilasConError)
          guardarMsgOutErr(msgKO);
          setMsgOutBoolKO(true); 

          console.log("error ", response?.data[i].item2, "FILA: ", response?.data[i].item1);

          //Mensajes de error por cada fila
          switch(response?.data[i].item2){
          case 1:
            var msgKO= <Translation ns= "global">{(t) => <>{t('RegionKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>
            break;
          case 2:
            var msgKO= <Translation ns= "global">{(t) => <>{t('CodigoKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 3:
            var msgKO= <Translation ns= "global">{(t) => <>{t('CarreteraKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
         case 4:
            var msgKO= <Translation ns= "global">{(t) => <>{t('PkIniKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 5:
            var msgKO= <Translation ns= "global">{(t) => <>{t('PkFinKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          default:
            var msgKO= <Translation ns= "global">{(t) => <>{t('BBDDKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation> 
          }
      
            guardarMsgOutErr1(oldArray => [...oldArray, {id: Id, name: msgKO}]);

            Id += 1;
            console.log(Id);
        }
      }

      if(FilasConError > 0){
        var msgKO = <Translation ns= "global">{(t) => <>{t('FilasNoCargadasAf', { NFilasKO: FilasConError })}</>}</Translation>
        guardarMsgOutErr(msgKO);
      }

    }).catch(error=>{

      //Se inicializan mensajes salida
      guardarMsgOut("");
      guardarMsgOutErr(""); 
      guardarMsgOutErr1([]);
      setMsgOutBoolOK(false);
      setMsgOutBoolKO(true);
      var msg = "";

      console.log("prueba2");
      console.log("error: ", error.response?.data);


      switch(error.response?.data[0]){
      
        case 1:
          var msg = <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>                    
          break;
        case 2:
          var msg= <Translation ns= "global">{(t) => <>{t('FormatoKO')}</>}</Translation>
          break;
        case 3:
          var msg= <Translation ns= "global">{(t) => <>{t('AnyoCampanyaKO')}</>}</Translation>
          break;
        default:
          var msg= <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>
          break;
      }    
      guardarMsgOutErr(msg); 
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
       <div><br/><br/>
       <div className="alert alert-success">
          {/*Mostramos mensaje*/}
          {msgOut}
      </div>
      </div>
      : ""}

      { msgOutBoolKO ? 
      <div><br/>
       <div class="alert alert-danger">
          {/*Mostramos mensaje*/}
          {msgOutErr}
          {msgOutErr1.map(msgOutErr1 => (
          <li key={msgOutErr1.id}>{msgOutErr1.name}</li>
        ))}
      </div>
      </div>
      : ""}
   
      </div>
  )
}

export default ImpExcelAforos;