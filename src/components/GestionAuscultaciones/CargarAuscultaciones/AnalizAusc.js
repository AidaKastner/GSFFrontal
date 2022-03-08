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
  
  const [VerTablaDEF, setVerTablaDEF] = useState(false);
  const [TablaAuscultacionesDEFF2, actualizarTablaAuscultacionesDEFF2] = useState([]);
  const [TablaAuscultacionesDEFF3, actualizarTablaAuscultacionesDEFF3] = useState([]);
  const [TablaAuscultacionesDEFCuerpo, actualizarTablaAuscultacionesDEFCuerpo] = useState([]);

  const [VerTablaIRI, setVerTablaIRI] = useState(false);
  const [TablaAuscultacionesIRIF2, actualizarTablaAuscultacionesIRIF2] = useState([]);
  const [TablaAuscultacionesIRIF3, actualizarTablaAuscultacionesIRIF3] = useState([]);
  const [TablaAuscultacionesIRIF4, actualizarTablaAuscultacionesIRIF4] = useState([]);
  const [TablaAuscultacionesIRICuerpo, actualizarTablaAuscultacionesIRICuerpo] = useState([]);

  const insertarArchivos=async()=>{

    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(archivo);
    var ExtensionFichero = archivo?.name?.split('.').pop();
    console.log("Ext Fich: ", ExtensionFichero);
   
    await axios.post(url, f, config)
    .then(response =>{
      console.log("archivo: ", archivo);
      console.log("ext FICHERO: ", ExtensionFichero);
      console.log(response?.data); 
      console.log("OK");
      

      if(ExtensionFichero == "DAT"){
        console.log("Deflexiones");
        setVerTablaDEF(true);
        actualizarTablaAuscultacionesDEFF2(response.data?.fila2);
        actualizarTablaAuscultacionesDEFF3(response.data?.fila3);
        actualizarTablaAuscultacionesDEFCuerpo(response.data?.cuerpo);
      }

      if(ExtensionFichero == "IRI"){
        console.log("IRI");
        setVerTablaIRI(true);
        actualizarTablaAuscultacionesIRIF2(response.data?.fila2);
        actualizarTablaAuscultacionesIRIF3(response.data?.fila3);
        actualizarTablaAuscultacionesIRIF4(response.data?.fila4);
        actualizarTablaAuscultacionesIRICuerpo(response.data?.cuerpo);
      }
 

    }).catch(error=>{


      console.log("prueba2");
      console.log("ERROR: ", error);

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
      {dataField: 'deflMaxNoCorrInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxIntCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'deflMaxNoCorrExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxExtCorr')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'incidencias.item1', text: <Translation ns= "global">{(t) => <>{t( 'Incidencia')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'temperatura.item1', text: <Translation ns= "global">{(t) => <>{t( 'TempPavimento')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'radiCurvMaxInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'radiCurvMaxExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'RadiCurvMaxExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'deflMaxInt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeInt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
      {dataField: 'deflMaxExt.item1', text: <Translation ns= "global">{(t) => <>{t( 'DeflMaxEjeExt')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
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
  {dataField: 'coordX.item1', text: <Translation ns= "global">{(t) => <>{t('CoordX')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true},
  {dataField: 'coordY.item1', text: <Translation ns= "global">{(t) => <>{t('CoordY')}</>}</Translation>, filter: textFilter({placeholder: ' '}), sort: true}
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
      
      </div>

  )

}

export default AnalizAusc;