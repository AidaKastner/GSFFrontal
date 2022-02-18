import React, { Component, useState , Fragment} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import '../css/Pagination.css';
import '../css/Menu.css';
import { Translation, useTranslation, Trans } from 'react-i18next';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Tab from "./Tab";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from "./Spinner"; 
import Container from 'react-bootstrap/Container'
import Select from 'react-select';
import GoogleMapComponent from "./GoogleMapComponent";

let SentCarril="";

var msg = '';
const url = "https://localhost:44301/Tramos/";
const url2 = "https://localhost:44301/Tramos/baja";
const url3 = "https://localhost:44301/Tramos/alta";
const urlDel = "https://localhost:44301/Carriles";
const urlDelAus = "https://localhost:44301/api/Auscultaciones/carrilaus";

//Combo Redes
const comboRedes = [
{ label: "Xarxa local", value: "Xarxa local" },
{ label: "Xarxa comarcal secundària", value: "Xarxa comarcal secundària" },
{ label: "Xarxa comarcal primària", value: "Xarxa comarcal primària" },
{ label: "Xarxa comarcal", value: "Xarxa comarcal" },
{ label: "Xarxa bàsica transeuropea", value: "Xarxa bàsica transeuropea" },
{ label: "Xarxa bàsica secundària", value: "Xarxa bàsica secundària" },
{ label: "Xarxa bàsica restant", value: "Xarxa bàsica restant" },
{ label: "Xarxa bàsica primària transeuropea", value: "Xarxa bàsica primària transeuropea" },
{ label: "Xarxa bàsica primària", value: "Xarxa bàsica primària" },
{ label: "Xarxa bàsica", value: "Xarxa bàsica" },
{ label: "No informat", value: "No informat" },
{ label: "Desconegut", value: "Desconegut" },
{ label: "Carrils Adicionals", value: "Carrils Adicionals" },
{ label: "Altres (AL)", value: "Altres (AL)" },
{ label: "Altres (A)", value: "Altres (A)" },
{ label: "Altres", value: "Altres" }
];


//Combo Organismos
const comboOrg = [
{label: "Altres", value: "Altres" },
{label: "Autopistes, Concesionaria Española, S.A.", value: "Autopistes, Concesionaria Española, S.A." },
{label: "Autopistes Concessionària Espanyola SA", value: "Autopistes Concessionària Espanyola SA" },
{label: "AcesaMediterrani", value: "AcesaMediterrani" },
{label: "Ajuntament", value: "Ajuntament" },
{label: "Altres", value: "Altres" },
{label: "Àrea Metropolitana de Barcelona", value: "Àrea Metropolitana de Barcelona" },
{label: "Parc d'Argentona", value: "Parc d'Argentona" },
{label: "Argentona", value: "Argentona" },
{label: "Autopistes de Catalunya, S.A.", value: "Autopistes de Catalunya, S.A." },
{label: "Autopista Pau Casals", value: "Autopista Pau Casals" },
{label: "Autopistes del Marenostrum", value: "Autopistes del Marenostrum" },
{label: "AumarMediterraniSud", value: "AumarMediterraniSud" },
{label: "Autopista Terrassa - Manresa, S.A.", value: "Autopista Terrassa - Manresa, S.A." },
{label: "Eix del Llobregat Sud", value: "Eix del Llobregat Sud" },
{label: "Parc de Berga", value: "Parc de Berga" },
{label: "Berga", value: "Berga" },
{label: "Parc de Bianya", value: "Parc de Bianya" },
{label: "Bianya", value: "Bianya" },
{label: "Cadi", value: "Cadi" },
{label: "Catalunya", value: "Catalunya" },
{label: "Centre de control de Vic", value: "Centre de control de Vic" },
{label: "Consell Comarcal del Barcelonès", value: "Consell Comarcal del Barcelonès" },
{label: "Centre de Control de Vic", value: "Centre de Control de Vic" },
{label: "Cedinsa d'Aro Concesionaria de la Generalitat de Catalunya", value: "Cedinsa d'Aro Concesionaria de la Generalitat de Catalunya" },
{label: "Concessió i Explotació d'Infraestructures, S.A.", value: "Concessió i Explotació d'Infraestructures, S.A." },
{label: "Eix del Llobregat Centre", value: "Eix del Llobregat Centre" },
{label: "Eix Congost - Ter Nord", value: "Eix Congost - Ter Nord" },
{label: "Eix Transversal Est", value: "Eix Transversal Est" },
{label: "Eix Transversal Oest", value: "Eix Transversal Oest" },
{label: "Maçanet - Platja d'Aro", value: "Maçanet - Platja d'Aro" },
{label: "Cedinsa Eix Transversal", value: "Cedinsa Eix Transversal" },
{label: "Cedinsa Ter Concesionaria de la Generalitat de Catalunya", value: "Cedinsa Ter Concesionaria de la Generalitat de Catalunya" },
{label: "Concessionàries", value: "Concessionàries" },
{label: "Demarcación de Carreteras del Estado en Catalunya", value: "Demarcación de Carreteras del Estado en Catalunya" },
{label: "Desconegut", value: "Desconegut" },
{label: "Diputació de Barcelona", value: "Diputació de Barcelona" },
{label: "Diputació de Girona", value: "Diputació de Girona" },
{label: "Diputació de Lleida", value: "Diputació de Lleida" },
{label: "Diputacions", value: "Diputacions" },
{label: "DipBarcelona", value: "DipBarcelona" },
{label: "DipGirona", value: "DipGirona" },
{label: "DipLleida", value: "DipLleida" },
{label: "DipTarragona", value: "DipTarragona" },
{label: "Gestionat per la pròpia Administració", value: "Gestionat per la pròpia Administració" },
{label: "Diputació de Tarragona", value: "Diputació de Tarragona" },
{label: "Diputació de Terol (Aragó)", value: "Diputació de Terol (Aragó)" },
{label: "Eix Diagonal, Concessionària de la Generalitat de Catalunya, SA", value: "Eix Diagonal, Concessionària de la Generalitat de Catalunya, SA" },
{label: "Parc d'Esterri d'Aneu", value: "Parc d'Esterri d'Aneu" },
{label: "Estat", value: "Estat" },
{label: "Administració de l'Estat a Catalunya", value: "Administració de l'Estat a Catalunya" },
{label: "Carreteres de l'Estat Barcelona", value: "Carreteres de l'Estat Barcelona" },
{label: "Esterri d'Aneu", value: "Esterri d'Aneu" },
{label: "Esterri d'Aneu", value: "Esterri d'Aneu" },
{label: "Carreteres de l'Estat Girona", value: "Carreteres de l'Estat Girona" },
{label: "Carreteres de l'Estat Lleida", value: "Carreteres de l'Estat Lleida" },
{label: "Carreteres de l'Estat Tarragona", value: "Carreteres de l'Estat Tarragona" },
{label: "Generalitat de Catalunya", value: "Generalitat de Catalunya" },
{label: "Generalitat / Diputació de Barcelona", value: "Generalitat / Diputació de Barcelona" },
{label: "Generalitat / Demarcación Carreteres", value: "Generalitat / Demarcación Carreteres" },
{label: "Generalitat de Catalunya", value: "Generalitat de Catalunya" },
{label: "Parc de Girona", value: "Parc de Girona" },
{label: "Girona", value: "Girona" },
{label: "Gestió d'Infraestructures, S.A.", value: "Gestió d'Infraestructures, S.A." },
{label: "Conservació integral carreteres alta intensitat", value: "Conservació integral carreteres alta intensitat" },
{label: "Conservació integral carreteres centro control de Vic", value: "Conservació integral carreteres centro control de Vic" },
{label: "Parc d'Igualada", value: "Parc d'Igualada" },
{label: "Igualada", value: "Igualada" },
{label: "Conservació integral carreteres Manresa", value: "Conservació integral carreteres Manresa" },
{label: "Contracte integral de manteniment", value: "Contracte integral de manteniment" },
{label: "Infraestructures Viàries de Catalunya, S.A.", value: "Infraestructures Viàries de Catalunya, S.A." },
{label: "Autopista del Maresme", value: "Autopista del Maresme" },
{label: "Barcelona - Montmeló", value: "Barcelona - Montmeló" },
{label: "Eix Diagonal", value: "Eix Diagonal" },
{label: "Reus - Alcover", value: "Reus - Alcover" },
{label: "Parc de Lleida", value: "Parc de Lleida" },
{label: "Llagostera", value: "Llagostera" },
{label: "Lleida", value: "Lleida" },
{label: "Barcelona Oest", value: "Barcelona Oest" },
{label: "Ministeri de Foment", value: "Ministeri de Foment" },
{label: "Montblanc", value: "Montblanc" },
{label: "NoInformat", value: "NoInformat" },
{label: "Parc de Ponts", value: "Parc de Ponts" },
{label: "Ponts", value: "Ponts" },
{label: "PremiaDeMar", value: "PremiaDeMar" },
{label: "PuigReig", value: "PuigReig" },
{label: "Reus -  Alcover concessionaria de la Generalitat de Catalunya S.A.", value: "Reus -  Alcover concessionaria de la Generalitat de Catalunya S.A." },
{label: "Parc de Reus", value: "Parc de Reus" },
{label: "Reus", value: "Reus" },
{label: "Parc de Reus Nord", value: "Parc de Reus Nord" },
{label: "Parc de Sabadell", value: "Parc de Sabadell" },
{label: "Sabadell", value: "Sabadell" },
{label: "SantaSusanna", value: "SantaSusanna" },
{label: "SantVicenç", value: "SantVicenç" },
{label: "Servició de Conservación y Explotación de Carreteras de Barcelona", value: "Servició de Conservación y Explotación de Carreteras de Barcelona" },
{label: "Sense definir-ne la titulació", value: "Sense definir-ne la titulació" },
{label: "Servei d'Equipaments i Dades Viàries", value: "Servei d'Equipaments i Dades Viàries" },
{label: "SelvaDelCamp", value: "SelvaDelCamp" },
{label: "Servei d'Instal.lacions i Equipaments Viaris", value: "Servei d'Instal.lacions i Equipaments Viaris" },
{label: "Parc de Solsona", value: "Parc de Solsona" },
{label: "Solsona", value: "Solsona" },
{label: "Servei Territorial de Carreteres de Barcelona", value: "Servei Territorial de Carreteres de Barcelona" },
{label: "Servei Territorial de Carreteres de Terres de l'Ebre", value: "Servei Territorial de Carreteres de Terres de l'Ebre" },
{label: "Servei Territorial de Carreteres de Girona", value: "Servei Territorial de Carreteres de Girona" },
{label: "Servei Territorial de Carreteres de Lleida", value: "Servei Territorial de Carreteres de Lleida" },
{label: "Servei Territorial de Carreteres de Tarragona", value: "Servei Territorial de Carreteres de Tarragona" },
{label: "Servei Territorial de Mobilitat de Terres de l'Ebre", value: "Servei Territorial de Mobilitat de Terres de l'Ebre" },
{label: "Tunels i Accessos de Barcelona, S.A.", value: "Tunels i Accessos de Barcelona, S.A." },
{label: "Túnels Barcelona Cadi SA", value: "Túnels Barcelona Cadi SA" },
{label: "Tunel del Cadi", value: "Tunel del Cadi" },
{label: "TerCongost", value: "TerCongost" },
{label: "Barcelona Est", value: "Barcelona Est" },
{label: "Terrassa", value: "Terrassa" },
{label: "Parc de Tortosa", value: "Parc de Tortosa" },
{label: "Tortosa", value: "Tortosa" },
{label: "Parc de Tremp", value: "Parc de Tremp" },
{label: "TransversalEst", value: "TransversalEst" },
{label: "TransversalOest", value: "TransversalOest" },
{label: "Tremp", value: "Tremp" },
{label: "Tùnels", value: "Tùnels" },
{label: "Túnel del Cadí", value: "Túnel del Cadí" },
{label: "Túnels de Vallvidrera", value: "Túnels de Vallvidrera" },
{label: "Unidad de Carreteras de Girona", value: "Unidad de Carreteras de Girona" },
{label: "Unidad de Carreteras de Lleida", value: "Unidad de Carreteras de Lleida" },
{label: "Unidad de Carreteras de Tarragona", value: "Unidad de Carreteras de Tarragona" },
{label: "Vallcarca", value: "Vallcarca" },
{label: "Vallvidrera", value: "Vallvidrera" },
{label: "Parc de Vidreres", value: "Parc de Vidreres" },
{label: "Parc de Vic", value: "Parc de Vic" },
{label: "Vic", value: "Vic" },
{label: "Vidreres", value: "Vidreres" },
{label: "Viladecans", value: "Viladecans" },
{label: "Vilafranca", value: "Vilafranca" },
{label: "Parc de Viladecans", value: "Parc de Viladecans" }
  
];


