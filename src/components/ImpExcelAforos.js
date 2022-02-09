import '../css/Menu.css';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Translation } from 'react-i18next';

function ImpExcelAforos() {
  const url = "https://localhost:44301/api/importaraforos";
  const urlStatistics = "https://localhost:44301/api/ImportarAforos/statistics";

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  const [archivo, setArchivo]=useState(null);
  const [msgOut, guardarMsgOut] = useState();
  const [msgOutErr, guardarMsgOutErr] = useState();
  const [msgOutErr1, guardarMsgOutErr1] = useState([]);
  const [msgOutErrAf, guardarMsgOutErrAf] = useState();
  const [msgOutBoolOK, setMsgOutBoolOK] = useState(false);
  const [msgOutBoolKO, setMsgOutBoolKO] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0);

  const subirArchivos=e=>{
    setArchivo(e);
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
    axios.post(url + "/" + 1, config2, {responseType: 'arraybuffer'},  {body: 'data'}, {
      headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-disposition': 'attachment',
        'content-type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'server': 'Microsoft-IIS/10.0', 
        'x-powered-by': 'ASP.NET' 
      }
    }).then(response => {
      console.log("OK-response",response);
      setMsgOutBoolOK(false);
      setMsgOutBoolKO(false);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'PlantillaAforaments.xlsx'); //or any other extension
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

  const getStatistics = () => {
    axios.get(urlStatistics).then(response => {
      setProgressBarValue(response.data.finishedCount / response.data.totalCount * 100);
    });
  }

  const insertarArchivos = async() => {
    setShowProgressBar(!showProgressBar);
    const f = new FormData();
    f.append('Fichero',archivo);

    const myInterval = setInterval(getStatistics, 1000);

    await axios.post(url, f, config).then(response => {
      //Se inicializan mensajes salida
      guardarMsgOut("");
      guardarMsgOutErr(""); 
      guardarMsgOutErr1([]);
      guardarMsgOutErrAf("");
      setMsgOutBoolOK(false);
      setMsgOutBoolKO(false);
      var Id=0;

      var FilasCargadas = 0; var FilasConError = 0;
      var NumFilas = response?.data.length;
      
      if (NumFilas == 0) {
        var msg= <Translation ns= "global">{(t) => <>{t('ExcelKO')}</>}</Translation>
        guardarMsgOutErr(msg); 
        setMsgOutBoolKO(true);
      }

      for (var i = 0; i < NumFilas; i++) {
        if (response?.data[i].item2 == 0) {
          FilasCargadas += 1; 
          console.log("FilasCargadas: ", FilasCargadas)
          var msgOK = <Translation ns= "global">{(t) => <>{t('FilasCargadasAf', { NFilas: FilasCargadas})}</>}</Translation>
          guardarMsgOut(msgOK);
          setMsgOutBoolOK(true);
        } else {
          if (response?.data[i]?.item1 != 9999) {
            FilasConError += 1; 
            console.log("FilasConError: ", FilasConError)
            console.log("FILA(response?.data[i]?.item1): ", response?.data[i]?.item1)
            console.log("ERROR(response?.data[i]?.item2): ", response?.data[i]?.item2)
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

        if (response?.data[i]?.item1 == 9999 && response?.data[i].item2 > 0) {
          var msgKO = <Translation ns= "global">{(t) => <>{t('ProcAforosKO')}</>}</Translation>
          guardarMsgOutErrAf(msgKO);
          console.log("error procesar aforos");
        }
      }

      if (FilasConError > 0) {
        var msgKO = <Translation ns= "global">{(t) => <>{t('FilasNoCargadasAf', { NFilasKO: FilasConError })}</>}</Translation>
        guardarMsgOutErr(msgKO);
      }
      setShowProgressBar(showProgressBar);
      clearInterval(myInterval);
      setProgressBarValue(0);
    }).catch(error => {
      //Se inicializan mensajes salida
      guardarMsgOut("");
      guardarMsgOutErr(""); 
      guardarMsgOutErr1([]);
      setMsgOutBoolOK(false);
      setMsgOutBoolKO(true);
      var msg = "";

      console.log("prueba2");
      console.log("error: ", error.response?.data);

      switch (error.response?.data[0]) {
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
      setShowProgressBar(showProgressBar);
      clearInterval(myInterval);
      setProgressBarValue(0);
    })
  }

  return (
    <div>
      <br/> 
        <h1><Translation ns= "global">{(t) => <>{t('ImpAfr')}</>}</Translation></h1>
        <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
        {
          showProgressBar
            ? <div className="progress" style={{marginTop: '1rem', height: '1.5rem', fontSize: '1.1rem'}}>
                <div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" role={"progressbar"} style={{width: `${progressBarValue}%`}} aria-valuenow={progressBarValue} aria-valuemin="0" aria-valuemax="100">{progressBarValue}%</div>
              </div>
            : ""
        }
        <br />
        <button className="btn btn-primario btn-sm" style={{float: 'right', marginRight: '5px'}} onClick={()=>insertarArchivos()}><Translation ns= "global">{(t) => <>{t('Cargar')}</>}</Translation></button>
        <button className="btn btn-primary btn-sm" style={{float: 'right', marginRight: '5px'}} onClick={()=>peticionDownload()}><Translation ns= "global">{(t) => <>{t('DescargarPlantilla')}</>}</Translation></button>
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
        <br/>
        {msgOutErrAf}
      </div>
      </div>
      : ""}
    </div>
  )
}

export default ImpExcelAforos;
