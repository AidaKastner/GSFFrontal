import React, { Component, useState , Fragment} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../css/Pagination.css';
import '../css/Menu.css';
import { Translation, useTranslation, Trans } from 'react-i18next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Tab from "./Tab";
import Spinner from "../components/Spinner"; 
import GoogleMapComponent from "../components/GoogleMapComponent";


const url = "https://localhost:44301/Tramos/";

const config = {
  headers: {
      'content-type': 'application/json'
  }
}


class VerCarTramDet extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      idTramSel: props.id,
      offset: 0,
      offsetAf: 0,
      tableData: [],
      tableAforos: [],
      aditionalData: [],
      orgtableData: [],
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
      currentYear: new Date(),
      fechaAltaFor:'',
      content: null,
      form:{
        id:'',
        codigo:'',
        nombre:'',
        comentario:'',
        longitud:'',
        pkIni:'',
        mIni:'',
        descIni:'',
        pkFin:'',
        mFin:'',
        descFin:'',
        estadoTram:'',
        idDdCodTecReal:'',
        idDdRedes:'',
        idDdRedesNombre:'',
        ddCodTecRealNombre:'',
        ddOrganismosNombre:'',
        ddRegimenExplotacionNombre:'',
        ddRegimenGestionNombre:'',
        ddZonasTermicaNombre:'',
        ddZonasPluvNombre:'',
        firmesTramoNombre:'',
        firmesTramoInfl:'',
        firmesTramoCpa:'',
        firmesTramoAnchCar:'',
        firmesTramoAnchArc:'',
        firmesTramoMpd:'',
        firmesTramoCarRod:'',
        firmesTramoCarInter:'',
        firmesTramoCarBase:'',
        firmesTramoCarSubBase:'',
        firmesTramoespRodCar:'',
        firmesTramoespIntdCar:'',
        firmesTramoespSubBasCar:'',
        firmesTramoespIntArc:'',
        firmesTramoespespBasArc:'',
        firmesTramoespBasArc:'',
        firmesTramoArcRod:'', 
        firmesTramoArcInt:'',
        firmesTramoArcBas:'',
        firmesTramoArcSub:'',
        firmesTramoespSubBasArc:'',
        explTrTerNat:'',
        explTrTerNatCbr:'',
        explCatExpl:'',
        relleno:'',
        rellenoCbr:'', 
        coronacion:'', 
        coronacionCbr:'', 
        carSent:'',
        carrOrd:'',
        idGrafo:'',
        IdCarreteras:''
      } 
  }

  this.columns = [
    {dataField: 'ordenCarril', text:<Translation ns= "global">{(t) => <>{t('orden')}</>}</Translation>, sort: true},
    {dataField: 'sentido', text: <Translation ns= "global">{(t) => <>{t('sentido')}</>}</Translation>, sort: true}
   ]

   this.columns2 = [
    {dataField: 'campanya', text:<Translation ns= "global">{(t) => <>{t('campanya')}</>}</Translation>, sort: true},
    {dataField: 'ordenCarril', text:<Translation ns= "global">{(t) => <>{t('orden')}</>}</Translation>, sort: true}
   
   ]

  }



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

  
  componentDidMount(){
    this.peticionGet();
    
  }

  // Cambia el índice de la Tab
  onChange = activeIndex => {
    this.setState({
      activeIndex
    });
  };





