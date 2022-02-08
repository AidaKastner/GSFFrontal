import React, { Component, Fragment} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from 'react-bootstrap-table-next';
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
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from "../components/Spinner"; 
import Container from 'react-bootstrap/Container'
import GoogleMapComponent from "../components/GoogleMapComponent";
import EditarTramo from "../components/EditarTramo";


const url = "https://localhost:44301/Tramos/";
const urlTrAntCrec = "https://localhost:44301/Tramos/tramoantcrec/";
const urlTramGemelo = "https://localhost:44301/Tramos/tramogemelo/";
const urlTrPosCrec = "https://localhost:44301/Tramos/tramopostcrec/";
const urlTrAntDeCrec = "https://localhost:44301/Tramos/tramoantdecrec/";
const urlTrPosDeCrec = "https://localhost:44301/Tramos/tramopostdecrec/";

let SentCarril="";

let authToken = sessionStorage.getItem("JWT");

let config = {
  headers: {
      'Authorization': authToken,
      'Accept': 'application/json',
      'content-type': 'application/json'
  }
}

var slice;
var sliceAct;
var msgOut = "No se han encontrado registros.";

var today = new Date();
var dd = String(today. getDate()). padStart(2, '0');
var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
var yyyy = today. getFullYear();

today = yyyy + '-' + mm + '-' + dd;

class VerCarTramDet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTramSel: props.id,
      offset: 0,
      offsetAf: 0,
      tableData: [],
      tableAforos: [],
      tableAct: [],
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
      currentYear: today,
      fechaAltaFor:'',
      content: null,
      setMsgOutBoolKO: false,
      setMsgOutActKO: false,
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
        IdCarreteras:'',
        sentido:''
      } 
  }

  this.columns = [
    {dataField: 'ordenCarrile', text:<Translation ns= "global">{(t) => <>{t('orden')}</>}</Translation>, sort: true},
    {dataField: 'sentidoCarril', text: <Translation ns= "global">{(t) => <>{t('sentido')}</>}</Translation>, sort: true}
   ]

   this.columns2 = [
    {dataField: 'campanya', text:<Translation ns= "global">{(t) => <>{t('campanya')}</>}</Translation>, sort: true},
    {dataField: 'ordenCarril', text:<Translation ns= "global">{(t) => <>{t('orden')}</>}</Translation>, sort: true},
    {dataField: 'sentido', text: <Translation ns= "global">{(t) => <>{t('sentido')}</>}</Translation>, sort: true},
    {dataField: 'imd', text:<Translation ns= "global">{(t) => <>{t('imd')}</>}</Translation>, sort: true},
    {dataField: 'porcPesados', text:<Translation ns= "global">{(t) => <>{t('porc_pesados')}</>}</Translation>, sort: true},
    {dataField: 'modelosEvolCrtCarril.imdPesados', text:<Translation ns= "global">{(t) => <>{t('imdp')}</>}</Translation>, sort: true},
    {dataField: 'idDdCategoriasTrafico', text:<Translation ns= "global">{(t) => <>{t('CatTraf')}</>}</Translation>, sort: true}
  ]
   
  this.columns3 = [
    {dataField: 'actuacione.claveObra', text:<Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation>, sort: true},
    {dataField: 'actuacione.idDdTipoActuaciones', text:<Translation ns= "global">{(t) => <>{t('Tipo')}</>}</Translation>, sort: true},
    {dataField: 'actuacione.fecha', text: <Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation>, sort: true},
    {dataField: 'actuacione.sentido', text:<Translation ns= "global">{(t) => <>{t('Sentido')}</>}</Translation>, sort: true}
  ]
   
  }

