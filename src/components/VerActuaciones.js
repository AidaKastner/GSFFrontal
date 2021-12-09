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
      tipoModal: '',
      content: null,
      form:{
        id: '',
        actuacion: ''
      } 
  }

  this.columns = [
    {dataField: 'acciones', text: <Translation ns= "global">{(t) => <>{t( 'Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones},
    {dataField: 'idDdTipoActuaciones', text:<Translation ns= "global">{(t) => <>{t('Tipo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'carretera.nombre', text: <Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'claveObra', text: <Translation ns= "global">{(t) => <>{t('Clave')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'fecha', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'sentido', text: <Translation ns= "global">{(t) => <>{t('Sentido')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'calzada', text: <Translation ns= "global">{(t) => <>{t('Calzada')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'gestion', text: <Translation ns= "global">{(t) => <>{t('Gestion')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'carreterasAntigua', text: <Translation ns= "global">{(t) => <>{t('CarreteraAnt')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'puntoIni.pk', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, formatter: (cell, row) =>{return <div>{`${row.puntoIni.pk} + ${row.puntoIni.m}`}</div>;}, filter: textFilter()},
    {dataField: 'puntoFin.pk', text: <Translation ns= "global">{(t) => <>{t( 'PKFin')}</>}</Translation>, formatter: (cell, row) =>{return <div>{`${row.puntoFin.pk} + ${row.puntoFin.m}`}</div>;}, filter: textFilter()},
    {dataField: 'importe', text: <Translation ns= "global">{(t) => <>{t( 'Importe')}</>}</Translation>, sort: true, filter: textFilter()}
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
    //  console.log("rowindex ", rowIndex);
           
    return (
      <div>
      <button className="btn btn-primary" onClick={()=>{this.seleccionarActuacion(row); this.setState({modalInsertar: true, tipoModal: 'Actualizar'})}}><FontAwesomeIcon icon={faEdit}/></button>
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
      
      //this.setState({data: response.data})
      
      var data = response.data.actuaciones;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: response.data,
        tableData: slice,
        desplegablesActuaciones: response.data.desplegablesActuaciones,
        modalImportar: false,
        modalInsertar: false,
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

    

modalImportar=()=>{
  this.setState({modalImportar: !this.state.modalImportar});
}    

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarActuacion=(actuacion)=>{
  console.log("seleccionarActuacion");
  console.log(actuacion);
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: actuacion.id,
      actuacion: actuacion
    }
  })

  console.log("ID a eliminar: ", actuacion.id);
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
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'Insertar'}); this.modalInsertar()}}><Trans ns= "global">AddAct</Trans></button>      
          <br /><br />
          <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={this.columns} 
            data={this.state.tableData}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false }
          />

          <Modal isOpen={this.state.modalImportar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalImportar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <CargarExcel/>
                </ModalBody>

                <ModalFooter>
                  {/*this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>*/
                  }
                    {/*<button className="btn btn-primario" onClick={()=>this.props.insertarArchivos}>Importar</button>*/}
                    <button className="btn btn-success" onClick={()=>this.peticionGet()}>Aceptar</button>
                    {/*<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>*/}
                </ModalFooter>
          </Modal>
       


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
            <Translation ns= "global">{(t) => <>{t( 'ElimAct')}</>}</Translation>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>


          <Modal size="lg" style={{maxWidth: '1600px', width: '80%'}} isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                  
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

                <ModalFooter>                  
                    <button className="btn btn-success" onClick={()=>this.peticionGet()}>Aceptar</button>
                </ModalFooter>
          </Modal>

          </div>
        )
    }
}


export default VerActuaciones;