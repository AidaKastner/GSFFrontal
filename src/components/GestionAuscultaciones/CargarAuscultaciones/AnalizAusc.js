import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/Menu.css';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CloseOutlined, ContentCutOutlined } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../../css/FileUpload.scss';


function AnalizAusc(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/analizarauscultaciones";
  

  

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  const [items, setItems] = useState([]);
  const [archivo, setArchivo]=useState(null);

  const subirArchivos=e=>{
    setArchivo(e);
    console.log("subir");
  }

  const borrarArchivos=e=>{
    setArchivo();
    console.log("borrar");
  }

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    className: 'paginationCustom'
  })
  
  const [VerTablaDEF, setVerTablaDEF] = useState(false);
  const [TablaAuscultacionesDEFF2, actualizarTablaAuscultacionesDEFF2] = useState([]);
  const [TablaAuscultacionesDEFF3, actualizarTablaAuscultacionesDEFF3] = useState([]);
  const [TablaAuscultacionesDEFCuerpo, actualizarTablaAuscultacionesDEFCuerpo] = useState([]);

  const [VerTablaIRI, setVerTablaIRI] = useState(false);
  const [TablaAuscultacionesIRIF2, actualizarTablaAuscultacionesIRIF2] = useState([]);
  const [TablaAuscultacionesIRIF3, actualizarTablaAuscultacionesIRIF3] = useState([]);
  const [TablaAuscultacionesIRIF4, actualizarTablaAuscultacionesIRIF4] = useState([]);
  const [TablaAuscultacionesIRICuerpo, actualizarTablaAuscultacionesIRICuerpo] = useState([]);

  const [VerTablaPAQ, setVerTablaPAQ] = useState(false);
  const [TablaAuscultacionesPAQF2, actualizarTablaAuscultacionesPAQF2] = useState([]);
  const [TablaAuscultacionesPAQF3, actualizarTablaAuscultacionesPAQF3] = useState([]);
  const [TablaAuscultacionesPAQF4, actualizarTablaAuscultacionesPAQF4] = useState([]);
  const [TablaAuscultacionesPAQCuerpo, actualizarTablaAuscultacionesPAQCuerpo] = useState([]);

  const [VerTablaMVL, setVerTablaMVL] = useState(false);
  const [TablaAuscultacionesMVLF2, actualizarTablaAuscultacionesMVLF2] = useState([]);
  const [TablaAuscultacionesMVLF3, actualizarTablaAuscultacionesMVLF3] = useState([]);
  const [TablaAuscultacionesMVLCuerpo, actualizarTablaAuscultacionesMVLCuerpo] = useState([]);

  const [VerTablaFIS, setVerTablaFIS] = useState(false);
  const [TablaAuscultacionesFISF2, actualizarTablaAuscultacionesFISF2] = useState([]);
  const [TablaAuscultacionesFISF3, actualizarTablaAuscultacionesFISF3] = useState([]);
  const [TablaAuscultacionesFISF4, actualizarTablaAuscultacionesFISF4] = useState([]);
  const [TablaAuscultacionesFISCuerpo, actualizarTablaAuscultacionesFISCuerpo] = useState([]);

  const [VerTablaROD, setVerTablaROD] = useState(false);
  const [TablaAuscultacionesRODF2, actualizarTablaAuscultacionesRODF2] = useState([]);
  const [TablaAuscultacionesRODF3, actualizarTablaAuscultacionesRODF3] = useState([]);
  const [TablaAuscultacionesRODF4, actualizarTablaAuscultacionesRODF4] = useState([]);
  const [TablaAuscultacionesRODCuerpo, actualizarTablaAuscultacionesRODCuerpo] = useState([]);


  const [TipoAuscultacion, actualizarTipoAuscultacion] = useState('');


  const [msgOutErr, guardarMsgOutErr] = useState();
  const [msgOutErr1, guardarMsgOutErr1] = useState([]);
  const [msgOutWar, guardarMsgOutWar] = useState([]);
  const [msgOutBoolWar, setMsgOutBoolWar] = useState(false);
  const [msgOutBoolKO, setMsgOutBoolKO] = useState(false);


  const AnalizarAuscultacion=async()=>{

    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(archivo);
    var ExtensionFichero = archivo?.name?.split('.').pop();
    console.log("Ext Fich: ", ExtensionFichero);
    var IdError = 0; 
   
    await axios.post(url, f, config)
    .then(response =>{

      //Se inicializan mensajes salida
      guardarMsgOutErr();
      guardarMsgOutErr1([]);
      guardarMsgOutWar([]);
      setMsgOutBoolWar(false);
      setMsgOutBoolKO(false);

      console.log("archivo: ", archivo);
      console.log("ext FICHERO: ", ExtensionFichero);
      console.log(response?.data); 
      console.log("OK");
      console.log("NOMBRE FICHERO: ", archivo?.name);


      //Comprobación de errores de las cabeceras
      if(archivo?.name?.includes("DAT") == true || archivo?.name?.includes("dat") == true ||
         archivo?.name?.includes("MVL") == true || archivo?.name?.includes("mvl") == true){

          if(response.data?.fila2[0].fechaAusc.item2 == true){
            console.log("error fecha");
            var msgKO= <Translation ns= "global">{(t) => <>{t('FechaAuscKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++; 
          }
  
          if(response.data?.fila3[0].comanda.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('ComandaKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].numVia.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('NumViaKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].numVias.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('NumViasKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].pkIni.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('PKAuscKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          console.log("IDError: ", IdError);
          if(IdError > 0){
            console.log("errores");
            setMsgOutBoolKO(true);
            var msgKO= <Translation ns= "global">{(t) => <>{t('ErroresAus')}</>}</Translation>
            guardarMsgOutErr(msgKO);
          }

         }

      if(archivo?.name?.includes("FSR") == true || archivo?.name?.includes("fsr") == true ||
         archivo?.name?.includes("IRI") == true || archivo?.name?.includes("iri") == true || 
         archivo?.name?.includes("ROD") == true || archivo?.name?.includes("rod") == true){

          if(response.data?.fila2[0].fechaAusc.item2 == true){
            console.log("error fecha");
            var msgKO= <Translation ns= "global">{(t) => <>{t('FechaAuscKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++; 
          }
  
          if(response.data?.fila4[0].comanda.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('ComandaKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].numVia.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('NumViaKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].numVias.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('NumViasKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].pkIni.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('PKAuscKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          console.log("IDError: ", IdError);
          if(IdError > 0){
            console.log("errores");
            setMsgOutBoolKO(true);
            var msgKO= <Translation ns= "global">{(t) => <>{t('ErroresAus')}</>}</Translation>
            guardarMsgOutErr(msgKO);
          }

         }

         if(archivo?.name?.includes("PAQ") == true || archivo?.name?.includes("paq") == true){
          if(response.data?.fila2[0].fechaAusc.item2 == 2){
            console.log("error fecha");
            var msgKO= <Translation ns= "global">{(t) => <>{t('FechaAuscKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++; 
          }
  
          if(response.data?.fila4[0].comanda.item2 == 2){
            var msgKO= <Translation ns= "global">{(t) => <>{t('ComandaKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].numVia.item2 == 2){
            var msgKO= <Translation ns= "global">{(t) => <>{t('NumViaKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].numVias.item2 == 2){
            var msgKO= <Translation ns= "global">{(t) => <>{t('NumViasKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          if(response.data?.fila3[0].pkIni.item2 == 2){
            var msgKO= <Translation ns= "global">{(t) => <>{t('PKAuscKO')}</>}</Translation>
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError++;
          }
  
          console.log("IDError: ", IdError);
          if(IdError > 0){
            console.log("errores");
            setMsgOutBoolKO(true);
            var msgKO= <Translation ns= "global">{(t) => <>{t('ErroresAus')}</>}</Translation>
            guardarMsgOutErr(msgKO);
          }
         }


      
      setVerTablaROD(false); setVerTablaDEF(false); setVerTablaIRI(false);
      setVerTablaPAQ(false); setVerTablaMVL(false); setVerTablaFIS(false);
      
      
      //DATOS ROD
      if(archivo?.name?.includes("ROD") == true || archivo?.name?.includes("rod") == true){
        console.log("ROD");
        setVerTablaROD(true); actualizarTipoAuscultacion("ROD");
        actualizarTablaAuscultacionesRODF2(response.data?.fila2);
        actualizarTablaAuscultacionesRODF3(response.data?.fila3);
        actualizarTablaAuscultacionesRODF4(response.data?.fila4);
        actualizarTablaAuscultacionesRODCuerpo(response.data?.cuerpo); 
           
      }
     
      //DATOS DEFLEXIONES
      if(archivo?.name?.includes("DAT") == true || archivo?.name?.includes("dat") == true){
        console.log("Deflexiones"); actualizarTipoAuscultacion("DEF");
        console.log("IDError: ", IdError);
        setVerTablaDEF(true);
        actualizarTablaAuscultacionesDEFF2(response.data?.fila2);
        actualizarTablaAuscultacionesDEFF3(response.data?.fila3);
        actualizarTablaAuscultacionesDEFCuerpo(response.data?.cuerpo);       
      }
      

      //DATOS IRI
      if(archivo?.name?.includes("IRI") == true || archivo?.name?.includes("iri") == true){
        console.log("IRI"); actualizarTipoAuscultacion("IRI");
        setVerTablaIRI(true);
        actualizarTablaAuscultacionesIRIF2(response.data?.fila2);
        actualizarTablaAuscultacionesIRIF3(response.data?.fila3);
        actualizarTablaAuscultacionesIRIF4(response.data?.fila4);
        actualizarTablaAuscultacionesIRICuerpo(response.data?.cuerpo);

        for(var i=1; i<response?.data?.cuerpo.length; i++){
          
          if(response.data?.cuerpo[i].coordX.item2 == true){
            var msgKO= <Translation ns= "global">{(t) => <>{t('CoordXKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError += 1;  
          }

        if(response.data?.cuerpo[i].coordY.item2 == true){
          var msgKO= <Translation ns= "global">{(t) => <>{t('CoordYKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1  })}</>}</Translation> 
          guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
          IdError += 1;  
        }
      }
    }

      //DATOS PAQ
      if(archivo?.name?.includes("PAQ") == true || archivo?.name?.includes("paq") == true){
        console.log("PAQ"); actualizarTipoAuscultacion("PAQ");
        setVerTablaPAQ(true);
        actualizarTablaAuscultacionesPAQF2(response.data?.fila2);
        actualizarTablaAuscultacionesPAQF3(response.data?.fila3);
        actualizarTablaAuscultacionesPAQF4(response.data?.fila4);
        actualizarTablaAuscultacionesPAQCuerpo(response.data?.cuerpo);

        for(var i=1; i<response?.data?.cuerpo.length; i++){
          
          if(response.data?.cuerpo[i].crt.item2 == 1){
            var msgKO= <Translation ns= "global">{(t) => <>{t('CRTKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
            guardarMsgOutWar(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError += 1;  
            setMsgOutBoolWar(true);
          }

        if(response.data?.cuerpo[i].textura.item2 == 1){
          var msgKO= <Translation ns= "global">{(t) => <>{t('TexturaAusKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
          guardarMsgOutWar(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
          IdError += 1; 
          setMsgOutBoolWar(true); 
        }
      }
      }

      //DATOS MVL
      if(archivo?.name?.includes("MVL") == true || archivo?.name?.includes("mvl") == true){
        console.log("MVL"); actualizarTipoAuscultacion("MVL");
        setVerTablaMVL(true);
        actualizarTablaAuscultacionesMVLF2(response.data?.fila2);
        actualizarTablaAuscultacionesMVLF3(response.data?.fila3);
        actualizarTablaAuscultacionesMVLCuerpo(response.data?.cuerpo);

        for(var i=1; i<response?.data?.cuerpo.length; i++){
          
          if(response.data?.cuerpo[i].tipoCalz.item2 == true){
            
            var msgKO= <Translation ns= "global">{(t) => <>{t('TipoCalzAuscKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
            guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
            IdError += 1;              
          }

        if(response.data?.cuerpo[i].marcaViaria.item2 == true){
          var msgKO= <Translation ns= "global">{(t) => <>{t('MarcaViKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
          guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
          IdError += 1;  
        }
      }
      }

      //DATOS FIS
      if(archivo?.name?.includes("FSR") == true || archivo?.name?.includes("fsr") == true){
        console.log("FSR"); actualizarTipoAuscultacion("FIS");
        setVerTablaFIS(true);
        actualizarTablaAuscultacionesFISF2(response.data?.fila2);
        actualizarTablaAuscultacionesFISF3(response.data?.fila3);
        actualizarTablaAuscultacionesFISF4(response.data?.fila4);
        actualizarTablaAuscultacionesFISCuerpo(response.data?.cuerpo);  
        
        
      }

      

    }).catch(error=>{
      console.log("prueba2");
      console.log("ERROR: ", error);
    })        
  }



      /*Guardar Auscultación*/
      const GuardarAuscultacion=async()=>{
  
        axios.post(url + "/" + TipoAuscultacion, config).then(response=>{
          console.log(response);
  
        }).catch(error=>{
          console.log(error);

      })   
    }


 
  {/*Tabla de Auscultaciones DEF*/}
  const columnsF2DEF = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}}
 ]
  const columnsF3DEF = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t( 'Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t( 'ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t( 'PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t( 'NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t( 'NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
  ]

  const columnsDEF = [
      {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t( 'Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t( 'DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'deflMaxInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxIntCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'deflMaxExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxExtCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'incidencias.item1', text: <Translation ns= "global">{(t) => <>{t( 'Incidencia')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'temperatura.item1', text: <Translation ns= "global">{(t) => <>{t( 'TempPavimento')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'radiCurvMaxInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'radiCurvMaxExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'deflMaxNoCorrInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'deflMaxNoCorrExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'coefTemp.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoefTemp')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'coefHumedad.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoefHum')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}
   ]

   {/*Tabla de Auscultaciones IRI*/}
  const columnsF2IRI = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}}
  ]

  const columnsF3IRI = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
  ]

  const columnsF4IRI = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
  ]

  const columnsIRI = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'rodadaDreta.item1', text: <Translation ns= "global">{(t) => <>{t('RodadaDer')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'rodadaEsq.item1', text: <Translation ns= "global">{(t) => <>{t('RodadaIzq')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordX?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordY?.item2 == true ?'#FD0303':''}}>{cell}</div>;}}
  ]



  {/*Tabla de Auscultaciones PAQ*/}
  const columnsF2PAQ = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == 2 ?'red': row.fechaAusc?.item2 == 1 ? 'orange': ''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}}
 ]

  const columnsF3PAQ = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == 2 ? 'red': row.pkIni?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == 2 ? 'red': row.numVia?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == 2 ? 'red': row.numVias?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}},
    ]

  const columnsF4PAQ = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == 2 ? 'red': row.comanda?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == 2 ? 'red': row.claveObra?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}},
  ]

  const columnsPAQ = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, },
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.distOri?.item2 == 2 ? 'red': row.distOri?.item2 == 1 ? 'orange': ''}}>{cell}</div>}},
    {dataField: 'incidencia.item1', text: <Translation ns= "global">{(t) => <>{t('Incidencias')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.incidencia?.item2 == 2 ? 'red': row.incidencia?.item2 == 1 ? 'orange': ''}}>{cell}</div>}},
    {dataField: 'crt.item1', text: <Translation ns= "global">{(t) => <>{t('CRT')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.crt?.item2 == 2 ? 'red': row.crt?.item2 == 1 ? 'orange': ''}}>{cell}</div>}},
    {dataField: 'temperatura.item1', text: <Translation ns= "global">{(t) => <>{t('TempPavimento')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.temperatura?.item2 == 2 ? 'red': row.temperatura?.item2 == 1 ? 'orange': ''}}>{cell}</div>}},
    {dataField: 'textura.item1', text: <Translation ns= "global">{(t) => <>{t('Textura')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.textura?.item2 == 2 ? 'red': row.textura?.item2 == 1 ? 'orange': ''}}>{cell}</div>}},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordX?.item2 == 2 ? 'red': row.coordX?.item2 == 1 ? 'orange': ''}}>{cell}</div>}},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordY?.item2 == 2 ? 'red': row.coordY?.item2 == 1 ? 'orange': ''}}>{cell}</div>}}
  ]

    {/*Tabla de Auscultaciones MVL*/}
    const columnsF2MVL = [
      {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>},
      {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>},
      {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ? 'red': ''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}}
   ]
  
    const columnsF3MVL = [
      {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ? 'red': ''}}>{cell}</div>;}},
      {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ? 'red': ''}}>{cell}</div>;}},  
      {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ? 'red': ''}}>{cell}</div>;}},
      {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ? 'red': ''}}>{cell}</div>;}},
      {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ? 'red': ''}}>{cell}</div>;}},
      ]
  
    const columnsMVL = [
      {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, },
      {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.distOri?.item2 == true ? 'red': ''}}>{cell}</div>}},
      {dataField: 'tipoCalz.item1', text: <Translation ns= "global">{(t) => <>{t('TipoCalzada')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.tipoCalz?.item2 == true ? 'red': ''}}>{cell}</div>}},
      {dataField: 'marcaViaria.item1', text: <Translation ns= "global">{(t) => <>{t('MarcaViaria')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.marcaViaria?.item2 == true ? 'red': ''}}>{cell}</div>}},
      {dataField: 'contrasteDia.item1', text: <Translation ns= "global">{(t) => <>{t('ContrasteDia')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.contrasteDia?.item2 == true ? 'red': ''}}>{cell}</div>}},
      {dataField: 'contrasteNoche.item1', text: <Translation ns= "global">{(t) => <>{t('ContrasteNoche')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.contrasteNoche?.item2 == true ? 'red': ''}}>{cell}</div>}},
      {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordX?.item2 == true ? 'red': ''}}>{cell}</div>}},
      {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordY?.item2 == true ? 'red': ''}}>{cell}</div>}}
    ]


   {/*Tabla de Auscultaciones FIS*/}
   const columnsF2FIS = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}}
  ]

  const columnsF3FIS = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
  ]

  const columnsF4FIS = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
  ]

  const columnsFIS = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'incidencia.item1', text: <Translation ns= "global">{(t) => <>{t('Incidencias')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'pci.item1', text: <Translation ns= "global">{(t) => <>{t('PCI')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'ift.item1', text: <Translation ns= "global">{(t) => <>{t('IFT')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'ifp.item1', text: <Translation ns= "global">{(t) => <>{t('IFP')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'porcFisTot.item1', text: <Translation ns= "global">{(t) => <>{t('PorcSupFisTot')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'longFisLongi.item1', text: <Translation ns= "global">{(t) => <>{t('LongFisLongit')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'porcSupFisLongi.item1', text: <Translation ns= "global">{(t) => <>{t('PorcSupFisLongi')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'longFisTrans.item1', text: <Translation ns= "global">{(t) => <>{t('LongFisTrans')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'porcSupFisTrans.item1', text: <Translation ns= "global">{(t) => <>{t('PorcSupFisTrans')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'areaOtrasSup.item1', text: <Translation ns= "global">{(t) => <>{t('AreaOtrasSupFis')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}
  ]

  const columnsFIS2 = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'porcOtrasSup.item1', text: <Translation ns= "global">{(t) => <>{t('PorcOtrasSupFis')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'areaSupCuart.item1', text: <Translation ns= "global">{(t) => <>{t('AreaSupCuart')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'porcSupCuart.item1', text: <Translation ns= "global">{(t) => <>{t('PorcSupCuart')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'baches.item1', text: <Translation ns= "global">{(t) => <>{t('Baches')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}
  ]



   {/*Tabla de Auscultaciones ROD*/}
   const columnsF2ROD = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}}
  ]

  const columnsF3ROD = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
  ]

  const columnsF4ROD = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}},
  ]

  const columnsROD = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'incidencia.item1', text: <Translation ns= "global">{(t) => <>{t('Incidencias')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'profRodIzq.item1', text: <Translation ns= "global">{(t) => <>{t('ProfRodIzq')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'profRodDer.item1', text: <Translation ns= "global">{(t) => <>{t('ProfRodDer')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'profRodMax.item1', text: <Translation ns= "global">{(t) => <>{t('ProfRodMax')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}
  ]

  return (
    <div>
      <br/>
      <div className='file-card' >
           <div className='file-inputs' style={{marginRight: '80%'}}>
         <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
               <button>
                 <i>
                   <FontAwesomeIcon icon={faPlus} /> 
                 </i>
                 <Translation ns= "global">{(t) => <>{t('SubirFichero')}</>}</Translation>  
               </button>
           </div>

           {archivo?
           <div className='file-upload' style={{marginRight: '70%'}}>
           <FontAwesomeIcon icon={faFileAlt} />
           {archivo?.name }
           <div className='actions'>
           <FontAwesomeIcon
           style={{marginLeft: '70%'}} 
           icon={faTrash} 
           onClick={() => borrarArchivos()} />
           </div>
         </div>
         :''}

         </div>
         
         
         
         
          <br/> 
          <button className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>AnalizarAuscultacion()}><Translation ns= "global">{(t) => <>{t('Analizar')}</>}</Translation></button>
          <button className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>GuardarAuscultacion()}><Translation ns= "global">{(t) => <>{t('Cargar')}</>}</Translation></button>
          <br/><br/><br/>  

      {/*Mensajes de error*/}
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

    {/*Mensajes de Warning*/}
    { msgOutBoolWar ? 
      <div><br/>
       <div className="alert alert-warning">
          {/*Mostramos mensaje*/}
          {msgOutWar.map(msgOutWar => (
          <li key={msgOutWar.id}>{msgOutWar.name}</li>
        ))}
      </div>
      </div>
      : ""}

<br/><br/>  
        {VerTablaDEF == true ?
        <div>

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF2DEF} 
            data={TablaAuscultacionesDEFF2}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF3DEF} 
            data={TablaAuscultacionesDEFF3}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsDEF} 
            data={TablaAuscultacionesDEFCuerpo}
            pagination={pagination}
            filter={filterFactory()}
            bordered={false}
          />
        </div>
        : ""}


    {VerTablaIRI == true ?
        <div>

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF2IRI} 
            data={TablaAuscultacionesIRIF2}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF3IRI} 
            data={TablaAuscultacionesIRIF3}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF4IRI} 
            data={TablaAuscultacionesIRIF4}
            bordered={false}
          />
          <br/><br/> 

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsIRI} 
            data={TablaAuscultacionesIRICuerpo}
            pagination={pagination}
            filter={filterFactory()}
            bordered={false}
          />
        </div>
        : ""}
      

      {VerTablaPAQ == true ?
        <div>

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF2PAQ} 
            data={TablaAuscultacionesPAQF2}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF3PAQ} 
            data={TablaAuscultacionesPAQF3}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF4PAQ} 
            data={TablaAuscultacionesPAQF4}
            bordered={false}
          />
          <br/><br/> 

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsPAQ} 
            data={TablaAuscultacionesPAQCuerpo}
            pagination={pagination}
            filter={filterFactory()}
            bordered={false}
          />
        </div>
        : ""}

      
    {VerTablaMVL == true ?
        <div>

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF2MVL} 
            data={TablaAuscultacionesMVLF2}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF3MVL} 
            data={TablaAuscultacionesMVLF3}
            bordered={false}
          />
          <br/><br/> 

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsMVL} 
            data={TablaAuscultacionesMVLCuerpo}
            pagination={pagination}
            filter={filterFactory()}
            bordered={false}
          />
        </div>
        : ""} 


    {VerTablaFIS == true ?
        <div>

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF2FIS} 
            data={TablaAuscultacionesFISF2}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF3FIS} 
            data={TablaAuscultacionesFISF3}
            bordered={false}
          />
          <br/><br/> 

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF4FIS} 
            data={TablaAuscultacionesFISF4}
            bordered={false}
          />
          <br/><br/> 

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsFIS} 
            data={TablaAuscultacionesFISCuerpo}
            pagination={pagination}
            filter={filterFactory()}
            bordered={false}
            wrapperClasses="table-responsive"
            headerWrapperClasses="table-responsive"

          />

        <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsFIS2} 
            data={TablaAuscultacionesFISCuerpo}
            pagination={pagination}
            filter={filterFactory()}
            bordered={false}
            wrapperClasses="table-responsive"
            headerWrapperClasses="table-responsive"

          />
        </div>
        : ""} 

{VerTablaROD == true ?
        <div>

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF2ROD} 
            data={TablaAuscultacionesRODF2}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF3ROD} 
            data={TablaAuscultacionesRODF3}
            bordered={false}
          />
          <br/><br/> 

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF4ROD} 
            data={TablaAuscultacionesRODF4}
            bordered={false}
          />
          <br/><br/> 

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsROD} 
            data={TablaAuscultacionesRODCuerpo}
            pagination={pagination}
            filter={filterFactory()}
            bordered={false}
          />
        </div>
        : ""} 
      </div>
  )

}

export default AnalizAusc;