//Combo Org. Explo
const comboExplo = [
{ label: "AcesaMediterrani", value: "AcesaMediterrani" },
{ label: "AMB", value: "AMB" },
{ label: "Argentona", value: "Argentona" },
{ label: "AumarMediterraniSud", value: "AumarMediterraniSud" },
{ label: "Berga", value: "Berga" },
{ label: "Bianya", value: "Bianya" },
{ label: "Cadi", value: "Cadi" },
{ label: "Concessió amb cànon", value: "Concessió amb cànon" },
{ label: "Concessió lliure de peatge", value: "Concessió lliure de peatge" },
{ label: "Concessió amb peatge", value: "Concessió amb peatge" },
{ label: "Desconegut", value: "Desconegut" },
{ label: "DipBarcelona", value: "DipBarcelona" },
{ label: "DipGirona", value: "DipGirona" },
{ label: "DipLleida", value: "DipLleida" },
{ label: "DipTarragona", value: "DipTarragona" },
{ label: "Encàrrec de gestió", value: "Encàrrec de gestió" },
{ label: "Estat", value: "Estat" },
{ label: "Estat", value: "Estat" },
{ label: "Esterri", value: "Esterri" },
{ label: "Esterri d'Aneu", value: "Esterri d'Aneu" },
{ label: "Girona", value: "Girona" },
{ label: "Igualada", value: "Igualada" },
{ label: "Llagostera", value: "Llagostera" },
{ label: "Lleida", value: "Lleida" },
{ label: "Manresa", value: "Manresa" },
{ label: "Montblanc", value: "Montblanc" },
{ label: "Ponts", value: "Ponts" },
{ label: "PremiaDeMar", value: "PremiaDeMar" },
{ label: "Públic", value: "Públic" },
{ label: "PuigReig", value: "PuigReig" },
{ label: "Reus", value: "Reus" },
{ label: "Sabadell", value: "Sabadell" },
{ label: "SantaSusanna", value: "SantaSusanna" },
{ label: "SantVicenç", value: "SantVicenç" },
{ label: "SelvaDelCamp", value: "SelvaDelCamp" },
{ label: "Solsona", value: "Solsona" },
{ label: "TerCongost", value: "TerCongost" },
{ label: "Terrassa", value: "Terrassa" },
{ label: "Tortosa", value: "Tortosa" },
{ label: "TransversalEst", value: "TransversalEst" },
{ label: "TransversalOest", value: "TransversalOest" },
{ label: "Tremp", value: "Tremp" },
{ label: "Tunels", value: "Tunels" },
{ label: "Vallcarca", value: "Vallcarca" },
{ label: "Vallvidrera", value: "Vallvidrera" },
{ label: "Vic", value: "Vic" },
{ label: "Vidreres", value: "Vidreres" },
{ label: "Viladecans", value: "Viladecans" },
{ label: "Vilafranca", value: "Vilafranca" }
];


//Combo Gestión
const comboGest = [
  {label: "Autopistes, Concessionària espanyola, S.A.", value: "Autopistes, Concessionària espanyola, S.A." },
  {label: "Altres", value: "Altres" },
  {label: "Autopistes de Catalunya S.A.", value: "Autopistes de Catalunya S.A." },
  {label: "Autopista del Marenostrum", value: "Autopista del Marenostrum" },
  {label: "Autopista Terrassa-Manresa, S.A.", value: "Autopista Terrassa-Manresa, S.A." },
  {label: "Consell comarcal Barcelonés", value: "Consell comarcal Barcelonés" },
  {label: "Cedinsa d'Aro Concesionaria de la Generalitat de Catalunya", value: "Cedinsa d'Aro Concesionaria de la Generalitat de Catalunya" },
  {label: "Cedida", value: "Cedida" },
  {label: "Cedinsa Eix Transversal", value: "Cedinsa Eix Transversal" },
  {label: "CEDINSA Eix Llobregat", value: "CEDINSA Eix Llobregat" },
  {label: "Cedinsa Ter Concessionaria de la Generalitat de Catalunya", value: "Cedinsa Ter Concessionaria de la Generalitat de Catalunya" },
  {label: "IndConcessio", value: "IndConcessio" },
  {label: "Desconegut", value: "Desconegut" },
  {label: "Directament per la pròpia administració competent", value: "Directament per la pròpia administració competent" },
  {label: "Directa", value: "Directa" },
  {label: "Directa", value: "Directa" },
  {label: "Eix Diagonal concessionària de la Generalitat de Catalunya", value: "Eix Diagonal concessionària de la Generalitat de Catalunya" },
  {label: "Indirecta de peatge implícit o per cánon", value: "Indirecta de peatge implícit o per cánon" },
  {label: "Indirecta de peatge explícit, per concessió", value: "Indirecta de peatge explícit, per concessió" },
  {label: "Indirecta conveniada", value: "Indirecta conveniada" },
  {label: "Indirecta de peatge explícit, per encàrrec de gestió", value: "Indirecta de peatge explícit, per encàrrec de gestió" },
  {label: "Indirecta de peatge explícit, sense pagament", value: "Indirecta de peatge explícit, sense pagament" },
  {label: "INVICAT (Infraestructures Viàries de Catalunya S.A.)", value: "INVICAT (Infraestructures Viàries de Catalunya S.A.)" },
  {label: "No informat", value: "No informat" },
  {label: "Reus - Alcover concessionaria de la Generalitat de Catalunya S.A.", value: "Reus - Alcover concessionaria de la Generalitat de Catalunya S.A." },
  {label: "Túnels i Accessos a Barcelona, S.A.", value: "Túnels i Accessos a Barcelona, S.A." },
  {label: "Túnels Barcelona Cadi SA", value: "Túnels Barcelona Cadi SA" },
  {label: "Túnel  del Cadí", value: "Túnel  del Cadí" }
];

//Combo Zona térmica
const comboZonTer = [
{label: "ZT1", value: "ZT1" },
{label: "ZT2", value: "ZT2" },
{label: "ZT3", value: "ZT3" }
];

//Combo Zona Pluviométrica
const comboZonPluv = [
  {label: "ZPH", value: "ZPH" },
  {label: "ZPS", value: "ZPS" }
  ];

//Combo tec Real
const comboTecReal = [
{ label: "Autopista (A)", value: "Autopista (A)"},
{ label: "Altres", value: "Altres"},
{ label: "Autopista", value: "Autopista"},
{ label: "Autovia o via preferent de doble calçada", value: "Autovia o via preferent de doble calçada"},
{ label: "Autovia", value: "Autovia"},
{ label: "Carretera amb limitació d'accessos de doble calçada", value: "Carretera amb limitació d'accessos de doble calçada"},
{ label: "Convencional", value: "Convencional"},
{ label: "Carretera amb limitació d'accessos", value: "Carretera amb limitació d'accessos"},
{ label: "Carretera convencional", value: "Carretera convencional"},
{ label: "Calçada lateral", value: "Calçada lateral"},
{ label: "Carretera de calçada única", value: "Carretera de calçada única"},
{ label: "Desconegut (DES)", value: "Desconegut (DES)"},
{ label: "Carretera multicarril", value: "Carretera multicarril"},
{ label: "No informat", value: "No informat"},
{ label: "PreferentUna", value: "PreferentUna"},
{ label: "Preferent 2 calç.", value: "Preferent 2 calç."},
{ label: "Via preferent d'una calçada", value: "Via preferent d'una calçada"},
{ label: "Reus - Alcover concessionaria de la Generalitat de Catalunya S.A.", value: "Reus - Alcover concessionaria de la Generalitat de Catalunya S.A."},
{ label: "Travessera", value: "Travessera"},
{ label: "Via per automòbils", value: "Via per automòbils"}
];

