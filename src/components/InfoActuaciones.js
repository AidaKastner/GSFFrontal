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
import Tab from "./Tab";
import { Form } from 'reactstrap';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function InfoActuaciones({Actuacion}){
    console.log("Actuacion: ", Actuacion);




    return(

        <div>  
          <Container>
          <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Carretera"><Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation></label><br /></Col>            
            <Col xs={1}>{Actuacion.carretera.codigo}<br /></Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="ClaveObra"><Translation ns= "global">{(t) => <>{t('ClaveObra')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.claveObra}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Fecha"><Translation ns= "global">{(t) => <>{t('Fecha')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.fecha.substring(0,10)}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Sentido"><Translation ns= "global">{(t) => <>{t('Sentido')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.sentido}</Col>
            <br />
          </Row>


          <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="PkIni"><Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.puntoIni.pk} + {Actuacion.puntoIni.m}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="PkFin"><Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.puntoFin.pk} + {Actuacion.puntoFin.m}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Fresado"><Translation ns= "global">{(t) => <>{t('Fresado')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.fresado}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Calzada"><Translation ns= "global">{(t) => <>{t('Calzada')}</>}</Translation></label></Col>            
            <Col xs={1}>{(Actuacion.carriles != ''? ((Actuacion.carriles?.substring(2,3) > 0 && Actuacion.carriles?.substring(2,3) > 0) ? 'Separades' : 'Única') :'')}</Col>
          
          </Row>


          <Row>           
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Carriles"><Translation ns= "global">{(t) => <>{t('Carriles')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.carriles}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Gestion"><Translation ns= "global">{(t) => <>{t('Gestion')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.gestion}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CarreteraAnt"><Translation ns= "global">{(t) => <>{t('CarreteraAnt')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.carreterasAntigua}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Utilizada"><Translation ns= "global">{(t) => <>{t('Utilizada')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.utilizada}</Col>
          </Row>


          <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Importe"><Translation ns= "global">{(t) => <>{t('Importe')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.importe + '€'}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="Observaciones"><Translation ns= "global">{(t) => <>{t('Observaciones')}</>}</Translation></label></Col>            
            <Col xs={4}>{Actuacion.observaciones}</Col>        
          </Row>

          <Row>
          <br /><hr width="70%"></hr> <br />
          </Row>

        <Row>
         <h3><Col xs={2} style={{textAlign: "right", fontWeight: 'bold', color: '#a11510'}}><label htmlFor="DatosFirme"><Translation ns= "global">{(t) => <>{t('DatosFirme')}</>}</Translation></label></Col>  </h3> 
        </Row>

        <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="AnchArcen"><Translation ns= "global">{(t) => <>{t('AnchArcen')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.anchuraArcen <= 0? '': Actuacion.actuacionesFirme?.anchuraArcen + ' m.'}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="AnchCarril"><Translation ns= "global">{(t) => <>{t('AnchCarril')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.anchuraCarril <= 0? '': Actuacion.actuacionesFirme?.anchuraCarril + ' m.'}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CPA"><Translation ns= "global">{(t) => <>{t('CPA')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.cpa}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="NilInf"><Translation ns= "global">{(t) => <>{t('NilInf')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idDdNivelesInfluencia}</Col>
          </Row>


          <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="TipoFirme"><Translation ns= "global">{(t) => <>{t('TipoFirme')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idCarrilDdTiposFirmesTramo}</Col>
         
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="fresado"><Translation ns= "global">{(t) => <>{t('fresado')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.fresado}</Col>
          </Row>

          <Row>
          <br />
          </Row>

          <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapaBaseCarr"><Translation ns= "global">{(t) => <>{t('CapaBaseCarr')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idCarrilDdCapasBase}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorBaseCarr"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorBaseCarril <= 0? '': Actuacion.actuacionesFirme?.espesorBaseCarril + ' cm.'}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapaSubBaseCarr"><Translation ns= "global">{(t) => <>{t('CapaSubBaseCarr')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idCarrilDdCapasSubbase}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorSubBaseCarr"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorSubbaseCarril <= 0? '': Actuacion.actuacionesFirme?.espesorSubbaseCarril + ' cm.'}</Col>
          </Row>

          <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapRodCarr"><Translation ns= "global">{(t) => <>{t('CapaRodCarr')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idCarrilDdCapasRodadura}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorRodCarr"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorRodaduraCarril <= 0? '': Actuacion.actuacionesFirme?.espesorRodaduraCarril + ' cm.'}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapaIntCarr"><Translation ns= "global">{(t) => <>{t('CapaIntCarr')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idCarrilDdCapasIntermedia}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorIntCarr"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorSubbaseCarril <= 0? '': Actuacion.actuacionesFirme?.espesorSubbaseCarril + ' cm.'}</Col>
          </Row>

          <Row>
          <br />
          </Row>

          <Row> 
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapaBaseArc"><Translation ns= "global">{(t) => <>{t('CapaBaseArc')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idArcenDdCapasBase}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorBaseArc"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorBaseArcen <= 0? '': Actuacion.actuacionesFirme.espesorBaseArcen + ' cm.'}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapaSubBaseArc"><Translation ns= "global">{(t) => <>{t('CapaSubBaseArc')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idArcenDdCapasSubbase}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorSubBaseArc"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorSubbaseArcen <= 0? '': Actuacion.actuacionesFirme.espesorSubbaseArcen + ' cm.'}</Col>
          </Row>

      

          <Row>      
            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapRodArc"><Translation ns= "global">{(t) => <>{t('CapaRodArc')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idArcenDdCapasRodadura}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorRodArc"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorRodaduraArcen <= 0? '': Actuacion.actuacionesFirme?.espesorRodaduraArcen + ' cm.'}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CapaIntArc"><Translation ns= "global">{(t) => <>{t('CapaIntArc')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.idArcenDdCapasIntermedia}</Col>

            <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspesorIntArc"><Translation ns= "global">{(t) => <>{t('Esps')}</>}</Translation></label></Col>            
            <Col xs={1}>{Actuacion.actuacionesFirme?.espesorSubbaseArcen <= 0? '': Actuacion.actuacionesFirme?.espesorSubbaseArcen + ' cm.'}</Col>
          </Row>

          <Row>
          <br /><hr width="70%"></hr> <br />
          </Row>

          <Row>
          <h3><Col xs={2} style={{textAlign: "right", fontWeight: 'bold', color: '#a11510'}}><label htmlFor="DatosExplanada"><Translation ns= "global">{(t) => <>{t('DatosExplanada')}</>}</Translation></label></Col>  </h3> 
          </Row>

          <Row>       
          <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspCoronacion"><Translation ns= "global">{(t) => <>{t('EspCoronacion')}</>}</Translation></label></Col>            
          <Col xs={1}>{(Actuacion.actuacionesExplanada?.coronacion <= 0 || Actuacion.actuacionesExplanada == null) ? '': Actuacion.actuacionesExplanada?.coronacion + ' cm.'}</Col>

          <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CBRCoronacion"><Translation ns= "global">{(t) => <>{t('CBRCoronacion')}</>}</Translation></label></Col>            
          <Col xs={1}>{Actuacion.actuacionesExplanada?.coronacionCbr}</Col>

          <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspRelleno"><Translation ns= "global">{(t) => <>{t('EspRelleno')}</>}</Translation></label></Col>            
          <Col xs={1}>{(Actuacion.actuacionesExplanada?.relleno <= 0 || Actuacion.actuacionesExplanada == null)? '': Actuacion.actuacionesExplanada?.relleno + ' cm.'}</Col>

          <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CBRRelleno"><Translation ns= "global">{(t) => <>{t('CBRRelleno')}</>}</Translation></label></Col>            
          <Col xs={1}>{Actuacion.actuacionesExplanada?.rellenoCbr}</Col>
        </Row>

        <Row>       
          <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="EspTerreno"><Translation ns= "global">{(t) => <>{t('EspTerreno')}</>}</Translation></label></Col>            
          <Col xs={1}>{(Actuacion.actuacionesExplanada?.relleno <= 0 || Actuacion.actuacionesExplanada == null)? '': Actuacion.actuacionesExplanada?.relleno + ' cm.'}</Col>

          <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CBRTerreno"><Translation ns= "global">{(t) => <>{t('CBRTerreno')}</>}</Translation></label></Col>            
          <Col xs={1}>{Actuacion.actuacionesExplanada?.rellenoCbr}</Col>

          <Col xs={2} style={{textAlign: "right", fontWeight: 'bold'}}><label htmlFor="CategoriaExpl"><Translation ns= "global">{(t) => <>{t('CategoriaExplanada')}</>}</Translation></label></Col>            
          <Col xs={1}>{Actuacion.actuacionesExplanada?.idDdCategoriasExplanadas != null ? Actuacion.actuacionesExplanada?.idDdCategoriasExplanadas : ''}</Col>
        </Row>
        </Container>                                               
      </div>
    )
}

export default InfoActuaciones;