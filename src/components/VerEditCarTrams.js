
import React, { Component, useState , Fragment} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../css/Pagination.css';
import '../css/Menu.css';
import { Translation } from 'react-i18next';
import { Trans } from 'react-i18next';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import Tab from "./Tab";
import ModalTitle from "react-bootstrap/ModalTitle";
import fileDownload from 'js-file-download'

const url1 = "https://localhost:44301/Carreteras";
const url2 = "https://localhost:44301/Tramos";

var indice ='';
var paramIndex = 0;

const config = {
  headers: {
      'content-type': 'application/json'
  }
}


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
      activeIndex: 0,
      Index: 0,
      IndexCapa: 0,
      url:'',
      capa:'',
      columnaCapa:'',
      form:{
        id:'',
        codigo:'',
        nombre:'',
        comentario:'',
        idGrafo:'',
        IdCarreteras:''
      } 
  }
    
 
  //Carga de datos de las tablas
  this.columns = [
    {dataField: 'codigo', text:<Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'comentario', text:<Translation ns= "global">{(t) => <>{t('comentario')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'acciones', text:<Translation ns= "global">{(t) => <>{t('Acciones')}</>}</Translation>, formatter: this.ButtonsAcciones}
  ]

  this.columns2 = [
    {dataField: 'carretera.nombre', text:<Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'nombre', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'puntoIni.pk', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'puntoIni.m', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'puntoIni.descripcion', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'puntoFin.pk', text: <Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'puntoFin.m', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'puntoFin.descripcion', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdCodTecReal', text: <Translation ns= "global">{(t) => <>{t('ClasTecReal')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdRedes', text: <Translation ns= "global">{(t) => <>{t('ClasFunRedes')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdOrganismoCompetente', text: <Translation ns= "global">{(t) => <>{t('Organismos')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdOrganismoConservacion', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdRegimenExplotacion', text: <Translation ns= "global">{(t) => <>{t('RegExpl')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdRegimenGestion', text: <Translation ns= "global">{(t) => <>{t('RegGest')}</>}</Translation>, sort: true, filter: textFilter()},
    {dataField: 'idDdTiposCalzada', text: <Translation ns= "global">{(t) => <>{t('nombre')}</>}</Translation>,sort: true, filter: textFilter()},
    {dataField: 'acciones', text:<Translation ns= "global">{(t) => <>{t('Acciones')}</>}</Translation>, formatter: this.ButtonsAccionesTr}
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
      <button className="btn btn-primary" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEditar: true})}}><FontAwesomeIcon icon={faEdit}/></button>
      {"  "}
      <button className="btn btn-danger" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
      {"  "}
      <button className="btn btn-danger" onClick={()=>{this.seleccionarTramo(row); this.setState({modalDescaragr: true})}}><FontAwesomeIcon icon={faDownload}/></button>
      </div>              

      );
  };


//Botones de las rows Tramos
ButtonsAccionesTr = (cell, row, rowIndex) => {
  console.log("row: ", row);

return (
  <div>
  <button className="btn btn-primary" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEditar: true})}}><FontAwesomeIcon icon={faEdit}/></button>
  {"  "}
  <button className="btn btn-danger" onClick={()=>{this.seleccionarTramo(row); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
</div>              

  );
};


  //Maneja la edición e inserción en los forms
  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log("Funcion Handle",this.state.form);
    console.log("Indice: ",this.state.Index);

    }


 habBtnSeleccionar(){
  console.log(this.state.form);

 }

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

    default:  this.peticionGet1();
    break;

    }

}