//Combo Terrenos naturales
const comboTerNat = [{ label: "Roca", value: "Roca" }, 
    { label: "Sòl adequat", value: "Sòl adequat" },
    { label: "Sòl inadequat", value: "Sòl inadequat" },
    { label: "Sòl marginal", value: "Sòl marginal" },
    { label: "Sòl seleccionat", value: "Sòl seleccionat" },
    { label: "Sòl tolerable", value: "Sòl tolerable" }
];

//Combo Explanadas
const comboExplanada = [{ label: "E1", value: "E1" }, 
    { label: "E2", value: "E2" },
    { label: "E3E", value: "E3E" },
    { label: "E3G", value: "E3G" }
];

//Combo Tipos Firmes
const comboTipoFirme = [{ label: "Flexible", value: "Flexible" }, 
    { label: "Rígid", value: "Rígid" },
    { label: "Semirrígid", value: "Semirrígid" }
];

//Combo Nivel Influencia
const comboNivelInfluencia = [{ label: "0", value: "0" }, 
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "S1", value: "S1" },
    { label: "S2", value: "S2" },
    { label: "S3", value: "S3" }
];


//Combo Tipologia MPD
const comboTipoMPD = [{ label: "Seleccionar", value: "" }, 
    { label: "Ascendente", value: "Ascendente" },
    { label: "Descendente", value: "Descendente" }
];

//Combo RodaduraFlex 
const comboRodFlex = [{ label: "Seleccionar", value: "" }, 
    { label: "AC16 surf D", value: "AC16 surf D" },
    { label: "AC16 surf S", value: "AC16 surf S" },
    { label: "AC22 surf D", value: "AC22 surf D" },
    { label: "AC22 surf S", value: "AC22 surf S" },
    { label: "BBTM 11A", value: "BBTM 11A" },
    { label: "BBTM 11B", value: "BBTM 11B" },
    { label: "BBTM 8A", value: "BBTM 8A" },
    { label: "BBTM 8B", value: "BBTM 8B" },
    { label: "PA11", value: "PA11" },
    { label: "PA16", value: "PA16" }
];

//Combo RodaduraSemi 
const comboRodSemi = [{ label: "Seleccionar", value: "" }, 
    { label: "AC16 surf D", value: "AC16 surf D" },
    { label: "AC16 surf S", value: "AC16 surf S" },
    { label: "AC22 surf D", value: "AC22 surf D" },
    { label: "AC22 surf S", value: "AC22 surf S" },
    { label: "PA11", value: "PA11" },
    { label: "PA16", value: "PA16" }
];


//Combo RodaduraRigid 
const comboRodRigid = [{ label: "Seleccionar", value: "" }, 
    { label: "HF", value: "HF" }
];

//Combo Rodadura 
let comboRod = [{ label: "Seleccionar", value: "" }];

//Combo IntermediaFlex 
const comboIntFlex = [{ label: "Seleccionar", value: "" }, 
    { label: "AC16 bin S", value: "AC16 bin S" },
    { label: "AC22 bin D", value: "AC22 bin D" },
    { label: "AC22 bin G", value: "AC22 bin G" },
    { label: "AC22 bin S", value: "AC22 bin S" },
    { label: "AC22 bin S MAM", value: "AC22 bin S MAM" },
    { label: "AC32 bin S", value: "AC32 bin S" }
];

//Combo IntermediaSemi 
const comboIntSemi = [{ label: "Seleccionar", value: "" }, 
    { label: "AC22 base G", value: "AC22 base G" },
    { label: "AC22 bin S MAM", value: "AC22 bin S MAM" },
    { label: "AC22 surf S", value: "AC22 surf S" },
    { label: "AC32 surf S", value: "AC32 surf S" }
];


//Combo IntermediaRigid 
const comboIntRigid = [{ label: "Seleccionar", value: "" }
];

//Combo Intermedia 
let comboInt = [{ label: "Seleccionar", value: "" }];


//Combo BaseFlex 
const comboBaseFlex = [{ label: "Seleccionar", value: "" }, 
    { label: "AC22 base G", value: "AC22 base G" },
    { label: "AC22 base S MAM", value: "AC22 base S MAM" },
    { label: "AC32 base G", value: "AC32 base G" },
    { label: "AC32 base S", value: "AC32 base S" }
];

//Combo BaseSemi 
const comboBaseSemi = [{ label: "Seleccionar", value: "" }, 
    { label: "AC22 base G", value: "AC22 base G" },
    { label: "AC22 bin S MAM", value: "AC22 bin S MAM" },
    { label: "AC32 base G", value: "AC32 base G" },
    { label: "AC32 surf S", value: "AC32 surf S" }
];


//Combo BaseRigid 
const comboBaseRigid = [{ label: "Seleccionar", value: "" }, 
{ label: "HM", value: "HM" },
{ label: "ZA", value: "ZA" }
];

//Combo Base 
let comboBase = [{ label: "Seleccionar", value: "" }];



//Combo SubBaseFlex 
const comboSubBaseFlex = [{ label: "Seleccionar", value: "" }, 
    { label: "AC22 base G", value: "AC22 base G" },
    { label: "GC", value: "GC" },
    { label: "HM", value: "HM" },
    { label: "SC", value: "SC" },
    { label: "ZA", value: "ZA" },
    { label: "ZN", value: "ZN" }
];

//Combo SubBaseSemi 
const comboSubBaseSemi = [{ label: "Seleccionar", value: "" }, 
    { label: "GC", value: "GC" },
    { label: "SC", value: "SC" }
];


//Combo SubBaseRigid 
const comboSubBaseRigid = [{ label: "Seleccionar", value: "" }
];

//Combo SubBase 
let comboSubBase = [{ label: "Seleccionar", value: "" }];


//Combo Calzada
const comboCalzada = [{ label: "Seleccionar", value: "" }, 
{ label: "Anada", value: "Anada" },
{ label: "Desconeguda", value: "Desconeguda" },
{ label: "Doble", value: "Doble" },
{ label: "Invers", value: "Invers" },
{ label: "Tornada", value: "Tornada" },
{ label: "Unic", value: "Unic" }
];

let authToken = sessionStorage.getItem("JWT");

let config = {
  headers: {
      'Authorization': authToken,
      'Accept': 'application/json',
      'content-type': 'application/json'
  }
}

var msgOut = <Translation ns= "global">{(t) => <>{t('NoReg')}</>}</Translation>;
var slice;
var sliceAct;

var today = new Date();
var dd = String(today. getDate()). padStart(2, '0');
var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
var yyyy = today. getFullYear();

today = yyyy + '-' + mm + '-' + dd;

