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
  const url = "https://localhost:44301/api/analizarauscultaciones/AnalizarAusc/";
  const url2 = "https://localhost:44301/api/analizarauscultaciones/GuardarAusc/";

  

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  const [items, setItems] = useState([]);
  const [archivo, setArchivo]=useState(null);
  const [uploadFile, setUploadFile] = useState(false);
  const [validacionOK, setValidacionOK] = useState(false);

  

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

   //Campos Actuación
   const [FormAuscultacion, actualizarFormAuscultacion] = useState({
    Sobreescribir: false, AdaptarCarriles: true, BuscarInicio: true
});
  
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

  const InicializarDatos=()=>{
    console.log("INICIALIZAR");
    setVerTablaIRI(false);
    setVerTablaPAQ(false);
    setVerTablaFIS(false);
    setVerTablaMVL(false);
    setVerTablaROD(false);
    setVerTablaDEF(false);


    //Se inicializan mensajes salida
    guardarMsgOutErr();
    guardarMsgOutErr1([]);
    guardarMsgOutWar([]);
    setMsgOutBoolWar(false);
    setMsgOutBoolKO(false);
    setValidacionOK(false);
  }

  const subirArchivos=e=>{
    setArchivo(e);
    console.log("subir");
    setUploadFile(true);
    InicializarDatos();
  }

  const borrarArchivos=e=>{
    setArchivo();
    console.log("borrar");
    setUploadFile(false);
    InicializarDatos();
  }


  const AnalizarAuscultacion=async()=>{

    //InicializarDatos();
    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(archivo);
    var ExtensionFichero = archivo?.name?.split('.').pop();
    console.log("Ext Fich: ", ExtensionFichero);
    
    if(archivo?.name?.includes("DAT") == false && archivo?.name?.includes("dat") == false &&
    archivo?.name?.includes("MVL") == false && archivo?.name?.includes("mvl") == false &&
    archivo?.name?.includes("FSR") == false && archivo?.name?.includes("fsr") == false &&
    archivo?.name?.includes("FIS") == false && archivo?.name?.includes("fis") == false &&
    archivo?.name?.includes("IRI") == false && archivo?.name?.includes("iri") == false &&
    archivo?.name?.includes("ROD") == false && archivo?.name?.includes("rod") == false &&
    archivo?.name?.includes("PAQ") == false && archivo?.name?.includes("paq") == false) {
      //Tipo de fichero incorrecto
      setMsgOutBoolKO(true);
      var msgKO= <Translation ns= "global">{(t) => <>{t('TipoAuscKO')}</>}</Translation>
      guardarMsgOutErr(msgKO);

    }else{
      await axios.post(url, f, config)
      .then(response =>{

        console.log("archivo: ", archivo);
        console.log("ext FICHERO: ", ExtensionFichero);
        console.log(response?.data); 
        console.log("OK");
        console.log("NOMBRE FICHERO: ", archivo?.name);

        var IdError = 0; 

              setMsgOutBoolKO(false);
              //Comprobación de errores de las cabeceras
              if(archivo?.name?.includes("DAT") == true || archivo?.name?.includes("dat") == true ||
              archivo?.name?.includes("MVL") == true || archivo?.name?.includes("mvl") == true){

              if(response.data?.fila2[0].fechaAusc.item2 == true){
                console.log("error fecha");
                var msgKO= <Translation ns= "global">{(t) => <>{t('FechaAuscKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                setMsgOutBoolKO(true);
                IdError += 1;  
                console.log("IDError: ", IdError);
              }

              if(response.data?.fila3[0].comanda.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('ComandaKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                setMsgOutBoolKO(true);
                IdError += 1;  
                console.log("IDError: ", IdError);
              }

              if(response.data?.fila3[0].numVia.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('NumViaKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                setMsgOutBoolKO(true);
                IdError += 1;  
                console.log("IDError: ", IdError);
              }

              if(response.data?.fila3[0].numVias.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('NumViasKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                setMsgOutBoolKO(true);
                IdError += 1;  
                console.log("IDError: ", IdError);
              }

              if(response.data?.fila3[0].pkIni.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('PKAuscKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                setMsgOutBoolKO(true);
                IdError += 1;  
                console.log("IDError: ", IdError);
              }

              console.log("IDError: ", IdError);
              

              }

            if(archivo?.name?.includes("FSR") == true || archivo?.name?.includes("fsr") == true ||
              archivo?.name?.includes("FIS") == true || archivo?.name?.includes("fis") == true  ||
              archivo?.name?.includes("IRI") == true || archivo?.name?.includes("iri") == true || 
              archivo?.name?.includes("ROD") == true || archivo?.name?.includes("rod") == true){

              if(response.data?.fila2[0].fechaAusc.item2 == true){
                console.log("error fecha");
                var msgKO= <Translation ns= "global">{(t) => <>{t('FechaAuscKO')}</>}</Translation>       
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1; 
                setMsgOutBoolKO(true);
                console.log("IDError C: ", IdError);
              }

              if(response.data?.fila4[0].comanda.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('ComandaKO')}</>}</Translation>             
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1; 
                setMsgOutBoolKO(true);
                console.log("IDError C: ", IdError);
              }

              if(response.data?.fila3[0].numVia.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('NumViaKO')}</>}</Translation>        
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1; 
                setMsgOutBoolKO(true);
                console.log("IDError C: ", IdError);
              }

              if(response.data?.fila3[0].numVias.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('NumViasKO')}</>}</Translation>          
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1; 
                setMsgOutBoolKO(true);
                console.log("IDError C: ", IdError); 
              }

              if(response.data?.fila3[0].pkIni.item2 == true){
                var msgKO= <Translation ns= "global">{(t) => <>{t('PKAuscKO')}</>}</Translation>        
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1;     
                setMsgOutBoolKO(true); 
                console.log("IDError C: ", IdError);
              }
              }

              if(archivo?.name?.includes("PAQ") == true || archivo?.name?.includes("paq") == true){
              if(response.data?.fila2[0].fechaAusc.item2 == 2){
                console.log("error fecha");
                var msgKO= <Translation ns= "global">{(t) => <>{t('FechaAuscKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1;  
                setMsgOutBoolKO(true);
                console.log("IDError: ", IdError);
              }

              if(response.data?.fila4[0].comanda.item2 == 2){
                var msgKO= <Translation ns= "global">{(t) => <>{t('ComandaKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1;  
                setMsgOutBoolKO(true);
                console.log("IDError: ", IdError); 
              }

              if(response.data?.fila3[0].numVia.item2 == 2){
                var msgKO= <Translation ns= "global">{(t) => <>{t('NumViaKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1;  
                setMsgOutBoolKO(true);
                console.log("IDError: ", IdError);
              }

              if(response.data?.fila3[0].numVias.item2 == 2){
                var msgKO= <Translation ns= "global">{(t) => <>{t('NumViasKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1; 
                setMsgOutBoolKO(true);
                console.log("IDError: ", IdError); 
              }

              if(response.data?.fila3[0].pkIni.item2 == 2){
                var msgKO= <Translation ns= "global">{(t) => <>{t('PKAuscKO')}</>}</Translation>
                guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                IdError += 1; 
                setMsgOutBoolKO(true);
                console.log("IDError: ", IdError); 
              }
              }

              console.log("IDError: ", IdError);
      
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
                setVerTablaDEF(true);
                console.log(response);
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
                    console.log(response?.data.cuerpo[i]?.linea.item1 );
                    var msgKO= <Translation ns= "global">{(t) => <>{t('CoordXKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
                    IdError += 1; 
                    guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                    setMsgOutBoolKO(true);
                    console.log("IDError CU: ", IdError); 
                    console.log("MsgOutErr1: ", msgOutErr1);
                  }

                if(response.data?.cuerpo[i].coordY.item2 == true){
                  console.log(response?.data.cuerpo[i]?.linea.item1 );
                  var msgKO= <Translation ns= "global">{(t) => <>{t('CoordYKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1  })}</>}</Translation> 
                  IdError += 1; 
                  guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                  setMsgOutBoolKO(true);
                  console.log("IDError CU: ", IdError);
                  console.log("MsgOutErr1: ", msgOutErr1);
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

                var IdWar = 0;
                //Warnings
                for(var i=1; i<response?.data?.cuerpo.length; i++){
                  
                  if(response.data?.cuerpo[i].crt.item2 == 1){
                    console.log("IdError", IdError);
                    var msgKO= <Translation ns= "global">{(t) => <>{t('CRTKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
                    guardarMsgOutWar(oldArray => [...oldArray, {id: IdWar, name: msgKO}]);
                    IdWar += 1;
                    setMsgOutBoolWar(true);
                  }

                if(response.data?.cuerpo[i].textura.item2 == 1){
                  console.log("IdError", IdError);
                  var msgKO= <Translation ns= "global">{(t) => <>{t('TexturaAusKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
                  guardarMsgOutWar(oldArray => [...oldArray, {id: IdWar, name: msgKO}]);
                  IdWar += 1 ;
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
                    setMsgOutBoolKO(true);    
                    console.log("IDError: ", IdError);        
                  }

                if(response.data?.cuerpo[i].marcaViaria.item2 == true){
                  var msgKO= <Translation ns= "global">{(t) => <>{t('MarcaViKO', { FilaKO: response?.data.cuerpo[i]?.linea.item1 })}</>}</Translation> 
                  guardarMsgOutErr1(oldArray => [...oldArray, {id: IdError, name: msgKO}]);
                  IdError += 1;  
                  setMsgOutBoolKO(true);
                  console.log("IDError: ", IdError);
                }
              }
              }

              //DATOS FIS
              if(archivo?.name?.includes("FSR") == true || archivo?.name?.includes("fsr") == true ||
                archivo?.name?.includes("FIS") == true || archivo?.name?.includes("fis") == true){
                console.log("FSR"); actualizarTipoAuscultacion("FIS");
                setVerTablaFIS(true);
                actualizarTablaAuscultacionesFISF2(response.data?.fila2);
                actualizarTablaAuscultacionesFISF3(response.data?.fila3);
                actualizarTablaAuscultacionesFISF4(response.data?.fila4);
                actualizarTablaAuscultacionesFISCuerpo(response.data?.cuerpo);                          
              }

        if(IdError > 0){
          console.log("errores");
          setMsgOutBoolKO(true);
          var msgKO= <Translation ns= "global">{(t) => <>{t('ErroresAus')}</>}</Translation>
          guardarMsgOutErr(msgKO);
        }

        if(IdError == 0){
          console.log("SIN ERRORES");
          setValidacionOK(true);
        }
      

      }).catch(error=>{
        console.log("prueba2");
        //console.log("ERROR: ", error);

        setMsgOutBoolKO(true);
        var msgKO= <Translation ns= "global">{(t) => <>{t('ErrorAnalizAusc')}</>}</Translation>
        guardarMsgOutErr(msgKO);
      })   
  }     
  }

      const [msgOutAusCarg, guardarMsgOutAusCarg] = useState([]);
      const [msgOutBoolOK, setMsgOutBoolOK] = useState(false);

      /*Guardar Auscultación*/
      const GuardarAuscultacion=async()=>{
        console.log("GuardarAuscultacion");
        const data = new FormData();

        data.append('TipoAuscultacion', TipoAuscultacion)
        data.append('Sobreescribir', FormAuscultacion.Sobreescribir)
        data.append('AdaptarCarriles', FormAuscultacion.AdaptarCarriles)
        data.append('BuscarInicio', FormAuscultacion.BuscarInicio)
        console.log("data.append ", data);

        axios.post(url2, data, config).then(response=>{
          console.log("POST");
          console.log("response: ", response);

          var NumFilas = response?.data.auscCargadas.length;
          console.log("Num Filas: ", NumFilas);
          if(NumFilas > 0){
            console.log(1);
          setMsgOutBoolOK(true);
          console.log(2);
          var Auscultaciones = response?.data.auscCargadas;
            var Id = 0;
            for(var i=0; i<NumFilas; i++){
              console.log("Auscultación: ", Auscultaciones[i]);
              var msgOK = <Translation ns= "global">{(t) => <>{t('AuscCargada', { NomCarr: Auscultaciones[i].nomCarretera, PkIni: Auscultaciones[i].pkIni, MIni: Auscultaciones[i].mIni,
                PkFin: Auscultaciones[i].pkFin, MFin: Auscultaciones[i].mFin, NomTramo: Auscultaciones[i].nombreTramo, TipoCalz: Auscultaciones[i].tipoCalzada, Carril: Auscultaciones[i].carriles,
                MetrosImp: Auscultaciones[i].metrosImportados, DatosImp: Auscultaciones[i].totalDatos })}</>}</Translation>
                Id += 1;
                guardarMsgOutAusCarg(oldArray => [...oldArray, {id: i + 1, name: msgOK}]);
                console.log("i: ", i);
              }

              if(response?.data.numDatosRestantes > 0){
                  var msgOK = <Translation ns= "global">{(t) => <>{t('DatosSinImp', { DtsSinImp: response?.data.numDatosRestantes })}</>}</Translation>
                  guardarMsgOutAusCarg(oldArray => [...oldArray, {id: Id + 1, name: msgOK}]);
              }
        }
  
        }).catch(error=>{
          console.log("error: ", error);

      })   
    }

    const handleChange=async e=>{
      //e.persist();
      console.log("opción:", e);
     
      await actualizarFormAuscultacion({
          ...FormAuscultacion,
          [e.target.name]: e.target.value
        
      });

      console.log(FormAuscultacion);  
 }
 
  {/*Tabla de Auscultaciones DEF*/}
  const columnsF2DEF = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
 ]
  const columnsF3DEF = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t( 'Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t( 'ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t( 'PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t( 'NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t( 'NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsDEF = [
      {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t( 'Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t( 'DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'deflMaxInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxIntCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'deflMaxExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxExtCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'incidencias.item1', text: <Translation ns= "global">{(t) => <>{t( 'Incidencia')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'temperatura.item1', text: <Translation ns= "global">{(t) => <>{t( 'TempPavimento')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'radiCurvMaxInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'radiCurvMaxExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'deflMaxNoCorrInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'deflMaxNoCorrExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'coefTemp.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoefTemp')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{`${row.coefTemp.item1?.toLocaleString('es')}`}</div>;}, headerStyle:{textAlign: 'center'}},
      {dataField: 'coefHumedad.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoefHum')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{`${row.coefHumedad.item1?.toLocaleString('es')}`}</div>;}, headerStyle:{textAlign: 'center'}},
      {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{`${row.coordX.item1?.toLocaleString('es')}`}</div>;}, headerStyle:{textAlign: 'center'}},
      {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t( 'CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{`${row.coordY.item1?.toLocaleString('es')}`}</div>;}, headerStyle:{textAlign: 'center'}}
   ]

   {/*Tabla de Auscultaciones IRI*/}
  const columnsF2IRI = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
  ]

  const columnsF3IRI = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsF4IRI = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsIRI = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, },
    {dataField: 'rodadaDreta.item1', text: <Translation ns= "global">{(t) => <>{t('RodadaDer')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'},formatter: (cell, row) =>{return <div>{`${row.rodadaDreta.item1?.toLocaleString('es', {minimumFractionDigits: 5})}`}</div>;}},
    {dataField: 'rodadaEsq.item1', text: <Translation ns= "global">{(t) => <>{t('RodadaIzq')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{`${row.rodadaEsq.item1?.toLocaleString('es', {minimumFractionDigits: 5})}`}</div>;}},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordX?.item2 == true ?'#FD0303':''}}>{cell.toLocaleString('es')}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordY?.item2 == true ?'#FD0303':''}}>{cell.toLocaleString('es')}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
  ]



  {/*Tabla de Auscultaciones PAQ*/}
  const columnsF2PAQ = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == 2 ?'red': row.fechaAusc?.item2 == 1 ? 'orange': ''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
 ]

  const columnsF3PAQ = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == 2 ? 'red': row.pkIni?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == 2 ? 'red': row.numVia?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == 2 ? 'red': row.numVias?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    ]

  const columnsF4PAQ = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == 2 ? 'red': row.comanda?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == 2 ? 'red': row.claveObra?.item2 == 1 ? 'orange': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsPAQ = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'} },
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.distOri?.item2 == 2 ? 'red': row.distOri?.item2 == 1 ? 'orange': ''}}>{cell}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'incidencia.item1', text: <Translation ns= "global">{(t) => <>{t('Incidencias')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.incidencia?.item2 == 2 ? 'red': row.incidencia?.item2 == 1 ? 'orange': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'crt.item1', text: <Translation ns= "global">{(t) => <>{t('CRT')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.crt?.item2 == 2 ? 'red': row.crt?.item2 == 1 ? 'orange': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'temperatura.item1', text: <Translation ns= "global">{(t) => <>{t('TempPavimento')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.temperatura?.item2 == 2 ? 'red': row.temperatura?.item2 == 1 ? 'orange': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'textura.item1', text: <Translation ns= "global">{(t) => <>{t('Textura')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.textura?.item2 == 2 ? 'red': row.textura?.item2 == 1 ? 'orange': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordX?.item2 == 2 ? 'red': row.coordX?.item2 == 1 ? 'orange': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordY?.item2 == 2 ? 'red': row.coordY?.item2 == 1 ? 'orange': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
  ]

    {/*Tabla de Auscultaciones MVL*/}
    const columnsF2MVL = [
      {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ? 'red': ''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
   ]
  
    const columnsF3MVL = [
      {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ? 'red': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ? 'red': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},  
      {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ? 'red': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ? 'red': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ? 'red': ''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      ]
  
    const columnsMVL = [
      {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, },
      {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.distOri?.item2 == true ? 'red': ''}}>{cell}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'tipoCalz.item1', text: <Translation ns= "global">{(t) => <>{t('TipoCalzada')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.tipoCalz?.item2 == true ? 'red': ''}}>{cell}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'marcaViaria.item1', text: <Translation ns= "global">{(t) => <>{t('MarcaViaria')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.marcaViaria?.item2 == true ? 'red': ''}}>{cell}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'contrasteDia.item1', text: <Translation ns= "global">{(t) => <>{t('ContrasteDia')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.contrasteDia?.item2 == true ? 'red': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'contrasteNoche.item1', text: <Translation ns= "global">{(t) => <>{t('ContrasteNoche')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.contrasteNoche?.item2 == true ? 'red': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordX?.item2 == true ? 'red': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
      {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, formatter: (cell, row) =>{return <div style={{backgroundColor: row.coordY?.item2 == true ? 'red': ''}}>{cell.toLocaleString('es')}</div>}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
    ]

    const columnHover = () => {

      var Texto = <Translation ns= "global">{(t) => <>{t('PorcSupFisTot')}</>}</Translation>;
      console.log("TEXTO: ", Texto);
      console.log(t('PorcSupFisTot'));

      var out = t('PorcSupFisTot');
      console.log(out);
      return out;
    }
    
   {/*Tabla de Auscultaciones FIS*/}
   const columnsF2FIS = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
  ]

  const columnsF3FIS = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsF4FIS = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsFIS = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'incidencia.item1', text: <Translation ns= "global">{(t) => <>{t('Incidencias')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'pci.item1', text: <Translation ns= "global">{(t) => <>{t('PCI')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'ift.item1', text: <Translation ns= "global">{(t) => <>{t('IFT')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'ifp.item1', text: <Translation ns= "global">{(t) => <>{t('IFP')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'porcFisTot.item1', text: "% SFT", headerTitle: () => {return t('PorcSupFisTot')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'longFisLongi.item1', text: "LFL (m)", headerTitle: () => {return t('LongFisLongit')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'porcSupFisLongi.item1', text: "% SFT", headerTitle: () => {return t('PorcSupFisLongi')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'longFisTrans.item1', text: "LFT (m)", headerTitle: () => {return t('LongFisTrans')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'porcSupFisTrans.item1', text: "% FT", headerTitle: () => {return t('PorcSupFisTrans')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'areaOtrasSup.item1', text: "AASF (m2)", headerTitle: () => {return t('AreaOtrasSupFis')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'porcOtrasSup.item1', text: "% ASF", headerTitle: () => {return t('PorcOtrasSupFis')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'areaSupCuart.item1', text: "ASQ (m2)", headerTitle: () => {return t('AreaSupCuart')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'porcSupCuart.item1', text: "% SQ", headerTitle: () => {return t('PorcSupCuart')}, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'baches.item1', text: <Translation ns= "global">{(t) => <>{t('Baches')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}}
  ]

 

   {/*Tabla de Auscultaciones ROD*/}
   const columnsF2ROD = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc?.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}}
  ]

  const columnsF3ROD = [
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.pkIni?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t('NumVia')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVia?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t('NumVias')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.numVias?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsF4ROD = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t('Comanda')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.comanda?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{backgroundColor: row.claveObra?.item2 == true ?'#FD0303':''}}>{cell}</div>;}, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
  ]

  const columnsROD = [
    {dataField: 'linea.item1', text: <Translation ns= "global">{(t) => <>{t('Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'distOri.item1', text: <Translation ns= "global">{(t) => <>{t('DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'incidencia.item1', text: <Translation ns= "global">{(t) => <>{t('Incidencias')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'profRodIzq.item1', text: <Translation ns= "global">{(t) => <>{t('ProfRodIzq')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'profRodDer.item1', text: <Translation ns= "global">{(t) => <>{t('ProfRodDer')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'profRodMax.item1', text: <Translation ns= "global">{(t) => <>{t('ProfRodMax')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}},
    {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}, formatter: (cell, row) =>{return <div>{cell.toLocaleString('es')}</div>}}
  ]

  return (
    <div>
      <div>
      <br/>
      {/*CARGA DE FICHERO*/}
      <div className='file-card' >
        <div className='file-inputs'>
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
                                                                                                        
         
      {/*BOTONES ANALIZAR Y CARGAR*/}     
      
      <Row>
        <Col xs={2}>
          <button disabled={!uploadFile} className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>AnalizarAuscultacion()}><Translation ns= "global">{(t) => <>{t('Analizar')}</>}</Translation></button>
          <button disabled={!validacionOK} className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>GuardarAuscultacion()}><Translation ns= "global">{(t) => <>{t('Cargar')}</>}</Translation></button>
        </Col>

        { msgOutBoolOK ? 
      <div><br/>
       <div className="alert alert-success">
          {/*Mostramos mensaje*/}
          {msgOutAusCarg.map(msgOutAusCarg => (
          <li key={msgOutAusCarg.id}>{msgOutAusCarg.name}</li>
        ))}
      </div>
      </div>
      : ""}

        {validacionOK ?
          <Col xs={10}>
          <input type="checkbox" 
            name="Sobreescribir"
            defaultChecked={FormAuscultacion.Sobreescribir}
            style={{marginTop: '3%'}}
            onChange={(e) => {
              handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked,
                },
              });
            }}
            />{" "}
            <Translation ns= "global">{(t) => <>{t('Sobreescribir')}</>}</Translation>      
            
            <input 
            type="checkbox" 
            name="AdaptarCarriles" 
            defaultChecked={FormAuscultacion.AdaptarCarriles}
            style={{marginLeft: '3%'}}
            onChange={(e) => {
              handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked,
                },
              });
            }}
            />{" "}<Translation ns= "global">{(t) => <>{t('AdaptarCarriles')}</>}</Translation>
            
            <input 
            type="checkbox" 
            name="BuscarInicio" 
            defaultChecked={FormAuscultacion.BuscarInicio}
            style={{marginLeft: '3%'}}
            onChange={(e) => {
              handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked,
                },
              });
            }}
            />{" "}<Translation ns= "global">{(t) => <>{t('BuscarInicio')}</>}</Translation>

          </Col> 
        : null}
        
        </Row>
      </div>
      
      <br/><br/>     


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

      {/*TABLA DE LA AUSCULTACIÓN CON EL ANÁLISIS. CADA TIPO TIENE UNA ESTRUCTURA DISTINTA*/}
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
            wrapperClasses="table-responsive"
            headerWrapperClasses="table-responsive"
            classes="w-auto text-nowrap"
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
            classes="w-auto text-nowrap"
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