import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/Menu.css';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';


function CargarExcel(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/cargaractuaciones";
  const urlStatistics = "https://localhost:44301/api/CargarActuaciones/statistics";

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
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);

  const [items, setItems] = useState([]);
 

  const subirArchivos=e=>{
    setArchivo(e);
  }

  const getStatistics = () => {
    axios.get(urlStatistics).then(response => {
      console.log('response.data.finishedCount ', response.data.finishedCount);
      console.log('response.data.totalCount ', response.data.totalCount);
      setProgressBarValue(Math.round(response.data.finishedCount / response.data.totalCount * 100));
    });
  }

  const insertarArchivos=async()=>{
    setShowProgressBar(!showProgressBar);
    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(f);
   
    const myInterval = setInterval(getStatistics, 1000);
    console.log('getStatistics ', getStatistics);
   
    await axios.post(url, f, config)
    .then(response =>{
      //Se inicializan mensajes salida
      guardarMsgOut("");
      guardarMsgOutErr(""); 
      guardarMsgOutErr1([]);
      setMsgOutBoolOK(false);
      setMsgOutBoolKO(false);

      console.log(response?.data); 
      console.log("OK");

      var FilasCargadas = 0; var FilasConError = 0;
      var NumFilas = response?.data.length;

      if(NumFilas == 0){
        var msg= <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>
        guardarMsgOutErr(msg); 
        setMsgOutBoolKO(true);
      }

      var Id=0;
      console.log("NumFilas: ", response?.data.length)

      for(var i=0; i<NumFilas; i++){
        console.log(response?.data[i].item2);
        console.log(response?.data[1, i]);
        if(response?.data[i].item2 == 0){

          FilasCargadas += 1; 
          console.log("FilasCargadas: ", FilasCargadas)
          var msgOK = <Translation ns= "global">{(t) => <>{t('FilasCargadasAct', { NFilas: FilasCargadas})}</>}</Translation>
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
            var msgKO= <Translation ns= "global">{(t) => <>{t('CarreteraKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>
            break;
          case 2:
            var msgKO= <Translation ns= "global">{(t) => <>{t('ActuacionKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 3:
            var msgKO= <Translation ns= "global">{(t) => <>{t('BBDDKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 4:
            var msgKO= <Translation ns= "global">{(t) => <>{t('TramificarKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 5:
            var msgKO= <Translation ns= "global">{(t) => <>{t('TipoActuacionKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 6:
            var msgKO= <Translation ns= "global">{(t) => <>{t('TerrenoNaturalKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 7:
            var msgKO= <Translation ns= "global">{(t) => <>{t('CategExplanadaKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 8:
            var msgKO= <Translation ns= "global">{(t) => <>{t('TipoFirmeKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 10:
            var msgKO= <Translation ns= "global">{(t) => <>{t('TipoFirmeKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 9:
            var msgKO= <Translation ns= "global">{(t) => <>{t('CapasFirmeKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 11:
            var msgKO= <Translation ns= "global">{(t) => <>{t('NivelInfluenciaKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 12:
            var msgKO= <Translation ns= "global">{(t) => <>{t('PksKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 13:
            var msgKO= <Translation ns= "global">{(t) => <>{t('TramosActivosKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
            break;
          case 14:
            var msgKO= <Translation ns= "global">{(t) => <>{t('SentidoKO', { FilaKO: response?.data[i]?.item1 })}</>}</Translation>        
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
        var msgKO = <Translation ns= "global">{(t) => <>{t('FilasNoCargadasAct', { NFilasKO: FilasConError })}</>}</Translation>
        guardarMsgOutErr(msgKO);
      }
      setShowProgressBar(showProgressBar);
      clearInterval(myInterval);
      setProgressBarValue(0);
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
        default:
          var msg= <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>
          break;
      }
      
      guardarMsgOutErr(msg); 
      setShowProgressBar(showProgressBar);
      clearInterval(myInterval);
      setProgressBarValue(0);
    })        
  }

  const config2 = {
    responseType: 'arraybuffer',
    body: 'data',
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-disposition': 'attachment',
        'content-type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'server': 'Microsoft-IIS/10.0', 
        'x-powered-by': 'ASP.NET' 
    }
  };
  
    /*Descargar Excel plantilla*/
    const peticionDownload=async()=>{
  
      axios.post(url + "/" + 1, config2, {responseType: 'arraybuffer'},  {body: 'data'}, 
      {  headers: {
            'Authorization': sessionStorage.getItem("JWT"),
            'Accept': 'application/json',
            'content-disposition': 'attachment',
            'content-type': 'application/octet-stream',
            'Access-Control-Allow-Origin': '*',
            'server': 'Microsoft-IIS/10.0', 
            'x-powered-by': 'ASP.NET' 
        }
        }).then(response=>{
          console.log("OK-response",response);

          setMsgOutBoolOK(false);
          setMsgOutBoolKO(false);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'PlantillaActuacions.xlsx'); //or any other extension
          document.body.appendChild(link);
          link.click();

      }).catch(error=>{
        console.log("KO Download");
        console.log(url);
        console.log(error);
        console.log("Error response", error.response);
        console.log("Error response data", error.response?.data);
        console.log("Error response data byteLength", error.response?.data.byteLength);

        setMsgOutBoolOK(false);
        setMsgOutBoolKO(true);
        var msg= <Translation ns= "global">{(t) => <>{t('DescargarPlantillaKO')}</>}</Translation>
        guardarMsgOutErr(msg); 
    })   
  }

  return (
    <div>
      <br/>
          <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
          {
            showProgressBar
              ? <div className="progress" style={{marginTop: '1rem', height: '1.5rem', fontSize: '1.1rem'}}>
                  <div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" role={"progressbar"} style={{width: `${progressBarValue}%`}} aria-valuenow={progressBarValue} aria-valuemin="0" aria-valuemax="100">{progressBarValue}%</div>
                </div>
              : ""
          }
          <br /><br />
          {/*<button className="btn btn-primario btn-sm" style={{float: 'right'}} onClick={()=>insertarArchivos()}><Translation ns= "global">{(t) => <>{t('Cargar')}</>}</Translation></button>*/}
          <button className="btn btn-primario btn-sm" style={{float: 'right', marginRight: '5px'}} onClick={()=>insertarArchivos()}><Translation ns= "global">{(t) => <>{t('Cargar')}</>}</Translation></button>
          <button className="btn btn-primary btn-sm" style={{float: 'right', marginRight: '5px'}} onClick={()=>peticionDownload()}><Translation ns= "global">{(t) => <>{t('DescargarPlantilla')}</>}</Translation></button> 
          <br/><br/><br/>

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
       <div className="alert alert-danger">
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

export default CargarExcel;