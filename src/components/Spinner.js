import React from 'react';
import '../css/Spinner.css';

const Spinner = () => {
  console.log("SPINNER");
    return (
    <div className="sk-chase" style={{float:'center'}}>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
     </div>
     
  );
 
}
export default Spinner;