/*Obtención datos Clasificación técnica real*/
peticionGet1=()=>{
  axios.get(url1).then(response=>{

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

/*Obtención datos Organismos*/
peticionGet2=()=>{
  axios.get(url2).then(response2=>{

      console.log(response2.data);
      var data2 = response2.data;
      var slice2 = data2.slice(this.state.offset, this.state.offset + this.state.perPage)

      this.setState({
        pageCount: Math.ceil(data2.length / this.state.perPage),
        orgtableData2: response2.data,
        tableData2: slice2
      })
  });
}    


/*Verificar Insertar registro*/
modalVerificar=()=>{
  this.setState({modalVerificar: !this.state.modalVerificar});
}

/*Verificar Editar registro*/
modalVerificarEd=()=>{
  this.setState({modalVerificarEd: !this.state.modalVerificarEd});
}

/*Descargar PDF del registro*/
modalDescaragr=()=>{
  this.setState({modalDescaragr: !this.state.modalDescaragr});
}

/*Editar registro*/
modalEditar=()=>{
  this.setState({modalEditar: !this.state.modalEditar});
}

/*Editar registro*/
peticionPut=()=>{
  const data = new FormData();

  console.log("Codigo a editar: ", this.state.form.id);
  console.log("URL escogida: ", url1);

  axios.put(url1,this.state.form,config).then(response=>{
    console.log("OK PUT");
    this.setState({modalEditar: false});
    this.peticionGet();
    this.setState({modalVerificarEd: false});
  }).catch(error=>{
    this.setState({modalVerificarEd: false});
    console.log("KO");
    console.log("URL para PUT:", url1);
    console.log(data);
    console.log(config);
    console.log("ERROR PUT");
    console.log(error);        
    alert("Error mientras se modificaban datos. Pongase en contacto con elservicio técnico"); 
})   
}


/*Eliminar registro*/
peticionDelete=()=>{
  console.log("Codigo a eliminar: ", this.state.form.id);
  console.log("URL Delete: ", url1);
  axios.delete(url1+"/"+this.state.form.id).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminar: false});
    this.peticionGet();
  }).catch(error=>{
    console.log("KO Delete");
    console.log(url1);
    console.log(this.state.form.id);
    console.log(error);    
    alert("Error mientras se eliminaban datos. Pongase en contacto con elservicio técnico");    
})   
}

/*Descargar PDF registro*/
peticionDownload=()=>{
  console.log("Codigo a descargar: ", this.state.form.id);
  console.log("URL Descargar: ", url1);
  axios.post(url1+"/"+this.state.form.id, {
    responseType: 'blob'}).then(response=>{
    console.log("Descargar");
    fileDownload(response.data, 'test.txt')
    this.setState({modalDescaragr: false});
    this.peticionGet();
  }).catch(error=>{
    console.log("KO Download");
    console.log(url1);
    console.log(this.state.form.id);
    console.log(error);    
    this.setState({modalDescaragr: false});
    alert("Error mientras se descargaba el PDF. Pongase en contacto con elservicio técnico");    
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
      idGrafo: CarTram.idGrafo
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
             {"  "}
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

      return(
        //Retomamos valores de Índice de la Tab o SubTab con su respectiva URL. Debajo, en el fragment, Pop-ups y Forms
        /*indice= {activeIndex},
        this.state.Index=indice.activeIndex,
        console.log("Indice: ",this.state.Index),
        console.log("URL elegida: ",this.state.url),*/

        <div className="App"> 

          <Tab activeIndex={activeIndex} onChange={this.onChange} tabs={tabs} />  
          
          <Fragment>
		
			      <Modal isOpen={this.state.modalEliminar}>
				      <ModalBody>
              <Translation ns= "global">{(t) => <>{t('eliReg')}</>}</Translation>			        
				      </ModalBody>
				      <ModalFooter>
				        <button className="btn btn-danger" onClick={()=>this.peticionDelete(this.state.url)}>Sí</button>
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
			
			      <Modal size="lg" style={{maxWidth: '800px', width: '60%'}} isOpen={this.state.modalEditar}>
              <ModalHeader style={{display: 'block'}}>
              <span style={{float: 'right'}}>
                <button className="btn btn-danger" onClick={()=>{this.setState({tipoModal: 'verificarEd'}); this.modalVerificarEd()}}>x</button>
              </span>
              <ModalTitle as="h2"><Translation ns= "global">{(t) => <>{t('edReg')}</>}</Translation></ModalTitle>
 
              </ModalHeader>
              <ModalBody>
					        <div className="form-group">
						        <label htmlFor="id"><Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation></label>
						        <input className="form-control" type="text" maxLength = "16" name='codigo' id='codigo' readOnly onChange={this.handleChange} value={this.state.form?this.state.form.codigo: ''}/>
						        <br />
						        <label htmlFor="comentario"><Translation ns= "global">{(t) => <>{t('comentario')}</>}</Translation></label>
						        <input className="form-control" type="text" maxLength = "60" name="comentario" id="comentario" onChange={this.handleChange} value={this.state.form?this.state.form.comentario: ''}/>
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
