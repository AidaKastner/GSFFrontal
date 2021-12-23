import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import '../css/Pagination.css';
import CargarExcel from "../components/CargarExcel";
import CrearEditarActuacion from "../components/CrearEditarActuacion";
import '../css/Menu.css';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { i18n } from "../config/i18n";
import { Trans } from 'react-i18next';
import { Translation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import Spinner from "../components/Spinner"; 


const urlAct = "https://localhost:44301/actuaciones";
const url = "https://localhost:44301/api/CargarActuaciones";
//const { t, i18n } = useTranslation();



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
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones, align: 'center'},
    {dataField: 'ddTipoActuacione.nombre', text:<Translation ns= "global">{(t) => <>{t('Tipo')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'},
    {dataField: 'carretera.nombre', text: <Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'},
    {dataField: 'claveObra', text: <Translation ns= "global">{(t) => <>{t('Clave')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'},
    {dataField: 'fecha', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, sort: true, formatter: (cell, row) =>{return <div>{`${row.fecha.substring(0,10)}`}</div>;}, filter: textFilter(), align: 'center'},
    {dataField: 'sentido', text: <Translation ns= "global">{(t) => <>{t('Sentido')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'},
    {dataField: 'calzada', text: <Translation ns= "global">{(t) => <>{t('Calzada')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'},
    {dataField: 'gestion', text: <Translation ns= "global">{(t) => <>{t('Gestion')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'},
    {dataField: 'carreterasAntigua', text: <Translation ns= "global">{(t) => <>{t('CarreteraAnt')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'},
    {dataField: 'puntoIni.pk', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div>{`${row.puntoIni.pk} + ${row.puntoIni.m}`}</div>;}, filter: textFilter(), align: 'center'},
    {dataField: 'puntoFin.pk', text: <Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation>, formatter: (cell, row) =>{return <div>{`${row.puntoFin.pk} + ${row.puntoFin.m}`}</div>;}, filter: textFilter(), align: 'center'},
    {dataField: 'importe', text: <Translation ns= "global">{(t) => <>{t('Importe')}</>}</Translation>, sort: true, filter: textFilter(), align: 'center'}
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
    })
  }


  ButtonsAcciones = (cell, row, rowIndex) => {
    //console.log("cell :", cell);
    //console.log("row: ", row);
    //console.log("rowindex ", rowIndex);
           
    return (
      <div>
      <button className="btn btn-primary" onClick={()=>{this.seleccionarActuacion(row); this.setState({modalInsertar: true, tipoModal: 'Actualizar', tipoModalV: ''})}}><FontAwesomeIcon icon={faEdit}/></button>
      {"  "}
      <button className="btn btn-danger" onClick={()=>{this.seleccionarActuacion(row); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
      </div>              
      );
  };

  componentDidMount(){
    this.peticionGet();
  }



/*Obtención datos*/
peticionGet=()=>{
  axios.get(url).then(response=>{

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
        modelVerificar: false, 
        content: response
      })
  });
}    


/*Eliminar actuación*/
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

/*Se activa/desactiva el modal para Insertar/Editar una Actuación*/
modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

/*Se activa/desactiva el modal para verificar si se quiere salir de Crear/Editar*/
modalVerificar=()=>{
  this.setState({modalVerificar: !this.state.modalVerificar});
}



//Se guarda la actuación seleccionada
seleccionarActuacion=(actuacion)=>{
  console.log("seleccionarActuacion");
  console.log(actuacion);
  this.setState({
    form: {
      id: actuacion.id,
      actuacion: actuacion
    }
  })
  console.log("ID actuación: ", actuacion.id);
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
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null}); this.modalImportar()}}><Trans ns= "global">ImpAct</Trans></button>       
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
          />


          {/*Modal para cargar un Excel de actuaciones*/}
          <Modal isOpen={this.state.modalImportar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}}>
                    <button className="btn btn-danger" onClick={()=>{this.modalVerificar(); this.setState({tipoModalV: 'Importar', tipoModal: ''})}}>x</button>
                  </span>
                </ModalHeader>

                <ModalBody>
                  <CargarExcel/>
                </ModalBody>
          </Modal>
       

          {/*Modal para Eliminar la Actuación*/}
          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
            <Translation ns= "global">{(t) => <>{t( 'ElimAct')}</>}</Translation>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

        {/*Modal para Crear o Modificar una Actuación*/}
          <Modal size="lg" style={{maxWidth: '1600px', width: '80%'}} isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}}>
                    <button className="btn btn-danger" onClick={()=>{this.modalVerificar(); this.setState({tipoModalV: 'Guardar', tipoModal:'Insertar'})}}>x</button>
                  </span>
                </ModalHeader>
                <ModalBody>
                {this.state.tipoModal=='Actualizar'?
                  <CrearEditarActuacion                
                    Actuacion = {this.state.form.actuacion}
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
				        <button className="btn btn-danger" size="sm" onClick={()=>{this.setState({modalVerificar: false, modalInsertar: false}); this.peticionGet()}}><Translation ns= "global">{(t) => <>{t('Salir')}</>}</Translation></button>
                <button className="btn btn-primary" size="sm" onClick={()=>this.setState({modalVerificar: false})}><Translation ns= "global">{(t) => <>{t('Permanecer')}</>}</Translation></button>
				      </ModalFooter>
			    </Modal>
          </div>
        )
    }
}


export default VerActuaciones;