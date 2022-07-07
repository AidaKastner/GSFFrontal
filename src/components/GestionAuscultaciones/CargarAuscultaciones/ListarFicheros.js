import React, { useState, Fragment } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../css/Menu.css';
import { useTranslation } from 'react-i18next';
import { Translation } from 'react-i18next';


function ListarFicheros(){
  
  const { t, i18n } = useTranslation(['global']);
  const url = "https://localhost:44301/api/analizarauscultaciones/ListarFicheros/";

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }

  const [FormFechas, actualizarFormFechas] = useState({ FechaIni:  '', FechaFin: ''});

  const handleChange=async e=>{
    //e.persist();
    console.log("opción:", e);
   
        await actualizarFormFechas({
            ...FormFechas,
            [e.target.name]: e.target.value
        
        });
    }       

    const peticionListar=async()=>{
      console.log("peticionListar");
      const data = new FormData();

      data.append('FechaIni', FormFechas.FechaIni);
      data.append('FechaFin', FormFechas.FechaFin);

      axios.post(url, data, config).then(response=>{
        console.log(response);

      }).catch(error=>{
        console.log("error: ", error);

    })   
  }


  return (
    <div>   
       <input type="date" name="FechaIni" id="FechaIni" onChange={handleChange}/><br />  
       <input type="date" name="FechaFin" id="FechaFin" onChange={handleChange}/><br /> 
       <button className="btn btn-primary btn-sm" style={{float: 'right', marginRight: '5px'}} onClick={()=>peticionListar()}><Translation ns= "global">{(t) => <>{t('ListarFicheros')}</>}</Translation></button> 
    
    </div>
  )

}

export default ListarFicheros;