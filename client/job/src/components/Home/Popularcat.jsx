import React, { useState } from "react";
import "../styles/home.css"

import { MdConstruction, MdModelTraining, MdOutlineDesignServices } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { SiGooglemarketingplatform } from "react-icons/si";

import { MdComputer } from "react-icons/md";
import { SiVlcmediaplayer } from "react-icons/si";
import { Link } from 'react-router-dom';

const Popularcat = () => {
  const [first, setfirst] = useState([
   
    { id: 2, title: "Technology", icon:<MdComputer />},
    { id: 3, title: "Media",icon:<SiVlcmediaplayer /> },
    { id: 5, title: "Accounting", icon:<MdAccountBalance /> },
    { id: 6, title: "Training", icon:<MdModelTraining />},
    { id: 7, title: "Construction",  icon:<MdConstruction />    },
    { id: 8, title: "Marketing", icon:<SiGooglemarketingplatform /> }
  ]);
  return(
    <div className="popularcat">
    <h3>POPULAR CATEGORIES</h3>
    <div className="popularbanner">
      {first.map((disp) => (
        <div className="popularcard" key={disp.id}>
          <div className="popularicon">{disp.icon}</div>
          <div className="populartext">
            <p>{disp.title}</p>
            <p>{disp.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
   <Link to={'/job/getall'} style={{textDecoration:"none"}}><button>Latest Jobs</button></Link> 
  </div>
  )
  
};

export default Popularcat;
