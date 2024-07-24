import React from 'react'
import notfound from '../Notfound/not.jpg'
import { Link } from 'react-router-dom'
import "../styles/notfound.css"
const Notfound = () => {
  return (
    <div className='notfound'>
        <div className="content">
            <img src={notfound} alt="notfound" />
            <Link to={'/'}>RETURN HOME</Link>
        </div>

    </div>
  )
}

export default Notfound