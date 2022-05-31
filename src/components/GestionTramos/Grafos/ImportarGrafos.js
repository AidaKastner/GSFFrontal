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
import Spinner from "../../Spinner"; 
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

var dataCompare;
var dataUnCompare;
var dataBack=[];
var reversed=[];

function ImportarGrafos(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/importargrafos";
  const urlComp = "https://localhost:44301/api/importargrafos/compare";
  const urlAct = "https://localhost:44301/api/importargrafos/actualiza";
  var dataCatalogo = {"cuerpo": [] };

  const [VerTablaDEF, setVerTablaDEF] = useState(false);
  const [VerTablaCOMP, setVerTablaCOMP] = useState(false);
  const [BtnComp, setVerBtnCom] = useState(false);
  const [MensjExt, setVerMensExt] = useState(false);
  const [BtnApli, setVerBtnApli] = useState(false);
  const [dataCompareConst, setdatadataCompare] = useState([{"tablaCatalogo": {"item1":{"accion": null, "autoriza": null, "codCarretera": null, "comarca": null, "competente": null, "conservacion": null,"denominacion": null, "desFin": null, "desIni": null, "explotacion": null, "funReal": null, "gestion": null, "idCarretera": null, "idGraf": null, "idTramo": null,"mFin": null,"mIni": null, "motivo_actualizacion": null, "numCarrCre": null,"numCarrDec": null,"origen": null,"pkFin": null,"pkIni": null,"tecReal": null,"tipoCalzada": null,"tipo_Via": null,"xFin": null,"xIni": null,"yFin": null,"yIni": null},"item2":null,"item3": null,"item4":{"codCarreteraAcc": null,"competenteAcc": null,"conservacionAcc": null,"descFinAcc": null,"descIniAcc": null,"explotacionAcc": null,"funRealAcc": null,"gestionAcc": null,"idAct": null,"numCarrCreAcc": null,"numCarrDecAcc": null,"pkFinAcc": null,"pkIniAcc": null,"tecRealAcc": null,"tipoCalzadaAcc": null}}}]);

  const [checkedState, setCheckedState] = useState(
    new Array(dataCatalogo.length).fill(false)
);

  const handleOnChange=(e, row, evento)=>{
    console.log("evento", evento);
    console.log("objeto", row);
    var check = e.target.checked;
    console.log("checked", e.target.checked);
    //setCheckedState(updatedCheckedState);
    console.log("dataCompare", dataCompare);

    //Añadimos si es check true y eliminamos si es check false
    if (dataCompare != null && check===true) {
      slice = dataCompare.slice(0, 0 + 50000);
      slice.forEach((iter) => {      
        if (iter.tablaCatalogo.item4.idAct === row.item17) {
          dataBack.push({
          tablaCatalogo: iter.tablaCatalogo
          });
          /*if (iter.tablaCatalogo.item4.idAct === row.item17 && iter.tablaCatalogo.item3 === 0 && iter.tablaCatalogo.item2 === true) {
            //dataBack.splice(dataBack.findIndex(x=> x.tablaCatalogo.item4.idAct === row.item17 && x.tablaCatalogo.item3 === 0 && x.tablaCatalogo.item2 === true), 1); 
            dataBack.pop({
            tablaCatalogo: iter.tablaCatalogo
            });      
          }  */ 

          var duplClng = dataBack.filter(item => item.tablaCatalogo.item4.idAct === row.item17);
          console.log("duplClng", duplClng);
          var dplCount = duplClng.length;
          console.log("dplCount", dplCount);
        
          sliceBackCln = dataBack.slice(0, 0 + 50000);
          sliceBackCln.forEach((iter) => {      
            if (iter.tablaCatalogo.item4.idAct === row.item17 && dplCount > 1) {
              dataBack.pop({
                tablaCatalogo: iter.tablaCatalogo
                });
                dplCount = dplCount - 1;
           
            }
          });    
          console.log("dataBack", dataBack);
        }
      });
  
      
    }else if (dataCompare != null && check===false){
      slice = dataCompare.slice(0, 0 + 50000);
      slice.forEach((iter) => {      
        if (iter.tablaCatalogo.item4.idAct === row.item17 && (iter.tablaCatalogo.item3 === 1 || iter.tablaCatalogo.item3 === 2)) {
          console.log("Elimina 1 o 2", iter.tablaCatalogo);
        dataBack.pop({
          tablaCatalogo: iter.tablaCatalogo
          });
        } else if (iter.tablaCatalogo.item4.idAct === row.item17 && iter.tablaCatalogo.item2 === false && iter.tablaCatalogo.item3 === 0) {
          console.log("Elimina 0", iter.tablaCatalogo)
          dataBack.pop({
            tablaCatalogo: iter.tablaCatalogo
            });
          }
      });    
    }
    console.log("dataBack", dataBack);
  };


  const handleOnChngField=(e, row, evento)=>{
    console.log("objeto", row);
    var check = e.target.checked;
    console.log("checked", e.target.checked);
    console.log("dataCompare", dataCompare);
    console.log("dataUnCompare", dataUnCompare);
    console.log("reversed", reversed);
    var Mod;
    var ModUn;
    console.log("dataBackPrevio", dataBack);  

   if (dataCompare != null && check===true) {
      slice = dataCompare.slice(0, 0 + 50000);
      slice.forEach((iter) => {      
        if (iter.tablaCatalogo.item4.idAct === row.item17 && iter.tablaCatalogo.item2 === false){
          switch (evento) {
            case 'pkIni':
              Mod = iter.tablaCatalogo.item1.pkIni;
              console.log("pkIni", Mod);
              break;
            case 'pkFin':
              Mod = iter.tablaCatalogo.item1.pkFin;
              console.log("pkFin", Mod);
              break;
            case 'desIni':
              Mod = iter.tablaCatalogo.item1.desIni;
              console.log("desIni", Mod);
              break;
            case 'desFin':
              Mod = iter.tablaCatalogo.item1.desFin;
              console.log("desFin", Mod);
              break;
            case 'tecReal':
              Mod = iter.tablaCatalogo.item1.tecReal;
              console.log("tecReal", Mod);
              break;
            case 'funReal':
              Mod = iter.tablaCatalogo.item1.funReal;
              console.log("funReal", Mod);
              break;
            case 'competente':
              Mod = iter.tablaCatalogo.item1.competente;
              console.log("competente", Mod);
              break;
            case 'conservacion':
              Mod = iter.tablaCatalogo.item1.conservacion;
              console.log("conservacion", Mod);
              break;
            case 'explotacion':
              Mod = iter.tablaCatalogo.item1.explotacion;
              console.log("explotacion", Mod);
              break;
            case 'gestion':
              Mod = iter.tablaCatalogo.item1.gestion;
              console.log("gestion", Mod);
              break;
            case 'tipoCalzada':
              Mod = iter.tablaCatalogo.item1.tipoCalzada;
              console.log("tipoCalzada", Mod);
              break;
            case 'numCarrCre':
              Mod = iter.tablaCatalogo.item1.numCarrCre;
              console.log("numCarrCre", Mod);
              break; 
            case 'numCarrDec':
              Mod = iter.tablaCatalogo.item1.numCarrDec;
              console.log("numCarrDec", Mod);
              break;
            default:
              console.log("default", Mod);
              break;
          }
        }
        if (iter.tablaCatalogo.item4.idAct === row.item17 && iter.tablaCatalogo.item2 === true) {

          switch (evento) {
            case 'pkIni':
              iter.tablaCatalogo.item1.pkIni = Mod;
              break;
            case 'pkFin':
              iter.tablaCatalogo.item1.pkFin = Mod;
              break;
            case 'desIni':
              iter.tablaCatalogo.item1.desIni= Mod;
              break;
            case 'desFin':
              iter.tablaCatalogo.item1.desFin = Mod;
              console.log("desFin", Mod);
              break;
            case 'tecReal':
              iter.tablaCatalogo.item1.tecReal= Mod;
              break;
            case 'funReal':
              iter.tablaCatalogo.item1.funReal= Mod;
              break;
            case 'competente':
              iter.tablaCatalogo.item1.competente= Mod;
              break;
            case 'conservacion':
              iter.tablaCatalogo.item1.conservacion = Mod;
              break;
            case 'explotacion':
              iter.tablaCatalogo.item1.explotacion = Mod;
              break;
            case 'gestion':
              iter.tablaCatalogo.item1.gestion = Mod;
              break;
            case 'tipoCalzada':
              iter.tablaCatalogo.item1.tipoCalzada = Mod;
              break;
            case 'numCarrCre':
              iter.tablaCatalogo.item1.numCarrCre = Mod;
              break; 
            case 'numCarrDec':
              iter.tablaCatalogo.item1.numCarrDec = Mod;
              break;
            default:
              break;
          }
            dataBack.push({
              tablaCatalogo: iter.tablaCatalogo,
          });
          dataBack = dataBack.reverse();
        }
      });     
    }

    if (reversed != null && check===false) {
      sliceUn = reversed.slice(0, 0 + 50000);
      sliceUn.forEach((iter) => {
        if (iter.tablaCatalogo.item4.idAct === row.item17 && iter.tablaCatalogo.item2 === true){
          switch (evento) {
            case 'pkIni':
              ModUn = iter.tablaCatalogo.item1.pkIni;
              console.log("pkIni", ModUn);
              break;
            case 'pkFin':
              ModUn = iter.tablaCatalogo.item1.pkFin;
              console.log("pkFin", ModUn);
              break;
            case 'desIni':
              ModUn = iter.tablaCatalogo.item1.desIni;
              console.log("desIni", ModUn);
              break;
            case 'desFin':
              ModUn = iter.tablaCatalogo.item1.desFin;
              console.log("Recupera desFin", ModUn);
              break;
            case 'tecReal':
              ModUn = iter.tablaCatalogo.item1.tecReal;
              console.log("tecReal", ModUn);
              break;
            case 'funReal':
              ModUn = iter.tablaCatalogo.item1.funReal;
              console.log("funReal", ModUn);
              break;
            case 'competente':
              ModUn = iter.tablaCatalogo.item1.competente;
              console.log("competente", ModUn);
              break;
            case 'conservacion':
              ModUn = iter.tablaCatalogo.item1.conservacion;
              console.log("conservacion", ModUn);
              break;
            case 'explotacion':
              ModUn = iter.tablaCatalogo.item1.explotacion;
              console.log("explotacion", ModUn);
              break;
            case 'gestion':
              ModUn = iter.tablaCatalogo.item1.gestion;
              console.log("gestion", ModUn);
              break;
            case 'tipoCalzada':
              ModUn = iter.tablaCatalogo.item1.tipoCalzada;
              console.log("tipoCalzada", ModUn);
              break;
            case 'numCarrCre':
              ModUn = iter.tablaCatalogo.item1.numCarrCre;
              console.log("numCarrCre", ModUn);
              break; 
            case 'numCarrDec':
              ModUn = iter.tablaCatalogo.item1.numCarrDec;
              console.log("numCarrDec", ModUn);
              break;
            default:
              console.log("default", ModUn);
              break;
          }
        }

        if (iter.tablaCatalogo.item4.idAct === row.item17 && iter.tablaCatalogo.item2 === false) {

          switch (evento) {
            case 'pkIni':
              iter.tablaCatalogo.item1.pkIni = ModUn;
              break;
            case 'pkFin':
              iter.tablaCatalogo.item1.pkFin = ModUn;
              break;
            case 'desIni':
              iter.tablaCatalogo.item1.desIni= ModUn;
              break;
            case 'desFin':
              iter.tablaCatalogo.item1.desFin = ModUn;
              console.log("desFin ModUn", ModUn);
              console.log("desFin iter", iter.tablaCatalogo.item1.desFin);
              break;
            case 'tecReal':
              iter.tablaCatalogo.item1.tecReal= ModUn;
              break;
            case 'funReal':
              iter.tablaCatalogo.item1.funReal= ModUn;
              break;
            case 'competente':
              iter.tablaCatalogo.item1.competente= ModUn;
              break;
            case 'conservacion':
              iter.tablaCatalogo.item1.conservacion = ModUn;
              break;
            case 'explotacion':
              iter.tablaCatalogo.item1.explotacion = ModUn;
              break;
            case 'gestion':
              iter.tablaCatalogo.item1.gestion = ModUn;
              break;
            case 'tipoCalzada':
              iter.tablaCatalogo.item1.tipoCalzada = ModUn;
              break;
            case 'numCarrCre':
              iter.tablaCatalogo.item1.numCarrCre = ModUn;
              break; 
            case 'numCarrDec':
              iter.tablaCatalogo.item1.numCarrDec = ModUn;
              break;
            default:
              break;
          }
            dataBack.push({
              tablaCatalogo: iter.tablaCatalogo,
          });
          dataBack = dataBack.reverse();
        }
      }); 
    }

    var duplicados = dataBack.filter(item => item.tablaCatalogo.item4.idAct === row.item17);
    console.log("duplicados", duplicados);
    var dupliCount = duplicados.length;
    console.log("dupliCount", dupliCount);
    
    sliceBack = dataBack.slice(0, 0 + 50000);
    sliceBack.forEach((iter) => {      
        if (iter.tablaCatalogo.item4.idAct === row.item17 && dupliCount > 1) {
          dataBack.pop({
            tablaCatalogo: iter.tablaCatalogo
            });
          dupliCount = dupliCount - 1;
       
        }
      });    
    console.log("dataBack", dataBack);
  };


  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  var slice;
  var sliceBack;
  var sliceUn;
  var sliceBackCln;
  var msg="El fichero se ha cargado correctamente";
  var msgext="La extensión del fichero no es correcta";

  const dataok = [{ codigo: "error7", tipo: 1, línea: 0, listDatosError: "Cargado correctamente" } ];

  const [items, setItems] = useState([]);
  const [archivo, setArchivo]=useState(null);

  const subirArchivos=e=>{
    setArchivo(e);
  }

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 20,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    className: 'paginationCustom'
  })

  /*const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    headerColumnStyle: (status) => {
      if (status === 'checked') {
        return {
          backgroundColor: 'yellow'
        };
      } else if (status === 'indeterminate') {
        return {
          backgroundColor: 'pink'
        };
      } else if (status === 'unchecked') {
        return {
          backgroundColor: 'grey'
        };
      }
      return {};
    }
  };*/

  
  const [TablaWarnings, actualizarTablaWarnings] = useState([]);
  const [TablaComparative, actualizarTablaComparative] = useState([]);

  const insertarArchivos=async()=>{

    const f = new FormData();
    console.log("ARCHIVO",archivo);
    f.append('Fichero',archivo);
    console.log(f);
    setVerMensExt(false);
    setVerTablaDEF(false);
    setVerBtnApli(false);
   
    await axios.post(url, f, config)
    .then(response =>{

      console.log(response?.data); 
      console.log("OK");
      
      var data = response?.data[0];
      var ext = response?.data;

      if (ext != "ext") { 
        if (data != null) {        
          console.log("Codigo", response?.data[0].codigo); 
          console.log("Tipo", response?.data[0].tipo);
          console.log("Linea", response?.data[0].línea); 
          console.log("Lista de Errores", response?.data[0].listDatosError); 
          setVerTablaDEF(true);
          actualizarTablaWarnings(response.data);
        }else{
          console.log("Tabla COMP", VerTablaCOMP)
          
          setVerBtnCom(true);
          console.log("Gestión Boton Comparar", BtnComp)
          console.log("Datos OK", dataok);
          setVerTablaDEF(true);
          actualizarTablaWarnings(dataok);
        }
    }else{
      setVerMensExt(true);
      console.log("Extensión errónea", MensjExt)
    }
    }).catch(error=>{
      console.log("URL", url);
      console.log("ERROR: ", error);

    })        
  }


  const compareArchivos=async()=>{

    const f = new FormData();
   
    console.log("ARCHIVO",archivo);
    f.append('Fichero',archivo);
    console.log(f);
    setVerTablaCOMP(false);
    setVerMensExt(false);
    setVerBtnApli(false);

    //Llamada de Backup porque no conseguimos meter la primera en una constante con Hooks que no se modifique para tenerla de referencia
    await axios.post(urlComp, f, config)
     .then(resp =>{
        console.log("OK test", resp?.data); 
        dataUnCompare = resp?.data;
        reversed = dataUnCompare.reverse();
        console.log("dataUnCompare", dataUnCompare);
        
  }).catch(error=>{
    console.log("URL2", url);
    console.log("ERROR2: ", error);
  })        


   await axios.post(urlComp, f, config)
    .then(response =>{
      dataCatalogo = {"cuerpo": [] };
      console.log("OK", response?.data); 
      dataCompare = response?.data;
      setdatadataCompare(dataCompare);
      console.log("dataCompareConst", dataCompareConst);
      var i = 0;
      if (dataCompare != null) {
        slice = dataCompare.slice(0, 0 + 50000);
        slice.forEach((iter) => {
          dataCatalogo.cuerpo.push({
            item1: iter.tablaCatalogo.item1,
            item2: iter.tablaCatalogo.item2,
            item3: iter.tablaCatalogo.item3,
            item4: iter.tablaCatalogo.item4.pkIniAcc,
            item5: iter.tablaCatalogo.item4.pkFinAcc,
            item6: iter.tablaCatalogo.item4.descIniAcc,
            item7: iter.tablaCatalogo.item4.descFinAcc,
            item8: iter.tablaCatalogo.item4.tecRealAcc,
            item9: iter.tablaCatalogo.item4.funRealAcc,
            item10: iter.tablaCatalogo.item4.competenteAcc,
            item11: iter.tablaCatalogo.item4.explotacionAcc,
            item12: iter.tablaCatalogo.item4.conservacionAcc,
            item13: iter.tablaCatalogo.item4.gestionAcc,
            item14: iter.tablaCatalogo.item4.tipoCalzadaAcc,
            item15: iter.tablaCatalogo.item4.numCarrCreAcc,
            item16: iter.tablaCatalogo.item4.numCarrDecAcc,
            item17: iter.tablaCatalogo.item4.idAct,
            id: ++i
          });
        });
      }
      
      console.log("dataCatalogo ", dataCatalogo);
      console.log("dataCatalogo.cuerpo 2", dataCatalogo.cuerpo);
      
      setVerTablaCOMP(true);
      actualizarTablaComparative(dataCatalogo?.cuerpo);
      setVerBtnApli(true);

    }).catch(error=>{
      console.log("URL", url);
      console.log("ERROR: ", error);
      setVerBtnApli(false);
    }) 
    
  }

  const actualizar=async()=>{

    const f = new FormData();

    const configAct = {
      headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    };

    console.log("dataBack en llamada api", dataBack);

    await axios.put(urlAct, dataBack, configAct)
    .then(response =>{
      console.log("response ", response);
      compareArchivos();
      console.log("OK");
    }).catch(error=>{
      console.log("URL", urlAct);
      console.log("ERROR: ", error);
    })        
  }
 

  {/*Tabla de Warnings*/}
  const columnsWarn = [
    {dataField: 'tipo', text: <Translation ns= "global">{(t) => <>{t('Tipo')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{width: '50%', backgroundColor:row.tipo == false ?'#FD0303':'#17b201', color:row.tipo == false ?'#FD0303':'#17b201'}}>{cell}</div>;},}, 
    {dataField: 'codigo', text: <Translation ns= "global">{(t) => <>{t('mensaje')}</>}</Translation>, formatter: (cell, row) =>{return <div>{`${EvaluarMsgError(row.codigo)} `}</div>;},},
    {dataField: 'línea', text: <Translation ns= "global">{(t) => <>{t('info')}</>}</Translation>, formatter: (cell, row) =>{return <div>{row.tipo == false ? `${"Registro: "} ${row.línea} ${'\r\n'} ${row.listDatosError}`:`${"Proceso de copia a carpeta temporal realizado."}`}</div>;},}
 ]

  {/*Tabla de Comparative*/}
  const columnsComp = [
    
    {dataField: '', text: '', formatter: (cell, row) =>{return <div>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChange(e, row, "fila")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChange(e,row, "fila")}/> : ''}</div>;},},
    {dataField: 'item3', text: <Translation ns= "global">{(t) => <>{t('accion')}</>}</Translation>, formatter: (cell, row) =>{return <div>{row.item2 === false ? `${EvaluarAccion(row.item3)}` : row.item3 !== 0 ? `${EvaluarAccion(row.item3)}` : ''}</div>;},},
    {dataField: 'item1.origen', text: <Translation ns= "global">{(t) => <>{t('origen')}</>}</Translation> },
    {dataField: 'item1.codCarretera', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation> }, 
    {dataField: 'item1.pkIni', text: <Translation ns= "global">{(t) => <>{t('PKInicial')}</>}</Translation>, formatter: (cell, row) =>{return row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item4 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "pkIni")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "pkIni")}/> : ''} {row.item1.pkIni}</div> : <div>{row.item1.pkIni}</div> ;},},  
    {dataField: 'item1.pkFin', text: <Translation ns= "global">{(t) => <>{t('PKFinal')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item5 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "pkFin")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "pkFin")}/> : ''} {row.item1.pkFin}</div> : <div>{row.item1.pkFin}</div> ;},},  
    {dataField: 'item1.desIni', text: <Translation ns= "global">{(t) => <>{t('DescIni')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item6 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "desIni")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "desIni")}/> : ''} {row.item1.desIni}</div> : <div>{row.item1.desIni}</div> ;},},  
    {dataField: 'item1.desFin', text: <Translation ns= "global">{(t) => <>{t('DescFin')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item7 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "desFin")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "desFin")}/> : ''} {row.item1.desFin}</div> : <div>{row.item1.desFin}</div> ;},},  
    {dataField: 'item1.tecReal', text: <Translation ns= "global">{(t) => <>{t('ClasTecReal')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item8 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox"  id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "tecReal")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "tecReal")}/> : ''} {row.item1.tecReal}</div> : <div>{row.item1.tecReal}</div> ;},},  
    {dataField: 'item1.funReal', text: <Translation ns= "global">{(t) => <>{t('ClasFunRedes')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item9 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "funReal")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "funReal")}/> : ''} {row.item1.funReal}</div> : <div>{row.item1.funReal}</div> ;},},  
    {dataField: 'item1.competente', text: <Translation ns= "global">{(t) => <>{t('OrgCom')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item10 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "competente")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "competente")}/> : ''} {row.item1.competente}</div> : <div>{row.item1.competente}</div> ;},},  
    {dataField: 'item1.conservacion', text: <Translation ns= "global">{(t) => <>{t('OrgCons')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item11 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "conservacion")}/> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "conservacion")}/> : ''} {row.item1.conservacion}</div> : <div>{row.item1.conservacion}</div> ;},},  
    {dataField: 'item1.explotacion', text: <Translation ns= "global">{(t) => <>{t('RegExpl')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item12 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "explotacion")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "explotacion")}/> : ''} {row.item1.explotacion}</div> : <div>{row.item1.explotacion}</div> ;},},  
    {dataField: 'item1.gestion', text: <Translation ns= "global">{(t) => <>{t('RegGest')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item13 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "gestion")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "gestion")}/> : ''} {row.item1.gestion}</div> : <div>{row.item1.gestion}</div> ;},},  
    {dataField: 'item1.tipoCalzada', text: <Translation ns= "global">{(t) => <>{t('TipoCalzada')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item14 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "tipoCalzada")} /> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "tipoCalzada")}/> : ''} {row.item1.tipoCalzada}</div> : <div>{row.item1.tipoCalzada}</div> ;},},  
    {dataField: 'item1.numCarrCre', text: <Translation ns= "global">{(t) => <>{t('NumCarrilsCrec')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item15 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "numCarrCre")}/> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "numCarrCre")}/> : ''} {row.item1.numCarrCre}</div> : <div>{row.item1.numCarrCre}</div> ;},},
    {dataField: 'item1.numCarrDec', text: <Translation ns= "global">{(t) => <>{t('NumCarrilsDeCrec')}</>}</Translation>, formatter: (cell, row) =>{return  row.item3 === 0 ? <div style={{width: '100%', backgroundColor:row.item16 === false ?'#FD0303':'#17b201'}}>{row.item2 === false ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e, row, "numCarrDec")}/> : row.item3 !== 0 ? <input type="checkbox" id={`custom-checkbox-${row.id}`} name={row.item1.idGraf} checked={checkedState[row.id]} onChange={(e) => handleOnChngField(e,row, "numCarrDec")}/> : ''} {row.item1.numCarrDec}</div> : <div>{row.item1.numCarrDec}</div> ;},}
 ]


    //Evaluamos el mensaje de la API
    const EvaluarMsgError=(Msgerror)=>{
        console.log("Mensaje error", Msgerror);      
 
        //En función del error o warning, se mostarrá un mensaje
        switch(Msgerror){
       
          //Error1
          case 'error1': return "Fichero inválido: El contenido del fichero es corrupto o inválido y no se ha podido leer";

          //Error2
          case 'error2': return "Campos obligatorios vacíos";

          //Error3    
          case 'error3': return "Campos con formato erróneo";
        
          //Error4
          case 'error4': return "Campos de tipo listado con valor no existente";
  
          //Error5
          case 'error5': return "Error del contenido del KML";
 
          //Error6
          case 'error6':  return "Fichero Archivo_Track. Fallo en la lectura de la estructura del grafo";

          //Carga ok
          case 'error7':  return "Archivo cargado";
 
     }
 
    }

    //Evaluamos la acción de la comparación
    const EvaluarAccion=(action)=>{
      console.log("Acción", action);      
   
      //En función del error o warning, se mostarrá un mensaje
      switch(action){
         
        //Error1
        case 0: return "Actualizar";
  
        //Error2
        case 1: return "Añadir";
  
        //Error3    
        case 2: return "Eliminar";
   
       }
   
      }

  return (
    <div>
      <br/>
          <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
          <button className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>insertarArchivos()}><Translation ns= "global">{(t) => <>{t('Analizar')}</>}</Translation></button>
          
          {MensjExt == true ?
            <div>
              <br/><br/> 
              <div className="alert alert-danger">
                {msgext}
              </div>
            </div>
          : ""}
          
          {BtnComp == true ?
            <div>
              <button className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>compareArchivos()}><Translation ns= "global">{(t) => <>{t('Comparar')}</>}</Translation></button>
            </div>
          : ""}
          <br/><br/><br/>

        {VerTablaDEF == true ?
        
        <div>
          <div style={{  color: '#252831', width: '100%', listStyle: 'none', marginLeft: '50%', justifyContent: 'space-between', fontSize: '20px'}} > 
            <label><Translation ns= "global">{(t) => <>{t('MensajeSistema')}</>}</Translation></label>
          </div>
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsWarn} 
            data={TablaWarnings}
            bordered={false}
          >
          </BootstrapTable>  
          <br/><br/> 
         </div>
          : ""}
      
      {VerTablaCOMP == true ?
        
        <div>
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsComp} 
            data={TablaComparative}
            pagination={pagination}
            bordered={false}
            wrapperClasses="table-responsive"
            classes="w-auto text-nowrap"
            //selectRow={ selectRow }
          >
          </BootstrapTable>  
          <br/><br/> 
         </div>
          : ""}

      {BtnApli == true ?
            <div>
              <button className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>actualizar()}><Translation ns= "global">{(t) => <>{t('Actualizar')}</>}</Translation></button>
              <br/><br/>           
            </div>
          : ""}
          <br/><br/><br/>
      </div>

  )

}

export default ImportarGrafos;