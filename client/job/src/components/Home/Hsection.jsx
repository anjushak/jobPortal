import React from 'react'
import "../styles/home.css"
import banner from "../assets/banner.jpg"
import { FaBuilding, FaSuitcase, FaUserPlus, FaUsers } from "react-icons/fa"
const Hsection = () => {
  const details = [{id:1,title:"1,23,440",subtitle:"Live Job",icon:<FaSuitcase />},{id:2,title:"9120",subtitle:"companies",icon:<FaBuilding />},{id:3,title:"2,3400",subtitle:"Job seeker",icon: <FaUsers />},{id:4,title:"1,03,440",subtitle:"Employers",icon:<FaUserPlus />}]
  return (
    <div className='mainHome'>
       <div className='homecontainer'>
         <div className="title">
          <h1 className='titleheading'>Find a job that suits</h1>
          <h1 className='titleheading'>your interest and skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, natus?
          </p>
         </div>
         <div className="banner">
          <img src={banner} alt="" className="home__banner-image"/>
         </div>
       </div>
       <div className="details">
          {details.map((element) => {
            return (
              <div className="detailcard" key={element.id}>
                <div className="detailicon">{element.icon}</div>
                <div className="detailcontent">
                  <p>{element.title}</p>
                  <p>{element.subtitle}</p>
                </div>
              </div>
            );
          })}
       </div>
    </div>
  )
}

export default Hsection