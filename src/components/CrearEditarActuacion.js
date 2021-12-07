import React, {useState, useEffect, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios  from 'axios';
import { Translation } from 'react-i18next';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from 'react-select'
import { View, Text } from "react-native";
import '../css/Menu.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import Tab from "../components/Tab";
import { Form } from 'reactstrap';

function CrearEditarActuacion({Actuacion, Data}){
    console.log("Actuacion: ", Actuacion);
    console.log("DATA: ", Data);

    

    const url = "https://localhost:44301/api/InsertarActuaciones/";

    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }

    //Campos Actuación
    const [FormActuacion, actualizarFormActuacion] = useState({
        Id: Actuacion? Actuacion.id: '',
        //Campos iniciales
        TipoActuacion: Actuacion? Actuacion.idDdTipoActuaciones: '', Carretera: Actuacion?Actuacion.idCarreteras: '', 
        PkIni: Actuacion?Actuacion.puntoIni.pk: '', PkFin: Actuacion?Actuacion.puntoFin.pk: '', MIni: Actuacion?Actuacion.puntoIni.m: '', MFin: Actuacion?Actuacion.puntoFin.m: '',
        //Campos Actuación
        ClaveObra: Actuacion? Actuacion.claveObra: '', Importe: Actuacion? Actuacion.importe: '', Fecha: Actuacion? Actuacion.fecha: '', Creciente: Actuacion?Actuacion.sentido?.includes("C")?true: false:true, Decreciente: Actuacion?Actuacion.sentido?.includes("D")?true: false:true, Observaciones: Actuacion?Actuacion.observaciones: '',
        TipoCalz: '', Carril1: Actuacion?Actuacion.carriles?.substring(0,1): '', Carril2: Actuacion?Actuacion.carriles?.substring(2,3): '', CarreteraAnt: Actuacion?Actuacion.carreteraAntigua: '', Calzada: Actuacion?Actuacion.calzada: '', Gestion: Actuacion?Actuacion.gestion: '', Utilizada: Actuacion?Actuacion.utilizada: '', Longitud: Actuacion?Actuacion.longitud: '',
        //Pestaña Firmes
        TipoFirmeTramo: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idCarrilDdTiposFirmesTramo: '', NivelesInfluencia: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idDdNivelesInfluencia: '', CPA: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.cpa: '', 
        AnchCarril: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.anchuraCarril: '', AnchArcen: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.anchuraArcen: '', Fresado: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.fresado: '',
        CapaRodaduraCarril: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idCarrilDdCapasRodadura: '', CapaRodaduraEspCarr: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorRodaduraCarril: '', 
        CapaRodaduraArcen: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idArcenDdCapasRodadura: '', CapaRodaduraEspArc: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorRodaduraArcen: '', 
        CapaIntermediaCarril: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idCarrilDdCapasIntermedia: '', CapaIntermediaEspCarr: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorIntermediaCarril: '', 
        CapaIntermediaArcen: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idArcenDdCapasIntermedia: '', CapaIntermediaEspArc: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorIntermediaArcen: '', 
        CapaBaseCarril: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idCarrilDdCapasBase: '', CapaBaseEspCarr: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorBaseCarril: '', 
        CapaBaseArcen: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idArcenDdCapasBase: '', CapaBaseEspArc: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorBaseArcen: '',
        CapaSubbaseCarril: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idCarrilDdCapasSubbase: '', CapaSubbaseEspCarr: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorSubbaseCarril: '', 
        CapaSubbaseArcen: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.idCarrilDdArcenSubbase: '', CapaSubbaseEspArc: Actuacion?.actuacionesFirme?Actuacion.actuacionesFirme.espesorSubbaseArcen: '',
        //Pestaña Explanadas
        TerrenoNatural: Actuacion?.actuacionesExplanada?Actuacion.actuacionesExplanada.idDdTerrenosNaturales: '', CategoriaExplanada: Actuacion?.actuacionesExplanada?Actuacion.actuacionesExplanada?.idDdCategoriasExplanadas: '', 
        TerrenoNatCBR: Actuacion?.actuacionesExplanada?Actuacion.actuacionesExplanada?.terrenoNaturalCbr: '', Relleno: Actuacion?.actuacionesExplanada?Actuacion.actuacionesExplanada?.relleno: '', 
        RellenoCBR: Actuacion?.actuacionesExplanada?Actuacion.actuacionesExplanada?.rellenoCbr: '', Coronacion: Actuacion?.actuacionesExplanada?Actuacion.actuacionesExplanada?.coronacion: '', CoronacionCBR: Actuacion?.actuacionesExplanada?Actuacion.actuacionesExplanada?.coronacionCbr: '',
        //Pestana Clasificaciones (Tramo)
        Redes: '', ClasifTecReal: '', OrgConservacion: '', OrgCompetente: '', RegGestion: '', RegExplot: '',
        ZonaTermica : '', ZonaPluv: ''
    });
    //Campos Actuación
    const [MostrarCampos, actualizarMostrarCampos] = useState({
        ShowSeleccionarTramos: true,
        ShowTablaTramos: false,
        ShowCamposComunes: false,
        ShowCalzada: false,
        ShowCarriles: false,
        ShowTipoCalzada: false,
        ShowUtilizada: false,
        ShowCarrAntigua: false,
        ShowGestion: false,
        ShowTabFirme: false,
        ShowAnchuras: false,
        ShowFresado: false,
        ShowTabExplanada: false,
        ShowTabClasificacion: false,
        ShowLongitud: false,
    });



    //Campos iniciales para obtener los tramos activos
    let optionsTiposAct = Data.tiposActuaciones.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.nombre
        };
    })

    let optionsCarreteras = Data.carreteras.map(function(elemento){
        return{
        value: elemento.id,
        label: elemento.nombre
        };
    })

    //Tabla de tramos
    const columnsTramos = [
        {dataField: 'nombre', text:<Translation ns= "global">{(t) => <>{t('Tramo')}</>}</Translation>, align: 'center'},
        {dataField: 'puntoFin.pk', text: <Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation>,formatter: (cell, row) =>{return <div>{`${row.puntoIni.pk} + ${row.puntoIni.m}`}</div>;}, align: 'center'},
        {dataField: 'puntoIni.pk', text: <Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation>, formatter: (cell, row) =>{return <div>{`${row.puntoFin.pk} + ${row.puntoFin.m}`}</div>;}, align: 'center'},
        {dataField: 'firmesTramo.idCarrilDdTiposFirmesTramo', text: <Translation ns= "global">{(t) => <>{t('TipoFirme')}</>}</Translation>, align: 'center'},
        {dataField: 'idDdTiposCalzada', text: <Translation ns= "global">{(t) => <>{t('TipoCalzada')}</>}</Translation>, align: 'center'},
      ]

    //Desplegables de la Actuación
    const optionsTipoCalz = [
        {value: 'Anada/Tornada', label: 'Anada/Tornada'},
        {value: 'Doble', label: 'Doble'},
        {value: 'Invers', label: 'Invers'},
        {value: 'Unic', label: 'Unic'},
    ]

    const optionsCarriles = [
        {value: 0, label: '0'},
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
        {value: 4, label: '4'},
    ]

    const optionsCalzada = [
        {value: 'Unica', label: 'Única'},
        {value: 'Separada', label: 'Separada'}
    ]

    const optionsUtilizada = [
        {value: 'Creixent', label: 'Creixent'},
        {value: 'Decreixent', label: 'Decreixent'}
    ]

    //Desplegables para la pestaña de Frimes 
    const optionsTiposFirmesTramo = Data.tiposFirmeTramos.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

    const optionsCapaBase = Data.capasBase.filter(x=>x.idDdTiposFirmesTramo == FormActuacion.TipoFirmeTramo && x.codigo != "").map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

    const optionsCapaSubbase = Data.capasSubbase.filter(x=>x.idDdTiposFirmesTramo == FormActuacion.TipoFirmeTramo && x.codigo != "").map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

    const optionsCapaRodadura = Data.capasRodadura.filter(x=>x.idDdTiposFirmesTramo == FormActuacion.TipoFirmeTramo && x.codigo != "").map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

    const optionsCapaIntermedia = Data.capasIntermedia.filter(x=>x.idDdTiposFirmesTramo == FormActuacion.TipoFirmeTramo && x.codigo != "").map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

    const optionsNivelesInfluencia = Data.nivelesInfluencia.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })


    //Desplegables para la pestaña de Explanadas
    const optionsTerrenoNatural = Data.terrenosNaturales.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

    const optionsCategoriaExplanada = Data.categoriasExplanada.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })


    //Desplegables para pestaña de Clasificaciones (Tramo nuevo)
    const optionsRedes = Data.redes.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.nombre
        };
    })

    const optionsCodTecnicaReal = Data.codTecnicaReal.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.nombre
        };
    })

    const optionsOrganismos = Data.organismos.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.nombre
        };
    })

    const optionsRegimenGestion = Data.regimenGestion.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.nombre
        };
    })

    const optionsRegimenExplotacion = Data.regimenExplotacion.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.nombre
        };
    })

    const optionsZonasTermicas = Data.zonasTermicas.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

    const optionsZonasPluviometricas = Data.zonasPluviometricas.map(function(elemento){
        return{
        value: elemento.codigo,
        label: elemento.codigo
        };
    })

     //campos iniciales
     /*const [Form, actualizarForm] = useState({
        TipoActuacion: '',
        Carretera: '',
        PkIni: '',
        PkFin: '',
        MIni: '',
        MFin: '',
    });*/
    

    const handleChange=async e=>{
        //e.persist();
        console.log("opción:", e);
       
        /*await actualizarForm({
            ...Form,
            [e.target.name]: e.target.value
          
        });*/

        if(e.target.name == "Creciente" || e.target.name == "Decreciente"){
            console.log("SENTIDO ACTU", e.target.value);

            if(e.target.name == "Creciente"){
                await actualizarFormActuacion({
                    ...FormActuacion,
                    [e.target.name]: !(FormActuacion.Creciente)
                
                });
            }else{
                await actualizarFormActuacion({
                    ...FormActuacion,
                    [e.target.name]: !(FormActuacion.Decreciente)
                
                });
            }
            
        }else{

            await actualizarFormActuacion({
                ...FormActuacion,
                [e.target.name]: e.target.value
            
            });
        }
    

        /*if (FormActuacion.Carril1 > 0 && FormActuacion.Carril2 > 0){
            await actualizarFormActuacion({
                ...FormActuacion,
                Calzada: "Separada"
            });
            console.log("Separada");
        }*/
    
        console.log("FORM: ", FormActuacion);
        console.log("FORM ACTUACIONES: ", FormActuacion);
       
   }

   const handleSelectChange=(e, {name})=>{
    //e.persist();
    console.log("opción:", e);
    console.log("name:", name);
    console.log("tipoFirm ", FormActuacion.TipoFirmeTramo);
   

    actualizarFormActuacion({
        ...FormActuacion,
        [name]: e.value
      
    });

    /*if (FormActuacion.Carril1 > 0 && FormActuacion.Carril2 > 0){
        actualizarFormActuacion({
            ...FormActuacion,
            Calzada: "Separada"
        });
        console.log("Separada");
    }*/
    console.log("FORM ACTUACIONES: ", FormActuacion);

}


   const [msgOut, guardarMsgOut] = useState();
   const [msgOutSave, guardarMsgOutSave] = useState();
   const [msgOutBoolOK, setMsgOutBoolOK] = useState(false);
   const [msgOutBoolKO, setMsgOutBoolKO] = useState(false);
   const [TablaTramos, actualizarTablaTramos] = useState([]);



   //Llamada al controlador para obtener la tabla de tramos
   const peticionSeleccionar=async e=>{

    setMsgOutBoolKO(false);

    console.log("ACTUACION A ACTUALIZAR: ", FormActuacion)

    if((FormActuacion.TipoActuacion === '' || FormActuacion.TipoActuacion === 0) || FormActuacion.Carretera === 0 || FormActuacion.PKIni === '' ||
    FormActuacion.MIni === '' || FormActuacion.PKFin === '' || FormActuacion.MFin === ''){

        setMsgOutBoolKO(true);
        var msg= <Translation ns= "global">{(t) => <>{t('CamposObligatorios')}</>}</Translation>
        guardarMsgOut(msg);

    }else{

        const data = new FormData();

        console.log("peticionSeleccionar");   
        console.log(FormActuacion); 

    
        //await axios.get(url, data, config)
        await axios.get(url+`${FormActuacion.Carretera}/${FormActuacion.PkIni}/${FormActuacion.MIni}/${FormActuacion.PkFin}/${FormActuacion.MFin}`)
        .then(response =>{
            console.log("OK1");
            console.log(response.data);
            setMsgOutBoolKO(false);
            actualizarTablaTramos(response.data.result); //Se rellena la tabla de tramos
            actualizarMostrarCampos({ShowTablaTramos: false, ShowCamposComunes: false, ShowCalzada: false, ShowCarriles: false, ShowTipoCalzada: false, ShowUtilizada: false, ShowCarrAntigua: false, ShowGestion: false, ShowLongitud: false, ShowTabFirme: false, ShowAnchuras: false, ShowFresado: false, ShowTabExplanada: false, ShowTabClasificacion: false});
            console.log(response.data); 
            console.log("activos: ", MostrarCampos);

            //var datos = response.data.result;
            EvaluarTipoAct(response.data.result);
            console.log()


        }).catch(error=>{
            console.log(error); 
            actualizarTablaTramos([]);
            actualizarMostrarCampos({ShowTablaTramos: false, ShowCamposComunes: false, ShowCalzada: false, ShowCarriles: false, ShowTipoCalzada: false, ShowUtilizada: false, ShowCarrAntigua: false, ShowGestion: false, ShowLongitud: false, ShowTabFirme: false, ShowAnchuras: false, ShowFresado: false, ShowTabExplanada: false, ShowTabClasificacion: false});

            setMsgOutBoolKO(true);
            setMsgOutBoolOK(false);  
            
            //Mensajes de error
            switch(error.response.data){          
                case 1:
                    //PK Ini mayor que PK Fin
                    var msg= <Translation ns= "global">{(t) => <>{t('PkIniMayorFin')}</>}</Translation>
                    break;
                case 2:
                    //No existen tramos activos
                    var msg= <Translation ns= "global">{(t) => <>{t('SinTramAct')}</>}</Translation>
                    break;
                default:
                    var msg= <Translation ns= "global">{(t) => <>{t('ErrorGuardarAct')}</>}</Translation>
                    break;
            }

            guardarMsgOut(msg);
        })   

        }
    }


    

    //Cargamos campos del Formulacio en función del tipo de Actuación seleccionado
    const EvaluarTipoAct=(datos)=>{
        console.log("EvaluarTipoAct");
        //console.log(datos);       
        console.log("tabla tramos: ", TablaTramos);        
        console.log("activos: ", FormActuacion);
        actualizarMostrarCampos({ShowTablaTramos: false, ShowCamposComunes: false, ShowCalzada: false, ShowCarriles: false, ShowTipoCalzada: false, ShowUtilizada: false, ShowCarrAntigua: false, ShowGestion: false, ShowLongitud: false, ShowTabFirme: false, ShowAnchuras: false, ShowFresado: false, ShowTabExplanada: false, ShowTabClasificacion: false});

    //En función del tipo de Actuación que se haya seleccionado, se mostarrán unos campos u optros del formulari
     switch(FormActuacion.TipoActuacion){
       
         //Acondicionamiento
         case 'A':
             console.log("acondi");
             actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowTabFirme: true, ShowTabExplanada: true});
             break;

         //Desdoblamiento
         case 'D':
            console.log("desdob");
            if(FormActuacion.Id>0){
                actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowCalzada: true, ShowCarriles: true, ShowTipoCalzada: true, ShowUtilizada: true, ShowCarrAntigua: true, ShowGestion: true, ShowTabFirme: true, ShowAnchuras: true, ShowTabExplanada: true});
            }else{
                actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowCalzada: true, ShowCarriles: true, ShowTipoCalzada: true, ShowUtilizada: true, ShowCarrAntigua: true, ShowGestion: true, ShowTabFirme: true, ShowAnchuras: true, ShowTabExplanada: true, ShowTabClasificacion: true});
            }
            break;

        //Mejora    
        case 'M':
            console.log("mejora");
            actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowTabFirme: true, ShowFresado: true});
            break;
        
        //Nuevo tramo
        case 'N':
            console.log("Nou");
            if(FormActuacion.Id>0){
                actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowCarriles: true, ShowTipoCalzada: true, ShowCarrAntigua: true, ShowTabFirme: true, ShowAnchuras: true, ShowTabExplanada: true});
            }else{
                actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowCarriles: true, ShowTipoCalzada: true, ShowCarrAntigua: true, ShowTabFirme: true, ShowAnchuras: true, ShowTabExplanada: true, ShowTabClasificacion: true});
            }
            break;

        //Refuerzo
        case 'R':
            console.log("refuerzo");
            actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowTabFirme: true, ShowFresado: true });
            break;
        
        case 'V':
            console.log("variant");
            if(FormActuacion.Id>0){
                actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowCalzada: true, ShowCarriles: true, ShowTipoCalzada: true, ShowLongitud: true, ShowCarrAntigua: true, ShowGestion: true, ShowTabFirme: true, ShowAnchuras: true, ShowTabExplanada: true});            
            }else{
                actualizarMostrarCampos({ShowTablaTramos: true, ShowCamposComunes: true, ShowCalzada: true, ShowCarriles: true, ShowTipoCalzada: true, ShowLongitud: true, ShowCarrAntigua: true, ShowGestion: true, ShowTabFirme: true, ShowAnchuras: true, ShowTabExplanada: true, ShowTabClasificacion: true});
            }
            break;
     }
 
    }

    useEffect(() => {
    console.log("ACTUACION: ", Actuacion);
    if(Actuacion.id > 0){
        actualizarMostrarCampos({ShowSeleccionarTramos:false});
        peticionSeleccionar();         
     }
    }, []);


   //Llamada al controlador para guardar la actuación
   const peticionGuardarActuacion=async e=>{
    const data = new FormData();

    console.log("peticionSeleccionar");   
    console.log(FormActuacion); 

    data.append('Id', FormActuacion.Id)
    data.append('idTipoActuacion', FormActuacion.TipoActuacion)
    data.append('idCarretera', FormActuacion.Carretera)
    data.append('PkIni', FormActuacion.PkIni)
    data.append('MIni', FormActuacion.MIni)
    data.append('PkFin', FormActuacion.PkFin)
    data.append('MFin', FormActuacion.MFin)

    data.append('ClaveObra', FormActuacion.ClaveObra)
    data.append('Fecha', FormActuacion.Fecha)
    data.append('Creciente', FormActuacion.Creciente)
    data.append('Decreciente', FormActuacion.Decreciente)
    data.append('Calzada', FormActuacion.Calzada)
    data.append('Carril1', FormActuacion.Carril1)
    data.append('Carril2', FormActuacion.Carril2)
    data.append('Gestion', FormActuacion.Gestion)
    data.append('CarreteraAntigua', FormActuacion.CarreteraAnt)
    data.append('Utilizada', FormActuacion.Utilizada)
    data.append('Observaciones', FormActuacion.Observaciones)
    data.append('Importe', FormActuacion.Importe)
    data.append('idTipoCalzada', FormActuacion.TipoCalz)

    //Firmes
    data.append('idTipoFirmeTramo', FormActuacion.TipoFirmeTramo)
    data.append('idNivelesInfluencia ', FormActuacion.nivelesInfluencia)
    data.append('CPA', FormActuacion.CPA)
    data.append('Fresado', FormActuacion.Fresado)
    data.append('AnchuraCarril', FormActuacion.AnchCarril)
    data.append('AnchuraArcen', FormActuacion.AnchArcen)
    data.append('idCapaRodaduraCarril', FormActuacion.CapaRodaduraCarril)
    data.append('CapaRodaduraEspCarr', FormActuacion.CapaRodaduraEspCarr)
    data.append('idCapaRodaduraArcen', FormActuacion.CapaRodaduraArcen)
    data.append('CapaRodaduraEspArc', FormActuacion.CapaRodaduraEspArc)
    data.append('idCapaIntermediaCarril', FormActuacion.CapaIntermediaCarril)
    data.append('CapaIntermediaEspCarr', FormActuacion.CapaIntermediaEspCarr)
    data.append('idCapaIntermediaArcen', FormActuacion.CapaIntermediaArcen)
    data.append('CapaIntermediaEspArc', FormActuacion.CapaIntermediaEspArc)
    data.append('idCapaBaseCarril', FormActuacion.CapaBaseCarril)
    data.append('CapaBaseEspCarr', FormActuacion.CapaBaseEspCarr)
    data.append('idCapaBaseArcen', FormActuacion.CapaBaseArcen)
    data.append('CapaBaseEspArc', FormActuacion.CapaBaseEspArc)
    data.append('idCapaSubbaseCarril', FormActuacion.CapaSubbaseCarril)
    data.append('CapaSubbaseEspCarr', FormActuacion.CapaSubbaseEspCarr)
    data.append('idCapaSubbaseArcen', FormActuacion.CapaSubbaseArcen)
    data.append('CapaSubbaseEspArc', FormActuacion.CapaSubbaseEspArc)

    //Explanadas
    data.append('idTerrenosNaturales', FormActuacion.TerrenoNatural)
    data.append('idCategoriasExplanadas', FormActuacion.CategoriaExplanada)
    data.append('TerrenoNaturalCbr', FormActuacion.TerrenoNatCBR)
    data.append('Relleno', FormActuacion.Relleno)
    data.append('RellenoCBR', FormActuacion.RellenoCBR)
    data.append('Coronacion', FormActuacion.Coronacion)
    data.append('CoronacionCBR', FormActuacion.CoronacionCBR)

    //Clasificaciones (Tramo)
    data.append('idRedes', FormActuacion.Redes)
    data.append('idCodTecReal', FormActuacion.ClasifTecReal)
    data.append('idOrgConservacion', FormActuacion.OrgConservacion)
    data.append('idOrgCompetente', FormActuacion.OrgCompetente)
    data.append('idRegGest', FormActuacion.RegGestion)
    data.append('idRegExpl', FormActuacion.RegExplot)
    data.append('idZonasPluviomet', FormActuacion.ZonaPluv)
    data.append('idZonasTerm', FormActuacion.ZonaTermica)

 //Se envían los datos al controlador (InsertarActuacionesController/GuardarActuacion)
    await axios.post(url, data, config)
    .then(response =>{
        console.log("OKGuardar");
        
        console.log(response.data); 

        setMsgOutBoolKO(false);
        setMsgOutBoolOK(true); 
        var msg= <Translation ns= "global">{(t) => <>{t('GuardarActuacionOK')}</>}</Translation>
        guardarMsgOutSave(msg);

    }).catch(error=>{
        console.log(error); 
        console.log(error.response.data);  

        setMsgOutBoolKO(true);
        setMsgOutBoolOK(false); 


        switch(error.response.data){       
            case 1:
                //Clave de Obra incorrecta
                var msg= <Translation ns= "global">{(t) => <>{t('GuardarActuacionKO')}</>}</Translation>
                break;   
            case 2:
                //Clave de Obra incorrecta
                var msg= <Translation ns= "global">{(t) => <>{t('ClaveObraKO')}</>}</Translation>
                break;
            case 3:
                //Fecha de actuación incorrecta
                var msg= <Translation ns= "global">{(t) => <>{t('FechaActuacionKO')}</>}</Translation>
                break;
            case 4:
                var msg= <Translation ns= "global">{(t) => <>{t('TipoCalzKO')}</>}</Translation>
                break;
            case 5:               
                var msg= <Translation ns= "global">{(t) => <>{t('CarrilesKO')}</>}</Translation>
                break;
            case 6:
                var msg= <Translation ns= "global">{(t) => <>{t('EspesorKO')}</>}</Translation>
                break;
            default:
                var msg= <Translation ns= "global">{(t) => <>{t('GuardarActuacionKO')}</>}</Translation>
                break;
        }

        guardarMsgOutSave(msg);

      })   
    }


    //Pestañas Firme/Explanada/Clasificaciones
    const [ activeIndex, setActiveIndex] = useState(0);
    const OnChangeIndex=async e=>{
        setActiveIndex(e);
   }

    const tabs = [
      
       {
        //Pestaña de Firmes        
        label: <Translation ns= "global">{(t) => <>{t('Firmes')}</>}</Translation>,
        
        content: (
          <div>
            <br />
            <Container>
               
            {MostrarCampos.ShowFresado == true ? 
            <Fragment>    
            <Row>           
                {/*Desplegable Tipos Firme*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="TipoFirme"><Translation ns= "global">{(t) => <>{t('TipoFirme')}</>}</Translation></label></Col>            
                <Col xs={2}>
                    <Select name="TipoFirmeTramo" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsTiposFirmesTramo}
                    defaultValue={{value:FormActuacion.TipoFirmeTramo}}>               
                    </Select>
                <br /></Col>

                {/*Desplegable Niveles de Influencia*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="NivelesInfluencia"><Translation ns= "global">{(t) => <>{t('NivelesInfluencia')}</>}</Translation></label></Col>            
                <Col xs={2}>
                    <Select name="NivelesInfluencia" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsNivelesInfluencia}
                    defaultValue={{value:FormActuacion.NivelesInfluencia}}>               
                    </Select>
                <br /></Col>

                </Row>
                
                <Row>
                {/*CPA*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="CPA"><Translation ns= "global">{(t) => <>{t('CPA')}</>}</Translation></label></Col>                          
                <Col xs={2}><input className="form-control" type="number" name="CPA" id="CPA" onChange={handleChange} value={FormActuacion?FormActuacion.CPA: ''}/><br /></Col>      

                {/*Fresado*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="Fresado"><Translation ns= "global">{(t) => <>{t('Fresado')}</>}</Translation></label></Col>                          
                <Col xs={2}><input className="form-control" type="number" name="Fresado" id="Fresado" onChange={handleChange} value={FormActuacion?FormActuacion.Fresado: ''}/><br /></Col>       
                </Row>
            
            </Fragment>
            : 
            
            <Row>           
            {/*Desplegable Tipos Firme*/}
            <Col xs={2} style={{textAlign: "right"}}><label htmlFor="TipoFirme"><Translation ns= "global">{(t) => <>{t('TipoFirme')}</>}</Translation></label></Col>            
            <Col xs={2}>
                <Select name="TipoFirmeTramo" 
                onChange={handleSelectChange}
                labelKey='codigo'
                valueKey='codigo'
                options={optionsTiposFirmesTramo}
                defaultValue={{value:FormActuacion.TipoFirmeTramo}}>               
                </Select>
            <br /></Col>

            {/*Desplegable Niveles de Influencia*/}
            <Col xs={2} style={{textAlign: "right"}}><label htmlFor="NivelesInfluencia"><Translation ns= "global">{(t) => <>{t('NivelesInfluencia')}</>}</Translation></label></Col>            
            <Col xs={2}>
                <Select name="NivelesInfluencia" 
                onChange={handleSelectChange}
                labelKey='codigo'
                valueKey='codigo'
                options={optionsNivelesInfluencia}
                defaultValue={{value:FormActuacion.NivelesInfluencia}}>               
                </Select>
            <br /></Col>

            {/*CPA*/}
            <Col xs={1} style={{textAlign: "right"}}><label htmlFor="CPA"><Translation ns= "global">{(t) => <>{t('CPA')}</>}</Translation></label></Col>                          
            <Col xs={2}><input className="form-control" type="number" name="CPA" id="CPA" onChange={handleChange} value={FormActuacion?FormActuacion.CPA: ''}/><br /></Col>           

            </Row>
            }
            <br />

            {MostrarCampos.ShowAnchuras == true ? 
            <Row>           
                {/*Anchura Carril*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="AnchCarril"><Translation ns= "global">{(t) => <>{t('AnchCarril')}</>}</Translation></label></Col>                          
                <Col xs={2}><input className="form-control" type="number" name="AnchCarril" id="AnchCarril" onChange={handleChange} value={FormActuacion?FormActuacion.AnchCarril: ''}/><br /></Col>           

                {/*Anchura Arcén*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="AnchArcen"><Translation ns= "global">{(t) => <>{t('AnchArcen')}</>}</Translation></label></Col>                          
                <Col xs={2}><input className="form-control" type="number" name="AnchArcen" id="AnchArcen" onChange={handleChange} value={FormActuacion?FormActuacion.AnchArcen: ''}/><br /></Col>           
                <br />
            </Row>        
            : null}


            <Row>
               <Col xs={2}></Col>
               <Col xs={2}><Translation ns= "global">{(t) => <>{t('Carril')}</>}</Translation></Col>
               <Col xs={2}><Translation ns= "global">{(t) => <>{t('Espesor (cm)')}</>}</Translation></Col>
               <Col xs={2}><Translation ns= "global">{(t) => <>{t('Arcen')}</>}</Translation></Col>
               <Col xs={2}><Translation ns= "global">{(t) => <>{t('Espesor (cm)')}</>}</Translation></Col>
            </Row>

            {/*CAPA RODADURA*/}
            <Row>
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="CapaRodadura"><Translation ns= "global">{(t) => <>{t('CapaRod')}</>}</Translation></label></Col> 
                {/*Desplegable Capa Rodadura Carril*/}
                <Col xs={2}>
                    <Select name="CapaRodaduraCarril" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaRodadura}
                    defaultValue={{value:FormActuacion.CapaRodaduraCarril}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Rodadura Carril*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaRodaduraEspCarr" id="CapaRodaduraEspCarr" onChange={handleChange} value={FormActuacion?FormActuacion.CapaRodaduraEspCarr: ''}/><br /></Col>           

                {/*Desplegable Capa Rodadura Arcén*/}
                <Col xs={2}>
                    <Select name="CapaRodaduraArcen" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaRodadura}
                    defaultValue={{value:FormActuacion.CapaRodaduraArcen}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Rodadura Arcén*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaRodaduraEspArc" id="CapaRodaduraEspArc" onChange={handleChange} value={FormActuacion?FormActuacion.CapaRodaduraEspArc: ''}/><br /></Col>           
            </Row>

            {/*CAPA INTERMEDIA*/}
            <Row>
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="CapaIntermedia"><Translation ns= "global">{(t) => <>{t('CapaInter')}</>}</Translation></label></Col> 
                {/*Desplegable Capa Intermedia Carril*/}
                <Col xs={2}>
                    <Select name="CapaIntermediaCarril" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaIntermedia}
                    defaultValue={{value:FormActuacion.CapaIntermediaCarril}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Intermedia Carril*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaIntermediaEspCarr" id="CapaIntermediaEspCarr" onChange={handleChange} value={FormActuacion?FormActuacion.CapaIntermediaEspCarr: ''}/><br /></Col>           

                {/*Desplegable Capa Intermedia Arcén*/}
                <Col xs={2}>
                    <Select name="CapaIntermediaArcen" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaIntermedia}
                    defaultValue={{value:FormActuacion.CapaIntermediaArcen}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Intermedia Arcén*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaIntermediaEspArc" id="CapaIntermediaEspArc" onChange={handleChange} value={FormActuacion?FormActuacion.CapaIntermediaEspArc: ''}/><br /></Col>           
            </Row>

            {/*CAPA BASE*/}
            <Row>
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="CapaBase"><Translation ns= "global">{(t) => <>{t('CapaBase')}</>}</Translation></label></Col> 
                {/*Desplegable Capa Base Carril*/}
                <Col xs={2}>
                    <Select name="CapaBaseCarril" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaBase}
                    defaultValue={{value:FormActuacion.CapaBaseCarril}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Base Carril*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaBaseEspCarr" id="CapaBaseEspCarr" onChange={handleChange} value={FormActuacion?FormActuacion.CapaBaseEspCarr: ''}/><br /></Col>           

                {/*Desplegable Capa Base Arcén*/}
                <Col xs={2}>
                    <Select name="CapaBaseArcen" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaBase}
                    defaultValue={{value:FormActuacion.CapaBaseArcen}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Base Arcén*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaBaseEspArc" id="CapaBaseEspArc" onChange={handleChange} value={FormActuacion?FormActuacion.CapaBaseEspArc: ''}/><br /></Col>        
            </Row>

            {/*CAPA SUBBASE*/}
            <Row>
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="CapaSubbase"><Translation ns= "global">{(t) => <>{t('CapaSubb')}</>}</Translation></label></Col> 
                {/*Desplegable Capa Subbase Carril*/}
                <Col xs={2}>
                    <Select name="CapaSubbaseCarril" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaSubbase}
                    defaultValue={{value:FormActuacion.CapaSubbaseCarril}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Subbase Carril*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaSubbaseEspCarr" id="CapaSubbaseEspCarr" onChange={handleChange} value={FormActuacion?FormActuacion.CapaSubbaseEspCarr: ''}/><br /></Col>           

                {/*Desplegable Capa Subbase Arcén*/}
                <Col xs={2}>
                    <Select name="CapaSubbaseArcen" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCapaSubbase}
                    defaultValue={{value:FormActuacion.CapaSubbaseArcen}}>               
                    </Select>
                <br /></Col>

                {/*Espesor Capa Subbase Arcén*/}
                <Col xs={2}><input className="form-control" type="number" name="CapaSubbaseEspArc" id="CapaSubbaseEspArc" onChange={handleChange} value={FormActuacion?FormActuacion.CapaSubbaseEspArc: ''}/><br /></Col>        
            </Row>           
            </Container>
          </div>         
        ),
        disabled: (!MostrarCampos.ShowTabFirme)

      }, 
      {
        //Pestaña de Explanada 
        label: <Translation ns= "global">{(t) => <>{t('Explanadas')}</>}</Translation>,
        content: (
          <div>
              <br />
             <Container>
                 <Row>
                {/*Desplegable Terreno Natural*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="TerrenoNatural"><Translation ns= "global">{(t) => <>{t('TerrenoNatural')}</>}</Translation></label></Col>            
                <Col xs={2}>
                    <Select name="TerrenoNatural" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsTerrenoNatural}
                    defaultValue={{value:FormActuacion.TerrenoNatural}}>               
                    </Select>
                <br /></Col>

                {/*Desplegable Categoría Explanada*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="CategoriaExplanada"><Translation ns= "global">{(t) => <>{t('CategoriaExplanada')}</>}</Translation></label></Col>            
                <Col xs={2}>
                    <Select name="CategoriaExplanada" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCategoriaExplanada}
                    defaultValue={{value:FormActuacion.CategoriaExplanada}}>               
                    </Select>
                <br /></Col>
                 
                {/*CBR*/}
                <Col xs={1} style={{textAlign: "right"}}><label htmlFor="TerrenoNatCBR"><Translation ns= "global">{(t) => <>{t('CBR')}</>}</Translation></label></Col> 
                <Col xs={2}><input className="form-control" type="number" name="TerrenoNatCBR" id="TerrenoNatCBR" onChange={handleChange} value={FormActuacion?FormActuacion.TerrenoNatCBR: ''}/><br /></Col>           
                <br />
                </Row>

                <Row>
                 {/*Relleno*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="Relleno"><Translation ns= "global">{(t) => <>{t('Relleno')}</>}</Translation></label></Col> 
                <Col xs={2}><input className="form-control" type="number" name="Relleno" id="Relleno" placeholder="cm" onChange={handleChange} value={FormActuacion?FormActuacion.Relleno: ''}/><br /></Col>   
                <Col xs={2}><input className="form-control" type="number" name="RellenoCBR" id="RellenoCBR" placeholder="CBR" onChange={handleChange}/><br /></Col>   

                {/*Coronación*/}
                <Col xs={2} style={{textAlign: "right"}}><label htmlFor="Coronación"><Translation ns= "global">{(t) => <>{t('Coronación')}</>}</Translation></label></Col> 
                <Col xs={2}><input className="form-control" type="number" name="Coronacion" id="Coronación" placeholder="cm" onChange={handleChange} value={FormActuacion?FormActuacion.Coronacion: ''}/><br /></Col>   
                <Col xs={2}><input className="form-control" type="number" name="CoronacionCBR" id="CoronaciónCBR" placeholder="CBR/RC" onChange={handleChange} value={FormActuacion?FormActuacion.CoronacionCBR: ''}/><br /></Col>        
                
                </Row>
             </Container>
          </div>
        ),
        disabled: (!MostrarCampos.ShowTabFirme)
      },
     {
        //Pestaña de Clasificaciones (información de tramo nuevo) 
        label: <Translation ns= "global">{(t) => <>{t('Clasificaciones')}</>}</Translation>,
        content: (
          <div>
              <br />
             <Container>
                 <Row>
                {/*Desplegable Clasificación Funcional Real (Redes)*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="Redes"><Translation ns= "global">{(t) => <>{t('ClasifFuncRealRed')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="Redes" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsRedes}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>

                {/*Desplegable Clasificación Técnica Real*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="ClasifTecReal"><Translation ns= "global">{(t) => <>{t('ClasifTecReal')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="ClasifTecReal" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsCodTecnicaReal}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>
                </Row>

                <Row>
                {/*Desplegable Organismo de Conservación*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="OrgConservacion"><Translation ns= "global">{(t) => <>{t('OrgConservacion')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="OrgConservacion" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsOrganismos}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>

                {/*Desplegable Clasificación Técnica Real*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="OrgCompetente"><Translation ns= "global">{(t) => <>{t('OrgCompetente')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="OrgCompetente" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsOrganismos}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>
                </Row>

                <Row>
                {/*Desplegable Régimen de Gestión*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="RegGestion"><Translation ns= "global">{(t) => <>{t('RegGestion')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="RegGestion" 
                    onChange={handleSelectChange}
                    labelKey='nombre'
                    valueKey='codigo'
                    options={optionsRegimenGestion}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>

                {/*Desplegable Régimen de Explotación*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="RegExplot"><Translation ns= "global">{(t) => <>{t('RegExplot')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="RegExplot" 
                    onChange={handleSelectChange}
                    labelKey='nombre'
                    valueKey='codigo'
                    options={optionsRegimenExplotacion}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>
                </Row>

                <Row>
                {/*Desplegable Zona Térmica*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="ZonaTermica"><Translation ns= "global">{(t) => <>{t('ZonaTermica')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="ZonaTermica" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsZonasTermicas}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>

                {/*Desplegable Zona Pluviométrica*/}
                <Col xs={3} style={{textAlign: "right"}}><label htmlFor="ZonaPluv"><Translation ns= "global">{(t) => <>{t('ZonaPluv')}</>}</Translation></label></Col>            
                <Col xs={3}>
                    <Select name="ZonaPluv" 
                    onChange={handleSelectChange}
                    labelKey='codigo'
                    valueKey='codigo'
                    options={optionsZonasPluviometricas}
                    defaultValue={{label: "Seleccionar", value: 0}}>               
                    </Select>
                <br /></Col>
                </Row>
            </Container>
          </div>
        ),
        disabled: (!MostrarCampos.ShowTabClasificacion)
      },

    ];

    return(

        <div>  
          <h1><Translation ns= "global">{(t) => <>{t('ActNueva')}</>}</Translation></h1>            
          <div className="form-group">       
          
            
             {/*Datos iniciales del formulario, para seleccionar los puntos activos.*/} 
             <Container>
             
             <Row>
             <Col xs={2} style={{textAlign: "right"}}><label htmlFor="TipoActuacion"><Translation ns= "global">{(t) => <>{t('TipoAct')}</>}</Translation></label></Col>
             <Col xs={4}>
                 <Select name="TipoActuacion" 
                onChange={handleSelectChange}
                labelKey='nombre'
                valueKey='codigo'
                isDisabled={!(MostrarCampos.ShowSeleccionarTramos)}
                options={optionsTiposAct}
                defaultValue={{value: FormActuacion.TipoActuacion}}>               
                </Select>
            <br /></Col>
            
            {/*PK Ini*/} 
            <Col xs={2} style={{textAlign: "right"}}><label htmlFor="PKIni"><Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation></label></Col>
                <Col xs={2}><input 
                className="form-control" 
                type="number" 
                name="PkIni" 
                id="PkIni" 
                placeholder="PK"
                disabled={!(MostrarCampos.ShowSeleccionarTramos)}
                value={FormActuacion.PkIni}               
                onChange={handleChange}/></Col> 

            <Col xs={2}><input className="form-control" 
                type="number" 
                name="MIni" 
                id="MIni" 
                placeholder="M" 
                disabled={!(MostrarCampos.ShowSeleccionarTramos)}
                value={FormActuacion.MIni}                 
                onChange={handleChange}/></Col>           
            
            <br />                                     
            </Row>          
                                   
            <Row>
             {/*Carreteras*/}
             <Col xs={2} style={{textAlign: "right"}}><label htmlFor="Carretera"><Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation></label></Col>            
             <Col xs={4}>
                <Select name="Carretera" 
                    onChange={handleSelectChange}
                    labelKey='nombre'
                    valueKey='id'
                    options={optionsCarreteras}
                    isDisabled={!(MostrarCampos.ShowSeleccionarTramos)}
                    //</Col>defaultValue={{label: "Seleccionar", value: 0}}>  
                    defaultValue={{value: FormActuacion.Carretera}}>                   
                </Select>
            <br /></Col>    

          
           
            {/*PK Fin*/} 
            <Col xs={2} style={{textAlign: "right"}}><label htmlFor="PKFin"><Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation></label></Col> 
            <Col xs={2}><input className="form-control" 
                                type="number"  
                                name="PkFin" 
                                id="PkFin" 
                                placeholder="PK"
                                disabled={!(MostrarCampos.ShowSeleccionarTramos)}
                                value={FormActuacion.PkFin}   
                                onChange={handleChange}/></Col> 
            <Col xs={2}><input className="form-control" 
                                type="number" 
                                name="MFin" 
                                id="MFin" 
                                placeholder="M"
                                disabled={!(MostrarCampos.ShowSeleccionarTramos)}
                                value={FormActuacion.MFin} 
                                onChange={handleChange}/><br /></Col> 
            <br />
            </Row>
            </Container>
            
            {/*Botón Seleccionar*/}
            {MostrarCampos.ShowSeleccionarTramos == true ?
            <Container>
               <Row>
                {/*Botón 'Seleccionar'*/}
                <Col xs={10}></Col>
                <Col xs={2} style={{textAlign: "right"}}><button className="btn btn-primario" 
                                                        onClick={()=>peticionSeleccionar()}>
                                                        <Translation ns= "global">{(t) => <>{t('SeleccionarTramos')}</>}</Translation>
                                                        </button></Col>
                <br />
                </Row>

                <Row>
             <Col xs={2}></Col>
             <Col xs={6}>
                { msgOutBoolKO ? 
                <div class="alert alert-danger">
                    {/*Mostramos mensaje*/}
                    {msgOut}
                    <br />
                </div>           
                : ""}
            </Col>
            
            <br />
            </Row>

            </Container>
            : null }
            <br />                
            </div>
                

            {/*Se carga la tabla de Tramos activos entre los ptos, si existen*/}
            {MostrarCampos.ShowTablaTramos == true ?                    
            <Container>      
                <Row>                         
                <BootstrapTable 
                    bootstrap4 
                    keyField='id' 
                    columns={columnsTramos} 
                    data={TablaTramos}
                />   
                </Row>     <br />
            </Container>  
            : null}  

            
            {/*Campos del formulario asociados a la Actuación*/}   
            <Container>
            {MostrarCampos.ShowCamposComunes == true ?
                <Row>
                <hr></hr> <br />
                </Row>
            : null} 
                      
            <Row>
                    
                {MostrarCampos.ShowCamposComunes == true ? <Col xs={2} style={{textAlign: "right"}}><label htmlFor="ClaveObra"><Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation></label></Col>: null} 
                {MostrarCampos.ShowCamposComunes == true ? <Col xs={2}><input className="form-control" type="text" name="ClaveObra" id="ClaveObra" onChange={handleChange} value={FormActuacion?FormActuacion.ClaveObra: ''}/><br /></Col>   : null}            
                

                {MostrarCampos.ShowCamposComunes == true ? <Col xs={2} style={{textAlign: "right"}}><label htmlFor="Importe"><Translation ns= "global">{(t) => <>{t('Importe')}</>}</Translation></label></Col>: null} 
                {MostrarCampos.ShowCamposComunes == true ? <Col xs={2}><input className="form-control" type="number"   name="Importe" id="Importe" onChange={handleChange} value={FormActuacion?FormActuacion.Importe: ''}/><br /></Col>: null}     
                

                {MostrarCampos.ShowCamposComunes == true ? <Col xs={2} style={{textAlign: "right"}}><label htmlFor="Fecha"><Translation ns= "global">{(t) => <>{t('FechaFinAct')}</>}</Translation></label></Col>: null} 
                {MostrarCampos.ShowCamposComunes == true ? <Col xs={2}><input type="date" name="Fecha" id="Fecha" onChange={handleChange} value={FormActuacion?FormActuacion.Fecha: ''}/><br />  </Col>: null}                                                 
                

                </Row>
                        
                <Row>
                {MostrarCampos.ShowCamposComunes == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="Sentido"><Translation ns= "global">{(t) => <>{t('Sentido')}</>}</Translation></label></Col>: null}  
                {MostrarCampos.ShowCamposComunes == true ?<Col xs={2}>
                                                            <input 
                                                            type="checkbox" 
                                                            name="Creciente"
                                                            defaultChecked={FormActuacion.Creciente}
                                                            onChange={handleChange}/>{" "}<Translation ns= "global">{(t) => <>{t('Creciente')}</>}</Translation>  
                                                            <br />                    
                                                            <input 
                                                            type="checkbox" 
                                                            name="Decreciente" 
                                                            defaultChecked={FormActuacion.Decreciente}
                                                            onChange={handleChange}/>{" "}<Translation ns= "global">{(t) => <>{t('Decreciente')}</>}</Translation></Col>: null}  
                                                            <br />

                    {MostrarCampos.ShowCamposComunes == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="Observaciones"><Translation ns= "global">{(t) => <>{t('Observaciones')}</>}</Translation></label></Col>: null} 
                    {MostrarCampos.ShowCamposComunes == true ?<Col xs={6}><input className="form-control" type="text" name="Observaciones" id="Observaciones" onChange={handleChange} value={FormActuacion?FormActuacion.Observaciones: ''}/><br /></Col> : null}             
                </Row>    
                
                
                

                <Row>
                    
                {MostrarCampos.ShowTipoCalzada == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="TipoCalz"><Translation ns= "global">{(t) => <>{t('TipoCalzada')}</>}</Translation></label></Col>: null} 
                {MostrarCampos.ShowTipoCalzada == true ?<Col xs={2}>
                                                            <Select name="TipoCalz" 
                                                                onChange={handleSelectChange}
                                                                options={optionsTipoCalz}
                                                                defaultValue={{value:FormActuacion.TipoCalz}}>                   
                                                            </Select><br />
                                                        </Col>: null} 

                
                
                {MostrarCampos.ShowCarriles == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="Carriles"><Translation ns= "global">{(t) => <>{t('Carriles')}</>}</Translation></label></Col>: null} 
                {MostrarCampos.ShowCarriles == true ?<Col xs={1}>
                                                        <Select name="Carril1" 
                                                            onChange={handleSelectChange}
                                                            options={optionsCarriles}
                                                            defaultValue={{value:FormActuacion.Carril1}}>                 
                                                        </Select><br />
                                                    </Col>: null} 
                {MostrarCampos.ShowCarriles == true ?<Col xs={1}>
                                                        <Select name="Carril2" 
                                                            onChange={handleSelectChange}
                                                            options={optionsCarriles}
                                                            defaultValue={{value:FormActuacion.Carril2}}>                  
                                                        </Select><br />
                                                    </Col>: null} 
            
                

                
                
                {MostrarCampos.ShowCarrAntigua == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="CarreteraAnt"><Translation ns= "global">{(t) => <>{t('CarreteraAnt')}</>}</Translation></label></Col>: null} 
                {MostrarCampos.ShowCarrAntigua == true ?<Col xs={2}><input className="form-control" type="text" name="CarreteraAnt" id="CarreteraAnt" onChange={handleChange} value={FormActuacion?FormActuacion.CarreteraAnt: ''}/></Col>: null}                                                                                
                
                </Row>
                
                <Row> 

                {MostrarCampos.ShowCalzada == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="Calzada"><Translation ns= "global">{(t) => <>{t('Calzada')}</>}</Translation></label></Col>: null} 
                {MostrarCampos.ShowCalzada == true ?<Col xs={2}>
                                                        <Select name="Calzada" 
                                                            onChange={handleSelectChange}
                                                            options={optionsCalzada}
                                                            defaultValue={{value:FormActuacion.Calzada}}>                   
                                                        </Select><br />
                                                    </Col> : null} 
                

                
                
                {MostrarCampos.ShowGestion == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="Gestion"><Translation ns= "global">{(t) => <>{t('Gestion')}</>}</Translation></label></Col>: null}
                {MostrarCampos.ShowGestion == true ?<Col xs={2}><input className="form-control" type="text" name="Gestion" id="Gestion" onChange={handleChange} value={FormActuacion?FormActuacion.Gestion: ''}/></Col>: null}  

                
                {MostrarCampos.ShowUtilizada == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="Utilizada"><Translation ns= "global">{(t) => <>{t('Utilizada')}</>}</Translation></label></Col>: null}   
                {MostrarCampos.ShowUtilizada == true ?<Col xs={2}>
                                                        <Select name="Utilizada" 
                                                            onChange={handleSelectChange}
                                                            options={optionsUtilizada}
                                                            defaultValue={{value:FormActuacion.Utilizada}}>                   
                                                        </Select><br />                        
                                                    </Col> : null}


                
                            
                {MostrarCampos.ShowLongitud == true ?<Col xs={2} style={{textAlign: "right"}}><label htmlFor="Longitud"><Translation ns= "global">{(t) => <>{t('Longitud')}</>}</Translation></label></Col>: null}  
                {MostrarCampos.ShowLongitud == true ?<Col xs={2}><input className="form-control" type="number" name="Longitud" id="Longitud" onChange={handleChange} value={FormActuacion?FormActuacion.Longitud: ''}/><br /></Col>: null}                                                  
                                                                                    
                </Row>
                

            </Container>

            {/*Se cargan las pestañas /Firmes/Explanadas/Clasificaciones*/}
            <Container>
                {MostrarCampos.ShowCamposComunes == true ?
                    <Tab activeIndex={activeIndex} onChange={OnChangeIndex} tabs={tabs} /> 
                : null}
            </Container>

            {/*Botón Guardar*/}
            <Container>
            {MostrarCampos.ShowCamposComunes == true ?
                <Row>
                    {/*Botón 'Guardar'*/}
                    <Col xs={10}></Col>
                    <Col xs={2} style={{textAlign: "right"}}><button className="btn btn-primario" 
                                                            onClick={()=>peticionGuardarActuacion()}>
                                                            <Translation ns= "global">{(t) => <>{t('Guardar')}</>}</Translation>
                                                            </button></Col>
                    <br />
                    </Row>
                : null}
            </Container>

            <Container>
            <br />
            { msgOutBoolOK ? 
                <div className="alert alert-success">
                    {/*Mostramos mensaje*/}
                    {msgOutSave}
                </div>
                : ""}

                { msgOutBoolKO ? 
                <div class="alert alert-danger">
                    {/*Mostramos mensaje*/}
                    {msgOutSave}
                </div>
                : ""}
            </Container>
        
        </div>
    )




}

export default CrearEditarActuacion;