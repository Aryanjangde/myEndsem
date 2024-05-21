import { createContext } from "react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const ApiContext = createContext(null);

export const ContextProvider = (props)=>{
  const [data, setData] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        await axios.get('https://academics.newtonschool.co/api/v1/ott/show?limit=100', {
          headers: {
            'accept': 'application/json',
            'projectID': 'treoo5dhf86s',
          },
        }).then(res => setData(res.data.data))
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render
    
    

    return (
        <ApiContext.Provider value={{data, isSignedIn, setIsSignedIn}}>
            <div>
                {props.children}
            </div>
        </ApiContext.Provider>
        
    )
}