// Llamada para cargar desde la API los tramos elegidos en los botones
peticionSet=(urlTram)=>{
  console.log("Tramo escogido: ",urlTram);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };

  axios.get(urlTram, config).then(response=>{
    console.log("TRAMO Data", response.data);
    var data = response.data.carriles;
    slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
    var dataCarriles = [];
    slice.forEach((carrile) => {
      dataCarriles.push({
        ordenCarrile: carrile.ordenCarril,
        sentidoCarril: carrile.sentido
      });
    });
    var dataAct = response.data.actuacionesTramos;
    sliceAct = dataAct.slice(this.state.offset, this.state.offset + this.state.perPage);
    console.log("Data actuaciones", dataAct);

    if (data == null) {
      this.state.setMsgOutBoolKO(true)
    };

    if (dataAct == null) {
      this.state.setMsgOutActKO(true)
    };

    this.setState({
      orgtableData: response.data,
      tableData: dataCarriles,
      tableAforos: slice,
      tableAct: sliceAct,
      content: response,
      estadoTram: this.state.currentYear > response.data.fechaBaja ? 'Inactivo' : 'Activo',
      form: {
        id: response.data.id,
        nombre: response.data.carretera.nombre,
        codigo: response.data.carretera.codigo,
        comentario: response.data.comentario,
        longitud: response.data.longitud,
        fechaAlta: response.data.fechaAlta.substr(0, 10),
        fechaBaja: response.data.fechaBaja,
        idDdTiposCalzada: response.data.idDdTiposCalzada,
        pkIni: response.data.puntoIni.pk,
        mIni: response.data.puntoIni.m,
        descIni: response.data.puntoIni.descripcion,
        pkFin: response.data.puntoFin.pk,
        mFin: response.data.puntoFin.m,
        descFin: response.data.puntoFin.descripcion,
        idDdCodTecReal: response.data.idDdCodTecReal,
        idDdRedesNombre: response.data.ddRede.nombre,
        ddCodTecRealNombre: response.data.ddCodTecRealModel.nombre,
        ddOrganismosNombre: response.data.ddOrganismos.nombre,
        ddRegimenExplotacionNombre: response.data.ddRegimenExplotacion.nombre,
        ddRegimenGestionNombre: response.data.ddRegimenGestion.nombre,
        ddZonasTermicaNombre: response.data.ddZonasTermica.codigo,
        ddZonasPluvNombre: response.data.ddZonasPluviometrica.codigo,
        firmesTramoNombre: response.data.firmesTramo.idCarrilDdTiposFirmesTramo,
        firmesTramoInfl: response.data.firmesTramo.idDdNivelesInfluencia,
        firmesTramoCpa: response.data.firmesTramo.cpa,
        firmesTramoAnchCar: response.data.firmesTramo.anchuraCarril,
        firmesTramoAnchArc: response.data.firmesTramo.anchuraArcen,
        firmesTramoMpd: response.data.firmesTramo.TipoLogModeloEvolMpd,
        firmesTramoCarRod: response.data.firmesTramo.idCarrilDdCapasRodadura,
        firmesTramoCarInter: response.data.firmesTramo.idCarrilDdCapasIntermedia,
        firmesTramoCarBase: response.data.firmesTramo.idCarrilDdCapasBase,
        firmesTramoCarSubBase: response.data.firmesTramo.idCarrilDdCapasSubbase,
        firmesTramoArcRod: response.data.firmesTramo.idArcenDdCapasRodadura,
        firmesTramoArcInt: response.data.firmesTramo.idArcenDdCapasIntermedia,
        firmesTramoArcBas: response.data.firmesTramo.idArcenDdCapasBase,
        firmesTramoArcSub: response.data.firmesTramo.idArcenDdCapasSubbase,
        firmesTramoespRodCar: response.data.firmesTramo.espesorRodaduraCarril,
        firmesTramoespIntdCar: response.data.firmesTramo.espesorIntermediaCarril,
        firmesTramoespBasCar: response.data.firmesTramo.espesorBaseCarril,
        firmesTramoespSubBasCar: response.data.firmesTramo.espesorSubbaseCarril,
        firmesTramoespRodArc: response.data.firmesTramo.espesorRodaduraArcen,
        firmesTramoespIntArc: response.data.firmesTramo.espesorIntermediaArcen,
        firmesTramoespespBasArc: response.data.firmesTramo.espesorBaseArcen,
        firmesTramoespSubBasArc: response.data.firmesTramo.espesorSubbaseArcen,
        explTrTerNat: response.data.explanadasTramo.idDdTerrenosNaturales,
        explTrTerNatCbr: response.data.explanadasTramo.terrenoNaturalCbr,
        explCatExpl: response.data.explanadasTramo.idDdCategoriasExplanadas,
        explRelleno: response.data.explanadasTramo.relleno,
        explRellenoCbr: response.data.explanadasTramo.rellenoCbr,
        explCoronacion: response.data.explanadasTramo.coronacion,
        explCoronacionCbr: response.data.explanadasTramo.coronacionCbr
      }
      
    }); 
    SentCarril=this.state.tableData[0].sentidoCarril;
    console.log("Primer sentido", this.state.tableData[0].sentidoCarril);
  }).catch(error=>{
    console.log("KO");
    console.log("URL ENTRADA para GET Tramo:", urlTram);
    console.log(error); 
  });
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
    console.log("Funcion Handle",this.state.form);
    console.log("Indice: ",this.state.Index);

    }

  // Monta el Form al cargar la página
  componentDidMount(){
    this.peticionGet();
    
  }

  // Cambia el índice de la Tab
  onChange = activeIndex => {
    this.setState({
      activeIndex
    });
  };





