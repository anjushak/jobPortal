import React, { useState } from "react";
import "../styles/home.css"
import { FaReact } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { MdOutlineWebhook } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { MdOutlineAnimation } from "react-icons/md";
import { SiGamedeveloper } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";

const Popularcat = () => {
  const [first, setfirst] = useState([
    {
      id: 1,
      title: "Mern Stack Development",
      subtitle: "1000+ vacancies",
      icon: <FaReact />,
    },
    { id: 2, title: "Graphics & Design", subtitle: "900+ vacancies", icon:<MdOutlineDesignServices />},
    { id: 3, title: "Mobile App Development", subtitle: "500+ vacancies",icon:<TbAppsFilled /> },
    { id: 4, title: "Front End Development", subtitle: "1500+ vacancies",icon:<MdOutlineWebhook /> },
    { id: 5, title: "Account & Finance", subtitle: "300+ vacancies",icon:<MdAccountBalance /> },
    { id: 6, title: "Artificial Intelligence", subtitle: "800+ vacancies" ,icon:<GiArtificialIntelligence />},
    { id: 7, title: "Video Animation", subtitle: "1000+ vacancies", icon:<MdOutlineAnimation /> },
    { id: 8, title: "Game Development", subtitle: "500+ vacancies", icon:<SiGamedeveloper /> }
  ]);
  return(
    <div className="popularcat">
     <h3>POPULAR CATEGORIES</h3>
     <div className="popularbanner">
        {first.map((disp)=>{
          return(
            <div className="popularcard" key={disp.id}>
            <div className="popularicon">{disp.icon}</div>
            <div className="populartext">
             <p>{disp.title}</p>
             <p>{disp.subtitle}</p>
            </div>
         </div>
          )
        

         
        })}
     </div>
    </div>
  )
  
};

export default Popularcat;
