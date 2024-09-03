import React, { useState } from "react";
import micro from "../assets/microsoft.jpeg"
import apple from "../assets/apple.webp"
import tesla from "../assets/tesla.webp"
import wipro from "../assets/wipro.jpg"
import tcs from "../assets/tcs.jpg"
import ibm from "../assets/ibm.jpg"
import { Card } from 'react-bootstrap'
import '../styles/home.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Popularcomp = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
  
    ]
  };
  const [company, setcompany] = useState([
    { id: 1, title: "Microsoft", location: "Bangalore", image: micro },
    { id: 2, title: "Tesla", location: "Mumbai", image: tesla },
    { id: 3, title: "Apple", location: "Newdelhi", image: apple },
    { id: 4, title: "TCS", location: "Bangalore", image: tcs },
    { id: 5, title: "Wipro", location: "Bangalore", image: wipro },
    { id: 6, title: "IBM", location: "Hydarabad", image: ibm }

  ]);
  return (
    <div className="companies">
       <h3>POPULAR COMPANIES</h3>
      <Slider {...settings}>
    
    
      {company.map((disp)=>{
          return(
            <div className="compcard" key={disp.id}>
              <Card style={{ width: '18rem' }}>
      <Card.Img src={disp.image} height={'200px'} className="compimg"/>
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
     
    
    
       
     
     </Slider>
    </div>
  )
 
};

export default Popularcomp;