/*Obtención datos Clasificación técnica real*/
peticionGet=()=>{
  console.log("Tramo escogido: ",this.state.idTramSel);
  
  axios.get(url+this.state.idTramSel).then(response=>{
      console.log("AQUI, Data", response.data);
      console.log("AQUI, TramosAforos", response.data.tramosAforos);
      console.log("AQUI, TramosAforos", response.data.tramosAforos.idAforosNavigation.anyomedida);

      var data = response.data.carriles;
      var dataAforos = response.data.tramosAforos.idAforosNavigation;
      var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      //var sliceAf = dataAforos.slice(this.state.offsetAf, this.state.offsetAf + this.state.perPage)

      this.setState({
        orgtableData: response.data,
        tableData: slice,
        tableAforos: response.data.tramosAforos,
        content: response
      })
     
      this.state.form.nombre=this.state.orgtableData.carretera.nombre;
      this.state.form.codigo=this.state.orgtableData.carretera.codigo;
      this.state.form.comentario=this.state.orgtableData.comentario;
      this.state.form.longitud=this.state.orgtableData.longitud;
      this.state.form.fechaAlta=this.state.orgtableData.fechaAlta.substr(0, 10);
      //this.state.fechaAltaFor = this.state.form.fechaAlta.getFullYear() + '-' + this.state.form.fechaAlta.getMonth() + '-' + this.state.form.fechaAlta.getDate()
      this.state.form.fechaBaja=this.state.orgtableData.fechaBaja;
      this.state.estadoTram=this.state.currentYear > this.state.form.fechaBaja ? 'Inactivo' : 'Activo';
      this.state.form.idDdTiposCalzada=this.state.orgtableData.idDdTiposCalzada;
      this.state.form.pkIni=this.state.orgtableData.puntoIni.pk;
      this.state.form.mIni=this.state.orgtableData.puntoIni.m;
      this.state.form.descIni=this.state.orgtableData.puntoIni.descripcion;
      this.state.form.pkFin=this.state.orgtableData.puntoFin.pk;
      this.state.form.mFin=this.state.orgtableData.puntoFin.m;
      this.state.form.descFin=this.state.orgtableData.puntoFin.descripcion;
      this.state.form.idDdCodTecReal=this.state.orgtableData.idDdCodTecReal;
      this.state.form.idDdRedesNombre=this.state.orgtableData.ddRede.nombre;
      this.state.form.ddCodTecRealNombre=this.state.orgtableData.ddCodTecRealModel.nombre;
      this.state.form.ddOrganismosNombre=this.state.orgtableData.ddOrganismos.nombre;
      this.state.form.ddRegimenExplotacionNombre=this.state.orgtableData.ddRegimenExplotacion.nombre;
      this.state.form.ddRegimenGestionNombre=this.state.orgtableData.ddRegimenGestion.nombre;
      this.state.form.ddZonasTermicaNombre=this.state.orgtableData.ddZonasTermica.codigo;
      this.state.form.ddZonasPluvNombre=this.state.orgtableData.ddZonasPluviometrica.codigo;
      this.state.form.firmesTramoNombre=this.state.orgtableData.firmesTramo.idCarrilDdTiposFirmesTramo;
      this.state.form.firmesTramoInfl=this.state.orgtableData.firmesTramo.idDdNivelesInfluencia;
      this.state.form.firmesTramoCpa=this.state.orgtableData.firmesTramo.cpa;
      this.state.form.firmesTramoAnchCar=this.state.orgtableData.firmesTramo.anchuraCarril;
      this.state.form.firmesTramoAnchArc=this.state.orgtableData.firmesTramo.anchuraArcen;
      this.state.form.firmesTramoMpd=this.state.orgtableData.firmesTramo.TipoLogModeloEvolMpd;
      
      this.state.form.firmesTramoCarRod=this.state.orgtableData.firmesTramo.idCarrilDdCapasRodadura;
      this.state.form.firmesTramoCarInter=this.state.orgtableData.firmesTramo.idCarrilDdCapasIntermedia;
      this.state.form.firmesTramoCarBase=this.state.orgtableData.firmesTramo.idCarrilDdCapasBase;
      this.state.form.firmesTramoCarSubBase=this.state.orgtableData.firmesTramo.idCarrilDdCapasSubbase;
      
      this.state.form.firmesTramoArcRod=this.state.orgtableData.firmesTramo.idArcenDdCapasRodadura; 
      this.state.form.firmesTramoArcInt=this.state.orgtableData.firmesTramo.idArcenDdCapasIntermedia; 
      this.state.form.firmesTramoArcBas=this.state.orgtableData.firmesTramo.idArcenDdCapasBase; 
      this.state.form.firmesTramoArcSub=this.state.orgtableData.firmesTramo.idArcenDdCapasSubbase;

      this.state.form.firmesTramoespRodCar=this.state.orgtableData.firmesTramo.espesorRodaduraCarril;
      this.state.form.firmesTramoespIntdCar=this.state.orgtableData.firmesTramo.espesorIntermediaCarril;
      this.state.form.firmesTramoespBasCar=this.state.orgtableData.firmesTramo.espesorBaseCarril;
      this.state.form.firmesTramoespSubBasCar=this.state.orgtableData.firmesTramo.espesorSubbaseCarril;
      
      this.state.form.firmesTramoespRodArc=this.state.orgtableData.firmesTramo.espesorRodaduraArcen;
      this.state.form.firmesTramoespIntArc=this.state.orgtableData.firmesTramo.espesorIntermediaArcen;
      this.state.form.firmesTramoespespBasArc=this.state.orgtableData.firmesTramo.espesorBaseArcen;
      this.state.form.firmesTramoespSubBasArc=this.state.orgtableData.firmesTramo.espesorSubbaseArcen;
     
      this.state.form.explTrTerNat=this.state.orgtableData.explanadasTramo.idDdTerrenosNaturales;
      this.state.form.explTrTerNatCbr=this.state.orgtableData.explanadasTramo.terrenoNaturalCbr;
      
      this.state.form.explCatExpl=this.state.orgtableData.explanadasTramo.idDdCategoriasExplanadas;
      this.state.form.explRelleno=this.state.orgtableData.explanadasTramo.relleno;
      this.state.form.explRellenoCbr=this.state.orgtableData.explanadasTramo.rellenoCbr;
      this.state.form.explCoronacion=this.state.orgtableData.explanadasTramo.coronacion;
      this.state.form.explCoronacionCbr=this.state.orgtableData.explanadasTramo.coronacionCbr;
      
    }).catch(error=>{
      console.log("KO");
      console.log("URL para GET Tramo:", url+this.state.idTramSel);
      console.log(error); 
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

/*Editar registro*/
modalEditar=()=>{
  this.setState({modalEditar: !this.state.modalEditar});
}



/*Editar registro*/
peticionPut=()=>{
  const data = new FormData();

  console.log("Codigo a editar: ", this.state.form.id);
  console.log("URL escogida: ", url);

  axios.put(url,this.state.form,config).then(response=>{
    console.log("OK PUT");
    this.setState({modalEditar: false});
    this.peticionGet();
    this.setState({modalVerificarEd: false});
  }).catch(error=>{
    this.setState({modalVerificarEd: false});
    console.log("KO");
    console.log("URL para PUT:", url);
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
  console.log("URL Delete: ", url);
  axios.delete(url+"/"+this.state.form.id).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminar: false});
    this.peticionGet();
  }).catch(error=>{
    console.log("KO Delete");
    console.log(url);
    console.log(this.state.form.id);
    console.log(error);    
    alert("Error mientras se eliminaban datos. Pongase en contacto con elservicio técnico");    
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
    render(){
        
        const { activeIndex } = this.state;
            const tabs = [
      {
        label: <Translation ns= "global">{(t) => <>{t('Clasif')}</>}</Translation>,
        
        content: (
          <div>
             
              {"  "}
              <br /><br />
              
            
            <label><Translation ns= "global">{(t) => <>{t('ClasFunRedes')}</>}</Translation></label>
                <input
                    type="text"
                    name="ClasFunRedes"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.idDdRedesNombre}
                />

              <label><Translation ns= "global">{(t) => <>{t('ClasTecReal')}</>}</Translation></label>
                <input
                    type="text"
                    name="ClasTecReal"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.ddCodTecRealNombre}
                />
               <label><Translation ns= "global">{(t) => <>{t('OrgCons')}</>}</Translation></label>
                <input
                    type="text"
                    name="OrgCons"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.ddOrganismosNombre}
                />
               <label><Translation ns= "global">{(t) => <>{t('OrgCom')}</>}</Translation></label>
                <input
                    type="text"
                    name="OrgCom"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.ddRegimenExplotacionNombre}
                />
               <label><Translation ns= "global">{(t) => <>{t('RegGest')}</>}</Translation></label>
                <input
                    type="text"
                    name="RegGest"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.ddRegimenGestionNombre}
                />
               <label><Translation ns= "global">{(t) => <>{t('RegExpl')}</>}</Translation></label>
                <input
                    type="text"
                    name="RegExpl"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.ddRegimenExplotacionNombre}
                />

              <label><Translation ns= "global">{(t) => <>{t('zonTer')}</>}</Translation></label>
                <input
                    type="text"
                    name="zonTer"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.ddZonasTermicaNombre}
                />
            <label><Translation ns= "global">{(t) => <>{t('zonTer')}</>}</Translation></label>
                <input
                    type="text"
                    name="zonTer"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.ddZonasPluvNombre}
                />

          </div>
        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('Firme')}</>}</Translation>,
        content: (

          <div>
             {"  "}
            <br /><br />
            <label><Translation ns= "global">{(t) => <>{t('TipFirTram')}</>}</Translation></label>
                <input
                    type="text"
                    name="TipFirTram"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.firmesTramoNombre}
                />
            <label><Translation ns= "global">{(t) => <>{t('NilInf')}</>}</Translation></label>
                <input
                    type="text"
                    name="NilInf"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.firmesTramoInfl}
                />

            <label><Translation ns= "global">{(t) => <>{t('CPA')}</>}</Translation></label>
                <input
                    type="text"
                    name="CPA"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.firmesTramoCpa}
                />
            <label><Translation ns= "global">{(t) => <>{t('AnchCar')}</>}</Translation></label>
                <input
                    type="text"
                    name="AnchCar"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.firmesTramoAnchCar}
                />
            <label><Translation ns= "global">{(t) => <>{t('AnchArc')}</>}</Translation></label>
                <input
                    type="text"
                    name="AnchArc"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.firmesTramoAnchArc}
                />
            <label><Translation ns= "global">{(t) => <>{t('MPD')}</>}</Translation></label>
                <input
                    type="text"
                    name="MPD"
                    className="u-full-width"
                    //onChange={actualizarState}
                    value={this.state.form.firmesTramoMpd}
                />
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'> </th>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('Carril')}</>}</Translation></th>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('Espesor')}</>}</Translation></th>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('arcen')}</>}</Translation></th>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('Espesor')}</>}</Translation></th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <th scope='row'><Translation ns= "global">{(t) => <>{t('CapaRod')}</>}</Translation></th>
          <td>{this.state.form.firmesTramoCarRod}</td>
          <td>{this.state.form.firmesTramoespRodCar}</td>
          <td>{this.state.form.firmesTramoArcRod}</td>
          <td>{this.state.form.firmesTramoespRodArc}</td>
        </tr>
        <tr>
          <th scope='row'><Translation ns= "global">{(t) => <>{t('CapaInter')}</>}</Translation></th>
          <td>{this.state.form.firmesTramoCarInter}</td>
          <td>{this.state.form.firmesTramoespIntdCar}</td>
          <td>{this.state.form.firmesTramoArcInt}</td> 
          <td>{this.state.form.firmesTramoespIntArc}</td>
        </tr>
        <tr>
          <th scope='row'><Translation ns= "global">{(t) => <>{t('CapaBase')}</>}</Translation></th>
          <td>{this.state.form.firmesTramoCarBase}</td>
          <td>{this.state.form.firmesTramoespBasCar}</td>
          <td>{this.state.form.firmesTramoArcBas}</td> 
          <td>{this.state.form.firmesTramoespespBasArc}</td>
        </tr>
        <tr>
          <th scope='row'><Translation ns= "global">{(t) => <>{t('CapaSubb')}</>}</Translation></th>
          <td>{this.state.form.firmesTramoCarSubBase}</td>
          <td>{this.state.form.firmesTramoespSubBasCar}</td>
          <td>{this.state.form.firmesTramoArcSub}</td>
          <td>{this.state.form.firmesTramoespSubBasArc}</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
          </div>
          
        ),
        disabled: false
      },
 
      {
        label: <Translation ns= "global">{(t) => <>{t('Expl')}</>}</Translation>,
        content: (
          <div>
             {"  "}
            <br /><br />
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('terrnat')}</>}</Translation></th>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('cbr')}</>}</Translation></th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>        
          <td>{this.state.form.explTrTerNat}</td>
          <td>{this.state.form.explTrTerNatCbr}</td>
        </tr>
        {"  "}
            <br /><br />
        <label><Translation ns= "global">{(t) => <>{t('CategExpl')}</>}</Translation></label>
                <input
                    type="text"
                    name="MPD"
                    style={{maxWidth: '200px', width: '100%', float:'right'}}
                    //onChange={actualizarState}
                    value={this.state.form.explCatExpl}
                />
        {"  "}
        <br /><br />
      <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'> </th>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('cm')}</>}</Translation></th>
          <th scope='col'><Translation ns= "global">{(t) => <>{t('cbr')}</>}</Translation></th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <th scope='row'><Translation ns= "global">{(t) => <>{t('relleno')}</>}</Translation></th>
          <td>{this.state.form.explRelleno}</td>
          <td>{this.state.form.explRellenoCbr}</td>

        </tr>
        <tr>
          <th scope='row'><Translation ns= "global">{(t) => <>{t('coronacion')}</>}</Translation></th>
          <td>{this.state.form.explCoronacion}</td>
          <td>{this.state.form.explCoronacionCbr}</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
         
      </MDBTableBody>
    </MDBTable>

          </div>
        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('Carriles')}</>}</Translation>,
        content: (
          <div style={{marginLeft:'30%'}}>
            {"  "}
          <br /><br />
          <BootstrapTable 
            bootstrap4 
            wrapperClasses="table-responsive"
            keyField='id' 
            columns={this.columns} 
            data={this.state.orgtableData.carriles}
            bordered={ false }
            filter={filterFactory()}
            headerWrapperClasses="table-responsive"
            classes="w-auto text-nowrap"
          >
        </BootstrapTable>
          </div>
        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('Afr')}</>}</Translation>,
        content: (
          <div>
             {"  "}
            <br /><br />
            <BootstrapTable 
            bootstrap4 
            wrapperClasses="table-responsive"
            keyField='id' 
            columns={this.columns2} 
            data={this.state.orgtableData}
            bordered={ false }
            filter={filterFactory()}
            headerWrapperClasses="table-responsive"
            classes="w-auto text-nowrap"
          >
          </BootstrapTable>
          </div>
        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('Act')}</>}</Translation>,
        content: (
          <div>
             {"  "}
            <br /><br />
            
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
       
        <div className="app" style={{ backgroundColor: '#e1e9fc', color: '#252831', textDecoration: 'none', height: '1200px', listStyle: 'none', padding: '20px', alignItems: 'center', justifyContent: 'space-between', fontSize: '18px'}} > 
          <form>
          <div className="container" style={{maxWidth: '800px', width: '100%', float:'center'}}>
            <div>
                <button type="submit" width="300px" className="btn btn-primary" >{<Translation ns= "global">{(t) => <>{t('TramAntCrec')}</>}</Translation>}</button>
                <span class="input-group-addon"> </span>                
                <button type="submit" width="300px" className="btn btn-primary" >{<Translation ns= "global">{(t) => <>{t('TramSentCont')}</>}</Translation>}</button>
                <span class="input-group-addon"> </span>
                <button type="submit" width="300px" className="btn btn-primary" >{<Translation ns= "global">{(t) => <>{t('TramPosCrec')}</>}</Translation>}</button>
            </div>
            <div>
                <button type="submit" width="300px" className="btn btn-primary" >{<Translation ns= "global">{(t) => <>{t('TramAntDeCrec')}</>}</Translation>}</button>
                <span class="input-group-addon"> </span>
                <button type="submit" width="300px" className="btn btn-primary" >{<Translation ns= "global">{(t) => <>{t('Editar')}</>}</Translation>}</button>
                <span class="input-group-addon"> </span>
                <button type="submit" width="300px" className="btn btn-primary" >{<Translation ns= "global">{(t) => <>{t('TramPosDeCrec')}</>}</Translation>}</button>
            </div>
          </div>

          <div className="container" style={{maxWidth: '700px', width: '200%', float:'left', backgroundColor: '#e1e9fc'}} >
          <div>
            <label><Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation></label>
                <input
                    type="text"
                    name="carretera"
                    className="col m3 s12"
                    placeholder= {this.state.form.nombre}
                    //onChange={actualizarState}
                    value={this.state.form.nombre}
                />

              <label><Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation></label>
                <input
                    type="text"
                    name="codigo"
                    className="u-full-width"
                    placeholder= {this.state.orgtableData.codigo}
                    //onChange={actualizarState}
                    value={this.state.form.codigo}
                />
               <label><Translation ns= "global">{(t) => <>{t('coment')}</>}</Translation></label>
                <input
                    type="text"
                    name="comentario"
                    className="u-full-width"
                    placeholder= {this.state.form.comentario}
                    //onChange={actualizarState}
                    value={this.state.form.comentario}
                />
               <label><Translation ns= "global">{(t) => <>{t('long')}</>}</Translation></label>
                <input
                    type="text"
                    name="longitud"
                    className="u-full-width"
                    placeholder={this.state.form.longitud}
                    //onChange={actualizarState}
                    value={this.state.form.longitud}
                />
               <label><Translation ns= "global">{(t) => <>{t('FechAlt')}</>}</Translation></label>
                <input
                    type="text"
                    name="fechaalta"
                    className="u-full-width"                  
                    //onChange={actualizarState}
                    value={this.state.form.fechaAlta}
                />
               <label><Translation ns= "global">{(t) => <>{t('FechBaj')}</>}</Translation></label>
                <input
                    type="text"
                    name="fechabaja"
                    className="u-full-width"
                    placeholder={this.state.estadoTram}
                    //onChange={actualizarState}
                    value={this.state.estadoTram}
                />

              <label><Translation ns= "global">{(t) => <>{t('TipCalz')}</>}</Translation></label>
                <input
                    type="text"
                    name="idDdTiposCalzada"
                    className="u-full-width"
                    placeholder={this.state.form.idDdTiposCalzada}
                    //onChange={actualizarState}
                    value={this.state.form.idDdTiposCalzada}
                />
                </div>
                <div className="container">
                  <Tab activeIndex={activeIndex} onChange={this.onChange} tabs={tabs} />
                </div>
            </div>
            <div className="container" style={{maxWidth: '400px', width: '100%', float:'left'}}>
            <label><Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation></label>
                <input
                    type="text"
                    name="pkIni"
                    className="u-full-width"
                    placeholder={this.state.form.pkIni}
                    //onChange={actualizarState}
                    value={this.state.form.pkIni}
                />     
                <label><Translation ns= "global">{(t) => <>{t('MIni')}</>}</Translation></label>
                <input
                    type="text"
                    name="mIni"
                    className="u-full-width"
                    placeholder={this.state.form.mIni}
                    //onChange={actualizarState}
                    value={this.state.form.mIni}
                />
                <label><Translation ns= "global">{(t) => <>{t('DescIni')}</>}</Translation></label>
                <input
                    type="text"
                    name="descIni"
                    className="u-full-width"
                    placeholder={this.state.form.descIni}
                    //onChange={actualizarState}
                    value={this.state.form.descIni}
                />
                <label><Translation ns= "global">{(t) => <>{t('PosIni')}</>}</Translation></label>
            </div>

            <div className="container" style={{maxWidth: '400px', width: '100%', float:'left'}}>
            <label><Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation></label>
                <input
                    type="text"
                    name="pkFin"
                    className="u-full-width"
                    placeholder={this.state.form.pkFin}
                    //onChange={actualizarState}
                    value={this.state.form.pkFin}
                />     
                <label><Translation ns= "global">{(t) => <>{t('MFin')}</>}</Translation></label>
                <input
                    type="text"
                    name="mFin"
                    className="u-full-width"
                    placeholder={this.state.form.mFin}
                    //onChange={actualizarState}
                    value={this.state.form.mFin}
                />
                <label><Translation ns= "global">{(t) => <>{t('DescFin')}</>}</Translation></label>
                <input
                    type="text"
                    name="descFin"
                    className="u-full-width"
                    placeholder={this.state.form.descFin}
                    //onChange={actualizarState}
                    value={this.state.form.descFin}
                />
                <label><Translation ns= "global">{(t) => <>{t('PosFin')}</>}</Translation></label>
            </div>
              <div>
                
              </div>
            </form>
            </div>
         
      )
    }
}


export default VerCarTramDet;
