import React from 'react'
import "../styles/home.css"
import Hsection from './Hsection'
import Howworks from './Howworks'
import Popularcat from './Popularcat'
import Popularcomp from './Popularcomp'
const Home = () => {
  return (
    <div className='homepage'>
     <Hsection/>
     <Howworks/>
     <Popularcat/>
     <Popularcomp/>
    </div>
  )
}

export default Home