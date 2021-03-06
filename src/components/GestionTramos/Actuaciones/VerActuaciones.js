import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ModalTitle from "react-bootstrap/ModalTitle";
import ReactPaginate from 'react-paginate';
import '../../../css/Pagination.css';
import CargarExcel from "./CargarExcel";
import CrearEditarActuacion from "./CrearEditarActuacion";
import InfoActuacion from "./InfoActuaciones";
import '../../../css/Button.css';
import '../../../css/Menu.css';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { i18n } from "../../../config/i18n";
import { Trans } from 'react-i18next';
import { Translation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import Spinner from "../../Spinner"; 


const urlAct = "https://localhost:44301/actuaciones";
const url = "https://localhost:44301/api/CargarActuaciones";
//const { t, i18n } = useTranslation();


let authToken = sessionStorage.getItem("JWT");

let config = {
  headers: {
      'Authorization': authToken,
      'Accept': 'application/json',
      'content-type': 'application/json'
  }
}


class VerActuaciones extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      tableData: [],
      aditionalData: [],
      orgtableData: [],
      perPage: 50000,
      currentPage: 0,
      modalImportar: false,
      modalEliminar: false,
      modalInsertar: false,
      modalInfo: false,
      modalVerificar: false,
      tipoModal: '',
      tipoModalV: '',
      content: null,
      form:{
        id: '',
        actuacion: ''
      } 
  }


  {/*Tabla de Actuaciones*/}
  this.columns = [
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones, style: this.columnStyle, formatter: this.ButtonsAcciones},
    {dataField: 'ddTipoActuacione.nombre', text:<Translation ns= "global">{(t) => <>{t('Tipo')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'carretera.nombre', text: <Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'claveObra', text: <Translation ns= "global">{(t) => <>{t('Clave')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'fecha', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, sort: true, formatter: (cell, row) =>{return <div style={{display: 'inline-block', textAlign: 'left'}}>{`${row.fecha != null ? row.fecha.substring(0,10) : row.fecha}`}</div>;}, filter: textFilter({placeholder: ' '}), style: this.columnStyle},
    {dataField: 'sentido', text: <Translation ns= "global">{(t) => <>{t('Sentido')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), formatter: (cell, row) =>{return <div style={{display: 'inline-block', textAlign: 'left'}}>{`${row.sentido == 'C'? 'Creixent': row.sentido == 'D'? 'Decreixent' : 'Creixent/Decreixent'}`}</div>;}, style: this.columnStyle},
    {dataField: 'calzada', text: <Translation ns= "global">{(t) => <>{t('Calzada')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), formatter: (cell, row) =>{return <div style={{display: 'inline-block', textAlign: 'left'}}>{`${row.carriles != ''? ((row.carriles?.substring(0,1) > 0 && row.carriles?.substring(2,3) > 0) ? 'Separades' : '??nica') :''}`}</div>;}, style: this.columnStyle},
    {dataField: 'gestion', text: <Translation ns= "global">{(t) => <>{t('Gestion')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'carreterasAntigua', text: <Translation ns= "global">{(t) => <>{t('CarreteraAnt')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), style: this.columnStyle, formatter: this.formatText},
    {dataField: 'puntoIni.pk', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{display: 'inline-block', textAlign: 'left'}}>{`${row.puntoIni.pk} + ${row.puntoIni.m}`}</div>;}, filter: textFilter({placeholder: ' '}), style: this.columnStyle},
    {dataField: 'puntoFin.pk', text: <Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation>, formatter: (cell, row) =>{return <div style={{display: 'inline-block', textAlign: 'left'}}>{`${row.puntoFin.pk} + ${row.puntoFin.m}`}</div>;}, filter: textFilter({placeholder: ' '}), style: this.columnStyle},
    {dataField: 'importe', text: <Translation ns= "global">{(t) => <>{t('Importe')}</>}</Translation>, sort: true, filter: textFilter({placeholder: ' '}), formatter: (cell, row) =>{return <div style={{display: 'inline-block', textAlign: 'left'}}>{`${row.importe?.toLocaleString('es')}`}</div>;}, style: this.columnStyle}
  ]


 
  this.pagination = paginationFactory({
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
  }

  

  ButtonsAcciones = (cell, row, rowIndex) => {
           
    return (
      <div>    
      <button className="btn btn-primary btn-sm" onClick={()=>{this.seleccionarActuacion(row); this.setState({modalInfo: true})}}><FontAwesomeIcon icon={faInfo}/></button>
      {"  "}
      <button className="btn btn-primary btn-sm" onClick={()=>{this.seleccionarActuacion(row); this.setState({modalInsertar: true, tipoModal: 'Actualizar', tipoModalV: ''})}}><FontAwesomeIcon icon={faEdit}/></button>
      {"  "}
      <button className="btn btn-danger btn-sm" onClick={()=>{this.seleccionarActuacion(row); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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

  componentDidMount(){
    this.peticionGet();
  }



/*Obtenci??n datos*/
peticionGet=()=>{
  authToken = sessionStorage.getItem("JWT");
  console.log('AutToken Act:', authToken);
  axios.get(url, { headers: {"Authorization" : authToken} }).then(response=>{

      console.log(response.data);
            
      var data = response.data.actuaciones;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: response.data,
        tableData: slice,
        desplegablesActuaciones: response.data.desplegablesActuaciones,
        modalImportar: false,
        modalInsertar: false,
        modalVerificar: false, 
        modalInfo: false, 
        content: response
      })
  });
}    


/*Eliminar actuaci??n*/
peticionDelete=()=>{
  console.log("ID a eliminar: ", this.state.form.id);
  axios.delete(urlAct+"/"+this.state.form.id).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}    

    
/*Se activa/desactiva el modal para importar el Excel*/
modalImportar=()=>{
  console.log("Modal Importar");
  this.setState({modalImportar: !this.state.modalImportar});
}    

/*Se activa/desactiva el modal para Insertar/Editar una Actuaci??n*/
modalInsertar=()=>{
  console.log("Modal Insertar");
  console.log(this.state);
  this.setState({modalInsertar: !this.state.modalInsertar});
}

/*Se activa/desactiva el modal para verificar si se quiere salir de Crear/Editar*/
modalVerificar=()=>{
  console.log("Modal verificar");
  this.setState({modalVerificar: !this.state.modalVerificar});
}

/*Se activa/desactiva el modal para mostrar la informaci??n de la actuaci??n*/
modalInfo=()=>{
  console.log("Modal Info");
  this.setState({modalInfo: !this.state.modalInfo});
}



//Se guarda la actuaci??n seleccionada
seleccionarActuacion=(actuacion)=>{
  console.log("seleccionarActuacion");
  console.log(actuacion);
  this.setState({
    form: {
      id: actuacion.id,
      actuacion: actuacion
    }
  })
  console.log("ID actuaci??n: ", actuacion.id);
}    

    render(){ 
        if (!this.state.content) 
        return (
          <div className="u-full-width"  style={{marginLeft:'50%'}}>
            <Spinner /> 
          </div>
        );

        return(
          
            <div className="App" >            
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null}); this.modalImportar()}}><Trans ns= "global">ImpActs</Trans></button>       
            {"  "}
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'Insertar', tipoModalV: ''}); this.modalInsertar()}}><Trans ns= "global">AddAct</Trans></button>      
          <br /><br />
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={this.columns} 
            data={this.state.tableData}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={false}
            wrapperClasses="table-responsive"
            headerWrapperClasses="table-responsive"
            classes="w-auto text-nowrap"
          />

          {/*Modal para cargar un Excel de actuaciones*/}
          <Modal isOpen={this.state.modalImportar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}}>
                    <button className="btn btn-danger btn-sm" onClick={()=>{this.modalVerificar(); this.setState({tipoModalV: 'Importar', tipoModal: ''})}}>x</button>
                  </span>
                  <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('ImpActs')}</>}</Translation></ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <CargarExcel/>
                </ModalBody>
          </Modal>     

          {/*Modal para Eliminar la Actuaci??n*/}
          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
            <Translation ns= "global">{(t) => <>{t( 'ElimAct')}</>}</Translation>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger btn-sm" onClick={()=>this.peticionDelete()}>S??</button>
              <button className="btn btn-secundary btn-sm" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

        {/*Modal para Crear o Modificar una Actuaci??n*/}
          <Modal size="lg" style={{maxWidth: '1600px', width: '80%'}} isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}}>
                    <button className="btn btn-danger btn-sm" onClick={()=>{this.modalVerificar(); this.setState({tipoModalV: 'Guardar'})}}>x</button>
                  </span>
                  {this.state.tipoModal=='Actualizar'?
                  <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('EditAct')}</>}</Translation></ModalTitle>
                  :
                  <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('AddAct')}</>}</Translation></ModalTitle>
                }  
                </ModalHeader>
                <ModalBody>
                {this.state.tipoModal=='Actualizar'?
                  <CrearEditarActuacion                
                    Actuacion = {this.state.form?.actuacion}
                    Data = {this.state.desplegablesActuaciones}
                  />   
                  :   
                  <CrearEditarActuacion                  
                    Actuacion = ''
                    Data = {this.state.desplegablesActuaciones}
                  />  
                  }                   
                </ModalBody>
          </Modal>

          {/*Modal para verificar si se quiere salir de Crear/Editar o de Importar*/}
          <Modal isOpen={this.state.modalVerificar}>
				      <ModalBody>
              <br />
              {this.state.tipoModalV=='Guardar'?
              <Translation ns= "global">{(t) => <>{t('SalirModalSave')}</>}</Translation>  
              :
              <Translation ns= "global">{(t) => <>{t('SalirModal')}</>}</Translation>     
              }
              <br /><br />     			        
				      </ModalBody>
				      <ModalFooter>                            
				        <button className="btn btn-danger btn-sm" size="sm" onClick={()=>{this.setState({modalVerificar: false, modalInsertar: false}); this.peticionGet()}}><Translation ns= "global">{(t) => <>{t('Salir')}</>}</Translation></button>
                <button className="btn btn-primary btn-sm" size="sm" onClick={()=>this.setState({modalVerificar: false})}><Translation ns= "global">{(t) => <>{t('Permanecer')}</>}</Translation></button>
				      </ModalFooter>
			    </Modal>


          {/*Modal para mostrar la informaci??n de una Actuaci??n*/}
          <Modal size="lg" style={{maxWidth: '1600px', width: '80%'}} isOpen={this.state.modalInfo}>
                <ModalHeader style={{display: 'block'}}>
                <span style={{float: 'right'}}>           
                    <button className="btn btn-danger btn-sm" onClick={()=>{this.modalInfo();}}>x</button>
                </span>
                <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('InfoAct')}</>}</Translation></ModalTitle>
                </ModalHeader>
                <ModalBody style={{marginBottom: '20px'}}>
                  <InfoActuacion                
                    Actuacion = {this.state.form?.actuacion}
                  />                   
                </ModalBody>
          </Modal>
          </div>
        )
    }
}


export default VerActuaciones;