import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../css/Pagination.css';
import '../css/Menu.css';
import { Trans } from 'react-i18next';
import { Translation } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import ImpExcelAforos from './ImpExcelAforos';
import Spinner from "../components/Spinner"; 


const urlAf = "https://localhost:44301/Aforos";
//const { t, i18n } = useTranslation();



class VerImpAforos extends Component{
  
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
      content: null,
      form:{
        id: ''
      } 
  }
    


  this.columns = [
    {dataField: 'region', text:<Translation ns= "global">{(t) => <>{t('region')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'codigo', text: <Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'carretera', text: <Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'pk', text: <Translation ns= "global">{(t) => <>{t('pk')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'poblacion', text: <Translation ns= "global">{(t) => <>{t('poblacion')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'tipoEstacion', text: <Translation ns= "global">{(t) => <>{t('tipo_estacion')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'carriles', text: <Translation ns= "global">{(t) => <>{t('Carriles')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'fuenteDatos', text: <Translation ns= "global">{(t) => <>{t('fuente_datos')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'definicionTramo', text: <Translation ns= "global">{(t) => <>{t('definicion_tramo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'ifa', text: <Translation ns= "global">{(t) => <>{t( 'ifa')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'imd', text: <Translation ns= "global">{(t) => <>{t( 'imd')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'porcPesados', text: <Translation ns= "global">{(t) => <>{t( 'porc_pesados')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'velocidad', text: <Translation ns= "global">{(t) => <>{t( 'velocidad')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'pkIni', text: <Translation ns= "global">{(t) => <>{t( 'PKIni')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'pkFin', text: <Translation ns= "global">{(t) => <>{t( 'PKFin')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'anyomedida', text: <Translation ns= "global">{(t) => <>{t( 'anyomedida')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'campanya', text: <Translation ns= "global">{(t) => <>{t( 'campanya')}</>}</Translation>, sort: true, filter: textFilter()}
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

  componentDidMount(){
    this.peticionGet();
  }



/*Obtención datos*/
peticionGet=()=>{
    axios.get(urlAf).then(response=>{

      console.log(response.data);

      var data = response.data;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: response.data,
        tableData: slice,
        modalImportar: false,
        content: response
      })
  });
}    

  
modalImportar=()=>{
  this.setState({modalImportar: !this.state.modalImportar});
}    

    render(){
        if (!this.state.content) 
        return (
          <div className="u-full-width"  style={{marginLeft:'50%'}}>
            <Spinner /> 
          </div>
        );

        return(
          
            <div className="App">            
            <button className="btn btn-primario" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalImportar()}}><Trans ns= "global">ImpAfr</Trans></button>       
            {"  "}
          <br /><br />
          <BootstrapTable 
            bootstrap4 
            wrapperClasses="table-responsive"
            keyField='id' 
            columns={this.columns} 
            data={this.state.tableData}
            pagination={this.pagination}
            filter={filterFactory()}
            bordered={ false }
            headerWrapperClasses="table-responsive"
            classes="w-auto text-nowrap"
          >


        </BootstrapTable>

          <Modal isOpen={this.state.modalImportar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalImportar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <ImpExcelAforos/>
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
                    {/*<button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>*/}
                </ModalFooter>
          </Modal>
          </div>
        )
    }
}



export default VerImpAforos;