/*Obtención de Tramo Seleccionado desde la pantalla anterior de Carreteras Tramos*/
peticionGet=()=>{
  console.log("Tramo escogido: ",this.state.idTramSel);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  
  axios.get(this.state.idTramSel, config).then(response=>{
    console.log("Data", response.data);
    var data = response.data.carriles;
    slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
    var dataCarriles = [];
    slice.forEach((carrile) => {
      dataCarriles.push({
        ordenCarrile: carrile.ordenCarril,
        sentidoCarril: carrile.sentido
      });
    });
    var dataAct = response.data.actuacionesTramos;
    sliceAct = dataAct.slice(this.state.offset, this.state.offset + this.state.perPage);
    console.log("Data actuaciones", dataAct);

    if (data == null) {
      this.state.setMsgOutBoolKO(true)
    };

    if (dataAct == null) {
      this.state.setMsgOutActKO(true)
    };

    this.setState({
      orgtableData: response.data,
      tableData: dataCarriles,
      tableAforos: slice,
      tableAct: sliceAct,
      content: response,
      estadoTram: this.state.currentYear > response.data.fechaBaja ? 'Inactivo' : 'Activo',
      form: {
        id: response.data.id,
        nombre: response.data.carretera.nombre,
        codigo: response.data.carretera.codigo,
        comentario: response.data.comentario,
        longitud: response.data.longitud,
        fechaAlta: response.data.fechaAlta.substr(0, 10),
        fechaBaja: response.data.fechaBaja,
        idDdTiposCalzada: response.data.idDdTiposCalzada,
        pkIni: response.data.puntoIni.pk,
        mIni: response.data.puntoIni.m,
        descIni: response.data.puntoIni.descripcion,
        pkFin: response.data.puntoFin.pk,
        mFin: response.data.puntoFin.m,
        descFin: response.data.puntoFin.descripcion,
        idDdCodTecReal: response.data.idDdCodTecReal,
        idDdRedesNombre: response.data.ddRede.nombre,
        ddCodTecRealNombre: response.data.ddCodTecRealModel.nombre,
        ddOrganismosNombre: response.data.ddOrganismos.nombre,
        ddRegimenExplotacionNombre: response.data.ddRegimenExplotacion.nombre,
        ddRegimenGestionNombre: response.data.ddRegimenGestion.nombre,
        ddZonasTermicaNombre: response.data.ddZonasTermica.codigo,
        ddZonasPluvNombre: response.data.ddZonasPluviometrica.codigo,
        firmesTramoNombre: response.data.firmesTramo.idCarrilDdTiposFirmesTramo,
        firmesTramoInfl: response.data.firmesTramo.idDdNivelesInfluencia,
        firmesTramoCpa: response.data.firmesTramo.cpa,
        firmesTramoAnchCar: response.data.firmesTramo.anchuraCarril,
        firmesTramoAnchArc: response.data.firmesTramo.anchuraArcen,
        firmesTramoMpd: response.data.firmesTramo.TipoLogModeloEvolMpd,
        firmesTramoCarRod: response.data.firmesTramo.idCarrilDdCapasRodadura,
        firmesTramoCarInter: response.data.firmesTramo.idCarrilDdCapasIntermedia,
        firmesTramoCarBase: response.data.firmesTramo.idCarrilDdCapasBase,
        firmesTramoCarSubBase: response.data.firmesTramo.idCarrilDdCapasSubbase,
        firmesTramoArcRod: response.data.firmesTramo.idArcenDdCapasRodadura,
        firmesTramoArcInt: response.data.firmesTramo.idArcenDdCapasIntermedia,
        firmesTramoArcBas: response.data.firmesTramo.idArcenDdCapasBase,
        firmesTramoArcSub: response.data.firmesTramo.idArcenDdCapasSubbase,
        firmesTramoespRodCar: response.data.firmesTramo.espesorRodaduraCarril,
        firmesTramoespIntdCar: response.data.firmesTramo.espesorIntermediaCarril,
        firmesTramoespBasCar: response.data.firmesTramo.espesorBaseCarril,
        firmesTramoespSubBasCar: response.data.firmesTramo.espesorSubbaseCarril,
        firmesTramoespRodArc: response.data.firmesTramo.espesorRodaduraArcen,
        firmesTramoespIntArc: response.data.firmesTramo.espesorIntermediaArcen,
        firmesTramoespespBasArc: response.data.firmesTramo.espesorBaseArcen,
        firmesTramoespSubBasArc: response.data.firmesTramo.espesorSubbaseArcen,
        explTrTerNat: response.data.explanadasTramo.idDdTerrenosNaturales,
        explTrTerNatCbr: response.data.explanadasTramo.terrenoNaturalCbr,
        explCatExpl: response.data.explanadasTramo.idDdCategoriasExplanadas,
        explRelleno: response.data.explanadasTramo.relleno,
        explRellenoCbr: response.data.explanadasTramo.rellenoCbr,
        explCoronacion: response.data.explanadasTramo.coronacion,
        explCoronacionCbr: response.data.explanadasTramo.coronacionCbr
        
      }
    });  
    SentCarril=this.state.tableData[0].sentidoCarril;
    console.log("Primer sentido", this.state.tableData[0].sentidoCarril);
  }).catch(error=>{
    console.log("KO");
    console.log("URL ENTRADA para GET Tramo:", this.state.idTramSel);
    console.log(error); 
  });
}

