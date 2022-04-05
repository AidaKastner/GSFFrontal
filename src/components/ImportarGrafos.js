import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Error from "../components/Error";
import '../css/Menu.css';
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


function ImportarGrafos(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/importargrafos";
  const urlComp = "https://localhost:44301/api/importargrafos/compare";
  

  const [VerTablaDEF, setVerTablaDEF] = useState(false);
  const [VerTablaCOMP, setVerTablaCOMP] = useState(false);
  const [BtnComp, setVerBtnCom] = useState(false);
  const [MensjExt, setVerMensExt] = useState(false);

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  var slice;
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
  
  const [TablaWarnings, actualizarTablaWarnings] = useState([]);
  const [TablaComparative, actualizarTablaComparative] = useState([]);

  const insertarArchivos=async()=>{

    const f = new FormData();
    console.log("ARCHIVO",archivo);
    f.append('Fichero',archivo);
    console.log(f);
    setVerMensExt(false);
    setVerTablaDEF(false);
   
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

    await axios.post(urlComp, f, config)
    .then(response =>{

      //var dataCatalogo = [];
      var dataCatalogo = {"cuerpo": [] };

      console.log(response?.data); 
      console.log("OK");
      console.log("Dato 0", response?.data[0]); 
      console.log("Dato 0 tablaCatalogo", response?.data[0].tablaCatalogo);
      console.log("Dato 0 Item1", response?.data[0].tablaCatalogo.item1);
      console.log("Dato 0 Item2", response?.data[0].tablaCatalogo.item2);
      console.log("Dato 0 Item3", response?.data[0].tablaCatalogo.item3);
      
      var data = response?.data;
      if (data != null) {
        slice = data.slice(0, 0 + 50000);
        slice.forEach((iter) => {
          dataCatalogo.cuerpo.push({
            item1: iter.tablaCatalogo.item1,
            item2: iter.tablaCatalogo.item2,
            item3: iter.tablaCatalogo.item3
          });
        });
      }
      
      console.log("dataCatalogo ", dataCatalogo);
      console.log("dataCatalogo.cuerpo 2", dataCatalogo.cuerpo);
      setVerTablaCOMP(true);
      actualizarTablaComparative(dataCatalogo.cuerpo);

    }).catch(error=>{
      console.log("URL", url);
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
    {dataField: 'item3', text: <Translation ns= "global">{(t) => <>{t('Tipo')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}, 
    {dataField: 'item1.codCarretera', text: <Translation ns= "global">{(t) => <>{t('mensaje')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
    {dataField: 'item1.origen', text: <Translation ns= "global">{(t) => <>{t('info')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}
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
              <br/><br/>           
              <div className="alert alert-success">            
                {msg}
              </div>
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
            bordered={false}
          >
          </BootstrapTable>  
          <br/><br/> 
         </div>
          : ""}


      </div>

  )

}

export default ImportarGrafos;