import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

export const MyContext=createContext({isAuthorized:false})
const AppAuth=()=>{
  const [isAuthorized,setAuthorized]=useState(false);
  const [user,setUser] = useState(null);
  
  return(
    <MyContext.Provider value={{isAuthorized,setAuthorized,user,setUser}}>
        <App />
    </MyContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   <React.StrictMode>
  <AppAuth/>
   </React.StrictMode>

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
