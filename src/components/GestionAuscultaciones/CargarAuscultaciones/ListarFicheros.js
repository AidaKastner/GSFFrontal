import React, { useState, Fragment, useEffect } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/Menu.css';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ExportJsonExcel from 'js-export-excel';
import {CSVLink, CSVDownload} from 'react-csv';
import { Button } from '@material-ui/core';
import paginationFactory from 'react-bootstrap-table2-paginator';



function ListarFicheros(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/analizarauscultaciones/ListarFicheros/";

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
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

  const [FormFechas, actualizarFormFechas] = useState({ FechaIni:  '', FechaFin: ''});
  const [ListaAusc, actualizarListaAusc] = useState([]);
  const [msgOutBoolKO, setMsgOutBoolKO] = useState(false);
  const [msgOutErr, guardarMsgOutErr] = useState();
  const [FechasOK, setFechasOK] = useState(false);
  const [SWDatosTabla, setSWDatosTabla] = useState(false);


  const handleChange=async e=>{
    //e.persist();
    console.log("opción:", e);
   
        await actualizarFormFechas({
            ...FormFechas,
            [e.target.name]: e.target.value
        
        });

    }    

    useEffect(() => {
      console.log("Comprobar Fechas");
      console.log(FormFechas);
      setFechasOK(false);
      if(FormFechas.FechaIni != '' && FormFechas.FechaFin != ''){
        setFechasOK(true);
      } 
    }, [FormFechas]);
    
    
    const peticionListar=async()=>{
      console.log("peticionListar");
      const data = new FormData();

      console.log("Fecha Ini: ", FormFechas.FechaIni);
      console.log("Fecha Fin: ", FormFechas.FechaFin);

      data.append('FechaIni', FormFechas.FechaIni);
      data.append('FechaFin', FormFechas.FechaFin);

      setFechasOK(true);
      setMsgOutBoolKO(false);
      setSWDatosTabla(false);
      guardarMsgOutErr('');

        axios.post(url, data, config).then(response=>{
          console.log(response);

          console.log("LENGTH: ", response.data.length)
          if(response.data.length > 0){
            actualizarListaAusc(response.data);
            setSWDatosTabla(true);
          }else{
            var msgKO= <Translation ns= "global">{(t) => <>{t('SinFicheros')}</>}</Translation>
            setMsgOutBoolKO(true);
            guardarMsgOutErr(msgKO);
          }
        
        }).catch(error=>{
          console.log("error: ", error);

      })   
  }


  const fileName = "ListadoAuscultaciones.csv";
  const headers = [
    { label: "Fecha", key: "fecha" },
    { label: "Nombre", key: "nombreArchivo" }
  ];


  const TablaFicherosAusc = [
    {dataField: 'fecha', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
    {dataField: 'nombreArchivo', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, style:{textAlign: 'center'}, headerStyle:{textAlign: 'center'}},
 ]




  return (
    <div>   
      <Container>
        <Row>
        <Col>
          <input type="date" name="FechaIni" id="FechaIni" onChange={handleChange}/>
       </Col>
       <Col>
          <input type="date" name="FechaFin" id="FechaFin" onChange={handleChange}/><br /> 
       </Col>
       </Row>
       <button disabled={!FechasOK} className="btn btn-primary btn-sm" style={{float: 'right', marginRight: '5px'}} onClick={()=>peticionListar()}><Translation ns= "global">{(t) => <>{t('ListarFich')}</>}</Translation></button> 
          <br /> <br /> 
          
       

      { msgOutBoolKO ? 
      <div><br/>
       <div className="alert alert-danger">
          {/*Mostramos mensaje*/}
          {msgOutErr}
      </div>
      </div>
      : ""} 

      { SWDatosTabla ?
      <div>
      <Row>
       <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={TablaFicherosAusc} 
            data={ListaAusc}
            bordered={false}
            pagination={pagination}
          />
        </Row>
    
      
      {/*<button className="btn btn-primary btn-sm">*/}
      <CSVLink data={ListaAusc} headers={headers} separator={";"} filename={fileName}>
        <button className="btn btn-primary btn-sm" style={{float: 'right', marginRight: '15px', marginBottom: '15px'}}><Translation ns= "global">{(t) => <>{t('DescargarExcel')}</>}</Translation></button>
      </CSVLink>
       {/*</button>*/}
       </div>
       : ""}


      <br /> <br /> 
       
      </Container>
    </div>
  )

}

export default ListarFicheros;