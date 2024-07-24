import React, { useState } from "react";
import micro from "../assets/microsoft.jpeg"
import apple from "../assets/apple.webp"
import tesla from "../assets/tesla.webp"
import tcs from "../assets/tcs.jpg"
import { Card } from 'react-bootstrap'
import '../styles/home.css'
const Popularcomp = () => {
  const [company, setcompany] = useState([
    { id: 1, title: "Microsoft", location: "Bangalore", image: micro },
    { id: 2, title: "Tesla", location: "Mumbai", image: tesla },
    { id: 3, title: "Apple", location: "Newdelhi", image: apple },
    { id: 4, title: "TCS", location: "Bangalore", image: tcs }
  ]);
  return (
    <div className="companies">
     <div className="compcontainer">
      <h3>POPULAR COMPANIES</h3>
      <div className="compbanner">
        {company.map((disp)=>{
          return(
            <div className="compcard" key={disp.id}>
              <Card style={{ width: '18rem' }}>
      <Card.Img src={disp.image} height={'200px'}/>
      <Card.Body className="comptext">
        <Card.Title>{disp.title}</Card.Title>
        <Card.Text style={{fontSize:"15px",color:"gray"}}>
          {disp.location}
        </Card.Text>
         
      </Card.Body>
    </Card> 
            </div>
          )
        })}
      </div>
     </div>
    </div>
  )
 
};

export default Popularcomp;