class EditarTramo extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      idTramSel: props.id,
      idTramos: props.idTramos,
      offset: 0,
      offsetAf: 0,
      tableData: [],
      tableAforos: [],
      tableAct: [],
      aditionalData: [],
      orgtableData: [],
      perPage: 50000,
      currentPage: 0,
      modalEliminarCarril: false,
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
      ComboTipFirme: '',
      rutaKml: '',
      form:{
        id:'',
        nombre:'',
        actuacionesTramos: [],
        carretera:{
          nombre: '',
          codigo: '',
          id: '',              
          comentario: '',
          idGrafo: ''
        },
        carriles: [],
        comentario:'',
        longitud:'',
        idDdTiposCalzada:'',
        idCarreteras: '',
        idDdAutoriza:'',
        codificacionTecnicaReal: '',
        idTramoGemelo: '',
        rutaKml: '',
        idDdTipoVia: '',
        idDdMotivoActualizacion: '',
        idDdComarca: '',
        idPuntosIni: '',
        idPuntosFin: '',
        idDdRedes: '',
        idDdCodTecReal: '',
        idDdOrganismoConservacion: '',
        idDdOrganismoCompetente: '',
        idDdZonasPluviometricas: '',
        idDdZonasTermicas: '',
        idDdTiposCalzada: '',
        idDdRegimenGestion: '',
        idDdRegimenExplotacion: '',
        sistemaProyeccion: '',
        idTramoGemelo: '',
        estadoTram:'',
        idDdCodTecReal:'',
        idDdRedes:'',

        ddTiposCalzada:{
          nombre: '',
          codigo: ''
        },

        ddRede:{
          nombre: '',
          codigo: ''
        },
       
        ddCodTecRealModel:{
          nombre: '',
          codigo: ''
        },

        ddOrganismos:{
          nombre: '',
          codigo: ''
        },

        ddRegimenExplotacion:{
          nombre: '',
          codigo: ''
        },

        ddRegimenGestion:{
          nombre: '',
          codigo: ''
        },

        ddZonasTermica:{
          nombre: '',
          codigo: ''
        },

        ddZonasPluviometrica:{
          nombre: '',
          codigo: ''
        },

        firmesTramo:{
          idCarrilDdTiposFirmesTramo: '',
          idDdNivelesInfluencia: '',
          cpa: '',
          anchuraCarril: '',
          anchuraArcen: '',
          tipoLogModeloEvolMpd: '',
          idCarrilDdCapasRodadura: '',
          idCarrilDdCapasIntermedia: '',
          idCarrilDdCapasBase: '',
          idCarrilDdCapasSubbase: '',
          idArcenDdCapasRodadura: '',
          idArcenDdCapasIntermedia: '',
          idArcenDdCapasBase: '',
          idArcenDdCapasSubbase: '',
          espesorRodaduraCarril: '',
          espesorIntermediaCarril: '',
          espesorBaseCarril: '',
          espesorSubbaseCarril: '',
          espesorRodaduraArcen: '',
          espesorIntermediaArcen: '',
          espesorBaseArcen: '',
          espesorSubbaseArcen: '',
          id:''
        },
 
        carSent:'',
        carrOrd:'',
        idGrafo:'',
        IdCarreteras:'',
        IdCarril:'',
        explanadasTramo:{
          idDdTerrenosNaturales: '',
          terrenoNaturalCbr: '',
          idDdCategoriasExplanadas: '',
          relleno: '',
          rellenoCbr: '',
          coronacion: '',
          coronacionCbr: '',
          id: ''
        },
        puntoIni:{
          pk:'',
          m:'',
          descripcion:'',
          id: '',
          x: '',
          y: '',
          z: '',
          idDdPuntosCausaCorte: ''
        },
        puntoFin:{
          pk:'',
          m:'',
          descripcion:'',
          id: '',
          x: '',
          y: '',
          z: '',
          idDdPuntosCausaCorte: ''
        },
        pksdistoris: [],
        tramosAforos: []
      }
    }

    this.columns = [
      {dataField: 'remove', formatter: this.ButtonsEliminaCarr},
      {dataField: 'ordenCarrile', text:<Translation ns= "global">{(t) => <>{t('orden')}</>}</Translation>, sort: true},
      {dataField: 'sentidoCarril', text: <Translation ns= "global">{(t) => <>{t('sentido')}</>}</Translation>, sort: true},
      {dataField: 'auscul', text:<Translation ns= "global">{(t) => <>{t('auscul')}</>}</Translation>, formatter: this.ButtonsAccionesCarr}
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


//Boton de auscultaciones
ButtonsAccionesCarr = (cell, row, rowIndex) => {
return (
  <div>
    <button className="btn btn-danger btn-sm" onClick={(e)=>{e.preventDefault(); this.seleccionarCarril(row); this.setState({modalEliminarAusc: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
  </div>              

  );
};

//Boton de eliminación de Carriles
ButtonsEliminaCarr = (cell, row, rowIndex) => {
return (
  <div>
    <button className="btn btn-danger btn-sm" onClick={(e)=>{e.preventDefault(); this.seleccionarCarril(row); this.setState({modalEliminarCarril: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
  </div>              

  );
};


//Control mensaje de errores baja tramo
controlErrBaja=(controlErrorTramo)=>{
  console.log("Control de errores Baja Tramo: ", controlErrorTramo);

  switch(controlErrorTramo) {

    case 0: msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMKO00')}</>}</Translation>;
    break;

    case 1: msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMKO01')}</>}</Translation>;
    break;

    default: msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMKO00')}</>}</Translation>;
    break;

    }

}

//Control mensaje de errores baja tramo
controlErrAlta=(controlErrorTramo)=>{
  console.log("Control de errores Baja Tramo: ", controlErrorTramo);

  switch(controlErrorTramo) {

    case 0: msg= <Translation ns= "global">{(t) => <>{t('ALTATRAMKO00')}</>}</Translation>;
    break;

    default: msg= <Translation ns= "global">{(t) => <>{t('ALTATRAMKO00')}</>}</Translation>;
    break;

    }

}


  //Maneja la edición  en los forms
  handleChange=async e=>{
    e.persist();
    console.log("TARGET NAME: ", e.target.name);
    const name = e.target.name;
    switch (name) {
      case 'fechabaja':
        await this.setState({
          'estadoTram': e.target.value
        });
        break;
      case 'comentario':
      case 'longitud':
        await this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        break;
      case 'fechaalta':
        await this.setState({
          form: {
            ...this.state.form,
            'fechaAlta': e.target.value
          }
        });
        break;
      case 'PosIni':
      case 'PosFin':
        await this.setState({
          form: {
            ...this.state.form,
            'descFin': e.target.value
          }
        });
        break;
      case 'nombre':
        await this.setState({
          form: {
            ...this.state.form,
            carretera: {
              ...this.state.form.carretera,
              'nombre': e.target.value
            }
          }
        });
        break;
      case 'codigo':
        await this.setState({
          form: {
            ...this.state.form,
            carretera: {
              ...this.state.form.carretera,
              [e.target.name]: e.target.value
            }
          }
        });
        break;
      case 'pkIni':
        await this.setState({
          form: {
            ...this.state.form,
            puntoIni: {
              ...this.state.form.puntoIni,
              'pk': e.target.value
            }
          }
        });
        break;
      case 'mIni':
        await this.setState({
          form: {
            ...this.state.form,
            puntoIni: {
              ...this.state.form.puntoIni,
              'm': e.target.value
            }
          }
        });
        break;
      case 'descIni':
        await this.setState({
          form: {
            ...this.state.form,
            puntoIni: {
              ...this.state.form.puntoIni,
              'descripcion': e.target.value
            }
          }
        });
        break;
      case 'pkFin':
        await this.setState({
          form: {
            ...this.state.form,
            puntoFin: {
              ...this.state.form.puntoFin,
              'pk': e.target.value
            }
          }
        });
        break;
      case 'mFin':
        await this.setState({
          form: {
            ...this.state.form,
            puntoFin: {
              ...this.state.form.puntoFin,
              'm': e.target.value
            }
          }
        });
        break;
      case 'descFin':
        await this.setState({
          form: {
            ...this.state.form,
            puntoFin: {
              ...this.state.form.puntoFin,
              'descripcion': e.target.value
            }
          }
        });
        break;
      case 'CPA':
        await this.setState({
          form: {
            ...this.state.form,
            firmesTramo: {
              ...this.state.form.firmesTramo,
              'cpa': e.target.value
            }
          }
        });
        break;

      case 'anchuraCarril':
        await this.setState({
          form: {
            ...this.state.form,
            firmesTramo: {
              ...this.state.form.firmesTramo,
              'anchuraCarril': e.target.value
            }
          }
        });
        break;

      case 'anchuraArcen':
        await this.setState({
          form: {
            ...this.state.form,
            firmesTramo: {
              ...this.state.form.firmesTramo,
              'anchuraArcen': e.target.value
            }
          }
        });
        break;
      
      case 'cbr':
        await this.setState({
          form: {
            ...this.state.form,
            explanadasTramo: {
              ...this.state.form.explanadasTramo,
              'terrenoNaturalCbr': e.target.value
            }
          }
        });
        break;      
      
      case 'relleno':
        await this.setState({
          form: {
            ...this.state.form,
            explanadasTramo: {
              ...this.state.form.explanadasTramo,
              'relleno': e.target.value
            }
          }
        });
        break;  

      case 'rellenoCbr':
        await this.setState({
          form: {
            ...this.state.form,
            explanadasTramo: {
              ...this.state.form.explanadasTramo,
              'rellenoCbr': e.target.value
            }
          }
        });
        break;  

      case 'coronacion':
        await this.setState({
          form: {
            ...this.state.form,
            explanadasTramo: {
              ...this.state.form.explanadasTramo,
              'coronacion': e.target.value
            }
          }
        });
        break;

      case 'coronacionCbr':
        await this.setState({
          form: {
            ...this.state.form,
            explanadasTramo: {
              ...this.state.form.explanadasTramo,
              'coronacionCbr': e.target.value
            }
          }
        });
        break;
        

      default:
        await this.setState({
          form:{
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        break;
    }
    
    console.log("Funcion Handle",this.state.form);
    console.log("Indice: ",this.state.Index);
  }


//Maneja la edición  en los forms
handleChangeCombos=(e, {name})=>{
  //e.persist();
  console.log("TARGET e: ", e);
  console.log("TARGET name: ", name);
  console.log("TARGET value: ", e.value);
  const valor = e.value;
  const names = name;
  switch (names) {
    case 'ClasFunRedes':
      console.log("VALOR: ", valor);
      this.state.form.ddRede.nombre = valor;
      this.setState({
        form: {
          ...this.state.form,
          ddRede: {
            ...this.state.form.ddRede,
            'nombre': valor
          }
        }
      });
      console.log("CASE STATE: ", this.state.form.ddRede);
      break;

    case 'ClasTecReal':
      console.log("VALOR: ", valor);
      this.state.form.ddCodTecRealModel.nombre = valor;
      this.setState({
        form: {
          ...this.state.form,
          ddCodTecRealModel: {
            ...this.state.form.ddCodTecRealModel,
            'nombre': valor
          }
        }
      });
      console.log("CASE STATE: ", this.state.form.ddCodTecRealModel);
      break;

    case 'OrgCons':
      console.log("VALOR: ", valor);
      this.state.form.ddOrganismos.nombre = valor;
      this.setState({
        form: {
          ...this.state.form,
          ddOrganismos: {
            ...this.state.form.ddOrganismos,
            'nombre': valor
          }
        }
      });
      console.log("CASE STATE: ", this.state.form.ddOrganismos);
      break;

            case 'OrgCom':
              console.log("VALOR: ", valor);
              this.state.form.ddOrganismos.nombre = valor;
              this.setState({
                  form: {
                    ...this.state.form,
                    ddOrganismos: {
                      ...this.state.form.ddOrganismos,
                      'nombre': valor
                    }
                  }
                });
                console.log("CASE STATE: ", this.state.form.ddOrganismos);
                break;

           case 'RegGest':
              console.log("VALOR: ", valor);
              this.state.form.ddRegimenGestion.nombre = valor;
              this.setState({
                  form: {
                    ...this.state.form,
                    ddRegimenGestion: {
                      ...this.state.form.ddRegimenGestion,
                      'nombre': valor
                    }
                  }
                });
                console.log("CASE STATE: ", this.state.form.ddRegimenGestion);
                break;

            case 'RegExpl':
                console.log("VALOR: ", valor);
                  this.state.form.ddRegimenExplotacion.nombre = valor;
                  this.setState({
                      form: {
                        ...this.state.form,
                        ddRegimenExplotacion: {
                          ...this.state.form.ddRegimenExplotacion,
                          'nombre': valor
                        }
                      }
                    });
                    console.log("CASE STATE: ", this.state.form.ddRegimenExplotacion);
                    break;

    case 'zonTer':
      console.log("VALOR: ", valor);
      this.state.form.ddZonasTermica.codigo = valor;
      this.setState({
          form: {
              ...this.state.form,
              ddZonasTermica: {
                 ...this.state.form.ddZonasTermica,
                 'codigo': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.ddZonasTermica);
      break;

    case 'ZonaPluv':
      console.log("VALOR: ", valor);
      this.state.form.ddZonasPluviometrica.codigo = valor;
      this.setState({
          form: {
              ...this.state.form,
              ddZonasPluviometrica: {
                ...this.state.form.ddZonasPluviometrica,
                'codigo': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.ddZonasPluviometrica);
      break;
    case 'NivelInfluencia':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idDdNivelesInfluencia = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idDdNivelesInfluencia': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'MPD':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.tipoLogModeloEvolMpd = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'tipoLogModeloEvolMpd': valor
              }
          }
        });
        console.log("CASE STATE: ", this.state.form.firmesTramo);
        break;

    case 'CapaRodadura':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idCarrilDdCapasRodadura = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idCarrilDdCapasRodadura': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idArcenDdCapasRodadura':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idArcenDdCapasRodadura = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idArcenDdCapasRodadura': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;
  
    case 'idCarrilDdCapasIntermedia':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idCarrilDdCapasIntermedia = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idCarrilDdCapasIntermedia': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idArcenDdCapasIntermedia':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idArcenDdCapasIntermedia = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idArcenDdCapasIntermedia': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idCarrilDdCapasBase':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idCarrilDdCapasBase = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idCarrilDdCapasBase': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idArcenDdCapasBase':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idArcenDdCapasBase = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idArcenDdCapasBase': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idCarrilDdCapasSubbase':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idCarrilDdCapasSubbase = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idCarrilDdCapasSubbase': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idArcenDdCapasSubbase':
      console.log("VALOR: ", valor);
      this.state.form.firmesTramo.idArcenDdCapasSubbase = valor;
      this.setState({
          form: {
              ...this.state.form,
              firmesTramo: {
                ...this.state.form.firmesTramo,
                'idArcenDdCapasSubbase': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idDdTerrenosNaturales':
      console.log("VALOR: ", valor);
      this.state.form.explanadasTramo.idDdTerrenosNaturales = valor;
      this.setState({
          form: {
              ...this.state.form,
              explanadasTramo: {
                ...this.state.form.explanadasTramo,
                'idDdTerrenosNaturales': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idDdCategoriasExplanadas':
      console.log("VALOR: ", valor);
      this.state.form.explanadasTramo.idDdCategoriasExplanadas = valor;
      this.setState({
          form: {
              ...this.state.form,
              explanadasTramo: {
                ...this.state.form.explanadasTramo,
                'idDdCategoriasExplanadas': valor
              }
          }
      });
      console.log("CASE STATE: ", this.state.form.firmesTramo);
      break;

    case 'idDdTiposCalzada':
      console.log("VALOR: ", valor);
      this.state.form.idDdTiposCalzada = valor;
      this.setState({
          form: {
              ...this.state.form,
              idDdTiposCalzada: valor            
          }
      });
      console.log("CASE STATE: ", this.state.form);
      break;
      

    default:
      this.setState({
        form:{
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      });
      break;
  }
  console.log("Funcion Handle Combo",this.state.form);

}

    handleComboTipFirme = async e => {
      console.log("EVENTO COMBO: ", e.value);
      //e.persist();
      this.state.form.firmesTramo.idCarrilDdTiposFirmesTramo = e.value;
      await this.setState({
        form:{
          ...this.state.form,
          firmesTramo: {
            ...this.state.form.firmesTramo,
            'idCarrilDdTiposFirmesTramo': e.value,
            idCarrilDdCapasRodadura: '',
            idArcenDdCapasRodadura: '',
            idCarrilDdCapasIntermedia: '',
            idArcenDdCapasIntermedia: '',
            idCarrilDdCapasBase: '',
            idArcenDdCapasBase: '',
            idCarrilDdCapasSubbase: '',
            idArcenDdCapasSubbase: ''
          }
        },
        ComboTipFirme: e.value
      });
      console.log("Combo Tipo Firme: ", this.state.ComboTipFirme);
      console.log("Objeto API: ", this.state.form);
      this.getComboRodadura(this.state.ComboTipFirme);
    };

  
  componentDidMount(){
    this.peticionGet();

  }

  // Cambia el índice de la Tab
  onChange = activeIndex => {
    this.setState({
      activeIndex
    });
  };


/*Obtención de Tramo Seleccionado*/
peticionGet=()=>{
  console.log("Tramo escogido en Edición: ",this.state.idTramSel);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  
  axios.get(this.state.idTramSel, config).then(response=>{
    console.log("Data Edición", response.data);
    var dataCarriles = [];
    var data = response.data.carriles;
    if (data != null) {
      slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
      slice.forEach((carrile) => {
        dataCarriles.push({
          id: carrile.id,
          ordenCarrile: carrile.ordenCarril,
          sentidoCarril: carrile.sentido,
          idTramos: carrile.idTramos
        });
      });
    }
    var dataAct = response.data.actuacionesTramos;
    if (dataAct != null) {
      sliceAct = dataAct.slice(this.state.offset, this.state.offset + this.state.perPage);
    }
    console.log("Data actuaciones", dataAct);

    if (data == null) {
      this.setState({ setMsgOutBoolKO: true });
    };

    if (dataAct == null) {
      this.setState({ setMsgOutActKO: true });
    };

    this.setState({
      orgtableData: response.data,
      tableData: dataCarriles,
      tableAforos: slice,
      tableAct: sliceAct,
      content: response,
      estadoTram: this.state.currentYear > response.data.fechaBaja ? 'Inactivo' : 'Activo',
      ComboTipFirme: response.data.firmesTramo.idCarrilDdTiposFirmesTramo,
      rutaKml: response.data.rutaKml,
      form: {
        id: response.data.id,
        nombre: response.data.nombre,
        actuacionesTramos: dataAct,
        carretera: response.data.carretera,
        carriles: data,
        comentario: response.data.comentario,
        longitud: response.data.longitud,
        fechaAlta: response.data.fechaAlta.substr(0, 10),
        fechaBaja: response.data.fechaBaja,
        idDdTiposCalzada: response.data.idDdTiposCalzada,
        idCarreteras: response.data.idCarreteras,
        idDdAutoriza: response.data.idDdAutoriza,
        codificacionTecnicaReal: response.data.codificacionTecnicaReal,
        idTramoGemelo: response.data.idTramoGemelo,
        rutaKml: response.data.rutaKml,
        idDdTipoVia: response.data.idDdTipoVia,
        idDdMotivoActualizacion: response.data.idDdMotivoActualizacion,
        idDdComarca: response.data.idDdComarca,
        idPuntosIni: response.data.idPuntosIni,
        idPuntosFin: response.data.idPuntosFin,
        idDdRedes: response.data.idDdRedes,
        idDdCodTecReal: response.data.idDdCodTecReal,
        idDdOrganismoConservacion: response.data.idDdOrganismoConservacion,
        idDdOrganismoCompetente: response.data.idDdOrganismoCompetente,
        idDdZonasPluviometricas: response.data.idDdZonasPluviometricas,
        idDdZonasTermicas: response.data.idDdZonasTermicas,
        idDdTiposCalzada: response.data.idDdTiposCalzada,
        idDdRegimenGestion: response.data.idDdRegimenGestion,
        idDdRegimenExplotacion: response.data.idDdRegimenExplotacion,
        sistemaProyeccion: response.data.sistemaProyeccion,
        idDdCodTecReal: response.data.idDdCodTecReal,
        ddTiposCalzada: response.data.ddTiposCalzada,
        ddRede: response.data.ddRede,
        ddCodTecRealModel: response.data.ddCodTecRealModel,
        ddOrganismos: response.data.ddOrganismos,
        ddRegimenExplotacion: response.data.ddRegimenExplotacion,
        ddRegimenGestion: response.data.ddRegimenGestion,
        ddZonasTermica: response.data.ddZonasTermica,
        ddZonasPluviometrica: response.data.ddZonasPluviometrica,
        firmesTramo: response.data.firmesTramo,
        explanadasTramo: response.data.explanadasTramo,
        puntoIni: response.data.puntoIni,
        puntoFin: response.data.puntoFin,
        pksdistoris: response.data.pksdistoris,
        tramosAforos: response.data.tramosAforos
      }
      
    });
    console.log("CARRILES ARRAY", dataCarriles[0]);
    SentCarril = dataCarriles[0] == undefined ? '' : dataCarriles[0].sentidoCarril;
    console.log("Primer sentido", SentCarril);
    this.getComboRodadura(this.state.ComboTipFirme);
    console.log("COMBO ROD GET", comboRod);
  }).catch(error=>{
    console.log("KO");
    console.log("URL ENTRADA para GET Tramo:", this.state.idTramSel);
    console.log(error); 
  });
}

/*Refresh Tramo Seleccionado*/
peticionRefresh=(comboSelect, tipoFirm)=>{
  console.log("Tramo escogido en Edición: ",this.state.idTramSel);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  
  axios.get(this.state.idTramSel, config).then(response=>{
    console.log("Data Edición", response.data);
    var dataCarriles = [];
    var data = response.data.carriles;
    if (data != null) {
      slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
      slice.forEach((carrile) => {
        dataCarriles.push({
          id: carrile.id,
          ordenCarrile: carrile.ordenCarril,
          sentidoCarril: carrile.sentido,
          idTramos: carrile.idTramos
        });
      });
    }
    var dataAct = response.data.actuacionesTramos;
    if (dataAct != null) {
      sliceAct = dataAct.slice(this.state.offset, this.state.offset + this.state.perPage);
    }
    console.log("Data actuaciones", dataAct);

    if (data == null) {
      this.setState({ setMsgOutBoolKO: true });
    };

    if (dataAct == null) {
      this.setState({ setMsgOutActKO: true });
    };

    this.setState({
      orgtableData: response.data,
      tableData: dataCarriles,
      tableAforos: slice,
      tableAct: sliceAct,
      content: response,
      estadoTram: this.state.currentYear > response.data.fechaBaja ? 'Inactivo' : 'Activo',
      ComboTipFirme: tipoFirm,
      rutaKml: response.data.rutaKml,
      form: {
        id: response.data.id,
        nombre: response.data.nombre,
        actuacionesTramos: dataAct,
        carretera: response.data.carretera,
        carriles: data,
        comentario: response.data.comentario,
        longitud: response.data.longitud,
        fechaAlta: response.data.fechaAlta.substr(0, 10),
        fechaBaja: response.data.fechaBaja,
        idDdTiposCalzada: response.data.idDdTiposCalzada,
        idCarreteras: response.data.idCarreteras,
        idDdAutoriza: response.data.idDdAutoriza,
        codificacionTecnicaReal: response.data.codificacionTecnicaReal,
        idTramoGemelo: response.data.idTramoGemelo,
        rutaKml: response.data.rutaKml,
        idDdTipoVia: response.data.idDdTipoVia,
        idDdMotivoActualizacion: response.data.idDdMotivoActualizacion,
        idDdComarca: response.data.idDdComarca,
        idPuntosIni: response.data.idPuntosIni,
        idPuntosFin: response.data.idPuntosFin,
        idDdRedes: response.data.idDdRedes,
        idDdCodTecReal: response.data.idDdCodTecReal,
        idDdOrganismoConservacion: response.data.idDdOrganismoConservacion,
        idDdOrganismoCompetente: response.data.idDdOrganismoCompetente,
        idDdZonasPluviometricas: response.data.idDdZonasPluviometricas,
        idDdZonasTermicas: response.data.idDdZonasTermicas,
        idDdTiposCalzada: response.data.idDdTiposCalzada,
        idDdRegimenGestion: response.data.idDdRegimenGestion,
        idDdRegimenExplotacion: response.data.idDdRegimenExplotacion,
        sistemaProyeccion: response.data.sistemaProyeccion,
        idDdCodTecReal: response.data.idDdCodTecReal,
        ddTiposCalzada: response.data.ddTiposCalzada,
        ddRede: response.data.ddRede,
        ddCodTecRealModel: response.data.ddCodTecRealModel,
        ddOrganismos: response.data.ddOrganismos,
        ddRegimenExplotacion: response.data.ddRegimenExplotacion,
        ddRegimenGestion: response.data.ddRegimenGestion,
        ddZonasTermica: response.data.ddZonasTermica,
        ddZonasPluviometrica: response.data.ddZonasPluviometrica,
        firmesTramo: response.data.firmesTramo,
        explanadasTramo: response.data.explanadasTramo,
        puntoIni: response.data.puntoIni,
        puntoFin: response.data.puntoFin,
        pksdistoris: response.data.pksdistoris,
        tramosAforos: response.data.tramosAforos
      }
      
    });
    console.log("CARRILES ARRAY", dataCarriles[0]);
    SentCarril = dataCarriles[0] == undefined ? '' : dataCarriles[0].sentidoCarril;
    console.log("Primer sentido", SentCarril);
    comboRod=comboSelect;
    console.log("COMBO ROD GET", comboRod);
  }).catch(error=>{
    console.log("KO");
    console.log("URL ENTRADA para GET Tramo:", this.state.idTramSel);
    console.log(error); 
  });
}

/*Dar de Baja Tramo*/
peticionPutBaja=(baja)=>{
  console.log("Acción baja tramo", baja);
  console.log("rutaKml", this.state.form.rutaKml);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  axios.put(baja,config).then(response=>{    
    this.setState({modalEliminar: false});
    this.setState({setMsgOutBoolOK: true});
    this.setState({setMsgOutBoolKO: false});
    msg= <Translation ns= "global">{(t) => <>{t('BAJATRAMOK')}</>}</Translation>;
    this.peticionGet();
  }).catch(error=>{
    this.setState({setMsgOutBoolKO: true});
    this.setState({setMsgOutBoolOK: false});
    console.log(baja);
    console.log(this.state.form.id);
    console.log(error);    
    console.log("Error response", error.response);
    console.log("Error response data", error.response?.data);
    this.controlErrBaja(error.response?.data); 
    this.setState({modalEliminar: false});
    this.peticionGet(); 
})   

}

/*Dar de Baja Tramo*/
peticionPutAlta=(alta)=>{
  console.log("Acción baja tramo", alta);
  console.log("rutaKml", this.state.form.rutaKml);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  axios.put(alta,config).then(response=>{    
    this.setState({modalEliminar: false});
    this.setState({setMsgOutBoolOK: true});
    this.setState({setMsgOutBoolKO: false});
    msg= <Translation ns= "global">{(t) => <>{t('ALTATRAMOK')}</>}</Translation>;
    this.peticionGet();
  }).catch(error=>{
    this.setState({setMsgOutBoolKO: true});
    this.setState({setMsgOutBoolOK: false});
    console.log(alta);
    console.log(this.state.form.id);
    console.log(error);    
    console.log("Error response", error.response);
    console.log("Error response data", error.response?.data);
    this.controlErrBaja(error.response?.data); 
    this.setState({modalEliminar: false});
    this.peticionGet(); 
})   

}

/*Eliminar Carril*/
peticionDelete=()=>{
  console.log("Carril a eliminar: ", this.state.form.IdCarril);
  console.log("URL Delete: ", urlDel);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  axios.delete(urlDel+"/"+this.state.form.IdCarril,config).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminarCarril: false});
    msg= <Translation ns= "global">{(t) => <>{t('DELCARRILOK')}</>}</Translation>;   
    this.peticionGet();
  }).catch(error=>{
    console.log("KO Delete");
    console.log(urlDel);
    console.log(this.state.form.IdCarril);
    console.log(error);    
    msg= <Translation ns= "global">{(t) => <>{t('DELCARRILKO')}</>}</Translation>; 
    this.setState({modalEliminarCarril: false});
    this.peticionGet();
})   
}
 

/*Eliminar Auscultación*/
peticionDeleteAus=()=>{
  console.log("Carril a eliminar: ", this.state.form.IdCarril);
  console.log("URL Delete: ", urlDel);
  config = {
    headers: {
        'Authorization': sessionStorage.getItem("JWT"),
        'Accept': 'application/json',
        'content-type': 'application/json'
    }
  };
  axios.delete(urlDelAus+"/"+this.state.form.IdCarril,config).then(response=>{
    console.log("eliminar");
    this.setState({modalEliminarAusc: false});
    msg= <Translation ns= "global">{(t) => <>{t('DELCARRILOK')}</>}</Translation>;   
    this.peticionGet();
  }).catch(error=>{
    console.log("KO Delete");
    console.log(urlDel);
    console.log(this.state.form.IdCarril);
    console.log(error);    
    msg= <Translation ns= "global">{(t) => <>{t('DELCARRILKO')}</>}</Translation>; 
    this.setState({modalEliminarAusc: false});
    this.peticionGet();
})   
}

/*Editar registro. */
peticionPut=()=>{
  config = {
    headers: {
      'Authorization': sessionStorage.getItem("JWT"),
      'Accept': 'application/json',
      'content-type': 'application/json'
    }
  };

  Object.assign(this.state.form, { carriles: this.state.form.carriles });

  axios.put(url, this.state.form, config).then(_ => {
    this.peticionGet();
    this.setState({modalVerificarEd: false});
  }).catch(_ => {
    this.setState({modalVerificarEd: false});
    alert("Error mientras se modificaban datos. Pongase en contacto con elservicio técnico"); 
  });
}


/*Editar registro*/
modalEditar=()=>{
  this.setState({modalEditar: !this.state.modalEditar});
}

/*Eliminar Auscultaciones*/
modalEliminarAusc=()=>{
  this.setState({modalEliminarAusc: !this.state.modalEliminarAusc});
}

/*Eliminar Auscultaciones*/
modalEliminarCarril=()=>{
  this.setState({modalEliminarCarril: !this.state.modalEliminarCarril});
}

//Selecciona una row
seleccionarTramo=(CarTram)=>{
  console.log("Carretera Tramo",CarTram);
  this.setState({
    tipoModal: 'Seleccionar',
    form: {
      id: CarTram.id,
      codigo: CarTram.carretera.codigo,
      nombre: CarTram.carretera.nombre,
      comentario: CarTram.comentario,
      idGrafo: CarTram.idGrafo
    }
  })

  console.log("Id seleccionado: ", CarTram.id);

}   


//Selecciona una row
seleccionarCarril=(carril)=>{
  console.log("carril ",carril);
  this.setState({
    tipoModal: 'Seleccionar',
    form: {
      IdCarril: carril.id
    }
  })
  console.log("Id seleccionado: ", carril.id);

}  



  // Añadir carril rápido (Orden Carril 2) o carril lento (1)
  AddLane=(sent, ordCarril)=>{
    const carrile = {
      id: 0,
      ordenCarrile: ordCarril,
      sentidoCarril: sent,
      idTramos: this.state.idTramos
    };

    this.state.tableData.push(carrile);
    this.state.form.carriles.push(carrile);

    this.setState({
      setMsgOutBoolKO: false,
      tableData: this.state.tableData,
      form: {
        ...this.state.form,
        carriles: this.state.form.carriles
      }
    });
  }


  getComboRodadura=(tipo)=>{
    switch (tipo) {
      case 'Flexible':
        comboRod = comboRodFlex;
        comboInt = comboIntFlex;
        comboBase = comboBaseFlex;
        comboSubBase = comboSubBaseFlex;
        break;
      case 'Semirrígid':
        comboRod = comboRodSemi;
        comboInt = comboIntSemi;
        comboBase = comboBaseSemi;
        comboSubBase = comboSubBaseSemi;
        break;
      case 'Rígid':
        comboRod = comboRodRigid;
        comboInt = comboIntRigid;
        comboBase = comboBaseRigid;
        comboSubBase = comboSubBaseRigid;
        break;
      default:
        comboRod = comboRodFlex;
        comboInt = comboIntFlex;
        comboBase = comboBaseFlex;
        comboSubBase = comboSubBaseFlex;
        break;
    }
    console.log("Combo seleccionado", comboRod);
  }




    //Devolvemos las Tabs con datos
    render(){
        
        const { activeIndex } = this.state;
            const tabs = [
      {
        label: <Translation ns= "global">{(t) => <>{t('Clasif')}</>}</Translation>,
        
        content: (
          <div>
              <br />
              <label><Translation ns= "global">{(t) => <>{t('ClasFunRedes')}</>}</Translation></label>             
              <Select name="ClasFunRedes" 
                  key="ClasFunRedes"
                  options={ comboRedes } 
                  defaultValue={comboRedes.find(obj => obj.value === this.state.form.ddRede.nombre)}
                  onChange={this.handleChangeCombos}
                  
                /> 

              <label><Translation ns= "global">{(t) => <>{t('ClasTecReal')}</>}</Translation></label>
              
              <Select name="ClasTecReal" 
                  key="ClasTecReal"
                  options={ comboTecReal } 
                  defaultValue={comboTecReal.find(obj => obj.value === this.state.form.ddCodTecRealModel.nombre)}
                  onChange={this.handleChangeCombos}
                /> 
               <label><Translation ns= "global">{(t) => <>{t('OrgCons')}</>}</Translation></label>
               
               <Select name="OrgCons" 
                  key="OrgCons"
                  options={ comboOrg } 
                  defaultValue={comboOrg.find(obj => obj.value === this.state.form.ddOrganismos.nombre)}
                  onChange={this.handleChangeCombos}
                /> 

               <label><Translation ns= "global">{(t) => <>{t('OrgCom')}</>}</Translation></label>
               
               <Select name="OrgCom" 
                  key="OrgCom"
                  options={ comboOrg } 
                  defaultValue={comboOrg.find(obj => obj.value === this.state.form.ddOrganismos.nombre)}
                  onChange={this.handleChangeCombos}
                /> 

               <label><Translation ns= "global">{(t) => <>{t('RegGest')}</>}</Translation></label>
               <Select name="RegGest" 
                  key="RegGest"
                  options={ comboGest } 
                  defaultValue={comboGest.find(obj => obj.value === this.state.form.ddRegimenGestion.nombre)}
                  onChange={this.handleChangeCombos}
                /> 

               <label><Translation ns= "global">{(t) => <>{t('RegExpl')}</>}</Translation></label>
               
               <Select name="RegExpl" 
                  key="RegExpl"
                  options={ comboExplo } 
                  defaultValue={comboExplo.find(obj => obj.value === this.state.form.ddRegimenExplotacion.nombre)}
                  onChange={this.handleChangeCombos}
                /> 

              <label><Translation ns= "global">{(t) => <>{t('zonTer')}</>}</Translation></label>

              <Select name="zonTer" 
                  key="zonTer"
                  options={ comboZonTer } 
                  defaultValue={comboZonTer.find(obj => obj.value === this.state.form.ddZonasTermica.codigo)}
                  onChange={this.handleChangeCombos}
                /> 

            <label><Translation ns= "global">{(t) => <>{t('ZonaPluv')}</>}</Translation></label>

            <Select name="ZonaPluv" 
              key="ZonaPluv"
              options={ comboZonPluv } 
              defaultValue={comboZonPluv.find(obj => obj.value === this.state.form.ddZonasPluviometrica.codigo)}
              onChange={this.handleChangeCombos}
              /> 

          </div>
        ),
        disabled: false
      },
      {
        label: <Translation ns= "global">{(t) => <>{t('Firme')}</>}</Translation>,
        content: (

            <div>
              <br />
              <label><Translation ns= "global">{(t) => <>{t('TipFirTram')}</>}</Translation></label>
                <Select name="idCarrilDdTiposFirmesTramo" 
                  key="idCarrilDdTiposFirmesTramo"
                  options={ comboTipoFirme } 
                  onChange={this.handleComboTipFirme} 
                  defaultValue={comboTipoFirme.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdTiposFirmesTramo)}
                /> 
              <label><Translation ns= "global">{(t) => <>{t('NilInf')}</>}</Translation></label>
                <Select name="NivelInfluencia" 
                  key="NivelInfluencia"
                  options={ comboNivelInfluencia } 
                  onChange={this.handleChangeCombos}
                  defaultValue={comboNivelInfluencia.find(obj => obj.value === this.state.form.firmesTramo.idDdNivelesInfluencia)}
                  /> 
              <label><Translation ns= "global">{(t) => <>{t('CPA')}</>}</Translation></label>
                <input
                    id="CPA"
                    type="number"
                    name="CPA"
                    className="u-full-width"
                    onChange={this.handleChange}
                    value={this.state.form.firmesTramo.cpa}
                />
              <label><Translation ns= "global">{(t) => <>{t('AnchCar')}</>}</Translation></label>
                <input
                    id="anchuraCarril"
                    type="number"
                    name="anchuraCarril"
                    className="u-full-width"
                    onChange={this.handleChange}
                    value={this.state.form.firmesTramo.anchuraCarril}
                />
              <label><Translation ns= "global">{(t) => <>{t('AnchArc')}</>}</Translation></label>
                <input
                    id="anchuraArcen"
                    type="number"
                    name="anchuraArcen"
                    className="u-full-width"
                    onChange={this.handleChange}
                    value={this.state.form.firmesTramo.anchuraArcen}
                />
              <label><Translation ns= "global">{(t) => <>{t('MPD')}</>}</Translation></label>
                <Select 
                  name="MPD" 
                  key="MPD"
                  options={ comboTipoMPD } 
                  onChange={this.handleChangeCombos} 
                  defaultValue={comboTipoMPD.find(obj => obj.value === this.state.form.firmesTramo.tipoLogModeloEvolMpd)}
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
                    <td>
                      <Select name="CapaRodadura" 
                        key="CapaRodadura"
                        options={ comboRod } 
                        defaultValue={comboRod.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasRodadura)}
                        value={comboRod.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasRodadura)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td>
                    
                    <td>{this.state.form.firmesTramo.espesorRodaduraCarril}</td>
                    <td>
                      <Select name="idArcenDdCapasRodadura" 
                        key="idArcenDdCapasRodadura"
                        options={ comboRod } 
                        defaultValue={comboRod.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasRodadura)}
                        value={comboRod.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasRodadura)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td>
                    <td>{this.state.form.firmesTramo.espesorRodaduraArcen}</td>
                  </tr>
                  <tr>
                    <th scope='row'><Translation ns= "global">{(t) => <>{t('CapaInter')}</>}</Translation></th>
                    <td>
                      <Select name="idCarrilDdCapasIntermedia" 
                        key="idCarrilDdCapasIntermedia"
                        options={ comboInt } 
                        defaultValue={comboInt.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasIntermedia)}
                        value={comboInt.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasIntermedia)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td>
                    <td>{this.state.form.firmesTramo.espesorIntermediaCarril}</td>
                    <td>
                      <Select name="idArcenDdCapasIntermedia" 
                        key="idArcenDdCapasIntermedia"
                        options={ comboInt } 
                        defaultValue={comboInt.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasIntermedia)}
                        value={comboInt.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasIntermedia)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td> 
                    <td>{this.state.form.firmesTramo.espesorIntermediaArcen}</td>
                  </tr>
                  <tr>
                    <th scope='row'><Translation ns= "global">{(t) => <>{t('CapaBase')}</>}</Translation></th>
                    <td>
                      <Select name="idCarrilDdCapasBase" 
                        key="idCarrilDdCapasBase"
                        options={ comboBase } 
                        defaultValue={comboBase.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasBase)}
                        value={comboBase.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasBase)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td>
                    <td>{this.state.form.firmesTramo.espesorBaseCarril}</td>
                    <td>
                      <Select name="idArcenDdCapasBase" 
                        key="idArcenDdCapasBase"
                        options={ comboBase } 
                        defaultValue={comboBase.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasBase)}
                        value={comboBase.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasBase)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td> 
                    <td>{this.state.form.firmesTramo.espesorBaseArcen}</td>
                  </tr>
                  <tr>
                    <th scope='row'><Translation ns= "global">{(t) => <>{t('CapaSubb')}</>}</Translation></th>
                    <td>
                      <Select name="idCarrilDdCapasSubbase" 
                        key="idCarrilDdCapasSubbase"
                        options={ comboSubBase } 
                        defaultValue={comboSubBase.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasSubbase)}
                        value={comboSubBase.find(obj => obj.value === this.state.form.firmesTramo.idCarrilDdCapasSubbase)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td>
                    <td>{this.state.form.firmesTramo.espesorSubbaseCarril}</td>
                    <td>
                      <Select name="idArcenDdCapasSubbase" 
                        key="idArcenDdCapasSubbase"
                        options={ comboSubBase } 
                        defaultValue={comboSubBase.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasSubbase)}
                        value={comboSubBase.find(obj => obj.value === this.state.form.firmesTramo.idArcenDdCapasSubbase)}
                        onChange={this.handleChangeCombos}
                      /> 
                    </td>
                    <td>{this.state.form.firmesTramo.espesorSubbaseArcen}</td>
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
             <br />
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope='col'><Translation ns= "global">{(t) => <>{t('terrnat')}</>}</Translation></th>
                  <th scope='col'><Translation ns= "global">{(t) => <>{t('cbr')}</>}</Translation></th>
                </tr>
              </MDBTableHead>
            <MDBTableBody>
              <tr>        
                <td>
                <Select 
                  type="text"
                  name="idDdTerrenosNaturales" 
                  key="idDdTerrenosNaturales"
                  options={ comboTerNat } 
                  onChange={this.handleChangeCombos}
                  defaultValue={comboTerNat.find(obj => obj.value === this.state.form.explanadasTramo.idDdTerrenosNaturales)}
                  /> 
                 
                </td>
                <td>
                  <input
                    type="number"
                    name="cbr"
                    id="cbr"
                    value={this.state.form.explanadasTramo.terrenoNaturalCbr}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            {"  "}
            <br /><br />
            <label><Translation ns= "global">{(t) => <>{t('CategExpl')}</>}</Translation></label>
                <Select 
                  type="text"
                  name="idDdCategoriasExplanadas" 
                  key="idDdCategoriasExplanadas"
                  options={ comboExplanada } 
                  onChange={this.handleChangeCombos}
                  defaultValue={comboExplanada.find(obj => obj.value === this.state.form.explanadasTramo.idDdCategoriasExplanadas)}
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
                  <th> 
                    <input
                      type="number"
                      name="relleno"
                      id="relleno"
                      value={this.state.form.explanadasTramo.relleno}
                      onChange={this.handleChange}
                    />
                 </th>
                  <td>
                    <input
                      type="number"
                      name="rellenoCbr"
                      id="rellenoCbr"
                      value={this.state.form.explanadasTramo.rellenoCbr}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th scope='row'><Translation ns= "global">{(t) => <>{t('coronacion')}</>}</Translation></th>
                  <td>
                    <input
                      type="number"
                      name="coronacion"
                      id="coronacion"
                      value={this.state.form.explanadasTramo.coronacion}
                      onChange={this.handleChange}
                    />                   
                  </td>
                  <td>
                    <input
                      type="number"
                      name="coronacionCbr"
                      id="coronacionCbr"
                      value={this.state.form.explanadasTramo.coronacionCbr}
                      onChange={this.handleChange}
                    />                              
                  </td>
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
          <Fragment>
          {
          !this.state.setMsgOutBoolKO
          ? <div style={{marginLeft:'0%'}}>
              {
                SentCarril === ""
                  ? ''
                  : SentCarril === "Decreixent"
                      ? <Translation ns= "global">{(t) => <>{t('SentDecre')}</>}</Translation>
                      : <Translation ns= "global">{(t) => <>{t('SentCre')}</>}</Translation>
                    }
                    </div>
                  : ''
              }
 
            <br />
            <Row>
            { !this.state.setMsgOutBoolKO
              ? 
            <Col xs={7} style={{textAlign: "left"}}>
              <BootstrapTable 
                bootstrap4 
                wrapperClasses="table-responsive"
                keyField='ordenCarril' 
                columns={this.columns} 
                data={this.state.tableData}
                bordered={ false }
                filter={filterFactory()}
                headerWrapperClasses="table-responsive"
                classes="w-auto text-nowrap"
              >
              </BootstrapTable>
            </Col>
  
            : <div className="alert alert-danger">
                {msgOut}
              </div>
                  
          }    
            <Col xs={1} style={{textAlign: "right", width: '250px', marginTop:'5%'}}>
                  <button className="btn btn-primary btn-sm" style={{width: '200px'}} onClick={(e)=>{e.preventDefault(); this.AddLane(SentCarril, 2)}}>{<Translation ns= "global">{(t) => <>{t('AddLaneFast')}</>}</Translation>}</button>
                    {"  "}
                  <button className="btn btn-primary btn-sm" style={{width: '200px'}} onClick={(e)=>{e.preventDefault(); this.AddLane(SentCarril, 1)}}>{<Translation ns= "global">{(t) => <>{t('AddLaneSlow')}</>}</Translation>}</button>
            </Col>
          </Row>

      </Fragment>
        ),
        disabled: false
      }

    ];
        
      if (!this.state.content) 
      return (
        <div className="u-full-width" style={{marginLeft:'50%'}}>
          <Spinner /> 
        </div>
      );
      return(
        
        <div className="app" style={{ backgroundColor: '#FFFFFF', color: '#252831', textDecoration: 'none', height: '1200px', listStyle: 'none', padding: '20px', alignItems: 'center', justifyContent: 'space-between', fontSize: '18px'}} > 
          
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
          
          <form>
            <Container>
            <br />
            <div style={{backgroundColor: '#FFFFFF'}} > 
              <Row>         
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('Carretera')}</>}</Translation></label>
                    <input
                      type="text"
                      name='nombre'
                      className="col m3 s12"
                      readOnly = {false}
                      placeholder= {this.state.form.carretera.nombre}
                      onChange={this.handleChange}
                      value={this.state.form.carretera.nombre}
                    />
                </Col>               
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('coment')}</>}</Translation></label>
                    <input
                      type="text"
                      name="comentario"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder= {this.state.form.comentario}
                      onChange={this.handleChange}
                      value={this.state.form.comentario}
                    />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('PKIni')}</>}</Translation></label>
                    <input
                      type="number"
                      pattern="[0-9]*"
                      name="pkIni"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder={this.state.form.puntoIni.pk}
                      onChange={this.handleChange}
                      value={this.state.form.puntoIni.pk}
                    />     
                </Col>               
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('PKFin')}</>}</Translation></label>
                    <input
                      type="number"
                      name="pkFin"
                      pattern="[0-9]*"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder={this.state.form.puntoFin.pk}
                      onChange={this.handleChange}
                      value={this.state.form.puntoFin.pk}
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
                      readOnly = {false}
                      placeholder= {this.state.form.carretera.codigo}
                      onChange={this.handleChange}
                      value={this.state.form.carretera.codigo}
                    />
                </Col>               
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('long')}</>}</Translation></label>
                    <input
                      type="number"
                      name="longitud"
                      pattern="[0-9]*"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder={this.state.form.longitud}
                      onChange={this.handleChange}
                      value={this.state.form.longitud}
                    />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('MIni')}</>}</Translation></label>
                    <input
                      type="number"
                      name="mIni"
                      pattern="[0-9]*"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder={this.state.form.puntoIni.m}
                      onChange={this.handleChange}
                      value={this.state.form.puntoIni.m}
                    />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('MFin')}</>}</Translation></label>
                    <input
                      type="number"
                      name="mFin"
                      pattern="[0-9]*"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder={this.state.form.puntoFin.m}
                      onChange={this.handleChange}
                      value={this.state.form.puntoFin.m}
                    />
                </Col>
              </Row>
              <Row>
              <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('FechAlt')}</>}</Translation></label>
                    <input
                      type="text"
                      name="fechaalta"
                      readOnly = {true}
                      className="u-full-width"                  
                      onChange={this.handleChange}
                      value={this.state.form.fechaAlta}
                    />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('TipCalz')}</>}</Translation></label>
                  <Select 
                    type="text"
                    name="idDdTiposCalzada" 
                    key="idDdTiposCalzada"
                    options={ comboCalzada } 
                    onChange={this.handleChangeCombos}
                    defaultValue={comboCalzada.find(obj => obj.value === this.state.form.idDdTiposCalzada)}
                  />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('DescIni')}</>}</Translation></label>
                    <input
                      type="text"
                      name="descIni"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder={this.state.form.puntoIni.descripcion}
                      onChange={this.handleChange}
                      value={this.state.form.puntoIni.descripcion}
                    />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('DescFin')}</>}</Translation></label>
                    <input
                      type="text"
                      name="descFin"
                      className="u-full-width"
                      readOnly = {false}
                      placeholder={this.state.form.puntoFin.descripcion}
                      onChange={this.handleChange}
                      value={this.state.form.puntoFin.descripcion}
                    />
                </Col>
              </Row>
              <Row>
              <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('FechBaj')}</>}</Translation></label>
                    <input
                      type="text"
                      name="fechabaja"
                      className="u-full-width"
                      readOnly = {true}
                      placeholder={this.state.estadoTram}
                      onChange={this.handleChange}
                      value={this.state.estadoTram}
                    />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  {console.log("Año actual", this.state.currentYear)}
                  {console.log("Fecha baja",  this.state.form.fechaBaja)}
                    {
                      this.state.currentYear > this.state.form.fechaBaja 
                      ? 
                        <button className="btn btn-success btn-sm" style={{width: '300px', marginTop:'9%'}} onClick={(e)=>{e.preventDefault(); this.peticionPutAlta(url3+"/"+this.state.form.id);}}>{<Translation ns= "global">{(t) => <>{t('DarAlta')}</>}</Translation>}</button> 
                      : 
                        <button className="btn btn-danger btn-sm" style={{width: '300px', marginTop:'9%'}} onClick={(e)=>{e.preventDefault(); this.peticionPutBaja(url2+"/"+this.state.form.id);}}>{<Translation ns= "global">{(t) => <>{t('DarBaja')}</>}</Translation>}</button>
                    }
                  
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('PosIni')}</>}</Translation></label>
                    <input
                      type="number"
                      name="PosIni"
                      pattern="[0-9]*"
                      className="u-full-width"
                      readOnly = {false}
                      //placeholder={this.state.form.descFin}
                      onChange={this.handleChange}
                      //value={this.state.form.descFin}
                    />
                </Col>
                <Col xs={3} style={{textAlign: "left"}}>
                  <label><Translation ns= "global">{(t) => <>{t('PosFin')}</>}</Translation></label>
                    <input
                      type="number"
                      name="PosFin"
                      pattern="[0-9]*"
                      className="u-full-width"

                      //placeholder={this.state.form.descFin}
                      onChange={this.handleChange}
                      //value={this.state.form.descFin}
                    />
                </Col>
              </Row>
            </div>
            </Container>
            <Container>
              <Row>
                <Col xs={6}>
                  <div className="container">
                    <Tab activeIndex={activeIndex} onChange={this.onChange} tabs={tabs} />
                  </div>
                </Col>
                <Col md={6} style={{marginTop: '5.3%'}}>
                  <Row>
                    <GoogleMapComponent rutaKml={this.state.rutaKml + '_pks.kml'} />
                  </Row>
                </Col>
              </Row>
            </Container>
            <span style={{float: 'left', backgroundColor: '#FFFFFF', marginBottom: '1%'}}>
              <button className="btn btn-success btn-sm" onClick={(e)=>{e.preventDefault(); this.peticionPut();}}><Translation ns= "global">{(t) => <>{t('Guardar')}</>}</Translation></button>
            </span>
          </form>
          
          <Modal isOpen={this.state.modalEliminarCarril}>
				      <ModalBody>
              <Translation ns= "global">{(t) => <>{t('eliReg')}</>}</Translation>			        
				      </ModalBody>
				      <ModalFooter>
				        <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
				        <button className="btn btn-primary" onClick={()=>this.setState({modalEliminarCarril: false})}>No</button>
				      </ModalFooter>
			      </Modal>

            <Modal isOpen={this.state.modalEliminarAusc}>
				      <ModalBody>
              <Translation ns= "global">{(t) => <>{t('eliReg')}</>}</Translation>			        
				      </ModalBody>
				      <ModalFooter>
				        <button className="btn btn-danger" onClick={()=>this.peticionDeleteAus()}>Sí</button>
				        <button className="btn btn-primary" onClick={()=>this.setState({modalEliminarAusc: false})}>No</button>
				      </ModalFooter>
			      </Modal>
        </div>
      )
    }
}


export default EditarTramo;
