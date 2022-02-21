import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { Component, useState , Fragment} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../css/Pagination.css';
import '../css/Menu.css';
import '../css/Button.css';
import { Translation, useTranslation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import Tab from "./Tab";
import ModalTitle from "react-bootstrap/ModalTitle";
import Select from 'react-select';
import VerCarTramDet from "../components/VerCarTramDet";
import Spinner from "../components/Spinner";

const url1 = "https://localhost:44301/Carreteras";
const url2 = "https://localhost:44301/Tramos/combo";
const url3 = "https://localhost:44301/Tramos/baja";
const url4 = "https://localhost:44301/Tramos/";

var paramIndex = 0;
let yearIni = 1979;
var indice ='';
var msg = '';
let authToken = sessionStorage.getItem("JWT");
let firstTramo = '';
let lastTramo ='';

let config = {
  headers: {
      'Authorization': authToken,
      'Accept': 'application/json',
      'content-type': 'application/json'
  }
}

let currentYear = new Date().getFullYear();

//Combo
const combo = [{ label: "Activos", value: "Activos" }, { label: "Inactivos", value: "Inactivos" }];
for (var i = currentYear; i > yearIni; i--) {
  combo.push({ label: i, value: i });
  console.log("Años", i);
}

console.log("Selector", combo);

class VerEditCarTrams extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      tableData2: [],
      orgtableData: [],
      orgtableData2: [],
      perPage: 50000,
      currentPage: 0,
      modalDescaragr: false,
      modalEliminar: false,
      modalEditar: false,
      modalRedirigir: false,
      activeIndex: 0,
      Index: 0,
      url:'',
      comboSel:'Activos',
      content: null,
      setBtnInsertar: false,
      msgOutErr: false,
      guardarMsgOutErr: false,
      msgOutBoolKO: false,
      setMsgOutBoolKO: false,
      setMsgOutBoolOK: false,
      form:{
        tramo:'',
        id:'',
        codigo:'',
        nombre:'',
        comentario:'',
        idGrafo:'',
        IdCarreteras:'',
        rutaKml:''
      } 
  }
    
 
  //Carga de datos de las tablas
  this.columns = [
    {dataField: 'accionesTram', text:<Translation ns= "global">{(t) => <>{t('Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones},
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'comentario', text:<Translation ns= "global">{(t) => <>{t('coment')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText}
  ]

  this.columns2 = [
    {dataField: 'acciones', text:<Translation ns= "global">{(t) => <>{t('Acciones')}</>}</Translation>, formatter: this.ButtonsAccionesTr},
    {dataField: 'carretera.nombre', text:<Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'nombre', text: <Translation ns= "global">{(t) => <>{t('Tramo')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'puntoIni.pk', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'puntoIni.m', text: <Translation ns= "global">{(t) => <>{t('MIni')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'puntoIni.descripcion', text: <Translation ns= "global">{(t) => <>{t('DescIni')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'puntoFin.pk', text: <Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'puntoFin.m', text: <Translation ns= "global">{(t) => <>{t('MFin')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'puntoFin.descripcion', text: <Translation ns= "global">{(t) => <>{t('DescFin')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'idDdCodTecReal', text: <Translation ns= "global">{(t) => <>{t('ClasTecReal')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'idDdRedes', text: <Translation ns= "global">{(t) => <>{t('ClasFunRedes')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'idDdOrganismoCompetente', text: <Translation ns= "global">{(t) => <>{t('OrgCom')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'idDdOrganismoConservacion', text: <Translation ns= "global">{(t) => <>{t('OrgCons')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'idDdRegimenExplotacion', text: <Translation ns= "global">{(t) => <>{t('RegExpl')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'idDdRegimenGestion', text: <Translation ns= "global">{(t) => <>{t('RegGest')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'idDdTiposCalzada', text: <Translation ns= "global">{(t) => <>{t('TipCalz')}</>}</Translation>,sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText}
  ]

  //Paginación
  this.pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
  })

  }


  //Botones de las rows Carreteras
  ButtonsAcciones = (cell, row, rowIndex) => {
      console.log("row: ", row);
  
    return (
      <div>
        {/*<button className="btn btn-primary" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEditar: true})}}><FontAwesomeIcon icon={faEdit}/></button>*/}
        {"  "}
        <button className="btn btn-primary btn-sm" onClick={()=>{this.seleccionarTramo(row); this.setState({modalDescaragr: true})}}><FontAwesomeIcon icon={faDownload}/></button>
        {"  "}
        <button className="btn btn-danger btn-sm" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
      </div>              

      );
  };


//Botones de las rows Tramos
ButtonsAccionesTr = (cell, row, rowIndex) => {
  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={()=>{this.seleccionarTramo(row); this.setState({modalRedirigir: true})}}><FontAwesomeIcon icon={faEdit}/></button>
      {"  "}
      <button className="btn btn-danger btn-sm" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
    </div>              
  );
};

columnStyle = () => {
  return {
    textAlign: 'center'
  }
}

formatText = (cell) => {
  return (
    <div style={{display: 'inline-block', textAlign: 'left'}}>
      {cell}
    </div>
  );
}

  //Maneja la edición e inserción en los forms
  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    //Limpiamos la pantalla de mensajes
    this.setState({setMsgOutBoolKO: false});
    this.setState({setMsgOutBoolOK: false});
    console.log("Funcion Handle",this.state.form);
    console.log("Indice: ",this.state.Index);

      if(this.state.form.codigo === "" || this.state.form.comentario === "" || this.state.form.codigo === undefined || this.state.form.comentario === undefined){
        this.setState({setBtnInsertar: false});
      }else{
        this.setState({setBtnInsertar: true});
      }
      console.log("Estado Validación: ",this.state.setBtnInsertar);
    }


   handleCombo = e => {
    this.state.comboSel = e.value;
    console.log("Funcion Combo",this.state.form);
    console.log("Combo Seleccionado: ",this.state.comboSel);
    this.peticionGet2();
  };
  
  componentDidMount(){
    this.peticionGet1();
    this.peticionGet2();
    
  }

  // Cambia el índice de la Tab
  onChange = activeIndex => {
    this.setState({
      activeIndex
    });
  };


//Recarga de datos después de una acción dependiendo del Tab
peticionGet=()=>{
  console.log("Indice Tab: ",paramIndex);

  switch(paramIndex) {

    case 0: this.peticionGet1();
    break;

    case 1: this.peticionGet2();
    break;

    default: this.peticionGet1();
    break;

    }

}


//Control mensaje de errores descarga ZIPs
controlErr=(controlError)=>{
  console.log("Control de errores: ",controlError);

  switch(controlError) {

    case 0: msg= <Translation ns= "global">{(t) => <>{t('PDFKO0')}</>}</Translation>;
    break;

    case 1: msg= <Translation ns= "global">{(t) => <>{t('PDFKO1')}</>}</Translation>;
    break;

    case 2: msg= <Translation ns= "global">{(t) => <>{t('PDFKO2')}</>}</Translation>;
    break;

    case 3: msg= <Translation ns= "global">{(t) => <>{t('PDFKO3')}</>}</Translation>;
    break;

    case 4: msg= <Translation ns= "global">{(t) => <>{t('PDFKO4')}</>}</Translation>;
    break;

    case 5: msg= <Translation ns= "global">{(t) => <>{t('PDFKO5')}</>}</Translation>;
    break;

    default: msg= <Translation ns= "global">{(t) => <>{t('PDFKO0')}</>}</Translation>;
    break;

    }

}

//Control mensaje de errores baja tramo
controlErrBaja=(controlErrorTramo)=>{
  console.log("Control de errores Baja Tramo: ", controlErrorTramo);

  switch(controlErrorTramo) {

    case 0: msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMKO00')}</>}</Translation>;
    break;

    case 1: msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMKO01')}</>}</Translation>;
    break;

    case 2: msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMKO02', { TramKO: this.state.form.rutaKml })}</>}</Translation>;
    break;

    default: msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMKO00')}</>}</Translation>;
    break;

    }

}



/*Obtención datos Carreteras*/
peticionGet1=()=>{
  authToken = sessionStorage.getItem("JWT");
  console.log('AutToken:', authToken);
   axios.get(url1, { headers: {"Authorization" : authToken} }).then(response=>{

      console.log(response.data);

      var data = response.data;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: response.data,
        tableData: slice
      })
  });
}    

/*Obtención Tramos*/
peticionGet2=()=>{  
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  //axios.get(url2+"/"+this.state.comboSel,{ headers: {"Authorization" : authToken} }).then(response2=>{
  axios.get(url2+"/"+this.state.comboSel,config).then(response2=>{

      console.log(response2.data);
      var data2 = response2.data;
      var slice2 = data2.slice(this.state.offset, this.state.offset + this.state.perPage);
      firstTramo = slice2.shift();
      lastTramo = slice2.pop();
      console.log("ULTIMO TRAMO", lastTramo.id);

      this.setState({
        pageCount: Math.ceil(data2.length / this.state.perPage),
        orgtableData2: response2.data,
        tableData2: slice2,
        content: response2
      })
  }).catch(error=>{
    console.log("KO");
    console.log("URL para GET Combo:", url2+"/"+this.state.comboSel);
    console.log(error);        
});
}    


/*Insertar registro*/
modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

/*Verificar Insertar registro*/
modalVerificar=()=>{
  this.setState({modalVerificar: !this.state.modalVerificar});
}

/*Verificar Editar registro*/
modalVerificarEd=()=>{
  this.setState({modalVerificarEd: !this.state.modalVerificarEd});
}

/*Descargar ZIP del registro*/
modalDescaragr=()=>{
  this.setState({modalDescaragr: !this.state.modalDescaragr});
}

/*Editar registro*/
modalEditar=()=>{
  this.setState({modalEditar: !this.state.modalEditar});
}

/*Editar registro de Tramos*/
modalRedirigir=()=>{
  console.log("Modal redirigir");
  this.setState({modalRedirigir: !this.state.modalRedirigir});
}


/*Editar registro. No se usa. Lo mantenemos por si el usuario decidiese recuperarlo*/
peticionPut=()=>{
  const data = new FormData();

  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
if (this.state.setBtnInsertar==true){
  axios.put(url1,this.state.form,config).then(response=>{    
    this.setState({modalEditar: false});
    this.peticionGet();
    this.setState({modalVerificarEd: false});
  }).catch(error=>{
    this.setState({modalVerificarEd: false});
    this.setState({setBtnInsertar: false});
    console.log("KO");
    console.log("URL para PUT:", url1);
    console.log(data);
    console.log(config);
    console.log("ERROR PUT");
    console.log(error);        
    alert("Error mientras se modificaban datos. Pongase en contacto con elservicio técnico"); 
})   
}else{
  alert("Rellena correctamente el formulario");
  this.setState({setBtnInsertar: false});
}
}


/*Dar de Baja Tramo*/
peticionPutBaja=()=>{
  console.log("Acción baja");
  console.log("rutaKml", this.state.form.rutaKml);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  axios.put(url3+"/"+this.state.form.id,config).then(response=>{    
    this.setState({modalEliminar: false});
    this.setState({setMsgOutBoolOK: true});
    this.setState({setMsgOutBoolKO: false});
    msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMOK')}</>}</Translation>;
    this.peticionGet();
  }).catch(error=>{
    this.setState({setMsgOutBoolKO: true});
    this.setState({setMsgOutBoolOK: false});
    console.log(url3);
    console.log(this.state.form.id);
    console.log(error);    
    console.log("Error response", error.response);
    console.log("Error response data", error.response?.data);
    this.controlErrBaja(error.response?.data); 
    this.setState({modalEliminar: false});
    this.peticionGet(); 
})   

}



/*Insertar registro*/
peticionPost=()=>{
  const data = new FormData();

  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };

  console.log("Objeto a insertar: ", this.state.form);
  console.log("URL escogida: ", url1);
  console.log("Validación: ", this.state.setBtnInsertar);

  if (this.state.setBtnInsertar==true){
    axios.post(url1,this.state.form, config).then(response=>{
      console.log("OK POST");
      this.setState({modalInsertar: false});
      this.setState({setBtnInsertar: false});
      this.setState({modalVerificar: false});
      this.peticionGet();
    }).catch(error=>{
      this.setState({setBtnInsertar: false});
      this.setState({modalVerificar: false});
      console.log("KO");
      console.log("URL para POST:", url1);
      console.log(data);
      console.log(config);
      console.log("ERROR POST");
      console.log(error); 
      this.controlErr(error.response?.data.byteLength);
      this.setState({modalInsertar: false});   
    })   
  }else{
    alert("Rellena correctamente el formulario");
    this.setState({setBtnSeleccionar: false});
  }
}

/*Eliminar registro*/
peticionDelete=()=>{
  console.log("Acción delete");
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  axios.delete(url1+"/"+this.state.form.id, config).then(response=>{
    this.setState({modalEliminar: false});
    this.setState({setMsgOutBoolOK: true});
    this.setState({setMsgOutBoolKO: false});
    msg= <Translation ns= "global">{(t) => <>{t('DELETEOK')}</>}</Translation>;
    this.peticionGet();
  }).catch(error=>{   
    this.setState({setMsgOutBoolKO: true});
    this.setState({setMsgOutBoolOK: false});
    console.log(url1);
    console.log(this.state.form.id);
    console.log(error);    
    msg= <Translation ns= "global">{(t) => <>{t('DELETEKO')}</>}</Translation>;  
    this.peticionGet(); 
})   
}

/*Descargar ZIP*/
peticionDownload=()=>{
  config = {
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
  axios.post(url1+"/"+this.state.form.id, config, {responseType: 'arraybuffer'},  {body: 'data'}, 
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
    console.log("response",response);
    console.log("response",response.data);
    console.log("response request",response.request);
    console.log("response request status",response.request.status);
    let extension = 'zip';
    let tempFileName = this.state.form.codigo;
    let fileName = "Auscultacions_"+`${tempFileName}.${extension}`;
    const urlDown = window.URL.createObjectURL(new Blob([response.data],{
      type:'application/zip'
    }));
    const link = document.createElement('a');
    link.href = urlDown;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    this.setState({setMsgOutBoolOK: true});
    this.setState({setMsgOutBoolKO: false});
    this.setState({modalDescaragr: false});
    msg= <Translation ns= "global">{(t) => <>{t('PDFOK')}</>}</Translation>;
    this.peticionGet();
  }).catch(error=>{
    this.setState({setMsgOutBoolKO: true});
    this.setState({setMsgOutBoolOK: false});
    console.log("KO Download");
    console.log(url1);
    console.log(this.state.form.id);
    console.log(error);
    console.log("Error response", error.response);
    console.log("Error response data", error.response?.data);
    console.log("Error response data byteLength", error.response?.data.byteLength);
    this.controlErr(error.response?.data.byteLength);
    this.setState({modalDescaragr: false});
    this.peticionGet(); 
})   
}



//Selecciona una row
seleccionarTramo=(CarTram)=>{
  console.log("Carretera Tramo",CarTram);
  this.setState({
    tipoModal: 'Seleccionar',
    form: {
      id: CarTram.id,
      codigo: CarTram.codigo,
      nombre: CarTram.nombre,
      comentario: CarTram.comentario,
      idGrafo: CarTram.idGrafo,
      rutaKml: CarTram.rutaKml,
      tramo: CarTram
    }
  })

  console.log("Id seleccionado: ", CarTram.id);

}   
    //Devolvemos las Tabs con datos
    render(url){
        const { activeIndex } = this.state;
            const tabs = [
      {
        label: <Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation>,
        
        content: (
          <div>
          { this.state.setMsgOutBoolOK ? 
          <div><br/><br/>
              <div className="alert alert-success">
                {/*Mostramos mensaje*/}
                {msg}
              </div>
            </div>
            : ""}
          { this.state.setMsgOutBoolKO ? 
            <div><br/>
             <div className="alert alert-danger">
                {/*Mostramos mensaje*/}
                {msg}
            </div>
            </div>
            : ""}
               {/*<button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}><Translation ns= "global">{(t) => <>{t('addRegist')}</>}</Translation></button>*/}
              {"  "}
              <br /><br />
              <BootstrapTable  
              bootstrap4 
              keyField='id' 
              columns={this.columns} 
              data={this.state.tableData}
              pagination={this.pagination}
              filter={filterFactory()}
              bordered={ false } 
              headerWrapperClasses="table-responsive"
              classes="w-auto text-nowrap">
              </BootstrapTable>
          </div>
        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('Tramo')}</>}</Translation>,
        content: (
          <div>
            { this.state.setMsgOutBoolOK ? 
              <div><br/><br/>
                <div className="alert alert-success">
                  {/*Mostramos mensaje*/}
                  {msg}
                </div>
              </div>
            : ""}
            { this.state.setMsgOutBoolKO ? 
            <div><br/>
              <div className="alert alert-danger">
                {/*Mostramos mensaje*/}
                {msg}
              </div>
            </div>
            : ""}
            {"  "}

             <span style={{float: 'right'}}>
                <Select 
                  options={ combo } 
                  onChange={this.handleCombo} 
                  value={combo.find(obj => obj.value === this.state.comboSel)}
                  /> 
              </span>
            <br /><br />
            <BootstrapTable
            bootstrap4 
            keyField='id' 
            wrapperClasses="table-responsive"
            columns={this.columns2} 
            data={this.state.tableData2}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false } 
            headerWrapperClasses="table-responsive"
            classes="w-auto text-nowrap">
            </BootstrapTable>
          </div>
        ),
        disabled: false
      },
 


    ];

      if (!this.state.content) 
      return (
        <div className="u-full-width" style={{marginLeft:'50%'}}>
          <Spinner /> 
        </div>
      );

      return(
         //Retomamos valores de Índice de la Tab. Debajo, en el fragment, Pop-ups y Forms
         indice= {activeIndex},
         
        <div className="App"> 

          <Tab activeIndex={activeIndex} onChange={this.onChange} tabs={tabs} />  
          
          <Fragment>

            <Modal  size="lg" style={{maxWidth: '800px', width: '60%'}} isOpen={this.state.modalInsertar}>
				      <ModalHeader style={{display: 'block'}}>
              <span style={{float: 'right'}}>
                <button className="btn btn-danger" onClick={()=>{this.setState({tipoModal: 'verificar'}); this.modalVerificar()}}>x</button>
              </span>
              <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('insReg')}</>}</Translation></ModalTitle>
              </ModalHeader>             
				        <ModalBody>
				          <div className="form-group">
						        <label htmlFor="id"><Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation></label>
						        <input className="form-control" type="text" maxLength = "64" name='codigo' id='codigo' onChange={this.handleChange} />
						        <br />
						        <label htmlFor="comentario"><Translation ns= "global">{(t) => <>{t('coment')}</>}</Translation></label>
						        <input className="form-control" type="text" maxLength = "255" name="comentario" id="comentario" onChange={this.handleChange} />						
					        </div>
				        </ModalBody>	
				        <ModalFooter>                  
					        <button className="btn btn-success" onClick={()=>this.peticionPost()}>Aceptar</button>
                  
				        </ModalFooter>
			      </Modal>

            <Modal size="lg" style={{maxWidth: '1700px', width: '100%', backgroundColor: '#FFFFFF'}}  isOpen={this.state.modalRedirigir}>
               <ModalHeader style={{display: 'block', backgroundColor: '#FFFFFF'}}>
                  <span style={{float: 'right'}}>
                    <button className="btn btn-danger btn-sm" onClick={()=>{this.modalRedirigir()}}>x</button>                    
                  </span>
                  <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('VisInfTra')}</>}</Translation></ModalTitle>
                </ModalHeader>
                { indice.activeIndex != 0  ?
                <ModalBody style={{backgroundColor: '#FFFFFF'}}>
                  <div style={{marginRight:'1%', marginTop: '1%', backgroundColor: '#FFFFFF'}}> 
                               
                    <VerCarTramDet 
                       id = {url4 + (this.state.form.id)}
                       idmax= {lastTramo.id}
                       idmin={firstTramo.id}
                    />
                  </div>    
                </ModalBody>
                :
                   <div></div>
                }
                <ModalFooter>
                  <span style={{float: 'right', backgroundColor: '#FFFFFF'}}></span>
                </ModalFooter>
            </Modal>
 
			      <Modal isOpen={this.state.modalEliminar}>
				      <ModalBody>
              { indice.activeIndex != 0  ?
                <Translation ns= "global">{(t) => <>{t('BAJATRAM')}</>}</Translation>			     
              :
                <Translation ns= "global">{(t) => <>{t('eliReg')}</>}</Translation>	
              }  
				      </ModalBody>
				      <ModalFooter>
              { indice.activeIndex != 0  ?
                <button className="btn btn-danger" onClick={()=>this.peticionPutBaja(url3)}>Sí</button>
              :
                <button className="btn btn-danger" onClick={()=>this.peticionDelete(this.state.url)}>Sí</button>
              }
				        <button className="btn btn-primary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
				      </ModalFooter>
			      </Modal>

            <Modal isOpen={this.state.modalDescaragr}>
				      <ModalBody>
              <Translation ns= "global">{(t) => <>{t('descPDF')}</>}</Translation>			        
				      </ModalBody>
				      <ModalFooter>
				        <button className="btn btn-danger" onClick={()=>this.peticionDownload()}>Sí</button>
				        <button className="btn btn-primary" onClick={()=>this.setState({modalDescaragr: false})}>No</button>
                </ModalFooter>
			      </Modal>

            <Modal isOpen={this.state.modalVerificar}>
				      <ModalBody>
              <Translation ns= "global">{(t) => <>{t('GuardarCamAdd')}</>}</Translation>                			        
				      </ModalBody>
				      <ModalFooter>                               
				        <button className="btn btn-primary" onClick={()=>this.peticionPost(this.state.url)}><Translation ns= "global">{(t) => <>{t('Guardar')}</>}</Translation></button>
				        <button className="btn btn-primary" onClick={()=>this.setState({modalVerificar: false, modalInsertar: false})}><Translation ns= "global">{(t) => <>{t('NGuardar')}</>}</Translation></button>
                <button className="btn btn-primary" onClick={()=>this.setState({modalVerificar: false})}><Translation ns= "global">{(t) => <>{t('cancelar')}</>}</Translation></button>
				      </ModalFooter>
			      </Modal>

            <Modal isOpen={this.state.modalVerificarEd}>
				      <ModalBody>
                <Translation ns= "global">{(t) => <>{t('GuardarCam')}</>}</Translation>                            		        
				      </ModalBody>
				      <ModalFooter>
				        <button className="btn btn-primary" onClick={()=>this.peticionPut(this.state.url)}><Translation ns= "global">{(t) => <>{t('Guardar')}</>}</Translation></button>
				        <button className="btn btn-primary" onClick={()=>this.setState({modalVerificarEd: false, modalEditar: false})}><Translation ns= "global">{(t) => <>{t('NGuardar')}</>}</Translation></button>
                <button className="btn btn-primary" onClick={()=>this.setState({modalVerificarEd: false})}><Translation ns= "global">{(t) => <>{t('cancelar')}</>}</Translation></button>
				      </ModalFooter>
			      </Modal>
			
			      <Modal size="lg" style={{maxWidth: '1000px', width: '60%'}} isOpen={this.state.modalEditar}>
              <ModalHeader style={{display: 'block'}}>
              <span style={{float: 'right'}}>
                <button className="btn btn-danger" onClick={()=>{this.setState({tipoModal: 'verificarEd'}); this.modalVerificarEd()}}>x</button>
              </span>
              <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('edReg')}</>}</Translation></ModalTitle>
 
              </ModalHeader>
              <ModalBody>
					        <div className="form-group">
						        <label htmlFor="id"><Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation></label>
						        <input className="form-control" type="text" maxLength = "64" name='codigo' id='codigo' readOnly onChange={this.handleChange} value={this.state.form?this.state.form.codigo: ''}/>
						        <br />
						        <label htmlFor="comentario"><Translation ns= "global">{(t) => <>{t('comentario')}</>}</Translation></label>
						        <input className="form-control" type="text" maxLength = "255" name="comentario" id="comentario" onChange={this.handleChange} value={this.state.form?this.state.form.comentario: ''}/>
					        </div>  
              </ModalBody>
              <ModalFooter>                  
                <button className="btn btn-success" onClick={()=>this.peticionPut(this.state.url)}><Translation ns= "global">{(t) => <>{t('Aceptar')}</>}</Translation></button>
              </ModalFooter>
			      </Modal>
          </Fragment>
          
        </div>
      )
    }
}


export default VerEditCarTrams;
