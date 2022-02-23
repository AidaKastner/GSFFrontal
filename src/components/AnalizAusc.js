import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Error from "../components/Error";
import '../css/Menu.css';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';


function AnalizAusc(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/analizarauscultaciones";
  //const urlStatistics = "https://localhost:44301/api/CargarActuaciones/statistics";

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  const [items, setItems] = useState([]);
  const [archivo, setArchivo]=useState(null);

  const subirArchivos=e=>{
    setArchivo(e);
  }


  const insertarArchivos=async()=>{

    const f = new FormData();
    console.log(archivo);
    f.append('Fichero',archivo);
    console.log(f);

   
    await axios.post(url, f, config)
    .then(response =>{


      console.log(response?.data); 
      console.log("OK");

    }).catch(error=>{


      console.log("prueba2");
      console.log("error: ", error.response?.data);

    })        
  }


  return (
    <div>
      <br/>
          <input type="file" name ="files" onChange={(e)=>subirArchivos(e.target.files[0])} />
          <br /><br />
          <button className="btn btn-primario btn-sm" style={{marginLeft: '5px'}} onClick={()=>insertarArchivos()}><Translation ns= "global">{(t) => <>{t('Cargar')}</>}</Translation></button>
          <br/><br/><br/>  
      </div>
  )

}

export default AnalizAusc;