/*Editar registro*/
modalEditar=()=>{
  this.setState({modalEditar: !this.state.modalEditar});
}


//Selecciona una row
seleccionarTramo=(tramoEdit)=>{
  console.log("Tramo Edición", tramoEdit);
  this.setState({
    tipoModal: 'Seleccionar',
    form: {
      id: tramoEdit.id,
      codigo: tramoEdit.codigo,
      nombre: tramoEdit.nombre,
      comentario: tramoEdit.comentario,
      idGrafo: tramoEdit.idGrafo
    }
  })

  console.log("Id Tramos edición seleccionado: ", tramoEdit.id);

}

//Devolvemos las Tabs con datos
render() {
  const { activeIndex } = this.state;
  const tabs = [{
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
  }, {
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
  }, {
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
  }, {
    label: <Translation ns= "global">{(t) => <>{t('Carriles')}</>}</Translation>,
    content: (
      <Fragment>
        {console.log("SENTIDO",SentCarril)},
        { !this.state.setMsgOutBoolKO
          ? <div style={{marginLeft:'30%'}}>
               { SentCarril === "Decreixent" ? <Translation ns= "global">{(t) => <>{t('SentDecre')}</>}</Translation>
               : <Translation ns= "global">{(t) => <>{t('SentCre')}</>}</Translation>
               }
              {"  "}
              <br /><br />
              <BootstrapTable
                id='tableCarriles'
                bootstrap4 
                wrapperClasses="table-responsive"
                keyField='ordenCarril'
                columns={this.columns} 
                data={this.state.tableData}
                bordered={ false }
                filter={filterFactory()}
                headerWrapperClasses="table-responsive"
                classes="w-auto text-nowrap"
                key={activeIndex}
              >
              </BootstrapTable>
            </div>
          : <div class="alert alert-danger">
              {msgOut}
            </div>
        }
      </Fragment>
    ),
    disabled: false
  }, {
    label: <Translation ns= "global">{(t) => <>{t('Afr')}</>}</Translation>,
    content: (
      <Fragment>
        { !this.state.setMsgOutBoolKO
          ? <div>
              {"  "}
              <br /><br />
              <BootstrapTable
                id='tableAfr'
                bootstrap4 
                wrapperClasses="table-responsive"
                keyField='campanya'
                columns={this.columns2} 
                data={this.state.tableAforos}
                bordered={ false }
                filter={filterFactory()}
                headerWrapperClasses="table-responsive"
                classes="w-auto text-nowrap"
                key={activeIndex}
                >
              </BootstrapTable>
            </div>
          : <div class="alert alert-danger">
              {msgOut}
            </div>
        }
      </Fragment>
    ),
    disabled: false
  }, {
    label: <Translation ns= "global">{(t) => <>{t('Act')}</>}</Translation>,
    content: (
      <Fragment>
        { !this.state.setMsgOutActKO
          ? <div>
              {"  "}
              <br /><br />
              <BootstrapTable
                id='tableAct'
                bootstrap4 
                wrapperClasses="table-responsive"
                keyField='actuacione.claveObra'
                columns={this.columns3} 
                data={this.state.tableAct}
                bordered={ false }
                filter={filterFactory()}
                headerWrapperClasses="table-responsive"
                classes="w-auto text-nowrap"
                key={activeIndex}
                >
              </BootstrapTable>
            </div>
          : <div class="alert alert-danger">
              {msgOut}
            </div>
        }
      </Fragment>
    ),
    disabled: false
  }];
        
  if (!this.state.content) 
    return (
      <div className="u-full-width" style={{marginLeft:'50%'}}>
        <Spinner /> 
      </div>
    );

    return (
      // Retornamos el formulario
      <div className="app" style={{ backgroundColor: '#FFFFFF', color: '#252831', textDecoration: 'none', height: '1200px', listStyle: 'none', padding: '20px', alignItems: 'center', justifyContent: 'space-between', fontSize: '18px'}} > 
        <form>
          <Container>
            <Row>
              <div className="container" style={{maxWidth: '950px', width: '100%', float:'center'}}>
                <div style={{'text-align': 'center'}}>
                  <button className="btn btn-primary" style={{width: '300px'}} onClick={(e)=>{
                      e.preventDefault();
                      this.peticionSet(urlTrAntCrec + this.state.form.id);
                    }}>{<Translation ns= "global">{(t) => <>{t('TramAntCrec')}</>}</Translation>}</button>
                    <span class="input-group-addon"> </span>
                  <button className="btn btn-primary" style={{width: '300px'}} onClick={(e)=>{
                      e.preventDefault();
                      this.peticionSet(urlTramGemelo + (this.state.form.id));
                    }}>{<Translation ns= "global">{(t) => <>{t('TramSentCont')}</>}</Translation>}</button>
                    <span class="input-group-addon"> </span>
                  <button className="btn btn-primary" style={{width: '300px'}} onClick={(e)=>{
                      e.preventDefault();
                      this.peticionSet(urlTrPosCrec + (this.state.form.id));
                    }}>{<Translation ns= "global">{(t) => <>{t('TramPosCrec')}</>}</Translation>}</button>
                </div>
                <div style={{'text-align': 'center'}}>
                  <button className="btn btn-primary" style={{width: '300px'}} onClick={(e)=>{
                      e.preventDefault();
                      this.peticionSet(urlTrAntDeCrec + (this.state.form.id));
                    }}>{<Translation ns= "global">{(t) => <>{t('TramAntDeCrec')}</>}</Translation>}</button>
                    <span class="input-group-addon"> </span>
                  <button className="btn btn-primary" style={{width: '300px'}} onClick={(e) => {this.seleccionarTramo(this.state.form); this.setState({modalEditar: true});
                      e.preventDefault();
                    }}>{<Translation ns= "global">{(t) => <>{t('Editar')}</>}</Translation>}</button>
                    <span class="input-group-addon"> </span>
                  <button className="btn btn-primary" style={{width: '300px'}} onClick={(e)=> {
                      e.preventDefault();
                      this.peticionSet(urlTrPosDeCrec + (this.state.form.id));
                    }}>{<Translation ns= "global">{(t) => <>{t('TramPosDeCrec')}</>}</Translation>}</button>
                </div>
              </div>
              <br />
            </Row>
          </Container>
          <br />
          <Container>
          <div style={{backgroundColor: '#FFFFFF'}} > 
            <Row>         
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation></label>
                  <input
                    type="text"
                    name="carretera"
                    className="col m3 s12"
                    placeholder= {this.state.form.nombre}
                    //onChange={actualizarState}
                    value={this.state.form.nombre}
                  />
              </Col>               
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('FechAlt')}</>}</Translation></label>
                  <input
                    type="text"
                    name="fechaalta"
                    className="u-full-width"                  
                    //onChange={actualizarState}
                    value={this.state.form.fechaAlta}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation></label>
                  <input
                    type="text"
                    name="pkIni"
                    className="u-full-width"
                    placeholder={this.state.form.pkIni}
                    //onChange={actualizarState}
                    value={this.state.form.pkIni}
                  />     
              </Col>               
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation></label>
                  <input
                    type="text"
                    name="pkFin"
                    className="u-full-width"
                    placeholder={this.state.form.pkFin}
                    //onChange={actualizarState}
                    value={this.state.form.pkFin}
                  />     
              </Col>
            </Row>
            <Row>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('codigo')}</>}</Translation></label>
                  <input
                    type="text"
                    name="codigo"
                    className="u-full-width"
                    placeholder= {this.state.orgtableData.codigo}
                    //onChange={actualizarState}
                    value={this.state.form.codigo}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('FechBaj')}</>}</Translation></label>
                  <input
                    type="text"
                    name="fechabaja"
                    className="u-full-width"
                    placeholder={this.state.estadoTram}
                    //onChange={actualizarState}
                    value={this.state.estadoTram}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('MIni')}</>}</Translation></label>
                  <input
                    type="text"
                    name="mIni"
                    className="u-full-width"
                    placeholder={this.state.form.mIni}
                    //onChange={actualizarState}
                    value={this.state.form.mIni}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('MFin')}</>}</Translation></label>
                  <input
                    type="text"
                    name="mFin"
                    className="u-full-width"
                    placeholder={this.state.form.mFin}
                    //onChange={actualizarState}
                    value={this.state.form.mFin}
                  />
              </Col>
            </Row>
            <Row>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('coment')}</>}</Translation></label>
                  <input
                    type="text"
                    name="comentario"
                    className="u-full-width"
                    placeholder= {this.state.form.comentario}
                    //onChange={actualizarState}
                    value={this.state.form.comentario}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('TipCalz')}</>}</Translation></label>
                  <input
                    type="text"
                    name="idDdTiposCalzada"
                    className="u-full-width"
                    placeholder={this.state.form.idDdTiposCalzada}
                    //onChange={actualizarState}
                    value={this.state.form.idDdTiposCalzada}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('DescIni')}</>}</Translation></label>
                  <input
                    type="text"
                    name="descIni"
                    className="u-full-width"
                    placeholder={this.state.form.descIni}
                    //onChange={actualizarState}
                    value={this.state.form.descIni}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('DescFin')}</>}</Translation></label>
                  <input
                    type="text"
                    name="descFin"
                    className="u-full-width"
                    placeholder={this.state.form.descFin}
                    //onChange={actualizarState}
                    value={this.state.form.descFin}
                  />
              </Col>
            </Row>
            <Row>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('long')}</>}</Translation></label>
                  <input
                    type="text"
                    name="longitud"
                    className="u-full-width"
                    placeholder={this.state.form.longitud}
                    //onChange={actualizarState}
                    value={this.state.form.longitud}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('PosIni')}</>}</Translation></label>
                  <input
                    type="text"
                    name="PosIni"
                    className="u-full-width"
                    readOnly = {true}
                    //placeholder={this.state.form.descFin}
                    //onChange={actualizarState}
                    //value={this.state.form.descFin}
                  />
              </Col>
              <Col xs={3} style={{textAlign: "left"}}>
                <label><Translation ns= "global">{(t) => <>{t('PosFin')}</>}</Translation></label>
                  <input
                    type="text"
                    name="PosFin"
                    className="u-full-width"
                    readOnly = {true}
                    //placeholder={this.state.form.descFin}
                    //onChange={actualizarState}
                    //value={this.state.form.descFin}
                  />
              </Col>
            </Row>
          </div>
          </Container>
          <Container>
            <Row>
              <Col xs={7}>
                <div className="container">
                  <Tab activeIndex={activeIndex} onChange={this.onChange} tabs={tabs} />
                </div>
              </Col>
              <Col xs={6}>
                <div className="container">
                
                </div>
              </Col>
            </Row>
          </Container>
        </form>
        <Modal size="lg" style={{maxWidth: '1700px', width: '100%', backgroundColor: '#FFFFFF'}}  isOpen={this.state.modalEditar}>
          <ModalHeader style={{display: 'block', backgroundColor: '#FFFFFF'}}>
            <h1><Translation ns= "global">{(t) => <>{t('EditTramo')}</>}</Translation></h1>  
          </ModalHeader>
          <ModalBody style={{backgroundColor: '#FFFFFF'}}>
            <div style={{marginRight:'1%', marginTop: '1%', backgroundColor: '#FFFFFF'}}>                                  
              <EditarTramo 
                id = {url + (this.state.form.id)}
              />
            </div>    
          </ModalBody>
          <ModalFooter>
            <span style={{float: 'right', backgroundColor: '#FFFFFF'}}>
              <button className="btn btn-success btn-sm" onClick={()=>this.peticionPut(this.state.url)}><Translation ns= "global">{(t) => <>{t('Aceptar')}</>}</Translation></button>
               {"  "}
              <button className="btn btn-danger btn-sm" onClick={()=>{this.modalEditar()}}><Translation ns= "global">{(t) => <>{t('Salir')}</>}</Translation></button>
            </span>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}


export default VerCarTramDet;
