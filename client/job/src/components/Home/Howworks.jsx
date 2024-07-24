import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import "../styles/home.css"
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
const Howworks = () => {
  return (
    <div className='howitworks'>
     <div className="workcontainer">
        <h3>How HirePulse works</h3>
          <div className='workbanner'>
            <div className="workcard">
            <FaUserPlus />
            <h3>create account</h3>
            <p>users can create account as a jobseeker or a employee</p>
            </div>
            <div className="workcard">
            <MdFindInPage />
            <h3>Find a job/Post a job</h3>
            <p>user entering as job seekers can search for jobs and users entering as employee can post jobs</p>
            </div>
            <div className="workcard">
            <IoMdSend />
            <h3>Apply for a job/Recruite suitable candidates</h3>
            <p>Job seekers can apply for jobs employees can recruite suitable candidates</p>
            </div>
            
          </div>
     </div>
    </div>
  )
}

export default Howworks