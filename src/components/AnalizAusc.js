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


function AnalizAusc(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/analizarauscultaciones";
  

  const [VerTablaDEF, setVerTablaDEF] = useState(false);

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

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
  
  const [TablaAuscultacionesF2, actualizarTablaAuscultacionesF2] = useState([]);
  const [TablaAuscultacionesF3, actualizarTablaAuscultacionesF3] = useState([]);
  const [TablaAuscultacionesCuerpo, actualizarTablaAuscultacionesCuerpo] = useState([]);
  const insertarArchivos=async()=>{

    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(f);

   
    await axios.post(url, f, config)
    .then(response =>{

      console.log(response?.data); 
      console.log("OK");
      setVerTablaDEF(true);
      actualizarTablaAuscultacionesF2(response.data.result.fila2);
      actualizarTablaAuscultacionesF3(response.data.result.fila3);
      actualizarTablaAuscultacionesCuerpo(response.data.result.cuerpo);
      console.log(TablaAuscultacionesF2); 

    }).catch(error=>{


      console.log("prueba2");
      console.log("error: ", error.response?.data);

    })        
  }


 
  {/*Tabla de Auscultaciones DEF*/}
  const columnsF2DEF = [
    {dataField: 'nombreTramo.item1', text: <Translation ns= "global">{(t) => <>{t('NombrTram')}</>}</Translation>},
    {dataField: 'codigoCarretera.item1', text: <Translation ns= "global">{(t) => <>{t('CodCarr')}</>}</Translation>},
    {dataField: 'fechaAusc.item1', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>,formatter: (cell, row) =>{return <div style={{backgroundColor: row.fechaAusc.item2 == true ?'#FD0303':''}}>{`${cell != null ? cell.substring(0,10) : cell}`}</div>;}}
 ]
  const columnsF3DEF = [
    {dataField: 'comanda.item1', text: <Translation ns= "global">{(t) => <>{t( 'Comanda')}</>}</Translation>},
    {dataField: 'claveObra.item1', text: <Translation ns= "global">{(t) => <>{t( 'ClaveObra')}</>}</Translation>},
    {dataField: 'pkIni.item1', text: <Translation ns= "global">{(t) => <>{t( 'PKIni')}</>}</Translation>},
    {dataField: 'numVia.item1', text: <Translation ns= "global">{(t) => <>{t( 'NumVia')}</>}</Translation>},
    {dataField: 'numVias.item1', text: <Translation ns= "global">{(t) => <>{t( 'NumVias')}</>}</Translation>},

  ]

  const columnsDEF = [
      {dataField: '0', text: <Translation ns= "global">{(t) => <>{t( 'Linea')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '1', text: <Translation ns= "global">{(t) => <>{t( 'DistOri')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '2', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxIntCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '3', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxExtCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '4', text: <Translation ns= "global">{(t) => <>{t( 'Incidencia')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '5', text: <Translation ns= "global">{(t) => <>{t( 'TempPavimento')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '6', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '7', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '8', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '9', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '10', text: <Translation ns= "global">{(t) => <>{t( 'CoefTemp')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '11', text: <Translation ns= "global">{(t) => <>{t( 'CoefHum')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '12', text: <Translation ns= "global">{(t) => <>{t( 'CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: '13', text: <Translation ns= "global">{(t) => <>{t( 'CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}
   ]


  return (
    <div>
      <br/>
          <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
          <button className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>insertarArchivos()}><Translation ns= "global">{(t) => <>{t('Analizar')}</>}</Translation></button>
          <br/><br/><br/>  

        {VerTablaDEF == true ?
        <div>

          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF2DEF} 
            data={TablaAuscultacionesF2}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsF3DEF} 
            data={TablaAuscultacionesF3}
            bordered={false}
          />
          <br/><br/> 
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columnsDEF} 
            data={TablaAuscultacionesCuerpo}
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